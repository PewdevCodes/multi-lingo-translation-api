import { translateText } from '../services/translateService.js';

export async function handleTranslate(req, res, next) {
  try {
    const result = await translateText(req.body);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
