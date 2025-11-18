// Replace the placeholder below with your deployed Google Apps Script web app URL.
const GAS_URL = 'https://YOUR_DEPLOYED_GAS_WEB_APP_URL_HERE';

const btn = document.getElementById('generate');
const quoteEl = document.getElementById('quote');

async function generate() {
  btn.disabled = true;
  btn.textContent = 'Generating...';
  try {
    const res = await fetch(GAS_URL);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    quoteEl.textContent = data.quote || 'No quote returned.';
  } catch (err) {
    quoteEl.textContent = 'Error: ' + (err.message || err);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Generate';
  }
}

btn.addEventListener('click', generate);

// Optionally generate on load once
// generate();
