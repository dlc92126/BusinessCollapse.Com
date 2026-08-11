// Test script to verify VERITAS AI responds with live GitHub commit knowledge
import fs from 'fs';
import path from 'path';

async function testGitHubKnowledge() {
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

  const updatesPath = path.join(process.cwd(), 'src', 'data', 'github_updates.json');
  let githubContext = '';
  if (fs.existsSync(updatesPath)) {
    const updatesData = JSON.parse(fs.readFileSync(updatesPath, 'utf8'));
    githubContext = '\nRECENTLY SHIPPED GITHUB UPDATES & SITE FEATURES:\n' + 
      updatesData.slice(0, 6).map(c => `• ${c.category} [Commit ${c.hash}]: ${c.subject} (${c.relativeDate})`).join('\n');
  }

  console.log('📡 Testing VERITAS AI with live GitHub commit context...\n');
  console.log('📦 Context Injected:');
  console.log(githubContext);
  console.log('\n----------------------------------------------------\n');

  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;
  const resp = await fetch(geminiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: `You are Veritas AI, the subscriber guide for BusinessCollapse.com.${githubContext}` }]
      },
      contents: [{ role: 'user', parts: [{ text: "What did you guys ship today on GitHub?" }] }]
    })
  });

  const data = await resp.json();
  console.log(`⏱️ Status: ${resp.status} ${resp.statusText}`);
  if (resp.ok) {
    console.log('\n🤖 VERITAS AI RESPONSE WITH LIVE GITHUB KNOWLEDGE:');
    console.log(`"${data.candidates?.[0]?.content?.parts?.[0]?.text}"\n`);
  } else {
    console.error('❌ Error:', JSON.stringify(data, null, 2));
  }
}

testGitHubKnowledge();
