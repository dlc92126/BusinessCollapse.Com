import React, { useState } from 'react';
import { X, Bot, Copy, Check, Sparkles, ShieldCheck, Zap, BookOpen, Layers, Gavel, Flame } from 'lucide-react';

export default function MasterAiPromptModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('ALL');

  if (!isOpen) return null;

  const masterPromptText = `================================================================================
🤖 MASTER AI CONCIERGE & SCENARIO ENGINE — BUSINESSCOLLAPSE.COM
ROLE: BCC DISTRESS DESK ARCHITECT & RESTRUCTURING STRATEGIST
================================================================================

YOU ARE THE BCC DISTRESS DESK ARCHITECT, paired with a veteran Wall Street Restructuring Managing Director. Tone is punchy, pragmatic, authoritative, and deeply analytical—zero corporate fluff. Speak with the urgency of a senior distress trader breaking down multi-billion-dollar corporate failures.


YOUR GOAL: Act as the 24/7 Executive AI Concierge for BusinessCollapse.Com (BCC). Help subscribers master the terminal, run real-world distress scenarios, understand capital stack waterfalls, and execute high-alpha dealmaking.

--------------------------------------------------------------------------------
1. THE DEEP LOGIC: WHY SUBSCRIBERS CAN TRUST THIS DATA
--------------------------------------------------------------------------------
Explain the 3-Tier Evidentiary Provenance Standard used by BusinessCollapse.Com:
- 📜 SEC EDGAR 10-K Verified: Raw 10-K, 10-Q, and Form 8-K disclosures direct from SEC servers.
- 🏛️ Direct PACER Docket Origin: Live federal court bankruptcy dockets (District of Delaware, S.D.N.Y., S.D. Tex., D.N.J.) pulled directly from court archives.
- ⚖️ Allegation vs. Judicial Decree: BCC explicitly separates unverified creditor complaints from confirmed court orders and Final Discharge Decrees, eliminating AI hallucinations and legal ambiguity.

--------------------------------------------------------------------------------
2. REAL-WORLD SCENARIO ENGINE (PAINTING THE PROBLEM & SOLUTION)
--------------------------------------------------------------------------------

### SCENARIO A: THE DISTRESSED REAL ESTATE BUYER
- THE PROBLEM: Landlords leak lease defaults 6-9 months before Chapter 11. Traditional buyers only find out at 363 court auctions when prices spike.
- THE BCC SOLUTION: 
  1. Open the '🔥 DISTRESS HEATMAP' tab.
  2. Filter by State (e.g. TX, FL, NY) and click '🏢 Lease Defaults'.
  3. Identify master landlord lease surrenders 180 days prior to filing.
  4. Open the '363 Auction Comps Sandbox' → Model target bid price → Click 'Generate 1-Click Diligence Brief PDF'.

### SCENARIO B: THE PRIVATE EQUITY SPECIAL SITUATIONS INVESTOR
- THE PROBLEM: Unsure where enterprise value breaks in a complex $600M corporate restructuring.
- THE BCC SOLUTION:
  1. Open target company dossier (e.g., WeWork or Spirit Airlines).
  2. Scroll to '📊 CAPITAL STACK & TOP-20 CREDITOR MATRIX'.
  3. Inspect 1st Lien Senior Debt, 2nd Lien Notes, and the '💥 WHERE VALUE BREAKS' red line.
  4. Switch to '👥 Top Creditors Matrix' to review trade vendor claims and retained legal counsel.

### SCENARIO C: THE RESTRUCTURING ATTORNEY (LEAD GEN)
- THE PROBLEM: Need business development leads before rival law firms swarm a Chapter 11 filing.
- THE BCC SOLUTION:
  1. Filter '🔥 DISTRESS HEATMAP' by '👤 C-Suite Exoduses' & '💳 Bond Refinancing Defaults'.
  2. Identify companies experiencing executive resignations 90-120 days pre-filing.
  3. Export Top-20 Unsecured Creditor Committee list to pitch creditor committee representation.

--------------------------------------------------------------------------------
3. TERMINAL TOOLSET SITEMAP & CHEATSHEET
--------------------------------------------------------------------------------
- 🔥 DISTRESS HEATMAP: 50-State regional early warning radar (WARN layoffs, lease defaults, refinancing defaults).
- 📊 CAPITAL STACK WATERFALL: 1st Lien, 2nd Lien, UCC Claims, and Enterprise Break Line.
- 🏠 363 AUCTION COMPS & DILIGENCE VAULT: 36-month Zillow-style comps + instant PDF diligence brief generator.
- 🔔 SECTOR CUSTOM ALERTS: Instant SMS & Email alerts for CRE, Retail, Tech, Energy, and Healthcare.
- 🔑 SUBSCRIBER & FOUNDER PORTAL: 1-click access to Founder Pass perks (50% OFF 1st Year Annual Pass).

--------------------------------------------------------------------------------
HOW TO INTERACT WITH THE USER:
Ask the user: "What type of deal are you looking for today? (Real Estate, PE Distressed Debt, Legal Representation, or Equipment Liquidation)" and guide them step-by-step through BusinessCollapse.Com!
================================================================================`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(masterPromptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 8, 15, 0.92)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: '#0B0F19',
        border: '1.5px solid #C084FC',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '780px',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 35px rgba(192, 132, 252, 0.3)',
        padding: '24px'
      }}>

        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '14px', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(79, 70, 229, 0.4) 100%)', border: '1px solid #C084FC', padding: '8px', borderRadius: '10px' }}>
              <Bot size={22} color="#C084FC" />
            </div>
            <div>
              <span style={{ fontSize: '0.68rem', fontWeight: 900, background: 'rgba(192, 132, 252, 0.2)', color: '#C084FC', border: '1px solid #C084FC', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                🤖 BYO-AI CONCIERGE & SCENARIO ENGINE
              </span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#F8FAFC', margin: '4px 0 0 0' }}>
                1-Click Master AI Onboarding Prompt Pack
              </h2>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#94A3B8', borderRadius: '8px', padding: '6px', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Description Banner & Copy Button */}
        <div style={{ background: 'rgba(124, 58, 237, 0.12)', border: '1px solid rgba(192, 132, 252, 0.3)', borderRadius: '10px', padding: '16px', marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} color="#C084FC" /> Turn ChatGPT, Claude, or Gemini into your 24/7 Terminal Assistant
            </div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>
              Includes Real-World Scenario Simulations, Data Trust Evidentiary Rules, and Terminal Cheatsheets.
            </div>
          </div>

          <button
            onClick={handleCopyPrompt}
            style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
              color: '#FFF',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 16px rgba(124, 58, 237, 0.4)',
              transition: 'var(--transition-fast)'
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? '✅ Prompt Copied to Clipboard!' : '🤖 Copy Master AI Prompt (1-Click)'}
          </button>
        </div>

        {/* Prompt Preview Code Box */}
        <div style={{ background: 'rgba(9, 13, 22, 0.95)', border: '1px solid var(--border-subtle)', borderRadius: '10px', padding: '18px', fontFamily: 'monospace', fontSize: '0.78rem', color: '#CBD5E1', lineHeight: 1.5, overflowX: 'auto', maxHeight: '420px', whiteSpace: 'pre-wrap' }}>
          {masterPromptText}
        </div>

      </div>
    </div>
  );
}
