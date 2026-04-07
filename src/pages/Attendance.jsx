import React, { useState } from 'react';
import { Save, Calendar } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { students } from '../services/dummyData';

export default function Attendance() {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [attendance, setAttendance] = useState(
    Object.fromEntries(students.map((s) => [s.id, 'present']))
  );
  const [saved, setSaved] = useState(false);

  const toggle = (id) => {
    setAttendance((prev) => ({ ...prev, [id]: prev[id] === 'present' ? 'absent' : 'present' }));
    setSaved(false);
  };

  const handleSave = () => {
    // In real app: save via API
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const presentCount = Object.values(attendance).filter((v) => v === 'present').length;

  return (
    <DashboardLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <p className="text-gray-500 text-sm mt-1">Mark student attendance for the selected date</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Date picker */}
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => { setDate(e.target.value); setSaved(false); }}
              className="input-field pl-9 w-48"
            />
          </div>
          <button onClick={handleSave} className="btn-primary flex items-center gap-2">
            <Save size={15} />
            Save Attendance
          </button>
        </div>
      </div>

      {saved && (
        <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-800 text-sm font-semibold flex items-center gap-2">
          ✓ Attendance saved successfully for {date}
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Present', count: presentCount, color: 'emerald' },
          { label: 'Absent', count: students.length - presentCount, color: 'red' },
          { label: 'Total', count: students.length, color: 'blue' },
        ].map(({ label, count, color }) => (
          <div key={label} className={`card text-center bg-${color}-50 border-${color}-100`}>
            <p className={`text-3xl font-bold text-${color}-600`}>{count}</p>
            <p className={`text-sm text-${color}-600 font-medium mt-1`}>{label}</p>
          </div>
        ))}
      </div>

      {/* Student list */}
      <div className="card p-0 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-100 px-6 py-3 flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</p>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</p>
        </div>
        <div className="divide-y divide-gray-50">
          {students.map((s) => {
            const isPresent = attendance[s.id] === 'present';
            return (
              <div
                key={s.id}
                className={`flex items-center justify-between px-6 py-4 transition-colors ${
                  isPresent ? 'hover:bg-emerald-50/40' : 'hover:bg-red-50/40 bg-red-50/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {s.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.rollNumber} · Class {s.class}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggle(s.id)}
                  className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isPresent
                      ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-200'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isPresent ? 'bg-white' : 'bg-red-500'}`} />
                  {isPresent ? 'Present' : 'Absent'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
