// Replace the placeholder below with your deployed Google Apps Script web app URL.
const GAS_URL = 'https://script.google.com/macros/s/AKfycbxvu4pgPyvx-N3FbGptzCzr411tmUdjnEZUzLr9XO0Bq5wG5r48hFTY0x7d7xkFittp0Q/exec';
const btn = document.getElementById('generate');
const quoteEl = document.getElementById('quote');

async function generate() {
  btn.disabled = true;
  btn.textContent = 'Generating...';
  try {
    const url = GAS_URL + (GAS_URL.indexOf('?') === -1 ? '?' : '&') + '_ts=' + Date.now();
    const res = await fetch(url, { cache: 'no-store' });
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

generate();
