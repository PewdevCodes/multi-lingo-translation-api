import { translate } from '../providers/index.js';
import { redis } from '../config/redis.js';

const CACHE_TTL_SECONDS = 24 * 60 * 60; // 24 hours

export async function translateText({ text, source = 'auto', target }) {
  if (!text || !target) {
    const error = new Error('Missing required fields: text, target');
    error.statusCode = 400;
    throw error;
  }

  // Check cache
  const cacheKey = `t:${source}:${target}:${text}`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    return JSON.parse(cached);
  }

  // Delegate to provider
  const translatedText = await translate({ text, source, target });

  const result = {
    source,
    target,
    originalText: text,
    translatedText,
  };

  // Cache for future requests
  await redis.set(cacheKey, JSON.stringify(result), 'EX', CACHE_TTL_SECONDS);

  return result;
}
