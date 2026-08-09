import React, { useState } from 'react';
import { X, Play, Volume2, ShieldCheck, Cpu, Users, Target, FileText, ChevronRight, Sparkles, ExternalLink, Activity } from 'lucide-react';

export default function AboutModal({ isOpen, onClose, onOpenVoiceAgent }) {
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999, position: 'fixed', inset: 0, background: 'rgba(3, 7, 18, 0.88)', backdropFilter: 'blur(16px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
      
      <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '960px', maxHeight: '90vh', overflowY: 'auto', background: '#0B111E', border: '1px solid var(--border-subtle)', borderRadius: '16px', boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9)' }}>
        
        {/* Modal Header */}
        <div style={{ padding: '24px 30px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15, 23, 42, 0.8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'linear-gradient(135deg, #FF2A4B 0%, #B71C1C 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(255, 42, 75, 0.4)' }}>
              <Cpu size={20} color="#FFF" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFF' }}>About BusinessCollapse.com</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Institutional Autonomous Distress Intelligence & Insolvency Analytics Terminal</p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '6px', borderRadius: '8px' }}>
            <X size={22} />
          </button>
        </div>

        <div style={{ padding: '30px' }}>
          
          {/* Featured Video Showcase Section */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FF2A4B', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} color="#FF2A4B" /> Official Platform Video Overview
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>Duration: 2m 45s • 4K Video Presentation</span>
            </div>

            <div 
              style={{ 
                position: 'relative', 
                borderRadius: '14px', 
                overflow: 'hidden', 
                border: '1px solid rgba(255, 42, 75, 0.35)', 
                boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
                aspectRatio: '16/9',
                background: '#000'
              }}
            >
              {!isPlayingVideo ? (
                <div style={{ width: '100%', height: '100%', position: 'relative', cursor: 'pointer' }} onClick={() => setIsPlayingVideo(true)}>
                  <img 
                    src="/ai_spokesperson_video.jpg" 
                    alt="AI Spokesperson Video Overview" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(3,7,18,0.85) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'spaceBetween', padding: '24px' }}>
                    <div style={{ alignSelf: 'flex-start', background: 'rgba(255, 42, 75, 0.9)', color: '#FFF', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      ▶️ Watch Video Briefing
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto' }}>
                      <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF2A4B 0%, #B71C1C 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(255, 42, 75, 0.8)', border: '2px solid rgba(255,255,255,0.4)', transform: 'scale(1)', transition: 'transform 0.2s' }}>
                        <Play size={32} color="#FFF" style={{ marginLeft: '4px' }} />
                      </div>
                    </div>

                    <div>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FFF', marginBottom: '4px' }}>
                        "What It Is, How It Works & Who It's For"
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: '#E2E8F0' }}>
                        Presented by Senior Financial Distress Analyst Victoria Sterling — Overview of BusinessCollapse.com
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ width: '100%', height: '100%', background: '#070A0F', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: '#FF2A4B', fontWeight: 800 }}>LIVE DEMO VIDEO STREAMING</span>
                    <button onClick={() => setIsPlayingVideo(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#FFF', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem' }}>Exit Video</button>
                  </div>

                  <div style={{ margin: 'auto', textAlign: 'center', maxWidth: '600px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '16px' }}>
                      <div style={{ width: '4px', height: '24px', background: '#FF2A4B', animation: 'pulse 1s infinite' }}></div>
                      <div style={{ width: '4px', height: '36px', background: '#FF2A4B', animation: 'pulse 1.2s infinite' }}></div>
                      <div style={{ width: '4px', height: '20px', background: '#FF2A4B', animation: 'pulse 0.8s infinite' }}></div>
                      <div style={{ width: '4px', height: '40px', background: '#FF2A4B', animation: 'pulse 1.4s infinite' }}></div>
                    </div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF', marginBottom: '8px' }}>
                      🎙️ Audio-Visual Briefing Active
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      "Welcome to BusinessCollapse.com — the world's premier real-time corporate distress, failure post-mortem, and bankruptcy court auction intelligence terminal..."
                    </p>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    <span>0:45 / 2:45</span>
                    <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', margin: '0 16px', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: '30%', height: '100%', background: '#FF2A4B' }}></div>
                    </div>
                    <Volume2 size={14} color="#FFF" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Written Platform Description & Mission */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            
            <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={18} color="#FF2A4B" /> What It Is
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                BusinessCollapse.com is an institutional corporate distress terminal. We track, analyze, and chronicle multi-billion dollar corporate bankruptcies, legacy retail insolvencies, commercial real estate defaults, and court-ordered liquidations in real-time.
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Cpu size={18} color="#C084FC" /> How It Works
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Our autonomous AI agent crawlers continuously monitor federal PACER court dockets, SEC EDGAR 8-K filings, state UCC tax lien registries, and auctioneer schedules—extracting failure root causes, debt figures, and asset auction log-in credentials.
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} color="#10B981" /> Who It's For
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Designed specifically for **Equipment Liquidators & Resellers**, **Restructuring Attorneys**, **Short Sellers & Arbitrage Traders**, **Commercial Landlords**, **Credit Risk Officers**, and **Distress Investors**.
              </p>
            </div>
          </div>

          {/* AI Voice Agent Deliverable Banner */}
          <div style={{ background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(192, 132, 252, 0.4)', borderRadius: '12px', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Sparkles size={16} color="#C084FC" />
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#C084FC', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  NEW DELIVERABLE FEATURE
                </span>
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>
                Autonomous AI Voice Agent Telephony & Briefing Dispatcher
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '560px' }}>
                Listen to real-time audio voice briefings or configure automated phone call dispatch alerts when emergency Chapter 11 petitions hit federal dockets.
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                if (onOpenVoiceAgent) onOpenVoiceAgent();
              }}
              style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)', color: '#FFF', border: '1px solid rgba(192, 132, 252, 0.5)', padding: '10px 18px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              🎙️ Launch AI Voice Agent Studio <ChevronRight size={16} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
