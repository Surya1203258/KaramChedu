import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from '../styles/Home.module.css';
import Navigation from '../components/Navigation';

export default function SignIn() {
  const router = useRouter();
  const { callbackUrl } = router.query;

  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        router.push(callbackUrl || "/");
      }
    });
  }, [callbackUrl, router]);

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: callbackUrl || "/" });
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <Navigation />
      <div className={styles.content}>
        <div style={{
          maxWidth: 500,
          margin: '4rem auto',
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          padding: 40,
          border: '1px solid #e0e7ef',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: 32 }}>
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
              🔒
            </div>
            <h1 style={{
              color: '#2c3e50',
              fontSize: 28,
              marginBottom: 16,
              fontWeight: 700
            }}>
              Authentication Required
            </h1>
            <p style={{
              color: '#666',
              fontSize: 16,
              lineHeight: 1.6,
              marginBottom: 8
            }}>
              You need to be logged in to access this page.
            </p>
            {callbackUrl && (
              <p style={{
                color: '#888',
                fontSize: 14,
                fontStyle: 'italic'
              }}>
                You'll be redirected back after signing in.
              </p>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <button
              onClick={handleGoogleSignIn}
              style={{
                background: '#4285f4',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '16px 24px',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#3367d6'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#4285f4'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>

            <button
              onClick={handleGoHome}
              style={{
                background: 'transparent',
                color: '#666',
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: '16px 24px',
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
              ← Go Back to Home
            </button>
          </div>

          <div style={{
            marginTop: 32,
            padding: 16,
            background: '#f8f9fa',
            borderRadius: 8,
            border: '1px solid #e9ecef'
          }}>
            <p style={{
              color: '#666',
              fontSize: 14,
              margin: 0,
              lineHeight: 1.5
            }}>
              <strong>Why sign in?</strong> Some features require authentication to ensure a personalized experience and protect user data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 