const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve your trading AI HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Advanced Trading AI Server is running',
        timestamp: new Date().toISOString()
    });
});

// Proxy endpoints for Binance API
app.get('/proxy/time', async (req, res) => {
    try {
        const response = await fetch('https://api.binance.com/api/v3/time');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch server time' });
    }
});

app.get('/proxy/ticker', async (req, res) => {
    try {
        const { symbol } = req.query;
        const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch ticker data' });
    }
});

app.get('/proxy/klines', async (req, res) => {
    try {
        const { symbol, interval, limit } = req.query;
        const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch klines data' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Advanced Trading AI Server running on port ${PORT}`);
    console.log(`📊 Application available at: http://localhost:${PORT}`);
});
