const {
    extractMedicinesFromPrescription
} = require("../services/geminiService");

const extractMedicines = async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a prescription"
            });
        }

        const result = await extractMedicinesFromPrescription(
            req.file
        );

        res.json({
            success: true,
            data: result
        });

    } catch (error) {

        console.error("Prescription extraction error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to extract medicines",
            error: error.message
        });
    }
};

module.exports = {
    extractMedicines
};