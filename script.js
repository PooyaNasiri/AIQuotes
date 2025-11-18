// Replace the placeholder below with your deployed Google Apps Script web app URL.
const GAS_URL = 'hhttps://script.google.com/macros/s/AKfycbz8kS9eEfM38RwB-SrWnu5X0u4MVDyGzjhcco0_rbLTyYIWuqM9oHaZQNgwMyA5D2Zl1w/exec';

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
