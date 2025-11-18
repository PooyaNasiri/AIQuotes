// Replace the placeholder below with your deployed Google Apps Script web app URL.
const GAS_URL = 'https://script.google.com/macros/s/AKfycbwqkeV4aJ4Nd4TP5Qi8aZ8PMBuCWWQPrG_OtcgjcT4JKbLmR03bH4w8zWzkQSRLu06jHA/exec';
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

generate();
