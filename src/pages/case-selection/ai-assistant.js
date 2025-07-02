import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from 'react';
import { useRouter } from "next/router";
import styles from '../../styles/Home.module.css';
import Navigation from '../../components/Navigation';

export default function AICaseSelectionAssistant() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/signin?callbackUrl=${encodeURIComponent(router.asPath)}`);
    }
  }, [status, router]);

  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your Case Selection AI. Ask me anything about debate cases, argumentation, or strategy!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const chatEndRef = useRef(null);
  const chatMessagesRef = useRef(null);

  // Only scroll the chatMessages area, not the whole page
  useEffect(() => {
    if (chatEndRef.current && chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setError('');
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data.response) {
        setMessages([...newMessages, { role: 'assistant', content: data.response.content }]);
      } else {
        setError('Sorry, something went wrong.');
      }
    } catch (err) {
      setError('Sorry, something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Navigation />
      <div className={styles.chatPageContainer}>
        <div className={styles.chatHeader}>
          <h2 className={styles.chatTitle}>Case Selection Chat Bot</h2>
          <button 
            onClick={() => setShowHelpModal(true)}
            className={styles.helpButton}
            title="How to use the AI bot"
          >
            <span>❓</span>
          </button>
        </div>
        
        <div className={styles.chatMessagesContainer} ref={chatMessagesRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={styles.messageWrapper} style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: 8
            }}>
              <div className={styles.messageBubble} style={{
                background: msg.role === 'user' ? '#2c3e50' : '#e0e7ef',
                color: msg.role === 'user' ? '#fff' : '#222',
                borderRadius: 16,
                padding: '10px 16px',
                maxWidth: '80%',
                fontSize: 15,
                boxShadow: msg.role === 'user' ? '0 2px 6px rgba(44,62,80,0.08)' : '0 2px 6px rgba(160,180,200,0.08)'
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className={styles.chatInputContainer}>
          <form onSubmit={handleSend} className={styles.chatForm}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your question..."
              className={styles.chatInput}
              disabled={loading}
              autoFocus
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className={styles.chatSendButton}
            >
              {loading ? '...' : 'Send'}
            </button>
          </form>
          {error && <div className={styles.chatError}>{error}</div>}
        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className={styles.modalOverlay} onClick={() => setShowHelpModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeButton}
              onClick={() => setShowHelpModal(false)}
            >
              ×
            </button>
            <h2 className={styles.modalTitle}>How to Use the AI Case Bot</h2>
            <div className={styles.tipsGrid}>
              <div className={styles.tipCard}>
                <div className={styles.tipIcon}>🤖</div>
                <h2>What Can You Ask?</h2>
                <ul>
                  <li>Pitch your case idea and get feedback</li>
                  <li>Ask for possible Affirmative arguments</li>
                  <li>Request common Negative responses</li>
                  <li>Brainstorm unique case angles</li>
                  <li>Get help structuring your case</li>
                  <li>Ask for evidence suggestions</li>
                  <li>Practice cross-examination questions</li>
                </ul>
              </div>
              <div className={styles.tipCard}>
                <div className={styles.tipIcon}>💬</div>
                <h2>Tips for Effective AI Use</h2>
                <ul>
                  <li>Be specific with your questions</li>
                  <li>Share your goals or constraints</li>
                  <li>Ask for examples or outlines</li>
                  <li>Use follow-up questions for clarity</li>
                </ul>
              </div>
              <div className={styles.tipCard}>
                <div className={styles.tipIcon}>⚠️</div>
                <h2>AI Limitations & Best Practices</h2>
                <ul>
                  <li>AI may not always provide perfect or up-to-date information</li>
                  <li>Double-check important facts and arguments</li>
                  <li>Use AI as a brainstorming partner, not a replacement for your own judgment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 