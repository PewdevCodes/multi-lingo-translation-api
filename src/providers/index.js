import { googleTranslate } from './googleProvider.js';

const PROVIDERS = {
  google: googleTranslate,
};

export async function translate({ text, source, target }) {
  const providerName = process.env.PROVIDER || 'google';
  const providerFn = PROVIDERS[providerName];

  if (!providerFn) {
    throw new Error(`Unsupported provider: ${providerName}`);
  }

  return providerFn({ text, source, target });
}
