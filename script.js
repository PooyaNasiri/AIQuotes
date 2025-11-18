// Minimal client script: small vertical up/down buttons, enforce n=3..20, simple fetch to GAS
// Replace GAS_URL with your deployed Google Apps Script web app URL if needed.
const GAS_URL = 'https://script.google.com/macros/s/AKfycbx-oQu_NIQAmJGNu8saRPOfbzrFl5wjyS8P9MuSkiYUpzLwds7XTYGbQrvPApDyYNtaTw/exec';

document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('generate');
  const quoteEl = document.getElementById('quote');
  const countInput = document.getElementById('count');
  const up = document.getElementById('up');
  const down = document.getElementById('down');

  function clampN(v) {
    v = Number(v) || 5;
    if (v < 3) v = 3;
    if (v > 20) v = 20;
    return v;
  }

  function syncInputs(v) {
    v = clampN(v);
    countInput.value = v;
  }

  up.addEventListener('click', function () { syncInputs(Number(countInput.value) + 1); });
  down.addEventListener('click', function () { syncInputs(Number(countInput.value) - 1); });
  countInput.addEventListener('change', function () { syncInputs(countInput.value); });

  async function generate() {
    btn.disabled = true;
    const prev = btn.textContent;
    btn.textContent = 'Generating...';
    quoteEl.style.opacity = 0.7;
    try {
      const n = clampN(countInput.value);
      const url = GAS_URL + (GAS_URL.indexOf('?') === -1 ? '?' : '&') + '_ts=' + Date.now() + '&n=' + encodeURIComponent(n);
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) {
        quoteEl.textContent = 'Network error: ' + res.status;
        return;
      }
      const data = await res.json();
      if (data && data.quote) {
        quoteEl.textContent = data.quote;
      } else if (data && data.error) {
        quoteEl.textContent = 'Error: ' + data.error;
      } else {
        quoteEl.textContent = 'No quote returned.';
      }
    } catch (err) {
      quoteEl.textContent = 'Error: ' + (err && err.message ? err.message : String(err));
    } finally {
      btn.disabled = false;
      btn.textContent = prev;
      quoteEl.style.opacity = 1;
    }
  }

  btn.addEventListener('click', generate);

  // Initialize with a safe default
  syncInputs(countInput.value || 5);
});
