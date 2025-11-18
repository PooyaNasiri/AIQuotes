/**
 * Google Apps Script: small backend that calls OpenAI Chat Completion
 * Deployment: Deploy as Web App (Execute as: Me, Who has access: Anyone, even anonymous)
 * Set the script property OPENAI_API_KEY in the Project Settings.
 */خن

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var OPENAI_KEY = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');
  if (!OPENAI_KEY) {
    return ContentService.createTextOutput(JSON.stringify({error: 'OPENAI_API_KEY not set'})).setMimeType(ContentService.MimeType.JSON);
  }

  var prompt = 'Generate exactly one motivational sentence consisting of exactly five words. Return only the sentence, nothing else.';

  var payload = {
    model: 'gpt-4o-mini',
    messages: [
      {role: 'system', content: 'You are a concise motivational sentence generator.'},
      {role: 'user', content: prompt}
    ],
    temperature: 0.8,
    max_tokens: 40
  };

  var options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + OPENAI_KEY
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var resp = UrlFetchApp.fetch('https://api.openai.com/v1/chat/completions', options);
  var code = resp.getResponseCode();
  var body = resp.getContentText();
  if (code < 200 || code >= 300) {
    return ContentService.createTextOutput(JSON.stringify({error: 'OpenAI API error', status: code, body: body})).setMimeType(ContentService.MimeType.JSON);
  }

  var result = JSON.parse(body);
  var text = '';
  try {
    text = result.choices[0].message.content.trim();
  } catch (err) {
    text = '';
  }

  return ContentService.createTextOutput(JSON.stringify({quote: text})).setMimeType(ContentService.MimeType.JSON);
}
