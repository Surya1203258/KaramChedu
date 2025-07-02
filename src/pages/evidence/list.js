import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from '../../styles/Home.module.css';
import Navigation from '../../components/Navigation';

export default function EvidenceList() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [evidenceList, setEvidenceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvidence, setEditedEvidence] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/signin?callbackUrl=${encodeURIComponent(router.asPath)}`);
    }
  }, [status, router]);

  useEffect(() => {
    const fetchEvidence = async () => {
      try {
        const response = await fetch('/api/evidence/list');
        if (!response.ok) {
          throw new Error('Failed to fetch evidence');
        }
        const data = await response.json();
        setEvidenceList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvidence();
  }, []);

  const handleView = async (id) => {
    try {
      const response = await fetch(`/api/evidence/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch evidence details');
      }
      const data = await response.json();
      setSelectedEvidence(data);
      setEditedEvidence(data);
      setIsEditing(false);
      setIsModalOpen(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`/api/evidence/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch evidence details');
      }
      const data = await response.json();
      setSelectedEvidence(data);
      setEditedEvidence(data);
      setIsEditing(true);
      setIsModalOpen(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/evidence/${selectedEvidence._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedEvidence),
      });

      if (!response.ok) {
        throw new Error('Failed to update evidence');
      }

      const updatedEvidence = await response.json();
      setEvidenceList(evidenceList.map(e => 
        e._id === updatedEvidence._id ? updatedEvidence : e
      ));
      setMessage('Evidence updated successfully!');
      setIsEditing(false);
      setSelectedEvidence(updatedEvidence);
      setEditedEvidence(updatedEvidence);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvidence(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this evidence?")) return;
    try {
      const response = await fetch(`/api/evidence/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete evidence');
      }
      setEvidenceList(evidenceList.filter(e => e._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvidence(null);
    setEditedEvidence(null);
    setIsEditing(false);
    setMessage('');
  };

  if (status === "loading" || loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <Navigation />

      <div className={styles.content}>
        <div className={styles.evidenceListContainer}>
          <h1 className={styles.pageTitle}>Evidence List</h1>
          
          <div className={styles.tableContainer}>
            <table className={styles.evidenceTable}>
              <thead>
                <tr>
                  <th>Case</th>
                  <th>Title</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {evidenceList.map((evidence) => (
                  <tr key={evidence._id}>
                    <td>{evidence.case}</td>
                    <td>{evidence.title}</td>
                    <td className={styles.actionButtons}>
                      <button 
                        className={`${styles.actionButton} ${styles.viewButton}`}
                        onClick={() => handleView(evidence._id)}
                      >
                        View
                      </button>
                      <button 
                        className={`${styles.actionButton} ${styles.editButton}`}
                        onClick={() => handleEdit(evidence._id)}
                      >
                        Edit
                      </button>
                      <button 
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() => handleDelete(evidence._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && selectedEvidence && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>×</button>
            <h2 className={styles.modalTitle}>
              {isEditing ? 'Edit Evidence' : 'View Evidence'}
            </h2>
            
            {message && (
              <div className={styles.message}>
                {message}
              </div>
            )}

            <form className={styles.evidenceForm}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={isEditing ? editedEvidence.title : selectedEvidence.title}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="resolution">Resolution:</label>
                  <input
                    type="text"
                    id="resolution"
                    name="resolution"
                    value={isEditing ? editedEvidence.resolution : selectedEvidence.resolution}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="case">Case:</label>
                  <input
                    type="text"
                    id="case"
                    name="case"
                    value={isEditing ? editedEvidence.case : selectedEvidence.case}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="links">Links:</label>
                  <input
                    type="text"
                    id="links"
                    name="links"
                    value={isEditing ? editedEvidence.links : selectedEvidence.links}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="authors">Author(s):</label>
                  <input
                    type="text"
                    id="authors"
                    name="authors"
                    value={isEditing ? editedEvidence.authors : selectedEvidence.authors}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="publicationDate">Date Article Published:</label>
                  <input
                    type="date"
                    id="publicationDate"
                    name="publicationDate"
                    value={isEditing 
                      ? new Date(editedEvidence.publicationDate).toISOString().split('T')[0]
                      : new Date(selectedEvidence.publicationDate).toISOString().split('T')[0]
                    }
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="evidence">Evidence:</label>
                <textarea
                  id="evidence"
                  name="evidence"
                  value={isEditing ? editedEvidence.evidence : selectedEvidence.evidence}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={styles.evidenceTextarea}
                  rows="10"
                />
              </div>

              {isEditing && (
                <button 
                  type="button"
                  onClick={handleSave}
                  className={styles.submitButton}
                >
                  Save Changes
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 