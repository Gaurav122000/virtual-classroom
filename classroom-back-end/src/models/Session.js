// Session Schema
import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  title: String,
  lectures: [String],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

export default mongoose.model('Session', SessionSchema);
