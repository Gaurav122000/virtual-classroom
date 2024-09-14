import express from 'express';
import Class from '../models/Class.js';
import Unit from '../models/Unit.js';
import Session from '../models/Session.js';
import { authenticate, authorize } from '../middleware/auth.js';



const router = express.Router();

//create a new class
router.post('/', authenticate, authorize(['instructor', 'admin']), async (req, res) => {
    const { title } = req.body;
    const newClass = new Class({ title });
    await newClass.save();
    res.status(201).json(newClass);
});

//Get all classes
router.get('/', async (req, res) => {
    const classes = await Class.find().populate('units');
    res.json(classes);
})

//add a unit to a class
router.post('/:classId/units', authenticate, authorize(['instructor', 'admin']), async (req, res) => {
    const { classId } = req.params;
    const { title } = req.body;
    const newUnit = new Unit({ title });
    await newUnit.save();
    const classObj = await Class.findById(classId);
    classObj.units.push(newUnit);
    await classObj.save();
    res.status(201).json(newUnit);
})

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