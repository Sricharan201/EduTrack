import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Eye } from 'lucide-react';

export default function StudentTable({ students, onDelete }) {
  const navigate = useNavigate();

  if (!students || students.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-lg font-semibold">No students found</p>
        <p className="text-sm mt-1">Try adjusting your search or add a new student.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            {['Student', 'Roll No.', 'Class', 'Email', 'Phone', 'Attendance', 'Actions'].map((h) => (
              <th key={h} className="table-header">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {students.map((student, idx) => (
            <tr
              key={student.id}
              className="hover:bg-blue-50/40 transition-colors duration-150"
            >
              <td className="table-cell">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-white text-xs font-bold">
                      {student.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">{student.name}</span>
                </div>
              </td>
              <td className="table-cell">
                <span className="font-mono text-xs bg-gray-100 px-2.5 py-1 rounded-lg text-gray-600">
                  {student.rollNumber}
                </span>
              </td>
              <td className="table-cell">
                <span className="bg-primary-50 text-primary-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
                  {student.class}
                </span>
              </td>
              <td className="table-cell text-gray-500">{student.email}</td>
              <td className="table-cell text-gray-500">{student.phone}</td>
              <td className="table-cell">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        student.attendance >= 90
                          ? 'bg-emerald-500'
                          : student.attendance >= 75
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${student.attendance}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-600">{student.attendance}%</span>
                </div>
              </td>
              <td className="table-cell">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => navigate(`/students/${student.id}`)}
                    title="View"
                    className="p-1.5 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    <Eye size={15} />
                  </button>
                  <button
                    onClick={() => navigate(`/students/${student.id}/edit`)}
                    title="Edit"
                    className="p-1.5 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(student.id)}
                    title="Delete"
                    className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
