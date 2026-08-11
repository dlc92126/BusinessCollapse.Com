// Find working Gemini generation model
import fs from 'fs';
import path from 'path';

async function testWorkingModels() {
  let apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const match = envContent.match(/GEMINI_API_KEY=([^\r\n]+)/);
      if (match && match[1]) {
        apiKey = match[1].trim();
      }
    }
  }

  const candidates = [
    'gemini-flash-latest',
    'gemini-3.5-flash',
    'gemini-3.6-flash',
    'gemini-flash-lite-latest',
    'gemini-3.1-flash-lite',
    'gemini-pro-latest',
    'gemini-2.5-pro'
  ];

  console.log(`🔑 Testing API Key: ${apiKey.substring(0, 8)}...${apiKey.slice(-4)}\n`);

  for (const model of candidates) {
    console.log(`📡 Testing generation endpoint for: ${model}...`);
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const genResp = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: "You are Veritas AI, an executive customer guide for BusinessCollapse.com." }]
          },
          contents: [{ role: 'user', parts: [{ text: 'I have an idea for a new feature.' }] }]
        })
      });

      const genData = await genResp.json();
      console.log(`⏱️ Status: ${genResp.status} ${genResp.statusText}`);
      
      if (genResp.ok && genData.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.log(`\n🎉🎉🎉 FOUND WORKING MODEL: ${model}! 🎉🎉🎉`);
        console.log('🤖 LIVE GENERATED GEMINI OUTPUT TEXT:');
        console.log(`"${genData.candidates[0].content.parts[0].text}"\n`);
        return model;
      } else {
        console.log(`❌ Error Message: ${genData.error?.message || 'No text returned'}\n`);
      }
    } catch (err) {
      console.error(`❌ Network error for ${model}:`, err.message);
    }
  }
}

testWorkingModels();
