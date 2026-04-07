import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  BookOpen,
  BarChart3,
  Settings,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/students', icon: Users, label: 'Students' },
  { to: '/attendance', icon: CalendarCheck, label: 'Attendance' },
  { to: '/marks', icon: BookOpen, label: 'Marks' },
  { to: '/reports', icon: BarChart3, label: 'Reports' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <aside
      className={`relative flex flex-col bg-sidebar min-h-screen transition-all duration-300 ease-in-out ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-5 py-6 cursor-pointer select-none"
        onClick={() => navigate('/dashboard')}
      >
        <div className="flex-shrink-0 w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-900/40">
          <GraduationCap size={20} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <span className="text-white font-bold text-lg leading-none block">EduTrack</span>
            <span className="text-slate-500 text-xs font-medium">Student Management</span>
          </div>
        )}
      </div>

      <div className="px-3 mb-2">
        <div className="h-px bg-white/10" />
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : ''}`
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={20} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      {!collapsed && (
        <div className="px-4 py-4">
          <div className="bg-white/5 rounded-xl p-3 text-slate-400 text-xs text-center">
            <p className="font-semibold text-white text-sm">Academic Year</p>
            <p>2025 – 2026</p>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 bg-slate-700 hover:bg-primary-600 border border-slate-600 rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-md z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
