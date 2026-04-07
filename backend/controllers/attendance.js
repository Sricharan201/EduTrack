const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

// @desc    Mark attendance
// @route   POST /api/attendance
// @access  Private
exports.markAttendance = async (req, res, next) => {
  try {
    const { studentId, date, status } = req.body;

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Check if attendance already exists for this student and date
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    let attendance = await Attendance.findOne({
      student: studentId,
      date: {
        $gte: d,
        $lt: new Date(d.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (attendance) {
      attendance.status = status;
      await attendance.save();
    } else {
      attendance = await Attendance.create({
        student: studentId,
        date: d,
        status,
      });
    }

    res.status(200).json({ success: true, data: attendance });
  } catch (err) {
    next(err);
  }
};

// @desc    Get attendance history for a student
// @route   GET /api/attendance/:studentId
// @access  Private
exports.getStudentAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.find({ student: req.params.studentId }).sort('-date');

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get attendance for all students on a specific date
// @route   GET /api/attendance/date/:date
// @access  Private
exports.getAttendanceByDate = async (req, res, next) => {
  try {
    const d = new Date(req.params.date);
    d.setHours(0, 0, 0, 0);

    const attendance = await Attendance.find({
      date: {
        $gte: d,
        $lt: new Date(d.getTime() + 24 * 60 * 60 * 1000)
      }
    }).populate('student', 'name rollNumber class');

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (err) {
    next(err);
  }
};
