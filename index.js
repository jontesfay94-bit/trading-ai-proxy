// index.js - The server code needed for the app to function.

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// --- API ROUTES ---

// For Binance server time
app.get('/api/time', async (req, res) => {
    try {
        const response = await fetch('https://api.binance.com/api/v3/time');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch time' });
    }
});

// For historical k-line data
app.get('/api/klines', async (req, res) => {
    const { symbol, interval, limit } = req.query;
    try {
        const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch klines' });
    }
});

// For live price ticker data
app.get('/api/ticker', async (req, res) => {
    const { symbol } = req.query;
    try {
        const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ticker' });
    }
});

// --- Serve the Front-End App ---
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
