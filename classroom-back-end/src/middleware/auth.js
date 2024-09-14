import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware to authenticate the user
export const authenticate = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    // If no Authorization header is present, return an error
    return res.status(401).send({ error: 'Authentication required' });
  }

  // Extract the token from the Authorization header
  const token = authHeader.replace('Bearer ', '');
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, 'secret');
    // Attach the decoded user information to the request object
    req.user = decoded;
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, return an error
    res.status(401).send({ error: 'Invalid token' });
  }
};

// Middleware to authorize the user based on roles
export const authorize = (roles) => {
  return (req, res, next) => {
    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      // If not, return an access denied error
      return res.status(403).send('Access denied');
    }
    // Proceed to the next middleware or route handler
    next();
  };
};
