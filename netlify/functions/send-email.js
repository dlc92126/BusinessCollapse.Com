// Netlify Serverless Function for Institutional Email Confirmation Dispatch via Resend API

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { to, subject, html, text, name, apiKey } = JSON.parse(event.body || '{}');

    const recipientEmail = to || 'subscriber@citadelcap.com';
    const emailSubject = subject || '[ACTION REQUIRED] Confirm Email to Activate Your BusinessCollapse PRO Founder Pass';
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.warn('RESEND_API_KEY environment variable is not configured on Netlify.');
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          simulated: true,
          message: 'Simulation Mode: RESEND_API_KEY environment variable not set on Netlify. Email dispatch logged.'
        })
      };
    }

    const emailBodyHtml = html || `
      <div style="font-family: Arial, sans-serif; background-color: #0F172A; color: #F8FAFC; padding: 32px; border-radius: 12px;">
        <h2 style="color: #10B981; margin-top: 0;">BusinessCollapse PRO VIP Founder Confirmation</h2>
        <p>Hello <strong>${name || 'VIP Founder'}</strong>,</p>
        <p>Welcome to BusinessCollapse Intelligence. Your VIP Founder API key is: <strong style="color: #FCD34D;">${apiKey || 'BCC-FOUNDER-8849-9910'}</strong></p>
        <p>Please confirm your email address to unlock full PACER court dockets and DIP cash burn metrics.</p>
        <div style="margin: 24px 0;">
          <a href="https://businesscollapse.com/?verified=true" style="background-color: #10B981; color: #FFFFFF; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Confirm Email & Activate Founder Pass →</a>
        </div>
        <p style="color: #64748B; font-size: 12px; margin-bottom: 0;">Sent by BusinessCollapse Intelligence • SEC & PACER Verified Distress Desk</p>
      </div>
    `;

    // Dispatch email via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Alexander Vance <vance@businesscollapse.com>',
        to: [recipientEmail],
        subject: emailSubject,
        html: emailBodyHtml,
        text: text || `Welcome to BusinessCollapse PRO. Your VIP Founder Key is ${apiKey || 'BCC-FOUNDER-8849-9910'}.`
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API Error:', data);
      return {
        statusCode: response.status,
        body: JSON.stringify({ success: false, error: data })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        messageId: data.id,
        recipient: recipientEmail
      })
    };

  } catch (error) {
    console.error('Netlify Email Function Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
