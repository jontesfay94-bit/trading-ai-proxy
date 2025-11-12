// index.js - The Correctly Ordered Server Code

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// --- THE FIX: DEFINE SPECIFIC API ROUTES FIRST ---
app.get('/api/klines', async (req, res) => {
    const { symbol, interval, limit } = req.query;
    try {
        const binanceURL = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
        const binanceResponse = await fetch(binanceURL);
        const data = await binanceResponse.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from Binance API' });
    }
});

// --- THEN, SERVE THE STATIC FRONT-END AS THE LAST STEP ---
// This serves your index.html file for the main URL (e.g., /)
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
