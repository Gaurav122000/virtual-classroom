// Unit Schema
import mongoose from 'mongoose';

const UnitSchema = new mongoose.Schema({
  title: String,
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }],
});

export default mongoose.model('Unit', UnitSchema);
