import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema({
  name: String,
  initials: String,
  profileColor: String,
  email: String,
}, { _id: false });

const PostSchema = new mongoose.Schema({
  author: AuthorSchema,
  date: String,
  content: String,
  likes: { type: Number, default: 0 },
  likedBy: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model('Post', PostSchema); 