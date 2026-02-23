export function apiKeyAuth(req, res, next) {
  const expectedKey = process.env.API_KEY;

  if (!expectedKey) {
    console.error('[Auth] API_KEY is not configured');
    return res.status(500).json({ error: 'Internal server error' });
  }

  const providedKey = req.headers['x-api-key'];

  if (providedKey !== expectedKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}
