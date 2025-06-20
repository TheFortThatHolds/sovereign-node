const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: '*', // Configure specific domains in production
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    status: 'Personal Node Active',
    message: 'Your digital sovereignty infrastructure is running',
    endpoints: [
      '/api/openai',
      '/api/claude', 
      '/api/gemini',
      '/api/news',
      '/api/financial'
    ]
  });
});

// OpenAI Proxy
app.post('/api/openai', async (req, res) => {
  try {
    const { messages, model = 'gpt-4', temperature = 0.7 } = req.body;
    
    if (!process.env.OPENAI_API_KEY) {
      return res.status(400).json({ error: 'OpenAI API key not configured' });
    }

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model,
      messages,
      temperature
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('OpenAI API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: error.response?.data?.error || 'OpenAI API request failed' 
    });
  }
});

// Claude Proxy
app.post('/api/claude', async (req, res) => {
  try {
    const { messages, model = 'claude-3-opus-20240229', max_tokens = 1000 } = req.body;
    
    if (!process.env.CLAUDE_API_KEY) {
      return res.status(400).json({ error: 'Claude API key not configured' });
    }

    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model,
      messages,
      max_tokens
    }, {
      headers: {
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Claude API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: error.response?.data?.error || 'Claude API request failed' 
    });
  }
});

// Gemini Proxy
app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt, model = 'gemini-pro' } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(400).json({ error: 'Gemini API key not configured' });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: error.response?.data?.error || 'Gemini API request failed' 
    });
  }
});

// News API Proxy
app.get('/api/news', async (req, res) => {
  try {
    const { source = 'newsapi', query, category } = req.query;
    
    if (!process.env.NEWS_API_KEY) {
      return res.status(400).json({ error: 'News API key not configured' });
    }

    let url;
    if (source === 'newsapi') {
      url = `https://newsapi.org/v2/top-headlines?apiKey=${process.env.NEWS_API_KEY}`;
      if (query) url += `&q=${encodeURIComponent(query)}`;
      if (category) url += `&category=${category}`;
      url += '&country=us';
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('News API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'News API request failed' 
    });
  }
});

// Financial Data Proxy
app.get('/api/financial', async (req, res) => {
  try {
    const { symbol, function: func = 'GLOBAL_QUOTE' } = req.query;
    
    if (!process.env.ALPHA_VANTAGE_KEY) {
      return res.status(400).json({ error: 'Financial API key not configured' });
    }

    const url = `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_KEY}`;
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Financial API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'Financial API request failed' 
    });
  }
});

// Custom API Proxy (for user-defined endpoints)
app.all('/api/custom/*', async (req, res) => {
  try {
    const path = req.params[0];
    const customEndpoint = process.env[`CUSTOM_${path.toUpperCase()}_URL`];
    const customKey = process.env[`CUSTOM_${path.toUpperCase()}_KEY`];
    
    if (!customEndpoint) {
      return res.status(400).json({ error: `Custom endpoint '${path}' not configured` });
    }

    const headers = {
      'Content-Type': 'application/json'
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
  console.log(`Personal Node running on port ${PORT}`);
  console.log('Digital sovereignty infrastructure active');
  console.log('Configure your API keys in environment variables');
});