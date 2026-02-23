import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import translateRoutes from './routes/translateRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Routes
app.use('/api', translateRoutes);

// Centralized error handler
app.use((err, _req, res, _next) => {
  console.error(`[Error] ${err.message}`);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: statusCode < 500 ? err.message : 'Internal server error',
  });
});

export default app;
