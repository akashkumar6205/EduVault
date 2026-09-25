import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Lock, Mail, User, Building, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { BRANCHES, SEMESTERS } from '../../utils/constants';

export function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    branch: 'CSE',
    semester: 3
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.college) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await register(formData);
      navigate('/notes');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-6 sm:my-10 bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-card">
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mx-auto mb-3">
          <GraduationCap className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-text-primary">Create Student Account</h1>
        <p className="text-xs text-text-secondary mt-1">
          Join your engineering peers to access and bookmark verified course materials
        </p>
      </div>

      {error && (
        <div className="p-3 mb-4 rounded-lg bg-red-50 border border-red-200 text-danger text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">
            Full Name <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Priya Sharma"
              className="w-full bg-white border border-border rounded-xl text-xs py-2.5 pl-9 pr-3 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        {/* College Email */}
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">
            Student Email Address <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="name@student.edu"
              className="w-full bg-white border border-border rounded-xl text-xs py-2.5 pl-9 pr-3 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">
            Create Password <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="At least 6 characters"
              className="w-full bg-white border border-border rounded-xl text-xs py-2.5 pl-9 pr-3 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        {/* College / University */}
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">
            College / Institute Name <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              required
              placeholder="e.g. National Institute of Technology"
              className="w-full bg-white border border-border rounded-xl text-xs py-2.5 pl-9 pr-3 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Branch & Semester */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Engineering Branch
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full bg-white border border-border rounded-xl text-xs p-2.5 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {BRANCHES.map(b => (
                <option key={b.id} value={b.code}>
                  {b.code} ({b.name.split(' ')[0]})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Current Semester
            </label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full bg-white border border-border rounded-xl text-xs p-2.5 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {SEMESTERS.map(s => (
                <option key={s} value={s}>
                  Semester {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-[11px] text-text-muted">
          By signing up, you agree to access educational notes solely for academic revision and personal study.
        </p>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-hover transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span>{isLoading ? 'Creating account…' : 'Complete Registration'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="text-center mt-6 text-xs text-text-secondary">
        Already have a student account?{' '}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
