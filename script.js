
// Replace the placeholder below with your deployed Google Apps Script web app URL.
const GAS_URL = 'https://script.google.com/macros/s/AKfycbxvu4pgPyvx-N3FbGptzCzr411tmUdjnEZUzLr9XO0Bq5wG5r48hFTY0x7d7xkFittp0Q/exec';
const btn = document.getElementById('generate');
const quoteEl = document.getElementById('quote');
const countInput = document.getElementById('count');
const rangeInput = document.getElementById('range');
const inc = document.getElementById('inc');
const dec = document.getElementById('dec');
const capitalizeCheckbox = document.getElementById('capitalize');
const strictCheckbox = document.getElementById('strict');

// JSONP fallback for environments where CORS blocks fetch
function jsonpFetch(url, timeout = 8000) {
  return new Promise((resolve, reject) => {
    const callbackName = 'aiq_cb_' + Math.random().toString(36).substring(2, 9);
    const script = document.createElement('script');
    const timer = setTimeout(() => {
      window[callbackName] = () => {};
      if (script.parentNode) script.parentNode.removeChild(script);
      reject(new Error('JSONP timeout'));
    }, timeout);

    window[callbackName] = (data) => {
      clearTimeout(timer);
      try { resolve({ok: true, json: async () => data}); }
      finally { if (script.parentNode) script.parentNode.removeChild(script); delete window[callbackName]; }
    };

    script.src = url + (url.indexOf('?') === -1 ? '?' : '&') + 'callback=' + callbackName;
    script.onerror = () => { clearTimeout(timer); if (script.parentNode) script.parentNode.removeChild(script); delete window[callbackName]; reject(new Error('JSONP load error')); };
    document.head.appendChild(script);
  });
}

function syncInputs(val) {
  countInput.value = val;
  rangeInput.value = val;
}

inc.addEventListener('click', () => { const v = Math.min(20, Number(countInput.value) + 1); syncInputs(v); });
dec.addEventListener('click', () => { const v = Math.max(1, Number(countInput.value) - 1); syncInputs(v); });
countInput.addEventListener('change', () => { let v = Number(countInput.value); if (!v || v < 1) v = 1; if (v > 20) v = 20; syncInputs(v); });
rangeInput.addEventListener('input', (e) => syncInputs(e.target.value));

async function generate() {
  btn.disabled = true;
  btn.textContent = 'Generating...';
  quoteEl.style.opacity = 0.6;
  try {
    const n = Number(countInput.value) || 5;
    const options = [];
    if (capitalizeCheckbox.checked) options.push('Capitalize first word');
    if (strictCheckbox.checked) options.push('Enforce exact word count');

    const urlBase = GAS_URL;
    const query = '_ts=' + Date.now() + '&n=' + encodeURIComponent(n) + (options.length ? '&opts=' + encodeURIComponent(options.join(';')) : '');
    const url = urlBase + (urlBase.indexOf('?') === -1 ? '?' : '&') + query;

    // Try fetch first, fallback to JSONP if blocked
    let res;
    try {
      res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error('Network response was not ok');
    } catch (err) {
      res = await jsonpFetch(url);
    }

    const data = await res.json();
    let out = data.quote || data.error || 'No quote returned.';
    // Ensure simple capitalization option
    if (capitalizeCheckbox.checked && out) out = out.charAt(0).toUpperCase() + out.slice(1);
    quoteEl.textContent = out;
  } catch (err) {
    quoteEl.textContent = 'Error: ' + (err.message || err);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Generate';
    quoteEl.style.opacity = 1;
  }
}

btn.addEventListener('click', generate);

// init
syncInputs(Number(countInput.value || 5));
// Optional: generate initially
// generate();

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
