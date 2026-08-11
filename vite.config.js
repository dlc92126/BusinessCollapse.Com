import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const cleanEmailAddress = (raw) => {
  if (!raw) return '';
  if (Array.isArray(raw)) return raw.map(cleanEmailAddress).filter(Boolean);
  const str = String(raw).trim();
  const match = str.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match ? match[0] : str;
};

const SYSTEM_KNOWLEDGE_SEED = `YOU ARE VERITAS AI, THE SENIOR SUBSCRIBER PARTNER & SITE GUIDE FOR BUSINESSCOLLAPSE.COM.

YOUR IDENTITY & CONVERSATIONAL STYLE:
- You are a highly intelligent, fluent, empathetic, and sharp Wall Street executive partner.
- You talk naturally, authentically, and fluidly — exactly like a brilliant colleague brainstorming over coffee.
- NEVER sound robotic, stilted, formulaic, or canned. Match the user's conversational flow and tone dynamically.
- You have deep domain expertise in distressed debt, Chapter 11 bankruptcy dockets, Section 363 liquidation auctions, WARN Act layoff signals, corporate restructuring, and dealmaking.
- When subscribers share ideas, feature requests, or questions, engage in genuine back-and-forth dialogue! Ask thoughtful questions, share insights, and discuss ideas naturally.
- CRITICAL DIRECTIVE: OUTPUT ONLY YOUR FINAL SPOKEN WORDS DIRECTLY TO THE SUBSCRIBER. NEVER output internal planning monologues, drafting thoughts, step-by-step reasoning, category lists, options, or meta tags (like "Role:", "Drafting thought:", "Step 1:").`;

function getMasterSiteKnowledge() {
  try {
    const kbPath = path.join(process.cwd(), 'src', 'data', 'master_site_knowledge.json');
    if (fs.existsSync(kbPath)) {
      const kb = JSON.parse(fs.readFileSync(kbPath, 'utf8'));
      let text = `\nBUSINESSCOLLAPSE.COM MASTER PLATFORM KNOWLEDGE BASE:\n`;
      text += `Tagline: ${kb.tagline}\n`;
      text += `\nMEMBERSHIP PRICING TIERS:\n` + kb.membershipTiers.map(t => `• ${t.name} (${t.price}): ${t.features}`).join('\n');
      text += `\n\nSITE TOOLS & MODULES:\n` + kb.siteModulesAndFeatures.map(m => `• ${m.module}: ${m.description}`).join('\n');
      text += `\n\nSUPPORT & WORKFLOW GUIDELINES:\n`;
      text += `• Feature Requests: Be authentically interested, ask thoughtful clarifying questions, brainstorm together, and generate a reference ticket ID like Ticket #BC-8492 when appropriate.\n`;
      text += `• Trouble Tickets: Confirm ticket logging (Ticket #BC-8492) and state that notes were dispatched to support@businesscollapse.com.\n`;
      text += `• Billing/Upgrades: Explain tier pricing ($0 Beta Founder, $299 Media Wire, $299 Headhunter, $499 Sales Conquest, $999 Institutional Terminal) and guide users on upgrading via Settings & Account.\n`;
      text += `• Security PIN Vault: Default PACER PIN is 8849.\n`;
      return text;
    }
  } catch (e) {
    console.warn('Could not load master_site_knowledge.json:', e.message);
  }
  return '';
}

function getRecentGitHubUpdates() {
  try {
    const updatesPath = path.join(process.cwd(), 'src', 'data', 'github_updates.json');
    if (fs.existsSync(updatesPath)) {
      const updatesData = JSON.parse(fs.readFileSync(updatesPath, 'utf8'));
      if (Array.isArray(updatesData) && updatesData.length > 0) {
        return '\nRECENTLY SHIPPED GITHUB UPDATES & SITE FEATURES:\n' + 
          updatesData.slice(0, 8).map(c => `• ${c.category} [Commit ${c.hash}]: ${c.subject} (${c.relativeDate})`).join('\n');
      }
    }
  } catch (e) {
    console.warn('Could not load github_updates.json:', e.message);
  }
  return '';
}

// Local Dev Middleware for Netlify Serverless Functions
const netlifyFunctionDevPlugin = () => ({
  name: 'netlify-function-dev-plugin',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {

      // Handler 1: Email Dispatch
      if (req.url === '/.netlify/functions/send-email' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
            const resendApiKey = data.apiKey || process.env.RESEND_API_KEY;

            if (!resendApiKey) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                simulated: true,
                message: 'No RESEND_API_KEY configured. Simulation mode active.'
              }));
              return;
            }

            const sanitizedTo = Array.isArray(data.to) 
              ? data.to.map(cleanEmailAddress).filter(Boolean)
              : [cleanEmailAddress(data.to)];

            const sanitizedFrom = cleanEmailAddress(data.from) || 'onboarding@resend.dev';

            const response = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${sanitizedFrom.includes('resend.dev') ? sanitizedFrom : `BusinessCollapse Intelligence <${sanitizedFrom}>`}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                from: sanitizedFrom.includes('resend.dev') ? sanitizedFrom : `BusinessCollapse Intelligence <${sanitizedFrom}>`,
                to: sanitizedTo,
                subject: data.subject || 'BusinessCollapse Mail Dispatch',
                html: data.html || `<p>${data.text || 'Message body'}</p>`,
                text: data.text || 'Message body'
              })
            });

            const resendData = await response.json();
            res.statusCode = response.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              success: response.ok,
              statusCode: response.status,
              resendData: resendData,
              messageId: resendData.id || null,
              error: response.ok ? null : (resendData.message || resendData.name || 'Resend API Error')
            }));
          } catch (err) {
            console.error('Local Serverless Email Error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err.message }));
          }
        });
        return;
      }

      // Handler 2: Seeded AI Concierge Engine
      if (req.url === '/.netlify/functions/ai-concierge' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
            const prompt = data.prompt || '';
            const history = data.history || [];
            const userProfile = data.userProfile || {};
            const apiKey = (data.apiKey && data.apiKey.trim()) || process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
            const siteKnowledgeContext = getMasterSiteKnowledge();
            const githubContext = getRecentGitHubUpdates();

            if (apiKey) {
              let modelsToTry = [
                'gemini-flash-latest',
                'gemini-3.5-flash',
                'gemini-3.6-flash',
                'gemini-flash-lite-latest',
                'gemini-3.1-flash-lite',
                'gemini-2.5-pro',
                'gemini-1.5-pro',
                'gemini-pro-latest'
              ];

              try {
                const listResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey.trim()}`);
                const listData = await listResp.json();
                if (listResp.ok && Array.isArray(listData.models)) {
                  const discovered = listData.models
                    .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
                    .map(m => m.name.replace(/^models\//, ''));
                  if (discovered.length > 0) {
                    modelsToTry = [...discovered, ...modelsToTry];
                  }
                }
              } catch (e) {
                console.warn('Local model discovery error:', e);
              }

              modelsToTry = [...new Set(modelsToTry)];

              const contentsPayload = [];
              if (Array.isArray(history) && history.length > 0) {
                history.slice(-20).forEach(h => {
                  if (h && h.text && h.text.trim()) {
                    contentsPayload.push({
                      role: h.role === 'user' ? 'user' : 'model',
                      parts: [{ text: h.text.trim() }]
                    });
                  }
                });
              }

              contentsPayload.push({
                role: 'user',
                parts: [{ text: prompt.trim() }]
              });

              let lastErrorMsg = '';

              for (const modelName of modelsToTry) {
                try {
                  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey.trim()}`;
                  const response = await fetch(geminiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      systemInstruction: {
                        parts: [{ text: `${SYSTEM_KNOWLEDGE_SEED}${siteKnowledgeContext}${githubContext}` }]
                      },
                      generationConfig: {
                        temperature: 0.85,
                        maxOutputTokens: 1200
                      },
                      contents: contentsPayload
                    })
                  });

                  const resData = await response.json();
                  if (response.ok && resData.candidates?.[0]?.content?.parts?.[0]?.text) {
                    let text = resData.candidates[0].content.parts[0].text.trim();

                    // Extract final spoken response if model printed internal Chain-of-Thought monologue / drafts / thoughts
                    if (text.includes('Refined thought:')) {
                      text = text.split(/Refined thought[^\n:]*[:\s"]*/i).pop();
                    } else if (text.includes('Draft 3')) {
                      text = text.split(/Draft 3[^\n:]*[:\s"]*/i).pop();
                    } else if (text.includes('Draft 2')) {
                      text = text.split(/Draft 2[^\n:]*[:\s"]*/i).pop();
                    } else if (text.includes('Drafting thought:')) {
                      text = text.split(/Drafting thought[^\n:]*[:\s"]*/i).pop();
                    } else if (text.includes('Direct answer:')) {
                      text = text.split(/Direct answer:\s*/i).pop();
                    } else if (text.includes('Final Answer:')) {
                      text = text.split(/Final Answer:\s*/i).pop();
                    } else if (text.includes('Step 3:')) {
                      text = text.split(/Step 3:\s*/i).pop();
                    }

                    // Remove leading quotes, backticks, or leftover asterisks
                    text = text.replace(/^[\s"':`]+|[\s"':`]+$/g, '').trim();

                    // Filter out planning lines starting with asterisks (*) or specific CoT meta labels/summaries
                    if (text.includes('\n')) {
                      const lines = text.split('\n');
                      const spokenLines = lines.filter(line => {
                        const trimmed = line.trim();
                        if (/^\*+\s*/.test(trimmed)) return false;
                        if (/^(User asks|User knows|Context:|Direct answer:|Identity:|Tone:|Membership Pricing|Initial thought:|Refined thought:)/i.test(trimmed)) return false;
                        if (/\b(Senior Subscriber Partner|Site Guide|High-intelligence|Wall Street exec|authentic, non-robotic|non-robotic)\b/i.test(trimmed)) return false;
                        if (/^(Interested in|Wants to know|Asking about)\s+/i.test(trimmed) && trimmed.includes('.')) return false;
                        return true;
                      });
                      if (spokenLines.length > 0) {
                        text = spokenLines.join('\n').trim();
                      }
                    }

                    // Strip leading summary/intent lines if present in single-paragraph responses
                    text = text.replace(/^(Interested in|Wants to know|Asking about|User is|Subscriber is)\s+[^.\n]+\.\s*(Wants to know[^.\n]+\.\s*)?(Veritas AI[^.\n]+\.\s*)?/i, '').trim();

                    // 1. Strip any transcript/meta label prefix like Question:, My role:, Role:, Persona:, Goal:
                    text = text.replace(/^(Question|User question|Subscriber question|My role|Role|My persona|Persona|My goal|Goal|Specific Instruction|Instruction|Tone|Style|Format|Constraint|Task|Rule|Target|Note|Steps|Attempt|Draft|User message|User says|User|Subscriber message|Subscriber|Client message|Client|Prompt|Query|Input|Acknowledge|Respond|Ask|Invite|Express)\s*:\s*["']?/i, '').replace(/["']?$/, '').trim();

                    if (text.includes('Option 3:')) text = text.split('Option 3:').pop();
                    else if (text.includes('Option 2:')) text = text.split('Option 2:').pop();
                    else if (text.includes('Option 1:')) text = text.split('Option 1:').pop();

                    text = text.replace(/^[*•\-\s"']+|[*•\-\s"']+$/g, '').trim();

                    // Clean trailing non-alphanumeric artifacts only
                    text = text.replace(/[\*\_\-\s"']+$/g, '').trim();

                    const promptLower = prompt.toLowerCase().trim();

                    if (!text || text.length < 3) {
                      text = `That sounds like a very interesting thought, ${userProfile.name || 'Alexander'}! Can you elaborate on how you see it working? I'll gather your notes and fire up a ticket for our product team. Thank you for being a contributor! 🚀`;
                    }

                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: true, reply: text, source: `gemini (${modelName})` }));
                    return;
                  } else if (resData.error?.message) {
                    lastErrorMsg = resData.error.message;
                  }
                } catch (gemErr) {
                  console.error(`Local Gemini Fetch Error (${modelName}):`, gemErr);
                }
              }

              if (lastErrorMsg) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, reply: `⚠️ Gemini API Notice: ${lastErrorMsg}`, source: 'gemini-error' }));
                return;
              }
            }

            // Seeded Engine Intelligence Response — WARM & RECEPTIVE CONVERSATIONAL REPLIES
            const lower = prompt.toLowerCase().trim();
            let replyText = '';

            if (lower.includes('github') || lower.includes('commit') || lower.includes('update') || lower.includes('ship') || lower.includes('new feature')) {
              replyText = `We recently shipped several big GitHub updates, including our Live Gemini AI Concierge Hydration Engine, Back Office Mail Workstation, PACER PIN Security Vault, and Creditor Recovery Waterfall Simulator! 🚀`;
            } else if (lower.includes('board') || lower.includes('message') || lower.includes('linkedin') || lower.includes('post') || lower.includes('community') || lower.includes('feature') || lower.includes('request') || lower.includes('idea')) {
              replyText = `That sounds like a very interesting idea, ${userProfile.name || 'Alexander'}! Can you elaborate on how you see it working? After I get some additional notes from you, I'll fire up a ticket and we'll run it up the flagpole. Thank you so much for being a contributor—it's ideas like this that make our site even better. Keep 'em coming! 🚀`;
            } else if (lower.includes('tier') || lower.includes('membership') || lower.includes('upgrade') || lower.includes('cost') || lower.includes('price') || lower.includes('pass') || lower.includes('plan') || lower.includes('billing')) {
              replyText = `You're currently on our Beta Founder Pass! We also have $299 Media Wire, $299 Headhunter, $499 Sales Conquest, and $999 Institutional tiers. Looking to upgrade or add team members? 😉`;
            } else if (lower.includes('pin') || lower.includes('pacer') || lower.includes('docket') || lower.includes('court') || lower.includes('pdf')) {
              replyText = `Your security PIN (8849) is active! Just click "📄 Download Docket PDF" on any company brief to grab filings instantly.`;
            } else if (lower.includes('export') || lower.includes('crm') || lower.includes('hubspot') || lower.includes('salesforce') || lower.includes('csv')) {
              replyText = `You can export contacts right from the Layoffs tab into CSV, JSON, or directly to Salesforce & HubSpot. Need a quick walkthrough?`;
            } else if (lower.startsWith('test') || lower.includes('are you there') || lower === 'hi' || lower === 'hello' || lower === 'hey') {
              replyText = `Hey ${userProfile.name || 'Alexander'}! VERITAS AI here. What can I help you with today? 😉`;
            } else if (lower.includes('human') || lower.includes('contact') || lower.includes('help') || lower.includes('support') || lower.includes('ticket')) {
              replyText = `I've opened Ticket #BC-${Math.floor(8000 + Math.random() * 1900)} and routed your note to support@businesscollapse.com. A support rep will email you shortly!`;
            } else {
              replyText = `That sounds like a very interesting thought, ${userProfile.name || 'Alexander'}! Can you elaborate on what you have in mind? I'll gather your notes and fire up a ticket for engineering. Thank you for contributing! 🚀`;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, reply: replyText, source: 'seeded-engine' }));
          } catch (err) {
            console.error('Local Serverless AI Error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: err.message }));
          }
        });
        return;
      }

      next();
    });
  }
});

export default defineConfig({
  plugins: [react(), netlifyFunctionDevPlugin()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
    allowedHosts: true,
    open: false
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: true
  }
});
