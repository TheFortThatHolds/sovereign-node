# Personal Node - Render.com Deployment Guide
*Your Digital Sovereignty Infrastructure in 10 Minutes*

## 📱 Mobile Deployment Steps

### Step 1: GitHub Repository Setup (5 minutes)
1. **Open GitHub Mobile App**
2. **Create New Repository**:
   - Name: `personal-node-api`
   - Description: "My Personal API Proxy Node - Digital Sovereignty Infrastructure"
   - Make it **Private** (your API keys will be here)
   - Initialize with README: Yes

3. **Add Files via GitHub Mobile**:
   - Tap "+" → "Create new file"
   - Name: `server.js`
   - Copy/paste the complete server.js code
   - Commit with message: "Add personal node server"
   
4. **Add package.json**:
   - Tap "+" → "Create new file"
   - Name: `package.json`
   - Copy/paste the package.json content
   - Commit with message: "Add package configuration"

5. **Add .env.example**:
   - Create new file: `.env.example`
   - Content:
   ```
   # AI Services
   OPENAI_API_KEY=your_openai_key_here
   CLAUDE_API_KEY=your_claude_key_here
   GEMINI_API_KEY=your_gemini_key_here
   
   # Data Sources
   NEWS_API_KEY=your_newsapi_key_here
   ALPHA_VANTAGE_KEY=your_alphavantage_key_here
   
   # Custom APIs
   CUSTOM_WEATHER_URL=https://api.weather.com/v1
   CUSTOM_WEATHER_KEY=your_weather_key_here
   ```

### Step 2: Render.com Deployment (5 minutes)

1. **Visit render.com on mobile browser**
2. **Sign up** with GitHub (easiest option)
3. **New → Web Service**
4. **Connect GitHub repository**:
   - Select `personal-node-api`
   - Grant permissions

5. **Configure Service**:
   - **Name**: `personal-node-api`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Starter ($7/month)

6. **Add Environment Variables**:
   Click "Environment" tab and add:
   - `OPENAI_API_KEY` → Your OpenAI key
   - `CLAUDE_API_KEY` → Your Claude key
   - `GEMINI_API_KEY` → Your Gemini key
   - `NEWS_API_KEY` → Your NewsAPI key
   - `ALPHA_VANTAGE_KEY` → Your Alpha Vantage key

7. **Deploy**: Click "Create Web Service"

### Step 3: Verify Your Personal Node

Your Personal Node URL will be:
```
https://personal-node-api.onrender.com
```

Test it by visiting in your browser. You should see:
```json
{
  "status": "Personal Node Active",
  "message": "Your digital sovereignty infrastructure is running",
  "endpoints": [
    "/api/openai",
    "/api/claude",
    "/api/gemini",
    "/api/news",
    "/api/financial"
  ]
}
```

## 🔑 Getting Your API Keys

### OpenAI API Key
1. Visit platform.openai.com
2. Sign in → API Keys → Create new secret key
3. Copy immediately (won't show again)

### Claude API Key
1. Visit console.anthropic.com
2. Sign in → API Keys → Create key
3. Copy and save securely

### Gemini API Key
1. Visit makersuite.google.com/app/apikey
2. Sign in → Create API key
3. Enable Gemini API

### News API Key
1. Visit newsapi.org
2. Sign up (free tier available)
3. Get your API key from dashboard

### Alpha Vantage Key
1. Visit alphavantage.co/support/#api-key
2. Enter email for free key
3. Check email for your key

## 🚀 Using Your Personal Node

### From SignalLink PWA:
```javascript
const response = await fetch('https://your-personal-node.onrender.com/api/openai', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    messages: [
      { role: 'system', content: 'You are a helpful assistant' },
      { role: 'user', content: 'Hello!' }
    ]
  })
});
```

### From Sentinel Mind PWA:
```javascript
// Switch between AI providers using YOUR keys
const claudeResponse = await fetch('https://your-personal-node.onrender.com/api/claude', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [{ role: 'user', content: 'Analyze this data...' }]
  })
});
```

## 💰 Cost Breakdown

**Monthly Costs:**
- Render.com Hosting: $7/month
- API Usage: Pay-as-you-go directly to providers
- **Total Infrastructure**: $7/month + API usage

**You Control:**
- Which AI services to use
- How much to spend on APIs
- Which data sources to connect
- Complete usage transparency

## 🔒 Security Best Practices

1. **Never commit .env files** to GitHub
2. **Use environment variables** in Render
3. **Rotate API keys** regularly
4. **Monitor usage** on each provider's dashboard
5. **Set spending limits** where available

## 🎯 Next Steps

1. **Deploy SignalLink PWA** to start using your Personal Node
2. **Add more API integrations** as needed
3. **Monitor your usage** and costs
4. **Build more PWAs** that connect to YOUR infrastructure

---

**Congratulations!** You now own your digital intelligence infrastructure. No middleman, no markup, complete sovereignty.

**Your data. Your APIs. Your control.**