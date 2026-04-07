const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.ObjectId,
    ref: 'Student',
    required: true,
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject'],
  },
  marks: {
    type: Number,
    required: [true, 'Please add marks'],
  },
  totalMarks: {
    type: Number,
    default: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Marks', marksSchema);
