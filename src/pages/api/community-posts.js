import connectDB from '../../lib/mongodb';
import Post from '../../models/Post';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

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

export default async function handler(req, res) {
  await connectDB();

  // Get user session for authentication
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'GET') {
    // List posts, newest first
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.status(200).json(posts);
  }

  if (req.method === 'POST') {
    // Require authentication for posting
    if (!session) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Add a new post
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'Missing content' });
    
    // Create user info from session
    const userInfo = {
      name: session.user.name,
      initials: session.user.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      profileColor: generateProfileColor(session.user.name),
      email: session.user.email,
    };

    const post = await Post.create({
      author: userInfo,
      date: new Date().toLocaleString(),
      content,
      likes: 0,
      likedBy: [],
    });
    return res.status(201).json(post);
  }

  if (req.method === 'PATCH') {
    // Require authentication for liking
    if (!session) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Like/unlike a post
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: 'Missing post id' });
    
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const userEmail = session.user.email;
    const hasLiked = post.likedBy.includes(userEmail);

    if (hasLiked) {
      // Unlike the post
      const updatedPost = await Post.findByIdAndUpdate(
        id, 
        { 
          $inc: { likes: -1 },
          $pull: { likedBy: userEmail }
        }, 
        { new: true }
      );
      return res.status(200).json(updatedPost);
    } else {
      // Like the post
      const updatedPost = await Post.findByIdAndUpdate(
        id, 
        { 
          $inc: { likes: 1 },
          $push: { likedBy: userEmail }
        }, 
        { new: true }
      );
      return res.status(200).json(updatedPost);
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PATCH']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 