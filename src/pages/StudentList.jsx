import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import StudentTable from '../components/StudentTable';
import { students as initialStudents } from '../services/dummyData';

export default function StudentList() {
  const navigate = useNavigate();
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [deleteModal, setDeleteModal] = useState(null);

  const classes = [...new Set(initialStudents.map((s) => s.class))].sort();

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch =
      s.name.toLowerCase().includes(q) ||
      s.rollNumber.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q);
    const matchClass = classFilter ? s.class === classFilter : true;
    return matchSearch && matchClass;
  });

  const handleDelete = (id) => setDeleteModal(id);

  const confirmDelete = () => {
    setStudents((prev) => prev.filter((s) => s.id !== deleteModal));
    setDeleteModal(null);
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-500 text-sm mt-1">{filtered.length} students found</p>
        </div>
        <button
          onClick={() => navigate('/students/add')}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} />
          Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, roll number, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-9"
            />
          </div>
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="input-field sm:w-40"
          >
            <option value="">All Classes</option>
            {classes.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <StudentTable students={filtered} onDelete={handleDelete} />
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Student?</h3>
            <p className="text-gray-500 text-sm mb-6">This action cannot be undone. The student record will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={confirmDelete} className="btn-danger flex-1">Delete</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
