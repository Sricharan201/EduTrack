import React, { useState } from 'react';
import { Save, User, Bell, Shield, Palette } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: 'Admin',
    email: 'admin@edutrack.edu',
    phone: '+91 98765 00000',
    role: 'Administrator',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    attendance: true,
    performance: false,
    system: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section nav */}
        <div className="card p-3 h-fit">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 mb-1 ${
                activeSection === id
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Section content */}
        <div className="lg:col-span-3">
          {saved && (
            <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-800 text-sm font-semibold">
              ✓ Settings saved successfully!
            </div>
          )}

          {activeSection === 'profile' && (
            <div className="card">
              <h3 className="text-base font-bold text-gray-900 mb-5">Profile Information</h3>
              <div className="flex items-center gap-5 mb-6 pb-6 border-b border-gray-100">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{profileForm.name}</p>
                  <p className="text-sm text-gray-500">{profileForm.role}</p>
                  <button className="text-xs text-primary-600 font-semibold mt-1 hover:underline">Change photo</button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: 'Full Name', key: 'name' },
                  { label: 'Email', key: 'email' },
                  { label: 'Phone', key: 'phone' },
                  { label: 'Role', key: 'role' },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">{label}</label>
                    <input
                      type="text"
                      value={profileForm[key]}
                      onChange={(e) => setProfileForm({ ...profileForm, [key]: e.target.value })}
                      className="input-field"
                    />
                  </div>
                ))}
              </div>
              <button onClick={handleSave} className="btn-primary mt-6 flex items-center gap-2">
                <Save size={14} />
                Save Changes
              </button>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="card">
              <h3 className="text-base font-bold text-gray-900 mb-5">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'attendance', label: 'Attendance Alerts', desc: 'Get notified when attendance drops below 75%' },
                  { key: 'performance', label: 'Performance Reports', desc: 'Weekly performance summaries' },
                  { key: 'system', label: 'System Updates', desc: 'Maintenance and system announcements' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications((n) => ({ ...n, [key]: !n[key] }))}
                      className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 ${
                        notifications[key] ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                          notifications[key] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={handleSave} className="btn-primary mt-6 flex items-center gap-2">
                <Save size={14} />
                Save Preferences
              </button>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="card">
              <h3 className="text-base font-bold text-gray-900 mb-5">Change Password</h3>
              <div className="space-y-4 max-w-sm">
                {['Current Password', 'New Password', 'Confirm New Password'].map((label) => (
                  <div key={label}>
                    <label className="text-sm font-semibold text-gray-700 block mb-1.5">{label}</label>
                    <input type="password" placeholder="••••••••" className="input-field" />
                  </div>
                ))}
              </div>
              <button onClick={handleSave} className="btn-primary mt-6">Update Password</button>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="card">
              <h3 className="text-base font-bold text-gray-900 mb-5">Appearance</h3>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Theme Color</p>
                <div className="flex gap-3 flex-wrap">
                  {['bg-blue-600', 'bg-violet-600', 'bg-emerald-600', 'bg-rose-600', 'bg-amber-600'].map((c) => (
                    <button
                      key={c}
                      className={`w-10 h-10 rounded-xl ${c} hover:scale-110 transition-transform shadow-md ring-2 ring-offset-2 ${c === 'bg-blue-600' ? 'ring-blue-600' : 'ring-transparent'}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-4">More theme options coming soon.</p>
              </div>
              <button onClick={handleSave} className="btn-primary mt-6">Save Appearance</button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
