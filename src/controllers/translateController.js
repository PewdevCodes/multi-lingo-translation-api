import { translateService } from "../services/translateService";

export async function translateController( req, res) { 
    try {
        const result = await translateService(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
