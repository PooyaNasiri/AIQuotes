const GAS_URL = 'https://script.google.com/macros/s/AKfycbywwMk1tke-_9AeUYUQBxeH5pmlow0VlLuD_0fWslFswpUbS8_-E7gl3YbgYF394OmIXg/exec';

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
    countInput.classList.remove('num-animate');
    void countInput.offsetWidth;
    countInput.classList.add('num-animate');
  }

  up.addEventListener('click', function () { syncInputs(Number(countInput.value) + 1); });
  down.addEventListener('click', function () { syncInputs(Number(countInput.value) - 1); });
  countInput.addEventListener('change', function () { syncInputs(countInput.value); });

  async function generate() {
    btn.disabled = true;
    const prev = btn.querySelector('.btn-text') ? btn.querySelector('.btn-text').textContent : btn.textContent;
    if(btn.querySelector('.btn-text')) btn.querySelector('.btn-text').textContent = 'Generating...';
    btn.classList.add('loading');
    quoteEl.classList.remove('in');
    quoteEl.classList.add('out');
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
        quoteEl.classList.remove('out');
        setTimeout(function(){ quoteEl.classList.add('in'); }, 20);
      } else if (data && data.error) {
        quoteEl.textContent = 'Error: ' + data.error;
      } else {
        quoteEl.textContent = 'No quote returned.';
      }
    } catch (err) {
      quoteEl.textContent = 'Error: ' + (err && err.message ? err.message : String(err));
    } finally {
      btn.disabled = false;
      if(btn.querySelector('.btn-text')) btn.querySelector('.btn-text').textContent = prev;
      btn.classList.remove('loading');
    }
  }

  btn.addEventListener('click', generate);

  // Initialize with a safe default
  syncInputs(countInput.value || 5);
});
