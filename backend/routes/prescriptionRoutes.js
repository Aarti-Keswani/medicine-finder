const express = require("express");
const multer = require("multer");

const {
    extractMedicines
} = require("../controllers/prescriptionController");

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

router.post(
    "/extract",
    upload.single("prescription"),
    extractMedicines
);

module.exports = router;