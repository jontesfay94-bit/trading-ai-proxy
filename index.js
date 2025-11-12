// index.js - Your Private Messenger for the Render.com Factory

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
// Render provides the port number via an environment variable
const PORT = process.env.PORT || 3000;

app.use(cors());

// Health check route for Render to know our app is alive
app.get('/', (req, res) => {
    res.send('AI Proxy is alive!');
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
