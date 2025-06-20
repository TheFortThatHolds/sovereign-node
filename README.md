# Sovereign Node
Your personal API gateway for digital sovereignty. Free for personal use, no vendor lock-in.

## What Is This?
Sovereign Node lets you connect to any API you want without being tied to specific services. Deploy it on Render, add your API keys, and you’re in control.

## Quick Start
1. **Get the Code**:
   - Fork or clone this repo: `github.com/your-username/sovereign-node`.
2. **Deploy on Render**:
   - Sign up at [render.com](https://render.com) (free tier works).
   - Create a Web Service, connect this repo.
   - Set:
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
   - Add API keys in Render’s dashboard, e.g.:
     ```
     CUSTOM_YOURNAME_URL=https://your.api.com/endpoint
     CUSTOM_YOURNAME_KEY=your-key-here
     ALLOWED_ORIGINS=https://your-render-app.onrender.com
     ```
   - Save and deploy. Render redeploys when you update keys.
3. **Use It**:
   - Visit `https://your-render-app.onrender.com` to see active endpoints (e.g., `/api/custom/yourname`).
   - Send requests with Postman or your app.
4. **Add More Keys**:
   - In Render’s dashboard, add new keys (e.g., `CUSTOM_OTHER_URL`, `CUSTOM_OTHER_KEY`).
   - Render redeploys automatically.

## How It Works
- Set any API in Render’s environment variables with `CUSTOM_NAME_URL` and `CUSTOM_NAME_KEY`.
- Access it at `/api/custom/name`.
- Example: For an API at `https://example.com/api` with key `abc123`:
