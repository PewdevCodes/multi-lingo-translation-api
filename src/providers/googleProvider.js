import axios from 'axios';

const GOOGLE_TRANSLATE_URL =
  'https://translation.googleapis.com/language/translate/v2';

export async function googleTranslate({ text, source, target }) {
  try {
    const res = await axios.post(
      GOOGLE_TRANSLATE_URL,
      { q: text, source, target, format: 'text' },
      { params: { key: process.env.GOOGLE_API_KEY } },
    );

    return res.data.data.translations[0].translatedText;
  } catch (error) {
    const message = error.response?.data?.error?.message || error.message;
    throw new Error(`Google Translate API error: ${message}`);
  }
}
