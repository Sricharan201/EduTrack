const express = require('express');
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  studentPhotoUpload,
} = require('../controllers/students');

const upload = require('../middleware/upload');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All routes protected

router
  .route('/')
  .get(getStudents)
  .post(authorize('admin', 'teacher'), createStudent);

router
  .route('/:id')
  .get(getStudent)
  .put(authorize('admin', 'teacher'), updateStudent)
  .delete(authorize('admin'), deleteStudent);

router.post('/:id/photo', authorize('admin', 'teacher'), upload.single('photo'), studentPhotoUpload);

module.exports = router;
