import React from 'react';
import { Users, BookOpen, CalendarCheck, TrendingUp } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../components/StatCard';
import { PerformanceChart, AttendanceChart } from '../components/ChartComponent';
import { stats, performanceData, attendanceTrendData, students } from '../services/dummyData';

export default function Dashboard() {
  const topStudents = [...students].sort((a, b) => b.attendance - a.attendance).slice(0, 5);

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, Admin! Here's what's happening today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          color="blue"
          trend={4.5}
          trendLabel="vs last semester"
        />
        <StatCard
          title="Total Teachers"
          value={stats.totalTeachers}
          icon={BookOpen}
          color="purple"
          trend={2}
          trendLabel="vs last semester"
        />
        <StatCard
          title="Total Classes"
          value={stats.totalClasses}
          icon={CalendarCheck}
          color="green"
          trend={0}
          trendLabel="same as last term"
        />
        <StatCard
          title="Attendance Rate"
          value={`${stats.attendancePercentage}%`}
          icon={TrendingUp}
          color="orange"
          trend={1.2}
          trendLabel="vs last month"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-gray-900">Student Performance</h3>
              <p className="text-xs text-gray-500 mt-0.5">Average score across all subjects</p>
            </div>
            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-lg">2025–26</span>
          </div>
          <PerformanceChart data={performanceData} />
        </div>
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-gray-900">Attendance Trend</h3>
              <p className="text-xs text-gray-500 mt-0.5">Monthly attendance percentage</p>
            </div>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-lg">Monthly</span>
          </div>
          <AttendanceChart data={attendanceTrendData} />
        </div>
      </div>

      {/* Top Students */}
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-bold text-gray-900">Top Students by Attendance</h3>
          <button
            onClick={() => (window.location.href = '/students')}
            className="text-sm text-primary-600 hover:text-primary-700 font-semibold"
          >
            View All →
          </button>
        </div>
        <div className="space-y-3">
          {topStudents.map((s, i) => (
            <div key={s.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <span className={`w-6 text-sm font-bold ${i === 0 ? 'text-amber-500' : 'text-gray-400'}`}>#{i + 1}</span>
              <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">
                  {s.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{s.name}</p>
                <p className="text-xs text-gray-500">Class {s.class}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${s.attendance}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-gray-700 w-10 text-right">{s.attendance}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
