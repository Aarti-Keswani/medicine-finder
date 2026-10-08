const express = require("express");
const cors = require("cors");
require("dotenv").config();

const prescriptionRoutes = require("./routes/prescriptionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/prescription", prescriptionRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Medicine Finder API is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});