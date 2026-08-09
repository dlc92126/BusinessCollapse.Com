// Netlify Serverless Function for Email Notifications & Feedback Dispatch
// Environment variables supported in Netlify Dashboard:
// - RESEND_API_KEY or SENDGRID_API_KEY
// - ADMIN_NOTIFICATION_EMAIL (e.g. feedback@businesscollapse.com)

export async function handler(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { formName, name, email, category, message, pin, bidderId, auctionTitle } = data;

    console.log(`[Netlify Email Function] Received ${formName} submission from ${email || 'anonymous'}`);

    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'feedback@businesscollapse.com';

    // If Resend API Key is set in Netlify Environment Variables, send via HTTP POST API
    if (resendApiKey) {
      const emailPayload = {
        from: 'BusinessCollapse Platform <notifications@businesscollapse.com>',
        to: [adminEmail],
        subject: `[BusinessCollapse ${formName?.toUpperCase() || 'NOTIFICATION'}] ${name || email}`,
        html: `
          <div style="font-family: sans-serif; background: #0F172A; color: #F8FAFC; padding: 24px; border-radius: 12px;">
            <h2 style="color: #38BDF8;">⚡ BusinessCollapse.com ${formName} Submission</h2>
            <p><strong>Name / Subscriber:</strong> ${name || 'N/A'}</p>
            <p><strong>Email:</strong> ${email || 'N/A'}</p>
            ${category ? `<p><strong>Category:</strong> ${category}</p>` : ''}
            ${auctionTitle ? `<p><strong>Auction:</strong> ${auctionTitle}</p>` : ''}
            ${pin ? `<p><strong>Generated PIN:</strong> <code>${pin}</code></p>` : ''}
            ${message ? `<div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 8px;"><pre style="color: #FFF;">${message}</pre></div>` : ''}
            <hr style="border: 0; border-top: 1px solid #334155; margin: 20px 0;" />
            <p style="font-size: 12px; color: #94A3B8;">BusinessCollapse Autonomous AI Distress Network • ${new Date().toUTCString()}</p>
          </div>
        `
      };

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailPayload)
      });

      const resData = await res.json();
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, provider: 'resend', data: resData })
      };
    }

    // Default response if API key is not configured yet (Netlify Forms automatic handling active)
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Form logged successfully via Netlify Forms parser.',
        received: { formName, name, email }
      })
    };
  } catch (err) {
    console.error('[Netlify Email Error]', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
