// Netlify Serverless Function: Inbound Webhook Gateway Receiver for BusinessCollapse.Com
// Endpoints: POST /.netlify/functions/webhook-ingest

const crypto = require('crypto');

exports.handler = async (event, context) => {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-bcc-webhook-secret',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed. Use POST.' })
    };
  }

  // Token Authorization Verification
  const webhookSecret = process.env.BCC_WEBHOOK_SECRET || 'bcc_sec_pacer_live_secret_9981';
  const incomingSecret = event.headers['x-bcc-webhook-secret'] || event.headers['authorization']?.replace('Bearer ', '');

  if (incomingSecret !== webhookSecret) {
    console.warn('[WEBHOOK-INGEST] Unauthorized payload attempt. Secret mismatch.');
    return {
      statusCode: 401,
      headers,
      body: JSON.stringify({
        error: 'Unauthorized',
        message: 'Invalid or missing x-bcc-webhook-secret header.'
      })
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const ingestedTime = new Date().toISOString();
    const entityName = payload.name || payload.entityName || 'Emergent Ingested Entity';
    const ticker = payload.ticker || 'INGEST';

    // Generate SHA-256 Checksum for Ingested Payload
    const hash = crypto.createHash('sha256').update(`${entityName}-${ticker}-${ingestedTime}`).digest('hex');
    const checksumHash = `sha256-${hash}`;

    console.log(`[WEBHOOK-INGEST] Successfully processed docket payload for ${entityName} (${ticker}). Checksum: ${checksumHash}`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: 'SUCCESS',
        code: 200,
        message: 'Docket payload ingested into BusinessCollapse live wire stream.',
        checksumHash,
        ingestedTime,
        data: {
          entityName,
          ticker,
          jurisdiction: payload.courtJurisdiction || payload.locationJurisdiction || 'U.S. Bankruptcy Court S.D.N.Y.',
          headline: payload.headline || `${entityName} Files Chapter 11 Voluntary Petition`,
          hoursAgo: 0,
          isEmergent: true
        }
      })
    };
  } catch (err) {
    console.error('[WEBHOOK-INGEST] Payload processing error:', err);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: 'Bad Request',
        message: 'Failed to parse JSON body payload.'
      })
    };
  }
};
