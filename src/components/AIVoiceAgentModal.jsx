import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, Volume2, Play, Pause, Radio, Sparkles, CheckCircle2, Cpu, HelpCircle, ArrowRight, Video, Tv, Terminal, FileText, Send, User, Bot, MessageSquare, Zap, Activity } from 'lucide-react';

export default function AIVoiceAgentModal({ isOpen, onClose, onOpenWatchlist, onOpenCustomRequest, onOpenAdmissionCriteria, companies }) {
  const [selectedVoice, setSelectedVoice] = useState('victoria');
  const [activeQuestion, setActiveQuestion] = useState('what_is_site');
  const [customQuestion, setCustomQuestion] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTabMode, setActiveTabMode] = useState('agentic_chat'); // 'agentic_chat' | 'qa_concierge' | 'avatar_lab'
  const [availableVoices, setAvailableVoices] = useState([]);

  // Conversational Voice Chat State
  const [isMicActive, setIsMicActive] = useState(false);
  const [userInputMessage, setUserInputMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'agent',
      text: "Hello! I am your Autonomous Financial Distress Conversational Agent. I can answer questions about corporate bankruptcies, PACER court dockets, distress scores, or site navigation out loud in natural conversation. What would you like to explore?",
      timestamp: '12:34 PM'
    }
  ]);

  const synthRef = useRef(null);

  const siteQAData = {
    what_is_site: {
      question: "What is BusinessCollapse.com and how does it work?",
      answer: "BusinessCollapse.com is an institutional distress intelligence and insolvency analytics terminal. Our AI crawlers monitor federal court PACER dockets, SEC 8-K filings, state tax liens, and liquidation auctions in real time to generate deep corporate failure post-mortems and early warning distress scores.",
      shortcutText: "Explore Corporate Graveyard",
      shortcutTab: "graveyard"
    },
    how_to_watchlist: {
      question: "How do I add companies to my personal Watchlist?",
      answer: "To track distressed companies, click the gold star icon on any corporate post-mortem card or row in the Corporate Graveyard. Your bookmarked companies will immediately sync to your dedicated Watchlist tab, accessible anytime from the top navigation bar.",
      shortcutText: "Open Watchlist Tab",
      shortcutTab: "watchlist"
    },
    how_auctions_work: {
      question: "Where can I find PACER court auction PINs and equipment lists?",
      answer: "Navigate to the Auctions tab in the main navigation. You will find live liquidation schedules, Section 363 sale dockets, physical equipment inventories, webcast login links, and direct bidder access PINs for upcoming court-ordered asset sales.",
      shortcutText: "Open Auctions Directory",
      shortcutTab: "auctions"
    },
    distress_score: {
      question: "How is the Distress Risk Score (0-100) calculated?",
      answer: "Our proprietary Distress Score combines four weighted failure vectors: Debt Overload (leverage & lease obligations), Management Execution, Macro Industry Shifts, and Tech Disruption. Scores above 85 indicate imminent Chapter 11 filing or liquidation risk.",
      shortcutText: "View Admission Criteria",
      shortcutAction: "criteria"
    },
    custom_tracker: {
      question: "How do I request a custom entity tracker for a specific company?",
      answer: "If a company is not yet in our master database, click the Custom Request button in the top navigation bar. Enter the company name, ticker, and state jurisdiction. Our AI agent crawlers will deploy within 15 minutes to index court filings and debt records.",
      shortcutText: "Request Custom Tracker",
      shortcutAction: "custom_request"
    },
    tier_upgrades: {
      question: "How do tier level upgrades, passes, and BYO API Keys work?",
      answer: "BusinessCollapse.Com offers specialized Passes: Media Wire Pass ($149/mo), Headhunter Pass ($299/mo), Sales Conquest ($499/mo), and Institutional ($999/mo). All paid tiers unlock 100% UNLIMITED Bring Your Own AI (BYOAI) Key access for OpenAI, Claude, and Gemini.",
      shortcutText: "Upgrade Tier Pass",
      shortcutAction: "onboarding"
    },
    billing_support: {
      question: "How do I change my billing email, invoice receipts, or API keys?",
      answer: "You can update your billing subscription, download past invoice receipts, or configure your local BYO API Keys anytime by opening User Account Settings or the AI Newsroom BYO Key settings drawer.",
      shortcutText: "Open Account Settings",
      shortcutAction: "settings"
    }
  };

  const voiceProfiles = {
    victoria: {
      name: "Victoria Sterling",
      role: "Lead Conversational Agent",
      tone: "Warm, natural, highly articulate conversational voice",
      gender: "female",
      pitch: 1.05,
      rate: 1.0
    },
    marcus: {
      name: "Marcus Vance",
      role: "Arbitrage & Liquidation Specialist",
      tone: "Fast-paced, direct, pragmatic trader voice",
      gender: "male",
      pitch: 0.9,
      rate: 1.05
    },
    elena: {
      name: "Elena Rostova",
      role: "Court Docket Specialist",
      tone: "Formal, authoritative, legal analyst voice",
      gender: "female",
      pitch: 0.95,
      rate: 0.95
    }
  };

  // Load browser speech synthesis voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      
      const loadVoices = () => {
        const voices = synthRef.current.getVoices();
        setAvailableVoices(voices);
      };

      loadVoices();
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  // Stop speech when modal closes
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const activeQA = siteQAData[activeQuestion] || {
    question: customQuestion || "Custom Platform Question",
    answer: customQuestion 
      ? `Thank you for asking about "${customQuestion}". BusinessCollapse.com provides real-time insolvency tracking, failure post-mortems, and PACER court auction data. You can explore all tracked companies in the Graveyard tab.`
      : "Welcome to BusinessCollapse.com. You can ask any question about navigation, distress scores, PACER court dockets, or auction PINs.",
    shortcutText: "Return to Graveyard",
    shortcutTab: "graveyard"
  };

  // Helper to play synthesized audio beep/chime
  const playAudioBeep = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // AudioContext fallback ignored
    }
  };

  // Core Speech Synthesis Trigger
  const handleSpeak = (textToSpeak) => {
    if (!synthRef.current) return;

    synthRef.current.cancel(); // Stop any previous speech
    playAudioBeep();

    const text = textToSpeak || activeQA.answer;
    const utterance = new SpeechSynthesisUtterance(text);
    const profile = voiceProfiles[selectedVoice];

    utterance.pitch = profile.pitch;
    utterance.rate = profile.rate;

    if (availableVoices && availableVoices.length > 0) {
      let matchedVoice = availableVoices.find(v => 
        v.lang.startsWith('en') && 
        ((profile.gender === 'female' && (v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Samantha') || v.name.includes('Victoria') || v.name.includes('Karen') || v.name.includes('Google US English'))) ||
         (profile.gender === 'male' && (v.name.includes('Male') || v.name.includes('David') || v.name.includes('Alex') || v.name.includes('Mark') || v.name.includes('George'))))
      );

      if (!matchedVoice) {
        matchedVoice = availableVoices.find(v => v.lang.startsWith('en'));
      }

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    synthRef.current.speak(utterance);
  };

  // Handle User Conversational Message Submission
  const handleSendChatMessage = (inputMsg) => {
    const text = inputMsg || userInputMessage;
    if (!text || !text.trim()) return;

    const userMsgObj = {
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsgObj]);
    setUserInputMessage('');

    // Generate Conversational AI Agent Response based on database matching or general Q&A
    setTimeout(() => {
      const q = text.toLowerCase();
      let responseText = "";

      if (q.includes('wework') || q.includes('we')) {
        responseText = "WeWork filed for Chapter 11 bankruptcy after accumulating $18.6 Billion in long-term lease liabilities against $47 Billion in peak valuation. They rejected over 60 commercial real estate leases in Delaware court.";
      } else if (q.includes('spirit') || q.includes('save') || q.includes('airline')) {
        responseText = "Spirit Airlines filed an emergency motion to reject 28 Airbus aircraft leases amid mounting debt and failed JetBlue merger attempts. Court hearings are ongoing.";
      } else if (q.includes('tupperware') || q.includes('tupq')) {
        responseText = "Tupperware Brands filed for Chapter 11 with $812 Million in liabilities. Section 363 stalking-horse bidding is established at $45 Million.";
      } else if (q.includes('watchlist') || q.includes('star')) {
        responseText = "You can add any company to your Watchlist by clicking the gold star icon on its card or row. Access your saved entities anytime in the Watchlist tab.";
      } else if (q.includes('auction') || q.includes('pacer') || q.includes('equipment')) {
        responseText = "All court-ordered liquidation auctions and Section 363 sale PINs are published under the Auctions tab, including physical equipment inventories and webcast links.";
      } else if (q.includes('distress score') || q.includes('risk score') || q.includes('score')) {
        responseText = "Distress scores range from 0 to 100 based on debt overload, mismanagement, macro shifts, and tech disruption. Scores above 85 signal imminent filing risk.";
      } else {
        responseText = `I have analyzed your query regarding "${text}". BusinessCollapse.com indexes real-time PACER bankruptcy filings, corporate collapse post-mortems, and liquidation auctions. Let me know if you would like me to pull up specific company records!`;
      }

      const agentMsgObj = {
        sender: 'agent',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, agentMsgObj]);
      handleSpeak(responseText);
    }, 600);
  };

  // Simulated Mic Voice Input
  const toggleMicListening = () => {
    if (isMicActive) {
      setIsMicActive(false);
    } else {
      setIsMicActive(true);
      playAudioBeep();
      setTimeout(() => {
        setIsMicActive(false);
        handleSendChatMessage("What are the top corporate bankruptcies currently tracked?");
      }, 3500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999, position: 'fixed', inset: 0, background: 'rgba(3, 7, 18, 0.88)', backdropFilter: 'blur(16px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
      
      <div className="glass-panel" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '980px', maxHeight: '90vh', overflowY: 'auto', background: '#0B111E', border: '1px solid rgba(124, 58, 237, 0.4)', borderRadius: '16px', boxShadow: '0 25px 60px -15px rgba(124, 58, 237, 0.3)' }}>
        
        {/* Header Bar */}
        <div style={{ padding: '24px 30px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(90deg, rgba(124, 58, 237, 0.2) 0%, rgba(15, 23, 42, 0.9) 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)' }}>
              <Mic size={22} color="#FFF" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FFF' }}>Conversational AI Voice Studio</h2>
                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#000', background: '#10B981', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  BI-DIRECTIONAL VOICE & CHAT
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hold natural voice conversations with your autonomous distress intelligence assistant</p>
            </div>
          </div>

          <button onClick={() => { if (synthRef.current) synthRef.current.cancel(); onClose(); }} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '6px', borderRadius: '8px' }}>
            <X size={22} />
          </button>
        </div>

        {/* Studio Sub-Navigation Mode Switcher */}
        <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.8)', padding: '6px 30px', borderBottom: '1px solid var(--border-subtle)', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTabMode('agentic_chat')}
            style={{
              background: activeTabMode === 'agentic_chat' ? 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)' : 'transparent',
              color: activeTabMode === 'agentic_chat' ? '#FFF' : 'var(--text-muted)',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            💬 Conversational Voice Agent (Bi-Directional)
          </button>

          <button
            onClick={() => setActiveTabMode('qa_concierge')}
            style={{
              background: activeTabMode === 'qa_concierge' ? 'rgba(255,255,255,0.08)' : 'transparent',
              color: activeTabMode === 'qa_concierge' ? '#FFF' : 'var(--text-muted)',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            🎙️ Q&A Voice Concierge
          </button>

          <button
            onClick={() => setActiveTabMode('avatar_lab')}
            style={{
              background: activeTabMode === 'avatar_lab' ? 'linear-gradient(135deg, #EC4899 0%, #BE185D 100%)' : 'transparent',
              color: activeTabMode === 'avatar_lab' ? '#FFF' : 'var(--text-muted)',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            🚀 Spin-Off Lab: Custom Avatar Readers
          </button>
        </div>

        <div style={{ padding: '30px' }}>
          
          {activeTabMode === 'agentic_chat' ? (
            /* Bi-Directional Conversational Voice Agent Environment */
            <div>
              {/* Top Controls: Voice Persona & Latency Status */}
              <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '14px 20px', borderRadius: '12px', border: '1px solid var(--border-subtle)', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#C084FC', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Agent Voice Persona:
                  </span>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    {Object.entries(voiceProfiles).map(([id, p]) => (
                      <button
                        key={id}
                        onClick={() => setSelectedVoice(id)}
                        style={{
                          background: selectedVoice === id ? '#7C3AED' : 'rgba(255,255,255,0.06)',
                          color: selectedVoice === id ? '#FFF' : 'var(--text-dim)',
                          border: 'none',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                      >
                        {p.name.split(' ')[0]} ({p.gender})
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>
                  <Zap size={14} color="#10B981" />
                  <span>Realtime Voice Stream Active • Sub-300ms Latency</span>
                </div>
              </div>

              {/* Conversational Speech/Chat Log Window */}
              <div style={{ background: '#070A0F', border: '1px solid rgba(124, 58, 237, 0.3)', borderRadius: '14px', padding: '20px', minHeight: '280px', maxHeight: '380px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                      alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%'
                    }}
                  >
                    {msg.sender === 'agent' && (
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Bot size={18} color="#FFF" />
                      </div>
                    )}

                    <div
                      style={{
                        background: msg.sender === 'user' ? 'rgba(124, 58, 237, 0.3)' : 'rgba(15, 23, 42, 0.85)',
                        border: msg.sender === 'user' ? '1px solid #C084FC' : '1px solid var(--border-subtle)',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        color: '#FFF',
                        fontSize: '0.88rem',
                        lineHeight: 1.5
                      }}
                    >
                      <div style={{ fontSize: '0.7rem', color: msg.sender === 'user' ? '#C084FC' : 'var(--text-dim)', fontWeight: 700, marginBottom: '4px', display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                        <span>{msg.sender === 'user' ? 'YOU (Voice / Text)' : `${voiceProfiles[selectedVoice].name} (AI Agent)`}</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p>{msg.text}</p>
                    </div>

                    {msg.sender === 'user' && (
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <User size={18} color="#FFF" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Interactive Input Bar: Mic Push-to-Talk + Text Chat */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button
                  onClick={toggleMicListening}
                  style={{
                    background: isMicActive ? 'linear-gradient(135deg, #EF4444 0%, #991B1B 100%)' : 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)',
                    color: '#FFF',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: isMicActive ? '0 0 20px rgba(239, 68, 68, 0.8)' : '0 0 15px rgba(124, 58, 237, 0.4)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Mic size={18} className={isMicActive ? 'animate-pulse' : ''} />
                  {isMicActive ? "🎙️ Listening... (Speak Now)" : "Push-to-Talk Mic"}
                </button>

                <input
                  type="text"
                  placeholder="Or type a question for natural voice response (e.g. 'Why did WeWork fail?')..."
                  value={userInputMessage}
                  onChange={(e) => setUserInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendChatMessage();
                  }}
                  style={{ flex: 1, padding: '12px 16px', background: '#070A0F', border: '1px solid var(--border-subtle)', borderRadius: '10px', color: '#FFF', fontSize: '0.88rem', outline: 'none' }}
                />

                <button
                  onClick={() => handleSendChatMessage()}
                  style={{ background: 'rgba(255,255,255,0.1)', color: '#FFF', border: '1px solid var(--border-subtle)', padding: '12px 18px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Send size={16} /> Send
                </button>
              </div>

              {/* Preset Sample Prompts */}
              <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 700 }}>Try asking out loud:</span>
                {[
                  "Why did WeWork collapse?",
                  "What is Spirit Airlines' filing status?",
                  "How do PACER auction PINs work?",
                  "Explain Tupperware's Chapter 11 debt"
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendChatMessage(prompt)}
                    style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#C084FC', border: '1px solid rgba(192, 132, 252, 0.3)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          ) : activeTabMode === 'qa_concierge' ? (
            /* Q&A Concierge View */
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '24px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <HelpCircle size={16} color="#C084FC" /> Select a question to hear voice answer:
                  </label>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {Object.entries(siteQAData).map(([key, item]) => (
                      <div
                        key={key}
                        onClick={() => {
                          setActiveQuestion(key);
                          setTimeout(() => handleSpeak(item.answer), 50);
                        }}
                        style={{
                          padding: '12px 14px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          background: activeQuestion === key ? 'rgba(124, 58, 237, 0.25)' : 'rgba(15, 23, 42, 0.7)',
                          border: activeQuestion === key ? '1px solid #C084FC' : '1px solid var(--border-subtle)',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justify: 'space-between'
                        }}
                      >
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: activeQuestion === key ? '#FFF' : 'var(--text-main)' }}>
                          ❓ {item.question}
                        </div>
                        <Volume2 size={16} color={activeQuestion === key ? '#C084FC' : 'var(--text-dim)'} />
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.85)', borderRadius: '14px', border: '1px solid rgba(124, 58, 237, 0.4)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ background: '#070A0F', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '16px' }}>
                      <div style={{ fontSize: '0.7rem', color: '#C084FC', fontWeight: 800, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Volume2 size={14} /> {voiceProfiles[selectedVoice].name}:
                      </div>
                      <p style={{ fontSize: '0.88rem', color: '#FFF', lineHeight: 1.6 }}>
                        "{activeQA.answer}"
                      </p>
                    </div>

                    <button
                      onClick={() => handleSpeak()}
                      style={{ width: '100%', background: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)', color: '#FFF', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                      <Volume2 size={16} /> 🔊 Play Voice Answer Out Loud
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Spin-Off Avatar Lab View */
            <div>
              <div style={{ background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(15, 23, 42, 0.95) 100%)', border: '1px solid rgba(236, 72, 153, 0.4)', borderRadius: '14px', padding: '24px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <Sparkles size={20} color="#EC4899" />
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#FFF' }}>
                    Spin-Off Project: Customized Avatar News Readers & News Runners
                  </h3>
                </div>
                <p style={{ fontSize: '0.88rem', color: '#E2E8F0', lineHeight: 1.6, maxWidth: '780px' }}>
                  Based on your new project vision, this laboratory module will serve as the foundation for building **custom photorealistic AI avatars** presenting user-created news runners, custom ticker feeds, and bespoke broadcast sets!
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#EC4899', fontWeight: 800, marginBottom: '8px', fontSize: '1rem' }}>
                    <Video size={18} /> 1. Custom Avatar Presenters
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    Select or design 3D photorealistic news anchor avatars with customized wardrobe, voice tones, speech gestures, and studio background sets.
                  </p>
                </div>

                <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C084FC', fontWeight: 800, marginBottom: '8px', fontSize: '1rem' }}>
                    <Tv size={18} /> 2. Bespoke News Runners
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    Construct custom news tickers with user-defined scroll speeds, breaking news alert triggers, RSS feed integrations, and brand styling.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
