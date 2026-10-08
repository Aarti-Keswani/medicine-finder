import { useState } from "react";
import "./App.css";

function App() {
    const [file, setFile] = useState(null);
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
            setMedicines([]);
            setError("");
        }
    };

    const extractMedicines = async () => {
        if (!file) {
            setError("Please select a prescription first.");
            return;
        }

        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("prescription", file);

        try {
            const response = await fetch(
                "http://localhost:5000/api/prescription/extract",
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Failed to extract medicines"
                );
            }

            setMedicines(result.data);
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app">

            <div className="container">

                <h1>💊 Medicine Finder</h1>

                <p className="subtitle">
                    Upload your prescription and extract medicines
                </p>

                <div className="upload-box">

                    <label htmlFor="prescription">
                        Choose Prescription
                    </label>

                    <input
                        id="prescription"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                    />

                    {file && (
                        <p className="file-name">
                            Selected: {file.name}
                        </p>
                    )}

                    <button
                        onClick={extractMedicines}
                        disabled={loading}
                    >
                        {loading
                            ? "Extracting..."
                            : "Extract Medicines"}
                    </button>

                </div>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                {medicines.length > 0 && (
                    <div className="results">

                        <h2>Medicines Found</h2>

                        {medicines.map((medicine, index) => (
                            <div
                                className="medicine-card"
                                key={index}
                            >

                                <h3>
                                    💊{" "}
                                    {medicine.medicineName ||
                                        "Unknown Medicine"}
                                </h3>

                                <p>
                                    <strong>Strength:</strong>{" "}
                                    {medicine.strength ||
                                        "Not available"}
                                </p>

                                <p>
                                    <strong>Form:</strong>{" "}
                                    {medicine.dosageForm ||
                                        "Not available"}
                                </p>

                                <p>
                                    <strong>Frequency:</strong>{" "}
                                    {medicine.frequency ||
                                        "Not available"}
                                </p>

                                <p>
                                    <strong>Duration:</strong>{" "}
                                    {medicine.duration ||
                                        "Not available"}
                                </p>

                            </div>
                        ))}

                        <button className="store-button">
                            Find Available Stores
                        </button>

                    </div>
                )}

            </div>

        </div>
    );
}

export default App; 