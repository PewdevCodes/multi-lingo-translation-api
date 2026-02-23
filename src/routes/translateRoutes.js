import express from 'express';
import { apiKeyAuth } from '../middleware/apiKeyAuth.js';
import { handleTranslate } from '../controllers/translateController.js';

const router = express.Router();

router.post('/translate', apiKeyAuth, handleTranslate);

export default router;
