import express from 'express';
import Comment from '../models/Comment.js';
import Session from '../models/Session.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Add a comment to a session
router.post('/:sessionId/comments', authenticate, async (req, res) => {
    try {
        const { sessionId } = req.params;
        const { text, author } = req.body;

        // Validate input
        if (!text || !author) {
            return res.status(400).json({ message: 'Text and author are required' });
        }

        // Create a new comment
        const newComment = new Comment({ text, author });
        await newComment.save();

        // Find the session by ID
        const session = await Session.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Add the new comment to the session's comments array
        session.comments.push(newComment);
        await session.save();

        // Emit the new comment to all connected clients
        io.emit('comment', newComment);
        res.status(201).json(newComment);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Failed to add comment', error: error.message });
    }
});

// Get comments for a session
router.get('/:sessionId/comments', authenticate, async (req, res) => {
    try {
        const { sessionId } = req.params;

        // Find the session by ID and populate the comments
        const session = await Session.findById(sessionId).populate('comments');
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Return the comments
        res.json(session.comments);
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Failed to get comments', error: error.message });
    }
});

export default router;
