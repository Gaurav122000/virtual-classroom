import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema({
  title: String,
  units: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Unit' }],
});

export default mongoose.model('Class', ClassSchema);
