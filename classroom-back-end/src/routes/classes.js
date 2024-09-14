import express from 'express';
import Class from '../models/Class.js';
import Unit from '../models/Unit.js';
import Session from '../models/Session.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Create a new class
router.post('/', authenticate, async (req, res, next) => {
  if (req.user.role === 'student') {
    return res.status(403).send('Access denied');
  }
  next();
}, authorize(['instructor', 'admin']), async (req, res) => {
  const { title } = req.body;
  const newClass = new Class({ title });
  await newClass.save();
  res.status(201).json(newClass);
});

// Get all classes
router.get('/', async (req, res) => {
  const classes = await Class.find().populate({
    path: 'units',
    populate: {
      path: 'sessions',
      model: 'Session'
    }
  });
  res.json(classes);
});

// Add a unit to a class
router.post('/:classId/units', authenticate, authorize(['instructor', 'admin']), async (req, res) => {
  const { classId } = req.params;
  const { title } = req.body;
  const newUnit = new Unit({ title });
  await newUnit.save();
  const classObj = await Class.findById(classId);
  classObj.units.push(newUnit);
  await classObj.save();
  res.status(201).json(newUnit);
});

// Add a session to a unit
router.post('/:classId/units/:unitId/sessions', authenticate, authorize(['instructor', 'admin']), async (req, res) => {
  const { unitId } = req.params;
  const { title, lectures } = req.body;
  const newSession = new Session({ title, lectures });
  await newSession.save();
  const unit = await Unit.findById(unitId);
  unit.sessions.push(newSession);
  await unit.save();
  res.status(201).json(newSession);
});

export default router;
