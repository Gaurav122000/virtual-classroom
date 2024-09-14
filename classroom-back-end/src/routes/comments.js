import express from 'express';
import Comment from '../models/Comment.js';
import Session from '../models/Session.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Add a comment to a session
router.post('/:sessionId/comments', authenticate, async (req, res) => {
    const { sessionId } = req.params;
    const { text, author } = req.body;
    const newComment = new Comment({ text, author });
    await newComment.save();
    const session = await Session.findById(sessionId);
    session.comments.push(newComment);
    await session.save();
    res.status(201).json(newComment);
  });
  
  // Get comments for a session
  router.get('/:sessionId/comments', authenticate, async (req, res) => {
    const { sessionId } = req.params;
    const session = await Session.findById(sessionId).populate('comments');
    res.json(session.comments);
  });
  
  export default router;