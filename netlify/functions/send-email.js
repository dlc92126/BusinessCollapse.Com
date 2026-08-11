// Netlify Serverless Function for Email Dispatch via Resend API

const cleanEmailAddress = (raw) => {
  if (!raw) return '';
  if (Array.isArray(raw)) return raw.map(cleanEmailAddress).filter(Boolean);
  const str = String(raw).trim();
  const match = str.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : str;
};

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { from, to, subject, html, text, name, apiKey } = JSON.parse(event.body || '{}');

    const resendApiKey = process.env.RESEND_API_KEY || apiKey;

    if (!resendApiKey) {
      console.warn('RESEND_API_KEY environment variable is not configured.');
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          simulated: true,
          message: 'Simulation Mode: RESEND_API_KEY is not set. Email dispatch logged.'
        })
      };
    }

    const sanitizedTo = Array.isArray(to) 
      ? to.map(cleanEmailAddress).filter(Boolean)
      : [cleanEmailAddress(to)];

    const sanitizedFrom = cleanEmailAddress(from) || 'onboarding@resend.dev';
    const emailSubject = subject || '[BUSINESSCOLLAPSE INTELLIGENCE] Executive Briefing';

    // Dispatch email via Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey.trim()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: sanitizedFrom.includes('resend.dev') ? sanitizedFrom : `BusinessCollapse Intelligence <${sanitizedFrom}>`,
        to: sanitizedTo,
        subject: emailSubject,
        html: html || `<p>${text || 'Message content'}</p>`,
        text: text || 'Message content'
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend API Error:', data);
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          success: false, 
          error: data.message || data.name || 'Resend API Error',
          resendData: data
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        messageId: data.id,
        recipient: sanitizedTo,
        resendData: data
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
