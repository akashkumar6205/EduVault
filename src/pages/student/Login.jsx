import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function Login() {
  const [email, setEmail] = useState('priya.s@student.edu');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/notes';
  const notice = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const setDemoStudent = (emailStr) => {
    setEmail(emailStr);
    setPassword('password123');
  };

  return (
    <div className="max-w-md mx-auto my-6 sm:my-10 bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-card">
      <div className="text-center mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mx-auto mb-3">
          <GraduationCap className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-text-primary">Student Sign In</h1>
        <p className="text-xs text-text-secondary mt-1">
          Access your personalized study bookmarks and recent history
        </p>
      </div>

      {notice && (
        <div className="p-3 mb-4 rounded-lg bg-amber-50 border border-amber-200 text-warning-dark text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-warning" />
          <span>{notice}</span>
        </div>
      )}

      {error && (
        <div className="p-3 mb-4 rounded-lg bg-red-50 border border-red-200 text-danger text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">
            Student Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="e.g. priya.s@student.edu"
              className="w-full bg-white border border-border rounded-xl text-xs py-2.5 pl-9 pr-3 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-text-primary">
              Password
            </label>
            <span className="text-[11px] text-text-muted">Default: password123</span>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white border border-border rounded-xl text-xs py-2.5 pl-9 pr-3 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-hover transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span>{isLoading ? 'Signing in…' : 'Sign In'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Demo Student Fast Logins */}
      <div className="mt-6 pt-5 border-t border-border">
        <p className="text-[11px] font-medium text-text-secondary text-center mb-2">
          Demo student accounts (click to fill):
        </p>
        <div className="flex flex-wrap gap-1.5 justify-center">
          <button
            type="button"
            onClick={() => setDemoStudent('priya.s@student.edu')}
            className="text-[11px] px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            Priya (CSE Sem 3)
          </button>
          <button
            type="button"
            onClick={() => setDemoStudent('rahul.v@student.edu')}
            className="text-[11px] px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            Rahul (CSE Sem 4)
          </button>
          <button
            type="button"
            onClick={() => setDemoStudent('ananya.i@student.edu')}
            className="text-[11px] px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            Ananya (ECE Sem 3)
          </button>
        </div>
      </div>

      <div className="text-center mt-6 text-xs text-text-secondary">
        Don't have an account yet?{' '}
        <Link to="/register" className="font-semibold text-primary hover:underline">
          Create student account
        </Link>
      </div>
    </div>
  );
}
