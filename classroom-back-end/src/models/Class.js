// Class Schema
import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  units: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit'
  }]
});

const Class = mongoose.model('Class', classSchema);
export default Class;
