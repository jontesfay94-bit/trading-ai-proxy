const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static('public'));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Proxy endpoint for ticker price
app.get('/proxy/ticker', async (req, res) => {
    const { symbol } = req.query;
    
    if (!symbol) {
        return res.status(400).json({ error: 'Symbol is required' });
    }

    try {
        const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Binance ticker error:', error);
        res.status(500).json({ error: 'Failed to fetch ticker data' });
    }
});

// Proxy endpoint for klines/candlestick data
app.get('/proxy/klines', async (req, res) => {
    const { symbol, interval, limit } = req.query;
    
    if (!symbol || !interval) {
        return res.status(400).json({ error: 'Symbol and interval are required' });
    }

    try {
        const response = await fetch(
            `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit || 100}`
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Binance klines error:', error);
        res.status(500).json({ error: 'Failed to fetch kline data' });
    }
});

// Proxy endpoint for server time
app.get('/proxy/time', async (req, res) => {
    try {
        const response = await fetch('https://api.binance.com/api/v3/time');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Binance time error:', error);
        res.status(500).json({ error: 'Failed to fetch server time' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`Trading AI Proxy Server running on port ${PORT}`);
    console.log(`Access the application at: http://localhost:${PORT}`);
});
