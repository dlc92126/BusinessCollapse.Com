import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, X, ShieldCheck, Scale, FileText, Zap, Radio, Bell } from 'lucide-react';

export default function FaqModal({ isOpen, onClose, onOpenOnboarding }) {
  const [openIndex, setOpenIndex] = useState(0); // Open first FAQ by default

  if (!isOpen) return null;

  const faqs = [
    {
      question: "What is BusinessCollapse.Com?",
      icon: <Zap size={18} color="#EF4444" />,
      answer: "BusinessCollapse.Com is an institutional corporate distress intelligence terminal, failure analytics registry, and Section 363 bankruptcy auction wire. We track enterprise insolvencies, federal PACER dockets, store liquidations, and early warning balance sheet signals across 13 major industry sectors."
    },
    {
      question: "How does the 4-Tier Event Color Taxonomy & Stage Badge system work?",
      icon: <Radio size={18} color="#F59E0B" />,
      answer: "Every distress event carries a visual color-coded stage badge: 🟨 Glow Amber = Pre-Judicial Early Warning (WARN Act notices & debt downgrades prior to court filing); 🟥 Crimson Red = Active Chapter 11 Court Docket (formal federal case in progress); 🟩 Emerald Green = Section 363 Liquidation Auction (court-approved asset bidding sessions with webcast PINs); ⬛ Obsidian Slate = Discharged Case (Final decree entered)."
    },
    {
      question: "What if I need to track a mid-market business below the $10M threshold?",
      icon: <Scale size={18} color="#F59E0B" />,
      answer: "While our public feed enforces a minimum $10M threshold to maintain high signal quality, VIP subscribers can request custom surveillance for sub-$10M businesses ($2M-$10M). Click '📜 Standards' at the top of the feed and select '⚡ Request Custom Entity Audit' to deploy targeted AI crawlers."
    },
    {
      question: "When is a corporate bankruptcy event legally considered 'Closed'?",
      icon: <ShieldCheck size={18} color="#10B981" />,
      answer: "Under federal bankruptcy law, operational store shutdowns or flight groundings do NOT close a bankruptcy event. The case remains an ACTIVE judicial proceeding until entry of an official Final Court Decree & Discharge Order by the U.S. Bankruptcy Court."
    },
    {
      question: "Why do Active Court Dockets rank above Discharged Cases?",
      icon: <FileText size={18} color="#3B82F6" />,
      answer: "Active court dockets represent live, time-sensitive commercial opportunities (Section 363 machinery auctions, lease rejections, DIP financing). Therefore, active dockets always rank at the top of all feeds, while discharged cases rest at the bottom as historical archives."
    },
    {
      question: "How do Section 363 liquidation auctions & webcast PINs work?",
      icon: <Bell size={18} color="#EC4899" />,
      answer: "When a Chapter 11 debtor obtains court approval to sell assets, court auction access PINs and webcast log-in credentials are dispatched via SMS/Email to verified subscribers for direct bidding."
    },
    {
      question: "What are the Free Beta Tier allowances and VIP Member unlocks?",
      icon: <ShieldCheck size={18} color="#10B981" />,
      answer: "During our public Beta, free users receive 1 Active SMS/Email Alert Slot, 1 Featured Section 363 Auction PIN unlock per week, 3 Full PACER PDF Downloads per month, 100 REST API requests per month, and un-paywalled Google AI Chronological Briefs. Joining the 100-Member VIP Pass unlocks unlimited 50-state SMS alerts, the complete Section 363 Auction Credential Vault, and real-time enterprise Webhooks."
    },
    {
      question: "How do I access official PACER court petitions & Section 363 dockets?",
      icon: <FileText size={18} color="#8B5CF6" />,
      answer: "Open any company dossier card and click 'Open Docket #001 Petition PDF' or 'Open Emergency Filings' to view native, watermarked PACER court documents directly inside our built-in PDF viewer."
    }
  ];



  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 999999, position: 'fixed', inset: 0, background: 'rgba(5, 8, 14, 0.88)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px', width: '100%', padding: '0', maxHeight: '88vh', overflowY: 'auto', border: '1px solid rgba(245, 158, 11, 0.5)', boxShadow: '0 20px 60px rgba(0,0,0,0.9)' }}>
        
        {/* Header */}
        <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border-subtle)', background: 'linear-gradient(135deg, rgba(30, 20, 10, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <HelpCircle size={20} color="#F59E0B" />
              <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                INSTITUTIONAL HELP & KNOWLEDGE BASE
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF' }}>
              Frequently Asked Questions (FAQ)
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              Everything you need to know about our distress wire, court dockets, threshold rules, and alerts.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'rgba(255, 255, 255, 0.08)', border: 'none', color: '#FFF', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Accordion FAQ Body */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                style={{
                  background: isOpen ? 'rgba(30, 41, 59, 0.7)' : 'rgba(15, 23, 42, 0.5)',
                  border: isOpen ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease'
                }}
              >
                <div
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  style={{
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {faq.icon}
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: isOpen ? '#FFF' : '#E2E8F0' }}>
                      {faq.question}
                    </span>
                  </div>
                  {isOpen ? <ChevronUp size={18} color="#F59E0B" /> : <ChevronDown size={18} color="#94A3B8" />}
                </div>

                {isOpen && (
                  <div style={{ padding: '0 20px 18px 50px', fontSize: '0.88rem', color: '#CBD5E1', lineHeight: 1.6, borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '12px' }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div style={{ padding: '20px 28px', borderTop: '1px solid var(--border-subtle)', background: 'rgba(15, 23, 42, 0.8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            Have a custom institutional inquiry or sector request?
          </span>
          <button
            onClick={() => {
              onClose();
              if (onOpenOnboarding) onOpenOnboarding();
            }}
            className="btn-primary"
            style={{ fontSize: '0.82rem', padding: '8px 18px' }}
          >
            Access VIP Custom Terminal
          </button>
        </div>

      </div>
    </div>
  );
}
