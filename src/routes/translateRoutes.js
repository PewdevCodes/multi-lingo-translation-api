import express from 'express';
import { apiKeyAuth } from '../middleware/apiKeyAuth.js';
import { translateText } from '../controllers/translateController.js';
import { translateController } from '../controllers/translateController.js';

const router = express.Router();


router.post("/translate", apiKeyAuth, translateController);

export default router;