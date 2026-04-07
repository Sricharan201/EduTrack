const Marks = require('../models/Marks');
const Student = require('../models/Student');

// @desc    Add marks for a student
// @route   POST /api/marks
// @access  Private
exports.addMarks = async (req, res, next) => {
  try {
    const { studentId, subject, marks, totalMarks } = req.body;

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    const marksEntry = await Marks.create({
      student: studentId,
      subject,
      marks,
      totalMarks,
    });

    res.status(201).json({ success: true, data: marksEntry });
  } catch (err) {
    next(err);
  }
};

// @desc    Get marks for a student
// @route   GET /api/marks/:studentId
// @access  Private
exports.getStudentMarks = async (req, res, next) => {
  try {
    const marks = await Marks.find({ student: req.params.studentId }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: marks.length,
      data: marks,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update marks entry
// @route   PUT /api/marks/:id
// @access  Private
exports.updateMarks = async (req, res, next) => {
  try {
    let marks = await Marks.findById(req.params.id);

    if (!marks) {
      return res.status(404).json({ success: false, message: 'Marks record not found' });
    }

    marks = await Marks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: marks });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete marks entry
// @route   DELETE /api/marks/:id
// @access  Private
exports.deleteMarks = async (req, res, next) => {
  try {
    const marks = await Marks.findById(req.params.id);

    if (!marks) {
      return res.status(404).json({ success: false, message: 'Marks record not found' });
    }

    await marks.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
