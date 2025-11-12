// index.js - Your Final Server Code

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// --- NEW, IMPORTANT LINE! ---
// This tells the server to show the index.html file from the 'public' folder
// when someone visits the main URL.
app.use(express.static('public'));

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
