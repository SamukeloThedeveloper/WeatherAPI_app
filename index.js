require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");


const app = express();
const PORT = 3000;

app.use(cors({origin: "*"}));

// Get API Key from .env
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
console.log("API Key:", WEATHER_API_KEY);


app.get("/weather/:city", async (req, res) => {
    try {
        const city = req.params.city;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;

        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
