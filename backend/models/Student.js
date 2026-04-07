const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  rollNumber: {
    type: String,
    required: [true, 'Please add a roll number'],
    unique: true,
  },
  class: {
    type: String,
    required: [true, 'Please add a class'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
  },
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Student', studentSchema);
