const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function extractMedicinesFromPrescription(file) {

    const base64Image = file.buffer.toString("base64");

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",

        contents: [
            {
                inlineData: {
                    mimeType: file.mimetype,
                    data: base64Image
                }
            },
            {
                text: `
You are a prescription medicine extraction system.

Analyze the provided prescription image carefully.

Extract ONLY medicines that are actually written in the prescription.

For every medicine, identify:

- medicineName
- strength
- dosageForm
- frequency
- duration

IMPORTANT RULES:

1. Do NOT invent or guess a medicine.
2. If handwriting is unclear, put null for that field.
3. Do not infer a medicine from similar-looking medicine names.
4. Preserve the medicine name as written as much as possible.
5. Ignore patient name, doctor name, signatures and other non-medicine information.
6. Return only JSON.
                `
            }
        ],

        config: {
            responseMimeType: "application/json"
        }
    });

    return JSON.parse(response.text);
}

module.exports = {
    extractMedicinesFromPrescription
};