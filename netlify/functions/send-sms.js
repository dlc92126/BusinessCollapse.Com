// Netlify Serverless Function for SMS Dispatch via Twilio API

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { phone, message, headline } = JSON.parse(event.body || '{}');

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !twilioNumber) {
      console.warn('Twilio credentials not configured in Netlify environment variables.');
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          simulated: true,
          message: `SIMULATED SMS DISPATCH: Alert dispatched to ${phone || '+1 (212) 555-0192'}: "${headline || 'Spirit Airlines DIP Loan $450M Approved'}"`
        })
      };
    }

    // Call Twilio REST API
    const authString = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
    const params = new URLSearchParams();
    params.append('To', phone || '+1 (212) 555-0192');
    params.append('From', twilioNumber);
    params.append('Body', message || `🚨 BUSINESSCOLLAPSE ALERT: ${headline || 'Emergency Docket Update'} - View at https://businesscollapse.com`);

    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ success: false, error: data })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        sid: data.sid,
        to: data.to
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
