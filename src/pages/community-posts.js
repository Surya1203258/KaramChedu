import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Navigation from '../components/Navigation';

// Function to generate a consistent color based on user name
const generateProfileColor = (name) => {
  const colors = [
    '#2c3e50', '#3498db', '#e74c3c', '#f39c12', '#9b59b6', 
    '#1abc9c', '#e67e22', '#34495e', '#16a085', '#8e44ad'
  ];
  const hash = name.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  return colors[Math.abs(hash) % colors.length];
};

// Function to convert URLs in text to clickable links
function linkify(text) {
  if (!text) return '';
  const urlRegex = /(https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=%]+)(?![^<]*>|[^<>]*<\/(a|button|textarea|pre|code)>)/gi;
  return text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color:#3498db;word-break:break-all;">${url}</a>`;
  });
}

export default function CommunityPosts() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingLike, setLoadingLike] = useState({});

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/signin?callbackUrl=${encodeURIComponent(router.asPath)}`);
    }
  }, [status, router]);

  // Fetch posts from API
  useEffect(() => {
    fetch('/api/community-posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || !session) return;
    setLoading(true);
    const res = await fetch('/api/community-posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newPost.replace(/\n/g, '<br />') }),
    });
    if (res.ok) {
      const post = await res.json();
      setPosts([post, ...posts]);
      setNewPost('');
    } else {
      alert('Failed to post. Please try again.');
    }
    setLoading(false);
  };

  const handleLike = async (id) => {
    if (!session) {
      alert('Please log in to like posts');
      return;
    }
    
    setLoadingLike(like => ({ ...like, [id]: true }));
    const res = await fetch('/api/community-posts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      const updated = await res.json();
      setPosts(posts => posts.map(post => post._id === id ? updated : post));
    } else {
      alert('Failed to like post. Please try again.');
    }
    setLoadingLike(like => ({ ...like, [id]: false }));
  };

  // Check if current user has liked a post
  const hasUserLiked = (post) => {
    return session && post.likedBy && post.likedBy.includes(session.user.email);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <Navigation />
      <div style={{ maxWidth: 500, margin: '2rem auto 0 auto' }}>
        {/* Share Post Input */}
        {session ? (
          <form onSubmit={handlePost} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 16, marginBottom: 24, border: '1px solid #e0e7ef' }}>
            <div style={{ background: generateProfileColor(session.user.name), color: '#fff', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18 }}>
              {session.user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <textarea
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
              placeholder="Share a post"
              rows={2}
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 15, resize: 'vertical', background: 'transparent', marginTop: 4 }}
              disabled={loading}
            />
            <button type="submit" style={{ background: '#2c3e50', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 15, cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4 }} disabled={loading}>
              {loading ? 'Posting...' : 'Post'}
            </button>
          </form>
        ) : (
          <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 16, marginBottom: 24, border: '1px solid #e0e7ef', textAlign: 'center' }}>
            <p style={{ margin: 0, color: '#666' }}>Please log in to share posts</p>
          </div>
        )}
        
        {/* Posts List */}
        {posts.map(post => (
          <div key={post._id} style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 20, marginBottom: 24, border: '1px solid #e0e7ef' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ background: post.author.profileColor, color: '#fff', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, marginRight: 10 }}>
                {post.author.initials}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{post.author.name}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{post.date}</div>
              </div>
            </div>
            <div 
              style={{ fontSize: 15, color: '#222', marginBottom: 12, wordBreak: 'break-word', whiteSpace: 'pre-wrap' }} 
              dangerouslySetInnerHTML={{ __html: linkify(post.content) }} 
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button 
                onClick={() => handleLike(post._id)} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: hasUserLiked(post) ? '#3498db' : '#2c3e50', 
                  fontWeight: 600, 
                  fontSize: 16, 
                  display: 'flex', 
                  alignItems: 'center', 
                  cursor: loadingLike[post._id] ? 'not-allowed' : 'pointer', 
                  padding: 0 
                }} 
                disabled={loadingLike[post._id]}
              >
                <span style={{ fontSize: 20, marginRight: 6 }}>👍</span> 
                {hasUserLiked(post) ? 'Liked' : 'Like'}{post.likes > 0 ? ` (${post.likes})` : ''}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 