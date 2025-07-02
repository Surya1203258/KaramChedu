import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from '../../styles/Home.module.css';
import Navigation from '../../components/Navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function SubmitEvidence() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    resolution: '',
    case: '',
    links: '',
    authors: '',
    publicationDate: '',
    evidence: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/signin?callbackUrl=${encodeURIComponent(router.asPath)}`);
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/evidence/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Evidence submitted successfully!');
        setFormData({
          title: '',
          resolution: '',
          case: '',
          links: '',
          authors: '',
          publicationDate: '',
          evidence: ''
        });
      } else {
        setMessage(data.error || 'Failed to submit evidence');
      }
    } catch (error) {
      setMessage('An error occurred while submitting evidence');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div className={styles.container}>
        <Navigation />
        <h1>Please log in to submit evidence</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Navigation />
      <div className={styles.content}>
        <h1 className={styles.sectionTitle}>Submit Evidence</h1>
        
        <form onSubmit={handleSubmit} className={styles.evidenceForm}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="resolution">Resolution:</label>
              <input
                type="text"
                id="resolution"
                name="resolution"
                value={formData.resolution}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="case">Case:</label>
              <input
                type="text"
                id="case"
                name="case"
                value={formData.case}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="links">Links:</label>
              <input
                type="text"
                id="links"
                name="links"
                value={formData.links}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="authors">Author(s):</label>
              <input
                type="text"
                id="authors"
                name="authors"
                value={formData.authors}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="publicationDate">Date Article Published:</label>
              <input
                type="date"
                id="publicationDate"
                name="publicationDate"
                value={formData.publicationDate}
                onChange={handleChange}
                required
                className={styles.formInput}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="evidence">Evidence:</label>
            <textarea
              id="evidence"
              name="evidence"
              value={formData.evidence}
              onChange={handleChange}
              required
              className={styles.evidenceTextarea}
              rows="10"
            />
          </div>

          {message && (
            <div className={styles.message}>
              {message}
            </div>
          )}

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Evidence'}
          </button>
        </form>
      </div>
    </div>
  );
} 