import { translateProvider } from "../providers/index.js";

//Redis can be used here for caching translations to improve performance and reduce costs, but for simplicity, it's not implemented in this basic version of the service.

import { redis } from "../config/redis.js";

    // Example of how caching could be implemented:
    const key = `t:${source}:${target}:${text}`;

    const cached = await redis.get(key);

    if(cached){
        return JSON.parse(cached);
    }

    const translatedText = await translateProvider({ text, source, target });
    
    // Cache the result for future requests (e.g., for 24 hours)
    await redis.set(key, 
        JSON.stringify(translatedText), 
        'EX', 24 * 60 * 60
    );

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