// This file is no longer needed - authentication removed
export default function handler(req, res) {
  res.status(404).json({ error: 'Authentication not available' });
}