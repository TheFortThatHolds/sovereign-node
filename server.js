const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));

// Health check endpoint
app.get('/', (req, res) => {
  const customEndpoints = Object.keys(process.env)
    .filter(key => key.startsWith('CUSTOM_') && key.endsWith('_URL'))
    .map(key => `/api/custom/${key.replace('CUSTOM_', '').replace('_URL', '').toLowerCase()}`);
  res.json({
    status: 'Sovereign Node Active',
    message: 'Your digital sovereignty gateway is running',
    endpoints: customEndpoints
  });
});

// Custom API Proxy
app.all('/api/custom/*', async (req, res) => {
  try {
    const path = req.params[0];
    const customEndpoint = process.env[`CUSTOM_${path.toUpperCase()}_URL`];
    const customKey = process.env[`CUSTOM_${path.toUpperCase()}_KEY`];
    const customHeaders = process.env[`CUSTOM_${path.toUpperCase()}_HEADERS`]
      ? JSON.parse(process.env[`CUSTOM_${path.toUpperCase()}_HEADERS`])
      : {};

    if (!customEndpoint) {
      return res.status(400).json({ error: `Custom endpoint '${path}' not configured` });
    }

    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders
    };

    if (customKey) {
      headers['Authorization'] = `Bearer ${customKey}`;
    }

    const response = await axios({
      method: req.method,
      url: customEndpoint,
      data: req.body,
      params: req.query,
      headers
    });

    res.json(response.data);
  } catch (error) {
    console.error('Custom API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Custom API request failed'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Sovereign Node running on port ${PORT}`);
  console.log('Digital sovereignty gateway active');
  console.log('Configure your API keys in environment variables');
});
