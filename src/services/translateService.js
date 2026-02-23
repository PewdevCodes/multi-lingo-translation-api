import { translateProvider } from "../providers/index.js";

export async function translateService(payload) {

    const { text , source="auto" , target } = payload;

    // validations for the input 
    if( !text || !source || !target ) {
        throw new Error("Missing required fields: text, source, target");
    }

    // delegating a call to the Provider
    const translatedText = await translateProvider({ text, source, target });

    // output in a standard manner 
    return { 
        source,
        target,
        originalText: text,
        translatedText
    };
}