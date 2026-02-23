import axios from 'axios';

export async function googleTranslate({text , source , target}) {

/*
    const spanishHello = await googleTranslate(
    { 
        text: "Hello", 
        source: "en", 
        target: "es" 
    });

*/

    const res = await axios.post(
     "https://translation.googleapis.com/language/translate/v2" , {
        q:text,
        source,
        target,
        format:"text",
     },
     {
        params: {
            key: process.env.GOOGLE_API_KEY
        }
     }
    );
    return res.data.data.translations[0].translatedText;
}