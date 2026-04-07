const express = require('express');
const {
  addMarks,
  getStudentMarks,
  updateMarks,
  deleteMarks,
} = require('../controllers/marks');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/', authorize('admin', 'teacher'), addMarks);
router.get('/:studentId', getStudentMarks);

router
  .route('/:id')
  .put(authorize('admin', 'teacher'), updateMarks)
  .delete(authorize('admin', 'teacher'), deleteMarks);

module.exports = router;
