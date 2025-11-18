# AIQuotes

This repository contains a minimal demo that generates five-word motivational sentences using a small Google Apps Script backend which calls the OpenAI API.

Files added:
- `index.html` — static demo UI for GitHub Pages.
- `script.js` — client-side fetch to your Google Apps Script web app.
- `google-apps-script/Code.gs` — Google Apps Script backend scaffold. Deploy as a web app and set `OPENAI_API_KEY` in Project Settings.

Quick Steps
1. Create a new Google Apps Script project (https://script.google.com) and paste `google-apps-script/Code.gs` into it.
2. In the script's Project Settings, add a Script Property named `OPENAI_API_KEY` with your OpenAI API key.
3. Deploy the script as a Web App: `Deploy` → `New deployment` → select `Web app`.
   - Execute as: `Me`
   - Who has access: `Anyone`
   Copy the deployment URL.
4. Update `script.js` and set `GAS_URL` to your deployment URL.
   - The UI now has a fancy control to pick `N` (1–20 by default). Use the number field, range slider, or +/- buttons.
5. Push the repo to GitHub and enable GitHub Pages from the `main` branch (root). The `index.html` will be served as a demo.

Notes & caveats
- Keep your OpenAI API key secret. The Apps Script runs server-side so the key is not exposed in the client.
- If you need CORS changes or run into cross-origin errors, ensure the web app is deployed with the correct access settings.
- The `Code.gs` uses the Chat Completions endpoint and requests a short, five-word sentence. Adjust `model` or prompt if you prefer other behavior.
 - The `Code.gs` now accepts a query parameter `n` (word count). Example request: `?n=7`.
 - The client sends `n` automatically based on the UI control. The server tries multiple completions and trims or selects a valid `n`-word output.

If you want, I can:
- Deploy a simple GitHub Actions workflow to automatically publish the `main` branch to GitHub Pages.
- Add an example `.github/workflows/pages.yml` and/or test the flow locally with a simple static server.

Enjoy the vibe-coding! 👋
# AIQuotes