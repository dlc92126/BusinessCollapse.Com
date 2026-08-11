// Netlify Serverless Function for Inbound Email Ingestion via Resend Webhooks
// Configured to receive inbound emails sent to support@businesscollapse.com, info@businesscollapse.com, and vance@businesscollapse.com

let inboundEmailStore = [];

exports.handler = async (event, context) => {
  // Allow GET requests to fetch received emails
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        emails: inboundEmailStore
      })
    };
  }

  // Only allow POST requests for webhook ingestion
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');

    // Parse Resend Inbound Webhook Event
    const fromAddress = payload.from || payload.data?.from || 'external-sender@domain.com';
    const toAddress = payload.to || payload.data?.to?.[0] || 'support@businesscollapse.com';
    const subject = payload.subject || payload.data?.subject || 'Inbound Inquiry';
    const htmlBody = payload.html || payload.data?.html || `<p>${payload.text || payload.data?.text || 'Inbound message body'}</p>`;
    const textSnippet = (payload.text || payload.data?.text || subject).slice(0, 120);

    // Determine target mailbox account
    let account = 'support';
    if (toAddress.includes('info')) account = 'info';
    if (toAddress.includes('vance')) account = 'events';

    const receivedEmail = {
      id: 'inbound-' + Date.now(),
      account: account,
      folder: 'inbox',
      fromName: fromAddress.split('<')[0].trim() || fromAddress,
      fromEmail: fromAddress.includes('<') ? fromAddress.match(/<([^>]+)>/)?.[1] || fromAddress : fromAddress,
      toEmail: toAddress,
      subject: subject,
      snippet: textSnippet,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: new Date().toISOString(),
      unread: true,
      starred: true,
      badge: 'LIVE INBOUND',
      badgeColor: '#10B981',
      bodyHtml: `<div style="font-family: sans-serif; color: #F8FAFC; background: #0F172A; padding: 20px; border-radius: 8px;">
        <h3 style="color: #10B981; margin-top: 0;">${subject}</h3>
        <p><strong>From:</strong> ${fromAddress}</p>
        <p><strong>To:</strong> ${toAddress}</p>
        <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
        <hr style="border-color: rgba(255,255,255,0.1); margin: 16px 0;" />
        <div style="white-space: pre-wrap; margin-top: 16px; line-height: 1.6; color: #E2E8F0;">${htmlBody}</div>
      </div>`
    };

    inboundEmailStore.unshift(receivedEmail);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, message: 'Inbound email received & stored', email: receivedEmail })
    };

  } catch (err) {
    console.error('Inbound Email Function Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
