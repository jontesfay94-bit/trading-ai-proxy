// index.js - This server code is correct and final.

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// --- API ROUTES FIRST ---

app.get('/api/time', async (req, res) => {
    try {
        const binanceResponse = await fetch('https://api.binance.com/api/v3/time');
        const data = await binanceResponse.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch time from Binance' });
    }
});

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

// --- THEN, SERVE THE FRONT-END ---
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
