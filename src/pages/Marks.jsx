import React, { useState } from 'react';
import { Save } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { students, subjects, marksData as initialMarks } from '../services/dummyData';

export default function Marks() {
  const [selectedId, setSelectedId] = useState('');
  const [marks, setMarks] = useState({});
  const [saved, setSaved] = useState(false);

  const handleStudentChange = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    setSaved(false);
    if (id) {
      setMarks({ ...(initialMarks[Number(id)] || {}) });
    } else {
      setMarks({});
    }
  };

  const handleMarkChange = (subject, value) => {
    const num = Math.max(0, Math.min(100, Number(value)));
    setMarks((prev) => ({ ...prev, [subject]: num || 0 }));
    setSaved(false);
  };

  const totalMarks = Object.values(marks).reduce((sum, v) => sum + (Number(v) || 0), 0);
  const maxMarks = subjects.length * 100;
  const percentage = maxMarks > 0 ? ((totalMarks / maxMarks) * 100).toFixed(1) : 0;

  const getGrade = (pct) => {
    if (pct >= 90) return { grade: 'A+', color: 'emerald' };
    if (pct >= 80) return { grade: 'A', color: 'blue' };
    if (pct >= 70) return { grade: 'B', color: 'indigo' };
    if (pct >= 60) return { grade: 'C', color: 'amber' };
    return { grade: 'D', color: 'red' };
  };

  const { grade, color } = getGrade(percentage);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marks Management</h1>
          <p className="text-gray-500 text-sm mt-1">Enter and manage student subject marks</p>
        </div>
      </div>

      {/* Student selector */}
      <div className="card mb-6">
        <label className="text-sm font-semibold text-gray-700 block mb-2">Select Student</label>
        <select
          value={selectedId}
          onChange={handleStudentChange}
          className="input-field max-w-sm"
        >
          <option value="">-- Choose a student --</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.rollNumber}) — Class {s.class}
            </option>
          ))}
        </select>
      </div>

      {selectedId && (
        <>
          {saved && (
            <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-800 text-sm font-semibold">
              ✓ Marks saved successfully!
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Marks input */}
            <div className="card lg:col-span-2">
              <h3 className="text-base font-bold text-gray-900 mb-4">Subject Marks</h3>
              <div className="space-y-4">
                {subjects.map((subject) => {
                  const val = marks[subject] ?? '';
                  const pct = val !== '' ? Number(val) : 0;
                  return (
                    <div key={subject} className="flex items-center gap-4">
                      <div className="w-40 flex-shrink-0">
                        <p className="text-sm font-semibold text-gray-700">{subject}</p>
                        <p className="text-xs text-gray-400">Max: 100</p>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              pct >= 80 ? 'bg-emerald-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={val}
                        onChange={(e) => handleMarkChange(subject, e.target.value)}
                        className="input-field w-20 text-center font-bold"
                        placeholder="0"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex gap-3">
                <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                  <Save size={15} />
                  Save Marks
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-5">
              <div className="card text-center">
                <div className={`w-20 h-20 rounded-full bg-${color}-100 flex items-center justify-center mx-auto mb-3`}>
                  <span className={`text-${color}-600 text-2xl font-black`}>{grade}</span>
                </div>
                <p className="text-3xl font-bold text-gray-900">{percentage}%</p>
                <p className="text-sm text-gray-500 mt-1">Overall Percentage</p>
              </div>
              <div className="card">
                <h4 className="text-sm font-bold text-gray-700 mb-3">Score Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Marks</span>
                    <span className="font-bold text-gray-900">{totalMarks} / {maxMarks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subjects</span>
                    <span className="font-bold text-gray-900">{subjects.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Highest</span>
                    <span className="font-bold text-emerald-600">{Math.max(0, ...Object.values(marks).map(Number))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Lowest</span>
                    <span className="font-bold text-red-600">
                      {Object.values(marks).length > 0 ? Math.min(...Object.values(marks).map(Number)) : 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {!selectedId && (
        <div className="card text-center py-16 text-gray-400">
          <BookIcon />
          <p className="text-lg font-semibold mt-4">Select a student to manage marks</p>
          <p className="text-sm mt-1">Choose a student from the dropdown above to view and edit their marks.</p>
        </div>
      )}
    </DashboardLayout>
  );
}

function BookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}
