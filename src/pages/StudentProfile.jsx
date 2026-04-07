import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Hash, Layers, User, Pencil } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { students, marksData, subjects } from '../services/dummyData';

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = students.find((s) => s.id === Number(id));
  const marks = marksData[Number(id)] || {};

  if (!student) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl font-semibold">Student not found</p>
          <button onClick={() => navigate('/students')} className="btn-primary mt-6">Back to Students</button>
        </div>
      </DashboardLayout>
    );
  }

  const totalMarks = Object.values(marks).reduce((s, v) => s + v, 0);
  const maxMarks = subjects.length * 100;
  const percentage = ((totalMarks / maxMarks) * 100).toFixed(1);

  const getGrade = (pct) => {
    if (pct >= 90) return { grade: 'A+', color: 'emerald' };
    if (pct >= 80) return { grade: 'A', color: 'blue' };
    if (pct >= 70) return { grade: 'B', color: 'indigo' };
    if (pct >= 60) return { grade: 'C', color: 'amber' };
    return { grade: 'D', color: 'red' };
  };

  const { grade, color } = getGrade(percentage);

  const infoItems = [
    { icon: Hash, label: 'Roll Number', value: student.rollNumber },
    { icon: Layers, label: 'Class', value: student.class },
    { icon: Mail, label: 'Email', value: student.email },
    { icon: Phone, label: 'Phone', value: student.phone },
  ];

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate('/students')}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="card text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl shadow-primary-200">
            {student.photo ? (
              <img src={student.photo} alt={student.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-white text-3xl font-black">
                {student.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>
          <span className="inline-block bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-lg mt-2">
            Class {student.class}
          </span>

          <div className="mt-5 space-y-3 text-left">
            {infoItems.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 text-sm">
                <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={13} className="text-gray-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="font-semibold text-gray-700">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate(`/students/${student.id}/edit`)}
            className="w-full btn-secondary mt-5 flex items-center justify-center gap-2"
          >
            <Pencil size={14} />
            Edit Profile
          </button>
        </div>

        {/* Stats + Marks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Attendance & Grade */}
          <div className="grid grid-cols-2 gap-5">
            <div className="card text-center">
              <p className="text-3xl font-bold text-primary-600">{student.attendance}%</p>
              <p className="text-sm text-gray-500 mt-1">Attendance Rate</p>
              <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 rounded-full"
                  style={{ width: `${student.attendance}%` }}
                />
              </div>
            </div>
            <div className="card text-center">
              <div className={`w-14 h-14 rounded-full bg-${color}-100 flex items-center justify-center mx-auto mb-2`}>
                <span className={`text-${color}-600 text-xl font-black`}>{grade}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{percentage}%</p>
              <p className="text-sm text-gray-500">Overall Score</p>
            </div>
          </div>

          {/* Marks table */}
          <div className="card p-0 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Subject-wise Marks</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['Subject', 'Marks', 'Out of', 'Performance'].map((h) => (
                    <th key={h} className="table-header">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {subjects.map((subject) => {
                  const m = marks[subject] ?? 0;
                  return (
                    <tr key={subject} className="hover:bg-gray-50 transition-colors">
                      <td className="table-cell font-semibold text-gray-800">{subject}</td>
                      <td className="table-cell">
                        <span className={`font-bold ${m >= 80 ? 'text-emerald-600' : m >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                          {m}
                        </span>
                      </td>
                      <td className="table-cell text-gray-400">100</td>
                      <td className="table-cell">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${m >= 80 ? 'bg-emerald-500' : m >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                              style={{ width: `${m}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{m}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-gray-50 font-bold">
                  <td className="table-cell text-gray-900">Total</td>
                  <td className="table-cell text-primary-700">{totalMarks}</td>
                  <td className="table-cell text-gray-500">{maxMarks}</td>
                  <td className="table-cell text-primary-700">{percentage}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
