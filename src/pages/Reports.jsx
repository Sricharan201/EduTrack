import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { PerformanceChart, AttendanceChart } from '../components/ChartComponent';
import { performanceData, attendanceTrendData, students, subjects, marksData } from '../services/dummyData';

export default function Reports() {
  // Class-wise performance summary
  const classSummary = {};
  students.forEach((s) => {
    if (!classSummary[s.class]) classSummary[s.class] = { total: 0, count: 0, attendance: 0 };
    const sMarks = marksData[s.id] || {};
    const avg = Object.values(sMarks).reduce((a, b) => a + b, 0) / (subjects.length || 1);
    classSummary[s.class].total += avg;
    classSummary[s.class].attendance += s.attendance;
    classSummary[s.class].count += 1;
  });

  const classRows = Object.entries(classSummary).map(([cls, data]) => ({
    class: cls,
    avgScore: (data.total / data.count).toFixed(1),
    avgAttendance: (data.attendance / data.count).toFixed(1),
    students: data.count,
  })).sort((a, b) => a.class.localeCompare(b.class));

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of academic performance and attendance trends</p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h3 className="text-base font-bold text-gray-900 mb-1">Performance Trend</h3>
          <p className="text-xs text-gray-400 mb-5">Monthly average score across all classes</p>
          <PerformanceChart data={performanceData} />
        </div>
        <div className="card">
          <h3 className="text-base font-bold text-gray-900 mb-1">Attendance Trend</h3>
          <p className="text-xs text-gray-400 mb-5">Monthly attendance percentage</p>
          <AttendanceChart data={attendanceTrendData} />
        </div>
      </div>

      {/* Class-wise summary */}
      <div className="card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Class-wise Summary</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Class', 'Students', 'Avg Score', 'Avg Attendance', 'Performance'].map((h) => (
                  <th key={h} className="table-header">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {classRows.map((row) => (
                <tr key={row.class} className="hover:bg-gray-50 transition-colors">
                  <td className="table-cell">
                    <span className="bg-primary-50 text-primary-700 text-xs font-bold px-2.5 py-1 rounded-lg">{row.class}</span>
                  </td>
                  <td className="table-cell font-semibold">{row.students}</td>
                  <td className="table-cell">
                    <span className={`font-bold ${row.avgScore >= 80 ? 'text-emerald-600' : row.avgScore >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                      {row.avgScore}%
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`font-bold ${row.avgAttendance >= 85 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {row.avgAttendance}%
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full"
                        style={{ width: `${row.avgScore}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
