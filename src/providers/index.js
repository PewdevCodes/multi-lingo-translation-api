import { googleTranslate } from "./googleProvider";

export async function translateProvider(data) { 

    // This function can be extended to support multiple providers in the future

    const provider = process.env.PROVIDER || "google";

    switch(provider) {
        case "google":
            return await googleTranslate(data);
        default:
            throw new Error(`Unsupported provider: ${provider}`);
    }
}