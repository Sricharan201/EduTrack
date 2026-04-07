import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, ArrowLeft, User } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import FormInput from '../components/FormInput';
import { students as allStudents, classes } from '../services/dummyData';

export default function StudentForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const existing = isEdit ? allStudents.find((s) => s.id === Number(id)) : null;

  const [form, setForm] = useState({
    name: existing?.name || '',
    rollNumber: existing?.rollNumber || '',
    class: existing?.class || '',
    email: existing?.email || '',
    phone: existing?.phone || '',
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(existing?.photo || null);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const fileRef = useRef();

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.rollNumber.trim()) errs.rollNumber = 'Roll number is required';
    if (!form.class) errs.class = 'Class is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    return errs;
  };

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setErrors({ ...errors, [field]: '' });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, photo: file });
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaved(true);
    setTimeout(() => navigate('/students'), 1200);
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate('/students')}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Student' : 'Add New Student'}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{isEdit ? 'Update student information' : 'Fill in the details to register a new student'}</p>
        </div>
      </div>

      {saved && (
        <div className="mb-5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 text-sm font-semibold flex items-center gap-2">
          ✓ Student {isEdit ? 'updated' : 'added'} successfully! Redirecting...
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Photo upload */}
        <div className="card flex flex-col items-center justify-center text-center py-10">
          <div
            className="w-28 h-28 rounded-full bg-gray-100 border-4 border-white shadow-lg flex items-center justify-center mb-4 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => fileRef.current.click()}
          >
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <User size={40} className="text-gray-400" />
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
          <button
            type="button"
            onClick={() => fileRef.current.click()}
            className="flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700"
          >
            <Upload size={14} />
            {photoPreview ? 'Change Photo' : 'Upload Photo'}
          </button>
          <p className="text-xs text-gray-400 mt-2">JPG, PNG up to 5MB</p>
        </div>

        {/* Form */}
        <div className="card lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormInput
                label="Full Name"
                id="name"
                value={form.name}
                onChange={handleChange('name')}
                placeholder="e.g. Aarav Sharma"
                required
                error={errors.name}
              />
              <FormInput
                label="Roll Number"
                id="rollNumber"
                value={form.rollNumber}
                onChange={handleChange('rollNumber')}
                placeholder="e.g. AG-009"
                required
                error={errors.rollNumber}
              />
              <FormInput
                label="Class"
                id="class"
                type="select"
                value={form.class}
                onChange={handleChange('class')}
                required
                error={errors.class}
                options={classes}
              />
              <FormInput
                label="Email"
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                placeholder="student@email.com"
                required
                error={errors.email}
              />
              <FormInput
                label="Phone"
                id="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange('phone')}
                placeholder="+91 99999 88888"
                required
                error={errors.phone}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary px-8">
                {isEdit ? 'Save Changes' : 'Add Student'}
              </button>
              <button type="button" onClick={() => navigate('/students')} className="btn-secondary px-8">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
