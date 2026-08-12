// Terminal test script for Master Site Knowledge Base Gemini Hydration
import fs from 'fs';
import path from 'path';

async function testMasterKB() {
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

  const kbPath = path.join(process.cwd(), 'src', 'data', 'master_site_knowledge.json');
  let masterContext = '';
  if (fs.existsSync(kbPath)) {
    const kb = JSON.parse(fs.readFileSync(kbPath, 'utf8'));
    masterContext = `\nBUSINESSCOLLAPSE.COM MASTER PLATFORM KNOWLEDGE BASE:\n` +
      `Tagline: ${kb.tagline}\n` +
      (Array.isArray(kb.roleWorkspaces) ? `5 DEDICATED ROLE WORKSPACES:\n` + kb.roleWorkspaces.map(w => `• ${w.name} (${w.pricing}): Target: ${w.targetAudience} | Features: ${w.keyCapabilities}`).join('\n') + `\n` : '') +
      `MEMBERSHIP PRICING TIERS:\n` + kb.membershipTiers.map(t => `• ${t.name} (${t.price}): ${t.features}`).join('\n');
  }

  console.log('📡 Testing VERITAS AI with 5-Workspace Master Site Knowledge Base...\n');

  const testPrompts = [
    "What dedicated workspaces do you offer for journalists and headhunters?",
    "Tell me about the Section 363 Asset Marketplace and Creditor Action Center.",
    "What does the Investor Terminal cost and what features does it include?",
    "Can you give me a ticket number for my support request?"
  ];

  for (const promptText of testPrompts) {
    console.log(`\n💬 User Prompt: "${promptText}"`);
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;
    const resp = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: `You are Veritas AI, senior subscriber partner for BusinessCollapse.com.${masterContext}\nSpeak naturally in 1-3 conversational sentences.` }]
        },
        contents: [{ role: 'user', parts: [{ text: promptText }] }]
      })
    });

    const data = await resp.json();
    if (resp.ok) {
      console.log(`🤖 VERITAS AI (Live Gemini Output):`);
      console.log(`"${data.candidates?.[0]?.content?.parts?.[0]?.text}"`);
    } else {
      console.error('❌ Error:', JSON.stringify(data, null, 2));
    }
  }
}

testMasterKB();
