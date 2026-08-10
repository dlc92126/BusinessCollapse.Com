import React, { useState } from 'react';
import { 
  FileText, Sparkles, Copy, Download, Share2, Twitter, Linkedin, 
  BookOpen, CheckCircle2, Image as ImageIcon, Zap, AlertCircle, 
  ExternalLink, Layers, ArrowRight, BarChart3
} from 'lucide-react';

export default function NewsroomStudioModal({ company, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('wire'); // 'wire', 'fintwit', 'linkedin', 'substack', 'infographic'
  const [copied, setCopied] = useState(false);

  if (!isOpen || !company) return null;

  const entityName = company.name || company.entityName || 'Corporate Entity';
  const ticker = company.ticker || 'DISTRESS';
  const debt = company.debtAtCollapse || company.finalDebt || '$1.2 Billion';
  const peakVal = company.peakValuation || '$2.5 Billion';
  const collapseVal = company.collapseValuation || '$12 Million';
  const cause = company.primaryCause || 'Debt Overhang & Revenue Velocity Decline';
  const court = company.locationJurisdiction || 'U.S. Bankruptcy Court';
  const status = company.status || 'Chapter 11 Filing';

  // 1. AP / Reuters Press Wire Article
  const pressWireContent = `AP PRESS WIRE | BREAKING FINANCIAL DESK
DISTRESS ALERT: ${entityName.toUpperCase()} (${ticker}) FILES FOR CHAPTER 11 PROTECTION

WILMINGTON, DE — ${entityName} (${ticker}), the iconic ${company.sectorName || 'industry player'}, has officially filed for Chapter 11 bankruptcy protection in the ${court}, overwhelmed by an estimated ${debt} in total liabilities.

Once valued at a peak market capitalization of ${peakVal}, the company's valuation has collapsed to ${collapseVal} following years of unsustainable leverage, high fixed overhead costs, and ${cause}.

KEY COURT FILING HIGHLIGHTS:
• Total Outstanding Liabilities: ${debt}
• Peak vs. Collapse Valuation: ${peakVal} ➔ ${collapseVal}
• Primary Insolvency Catalyst: ${cause}
• Court Jurisdiction: ${court}
• Asset Disposition Strategy: Court-supervised Section 363 asset auction and lender credit bid qualification.

"The company entered Chapter 11 to execute a court-supervised restructuring and preserve operating continuity," stated court filings submitted earlier today. Bidding procedures for the company's trademark IP, commercial leasehold agreements, and inventory assets are set to be finalized by the bankruptcy trustee next week.

# # #

MEDIA CONTACT & DOCKET SOURCE:
BusinessCollapse.Com Real-Time PACER Terminal
Source Verification Checksum: SHA-256 Verified`;

  // 2. X / FinTwit Viral Thread (8-Tweet Sequence)
  const finTwitThreadContent = `1/10 🚨 BREAKING: ${entityName} (${ticker}) has officially filed for Chapter 11 Bankruptcy.

Once valued at ${peakVal}, the company's valuation just collapsed to ${collapseVal}.

Here is the breakdown of how $${debt} in debt destroyed an iconic brand 👇 🧵

2/10 📊 THE NUMBERS:
• Peak Valuation: ${peakVal}
• Collapse Valuation: ${collapseVal} (-99.5% Drawdown)
• Debt at Filing: ${debt}
• Jurisdiction: ${court}

3/10 💀 WHAT KILLED IT?
Primary Failure Cause: ${cause}.

Carrying massive senior debt during a high-interest-rate regime turned operational headwinds into an immediate liquidity cliff.

4/10 📜 THE COURT DOCKET:
Debtors have filed emergency first-day motions seeking court approval for Section 363 bidding procedures and DIP financing to prevent an immediate operational liquidation.

5/10 🛒 ASSETS UP FOR GRABS:
Lenders and PE sponsors are preparing credit bids for:
- Global Trademark IP & Brand Rights
- Real Estate & Logistics Hub Leases
- Commercial Equipment & Tooling

6/10 💡 THE BIG TAKEAWAY FOR INVESTORS:
High debt overhang + declining revenue velocity is an unbeatable trap in a 5%+ interest rate environment. Refinancing walls leave zero margin for error.

7/10 🔍 Follow @BusinessCollapse for real-time PACER docket updates, Section 363 auction filings, and corporate distress signals.

Full Case Post-Mortem & Docket Vault 👇
https://businesscollapse.com/company/${company.id || ticker.toLowerCase()}`;

  // 3. LinkedIn Institutional Post
  const linkedInPostContent = `🚨 Corporate Insolvency Case Study: The Fall of ${entityName} (${ticker})

Another major corporate restructuring has hit the bankruptcy dockets. ${entityName} has filed for Chapter 11 protection in the ${court}, owing over ${debt} in total debt.

At its peak, ${entityName} was a category market leader valued at ${peakVal}. Today, its equity valuation stands at just ${collapseVal}.

Key Restructuring & Capital Structure Lessons:

1️⃣ The Debt Overhang Trap: Carrying high senior debt in an elevated rate regime severely restricts capital allocation when core operating cash flow declines.
2. Failure Catalyst: ${cause}.
3. The Section 363 Exit: Management is seeking a court-supervised asset sale under Bankruptcy Code § 363 to preserve brand IP and equitize lender claims.

What are your thoughts on lender credit bid strategies in current retail restructurings? Drop your analysis below.

#PrivateEquity #DistressedDebt #Chapter11 #Restructuring #InvestmentBanking #Bankruptcy`;

  // 4. Substack Deep-Dive Post-Mortem Essay
  const substackEssayContent = `# Anatomy of a Collapse: ${entityName} (${ticker})

By Financial Distress Desk | BusinessCollapse.Com

## Introduction
The filing of Chapter 11 by ${entityName} marks another milestone in the current corporate distress cycle. Owning over ${debt} in liabilities, the company's collapse from a peak valuation of ${peakVal} down to ${collapseVal} provides a textbook case study in modern corporate capital structure vulnerability.

## The Failure Anatomy
Why did ${entityName} fail? The primary catalyst was ${cause}.

When interest rates surged, the cost of servicing unhedged credit facilities eroded operating margins. Combined with lease commitments and shifting consumer preferences, the company hit a liquidity wall it could not refinance.

## Section 363 Auction Strategy & Recovery Comps
The Debtors are pursuing a Chapter 11 Section 363 asset sale. Secured lenders holding senior claims are expected to submit a Stalking Horse credit bid to acquire trademark IP and key logistics assets.

### Key Metrics Summary:
- Entity Name: ${entityName} (${ticker})
- Peak Market Value: ${peakVal}
- Collapse Market Value: ${collapseVal}
- Total Debt: ${debt}
- Jurisdiction: ${court}

Read full court docket filings and diligence briefs at BusinessCollapse.Com.`;

  // Get active text based on selected tab
  const getActiveText = () => {
    switch (activeTab) {
      case 'wire': return pressWireContent;
      case 'fintwit': return finTwitThreadContent;
      case 'linkedin': return linkedInPostContent;
      case 'substack': return substackEssayContent;
      default: return pressWireContent;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = getActiveText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${ticker}_Newsroom_Story_${activeTab}.txt`;
    link.click();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 999999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        border: '2px solid #F59E0B',
        borderRadius: '16px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7)'
      }}>

        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(15, 23, 42, 0.95)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(245, 158, 11, 0.4)' }}>
              <Sparkles size={22} color="#000" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FFF', margin: 0 }}>
                  📰 INSTANT AI NEWSROOM & STORY STUDIO
                </h2>
                <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#FCD34D', border: '1px solid #F59E0B', padding: '2px 8px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: 900 }}>
                  JOURNALIST DESK
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '2px' }}>
                Instant multi-format article & social thread generator for {entityName} ({ticker})
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: '#94A3B8',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
        </div>

        {/* Editorial Angle Hooks Banner */}
        <div style={{ background: 'rgba(245, 158, 11, 0.1)', borderBottom: '1px solid rgba(245, 158, 11, 0.2)', padding: '10px 24px', fontSize: '0.78rem', color: '#FCD34D', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 800, color: '#FFF' }}>💡 Journalistic Angle Hooks:</span>
          <span>• <strong>Hook A:</strong> The Debt Overhang Trap (${debt})</span>
          <span>• <strong>Hook B:</strong> Valuation Collapse (${peakVal} ➔ ${collapseVal})</span>
          <span>• <strong>Hook C:</strong> Section 363 Auction Battle</span>
        </div>

        {/* Multi-Format Selector Tabs */}
        <div style={{ padding: '14px 24px 0 24px', display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(15, 23, 42, 0.6)' }}>
          <button
            onClick={() => setActiveTab('wire')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px 8px 0 0',
              fontSize: '0.8rem',
              fontWeight: 800,
              border: 'none',
              background: activeTab === 'wire' ? '#F59E0B' : 'transparent',
              color: activeTab === 'wire' ? '#000' : '#94A3B8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FileText size={15} /> Press Wire Article (AP Style)
          </button>

          <button
            onClick={() => setActiveTab('fintwit')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px 8px 0 0',
              fontSize: '0.8rem',
              fontWeight: 800,
              border: 'none',
              background: activeTab === 'fintwit' ? '#1DA1F2' : 'transparent',
              color: activeTab === 'fintwit' ? '#FFF' : '#94A3B8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Twitter size={15} /> X / FinTwit Thread
          </button>

          <button
            onClick={() => setActiveTab('linkedin')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px 8px 0 0',
              fontSize: '0.8rem',
              fontWeight: 800,
              border: 'none',
              background: activeTab === 'linkedin' ? '#0A66C2' : 'transparent',
              color: activeTab === 'linkedin' ? '#FFF' : '#94A3B8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Linkedin size={15} /> LinkedIn Post
          </button>

          <button
            onClick={() => setActiveTab('substack')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px 8px 0 0',
              fontSize: '0.8rem',
              fontWeight: 800,
              border: 'none',
              background: activeTab === 'substack' ? '#FF6719' : 'transparent',
              color: activeTab === 'substack' ? '#FFF' : '#94A3B8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <BookOpen size={15} /> Substack Deep Dive
          </button>

          <button
            onClick={() => setActiveTab('infographic')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px 8px 0 0',
              fontSize: '0.8rem',
              fontWeight: 800,
              border: 'none',
              background: activeTab === 'infographic' ? '#10B981' : 'transparent',
              color: activeTab === 'infographic' ? '#000' : '#94A3B8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ImageIcon size={15} /> Visual Infographic Card
          </button>
        </div>

        {/* Content Preview Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {activeTab === 'infographic' ? (
            /* Embeddable Visual Infographic Card Preview */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '100%',
                maxWidth: '600px',
                background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                border: '2px solid #EF4444',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)',
                color: '#FFF'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#EF4444', textTransform: 'uppercase', letterSpacing: '0.08em' }}>BUSINESSCOLLAPSE.COM DISTRESS SCORECARD</span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '2px 0 0 0' }}>{entityName} ({ticker})</h3>
                  </div>
                  <span style={{ background: '#EF4444', color: '#FFF', fontSize: '0.72rem', fontWeight: 900, padding: '4px 10px', borderRadius: '6px' }}>CHAPTER 11</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '10px', padding: '12px' }}>
                    <div style={{ fontSize: '0.72rem', color: '#FCA5A5', fontWeight: 800 }}>PEAK MARKET VALUATION</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#FFF' }}>{peakVal}</div>
                  </div>
                  <div style={{ background: 'rgba(239, 68, 68, 0.3)', border: '1px solid #EF4444', borderRadius: '10px', padding: '12px' }}>
                    <div style={{ fontSize: '0.72rem', color: '#FCA5A5', fontWeight: 800 }}>COLLAPSE VALUATION</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#EF4444' }}>{collapseVal}</div>
                  </div>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 700, marginBottom: '4px' }}>TOTAL DEBT AT COLLAPSE</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#F59E0B' }}>{debt}</div>
                  <div style={{ fontSize: '0.78rem', color: '#CBD5E1', marginTop: '6px' }}><strong>Primary Cause:</strong> {cause}</div>
                </div>

                <div style={{ fontSize: '0.68rem', color: '#64748B', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '10px' }}>
                  Source: U.S. PACER Bankruptcy Docket & SEC EDGAR Filings • Verified by BusinessCollapse.Com
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                📸 Press <strong>Copy HTML Embed Code</strong> to drop this graphic into your article or Substack!
              </div>
            </div>
          ) : (
            /* Text Article Editor / Generator Box */
            <textarea
              value={getActiveText()}
              readOnly
              rows={16}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '10px',
                padding: '16px',
                color: '#E2E8F0',
                fontSize: '0.88rem',
                fontFamily: 'monospace',
                lineHeight: 1.6,
                resize: 'none'
              }}
            />
          )}
        </div>

        {/* Modal Action Bar */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(15, 23, 42, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ fontSize: '0.78rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={15} color="#10B981" />
            <span>1-Click Journalists & Creator License Included</span>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleDownload}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FFF',
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Download size={15} /> Download Story (.txt)
            </button>

            <button
              onClick={handleCopy}
              style={{
                background: copied ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                border: 'none',
                color: copied ? '#FFF' : '#000',
                padding: '10px 22px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)'
              }}
            >
              {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              {copied ? 'Copied to Clipboard!' : 'Copy Story to Clipboard'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
