import express from 'express'; // Importing express for creating the server
import bcrypt from 'bcryptjs'; // Importing bcryptjs for password hashing
import jwt from 'jsonwebtoken'; // Importing jsonwebtoken for creating JWT tokens
import User from '../models/User.js'; // Importing User model

const router = express.Router(); // Creating a new router instance

// Route for user registration
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body; // Extracting user details from request body
  const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
  const user = new User({ name, email, password: hashedPassword, role }); // Creating a new user instance
  await user.save(); // Saving the user to the database
  res.status(201).send('User registered'); // Sending success response
});

// Route for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Extracting login details from request body
  const user = await User.findOne({ email }); // Finding user by email
  if (!user || !await bcrypt.compare(password, user.password)) { // Checking if user exists and password matches
    return res.status(400).send('Invalid credentials'); // Sending error response if credentials are invalid
  }
  const token = jwt.sign({ userId: user._id, role: user.role }, 'secret'); // Creating JWT token
  res.json({ token, role: user.role }); // Sending token and role in response
});

// Route for user logout
router.post('/logout', (req, res) => {
  // Clear the token on the client side
  res.status(200).send('User logged out'); // Sending success response
});

export default router; // Exporting the router
