import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Navigation from '../components/Navigation';

export default function NewsletterSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    preferences: {
      debateTips: true,
      caseUpdates: true,
      eventAnnouncements: true,
      communityHighlights: true
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('preferences.')) {
      const preferenceKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [preferenceKey]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType('success');
        // Reset form on success
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          preferences: {
            debateTips: true,
            caseUpdates: true,
            eventAnnouncements: true,
            communityHighlights: true
          }
        });
      } else {
        setMessage(data.error);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Navigation />
      <div className={styles.content}>
        <div style={{
          maxWidth: 600,
          margin: '2rem auto',
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: 40,
          border: '1px solid #e0e7ef'
        }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{
              background: '#2c3e50',
              color: '#fff',
              borderRadius: '50%',
              width: 80,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              fontSize: 32
            }}>
              📧
            </div>
            <h1 style={{
              color: '#2c3e50',
              fontSize: 28,
              marginBottom: 16,
              fontWeight: 700
            }}>
              Subscribe to Our Newsletter
            </h1>
            <p style={{
              color: '#666',
              fontSize: 16,
              lineHeight: 1.6
            }}>
              Stay updated with the latest debate tips, case strategies, and community highlights!
            </p>
          </div>

          {message && (
            <div style={{
              padding: 16,
              borderRadius: 8,
              marginBottom: 24,
              background: messageType === 'success' ? '#d4edda' : '#f8d7da',
              color: messageType === 'success' ? '#155724' : '#721c24',
              border: `1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`
            }}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: 8,
                  fontWeight: 600,
                  color: '#2c3e50'
                }}>
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: 12,
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: 8,
                  fontWeight: 600,
                  color: '#2c3e50'
                }}>
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: 12,
                    border: '1px solid #ddd',
                    borderRadius: 8,
                    fontSize: 16,
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: 'block',
                marginBottom: 8,
                fontWeight: 600,
                color: '#2c3e50'
              }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: 12,
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  fontSize: 16,
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={{
                display: 'block',
                marginBottom: 16,
                fontWeight: 600,
                color: '#2c3e50'
              }}>
                What would you like to receive?
              </label>
              <div style={{ display: 'grid', gap: 12 }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="preferences.debateTips"
                    checked={formData.preferences.debateTips}
                    onChange={handleChange}
                    style={{ marginRight: 12, transform: 'scale(1.2)' }}
                  />
                  <span>Debate Tips & Strategies</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="preferences.caseUpdates"
                    checked={formData.preferences.caseUpdates}
                    onChange={handleChange}
                    style={{ marginRight: 12, transform: 'scale(1.2)' }}
                  />
                  <span>Case Updates & Analysis</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="preferences.eventAnnouncements"
                    checked={formData.preferences.eventAnnouncements}
                    onChange={handleChange}
                    style={{ marginRight: 12, transform: 'scale(1.2)' }}
                  />
                  <span>Event Announcements</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="preferences.communityHighlights"
                    checked={formData.preferences.communityHighlights}
                    onChange={handleChange}
                    style={{ marginRight: 12, transform: 'scale(1.2)' }}
                  />
                  <span>Community Highlights</span>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: '#2c3e50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '16px 32px',
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = '#34495e')}
                onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = '#2c3e50')}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/')}
                style={{
                  background: 'transparent',
                  color: '#666',
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  padding: '16px 32px',
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#f8f9fa';
                  e.target.style.borderColor = '#2c3e50';
                  e.target.style.color = '#2c3e50';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.borderColor = '#ddd';
                  e.target.style.color = '#666';
                }}
              >
                Cancel
              </button>
            </div>
          </form>

          <div style={{
            marginTop: 32,
            padding: 16,
            background: '#f8f9fa',
            borderRadius: 8,
            border: '1px solid #e9ecef',
            fontSize: 14,
            color: '#666',
            lineHeight: 1.5
          }}>
            <p style={{ margin: 0 }}>
              <strong>Privacy Notice:</strong> We respect your privacy and will never share your email address with third parties. 
              You can unsubscribe at any time by clicking the unsubscribe link in our emails.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 