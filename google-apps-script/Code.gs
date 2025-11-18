/**
 * Google Apps Script backend (strict n enforcement):
 * - Accepts `n` query param (clamped to 3..20)
 * - Tries multiple completions and returns an exact n-word sentence
 * - Supports JSONP via `callback` param
 * - Requires OPENAI_API_KEY in Script Properties
 */

function doGet(e){return handleRequest(e);} 
function doPost(e){return handleRequest(e);} 

function handleRequest(e){
  var OPENAI_KEY = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');
  if(!OPENAI_KEY){
    var errJson = JSON.stringify({error:'OPENAI_API_KEY not set'});
    if(e && e.parameter && e.parameter.callback) return ContentService.createTextOutput(e.parameter.callback+'('+errJson+')').setMimeType(ContentService.MimeType.JAVASCRIPT);
    return ContentService.createTextOutput(errJson).setMimeType(ContentService.MimeType.JSON);
  }

  var n = 5;
  try{ if(e && e.parameter && e.parameter.n) n = Math.max(3, Math.min(20, parseInt(e.parameter.n,10) || 5)); }catch(err){ n = 5; }

  var prompt = 'Generate one motivational sentence consisting of exactly ' + n + ' words. Return only the sentence, nothing else.';

  var attempts = 3;
  var final = '';

  for(var attempt=0; attempt<attempts && !final; attempt++){
    var payload = {
      model: 'gpt-4o-mini',
      messages: [
        {role:'system', content:'You are a concise motivational sentence generator.'},
        {role:'user', content: prompt}
      ],
      temperature: 1.0,
      max_tokens: Math.min(200, n * 10),
      n: 2
    };

    var options = {
      method:'post',
      contentType:'application/json',
      headers:{ Authorization: 'Bearer ' + OPENAI_KEY },
      payload: JSON.stringify(payload),
      muteHttpExceptions:true
    };

    var resp = UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', options);
    var code = resp.getResponseCode();
    var body = resp.getContentText();
    if(code < 200 || code >= 300){
      // return error early
      var err = JSON.stringify({error:'OpenAI API error', status: code, body: body});
      if(e && e.parameter && e.parameter.callback) return ContentService.createTextOutput(e.parameter.callback+'('+err+')').setMimeType(ContentService.MimeType.JAVASCRIPT);
      return ContentService.createTextOutput(err).setMimeType(ContentService.MimeType.JSON);
    }

    var result = JSON.parse(body);
    var choices = result.choices || [];
    // check choices for exact n words
    for(var i=0;i<choices.length;i++){
      var cand = (choices[i].message && choices[i].message.content) || choices[i].text || '';
      cand = String(cand).trim().replace(/[\n\r]+/g,' ');
      var words = cand.split(/\s+/).map(function(w){ return w.replace(/^[^a-zA-Z0-9']+|[^a-zA-Z0-9']+$/g,''); }).filter(Boolean);
      if(words.length === n){ final = words.join(' '); break; }
    }
    // if not found, try again (next attempt)
  }

  // If still not exact, try to use first candidate and trim/pad to n words
  if(!final){
    try{
      var fallback = '';
      if(result && result.choices && result.choices.length) fallback = (result.choices[0].message && result.choices[0].message.content) || result.choices[0].text || '';
      fallback = String(fallback).trim().replace(/[\n\r]+/g,' ');
      var parts = fallback.split(/\s+/).map(function(w){ return w.replace(/^[^a-zA-Z0-9']+|[^a-zA-Z0-9']+$/g,''); }).filter(Boolean);
      if(parts.length >= n){ final = parts.slice(0,n).join(' '); }
      else {
        // pad by repeating last meaningful word
        if(parts.length === 0){ final = Array(n).fill('Keep').join(' '); }
        else {
          var last = parts[parts.length-1];
          while(parts.length < n) parts.push(last);
          final = parts.join(' ');
        }
      }
    }catch(e){ final = Array(n).fill('Keep').join(' '); }
  }

  var out = JSON.stringify({quote: final});
  if(e && e.parameter && e.parameter.callback) return ContentService.createTextOutput(e.parameter.callback+'('+out+')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(out).setMimeType(ContentService.MimeType.JSON);
}
