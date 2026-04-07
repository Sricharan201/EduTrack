const express = require('express');
const {
  markAttendance,
  getStudentAttendance,
  getAttendanceByDate,
} = require('../controllers/attendance');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/', authorize('admin', 'teacher'), markAttendance);
router.get('/:studentId', getStudentAttendance);
router.get('/date/:date', authorize('admin', 'teacher'), getAttendanceByDate);

module.exports = router;
