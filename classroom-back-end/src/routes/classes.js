import express from 'express'; // Importing express for creating the server
import Class from '../models/Class.js'; // Importing Class model
import Unit from '../models/Unit.js'; // Importing Unit model
import Session from '../models/Session.js'; // Importing Session model
import { authenticate, authorize } from '../middleware/auth.js'; // Importing authentication and authorization middleware

const router = express.Router(); // Creating a new router instance

// Route to create a new class
router.post('/', authenticate, async (req, res, next) => {
  if (req.user.role === 'student') { // Check if user role is 'student'
    return res.status(403).send('Access denied'); // Deny access if user is a student
  }
  next(); // Proceed to the next middleware
}, authorize(['instructor', 'admin']), async (req, res) => {
  const { title } = req.body; // Extracting class title from request body
  const newClass = new Class({ title }); // Creating a new class instance
  await newClass.save(); // Saving the class to the database
  res.status(201).json(newClass); // Sending success response with the new class
});

// Route to get all classes
router.get('/', async (req, res) => {
  const classes = await Class.find().populate({
    path: 'units',
    populate: {
      path: 'sessions',
      model: 'Session'
    }
  }); // Fetching all classes with their units and sessions
  res.json(classes); // Sending the classes in response
});

// Route to add a unit to a class
router.post('/:classId/units', authenticate, authorize(['instructor', 'admin']), async (req, res) => {
  const { classId } = req.params; // Extracting class ID from request parameters
  const { title } = req.body; // Extracting unit title from request body
  const newUnit = new Unit({ title }); // Creating a new unit instance
  await newUnit.save(); // Saving the unit to the database
  const classObj = await Class.findById(classId); // Finding the class by ID
  classObj.units.push(newUnit); // Adding the new unit to the class
  await classObj.save(); // Saving the updated class
  res.status(201).json(newUnit); // Sending success response with the new unit
});

// Route to add a session to a unit
router.post('/:classId/units/:unitId/sessions', authenticate, authorize(['instructor', 'admin']), async (req, res) => {
  const { unitId } = req.params; // Extracting unit ID from request parameters
  const { title, lectures } = req.body; // Extracting session title and lectures from request body
  const newSession = new Session({ title, lectures }); // Creating a new session instance
  await newSession.save(); // Saving the session to the database
  const unit = await Unit.findById(unitId); // Finding the unit by ID
  unit.sessions.push(newSession); // Adding the new session to the unit
  await unit.save(); // Saving the updated unit
  res.status(201).json(newSession); // Sending success response with the new session
});

export default router; // Exporting the router
