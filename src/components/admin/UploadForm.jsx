import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileCheck,
  X,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  FileText
} from 'lucide-react';
import { BRANCHES, SEMESTERS, UNITS, NOTE_TYPES } from '../../utils/constants';
import { useSubjects } from '../../hooks/useSubjects';

export function UploadForm({ initialData, onSubmit, isEdit = false }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { subjects } = useSubjects();

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    subject: initialData?.subject || 'Data Structures & Algorithms',
    branch: initialData?.branch || 'CSE',
    semester: initialData?.semester || 3,
    unit: initialData?.unit || 1,
    type: initialData?.type || NOTE_TYPES[0],
    description: initialData?.description || '',
    author: initialData?.author || 'Academic Coordinator',
    tags: initialData?.tags ? initialData.tags.join(', ') : '',
    status: initialData?.status || 'published',
  });

  const [selectedFile, setSelectedFile] = useState(
    initialData ? { name: `${initialData.title}.pdf`, size: initialData.fileSize || '3.5 MB' } : null
  );
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(initialData ? 100 : 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Only PDF documents are supported for note uploads.');
      return;
    }
    setError('');
    const formattedSize = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
    setSelectedFile({ name: file.name, size: formattedSize });

    // Simulate progress animation
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 80);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Please provide a descriptive title for this note.');
      return;
    }
    if (!selectedFile) {
      setError('Please attach a PDF document before submitting.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const tagList = formData.tags
        .split(',')
        .map(t => t.trim().toLowerCase())
        .filter(Boolean);

      await onSubmit({
        ...formData,
        tags: tagList,
        fileSize: selectedFile.size,
        pages: initialData?.pages || Math.floor(Math.random() * 25) + 15,
        pdfUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/notes');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-card max-w-4xl">
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-semibold text-sm">
              {isEdit ? 'Note updated successfully!' : 'Study material uploaded successfully!'}
            </p>
            <p className="text-emerald-700 mt-0.5">Redirecting to notes catalog…</p>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-danger text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
            Note Title <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g. Relational Calculus & Normalization Proofs"
            className="w-full bg-white border border-border rounded-xl text-sm p-3 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* 3-Column Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
              Engineering Branch
            </label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full bg-white border border-border rounded-xl text-xs p-2.5 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {BRANCHES.map(b => (
                <option key={b.id} value={b.code}>{b.code} ({b.name.split(' ')[0]})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
              Semester
            </label>
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="w-full bg-white border border-border rounded-xl text-xs p-2.5 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {SEMESTERS.map(s => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
              Unit Number
            </label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full bg-white border border-border rounded-xl text-xs p-2.5 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {UNITS.map(u => (
                <option key={u} value={u}>Unit {u}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Subject & Material Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
              Subject Name
            </label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-white border border-border rounded-xl text-xs p-2.5 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.name}>{s.name} ({s.code})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
              Material Classification
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-white border border-border rounded-xl text-xs p-2.5 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {NOTE_TYPES.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
            Academic Scope & Description
          </label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief overview of topics, derivations, formulas, or question types covered in this document…"
            className="w-full bg-white border border-border rounded-xl text-xs p-3 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Author / Professor & Keywords */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
              Author / Instructor Attribution
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="e.g. Prof. A. Sengupta"
              className="w-full bg-white border border-border rounded-xl text-xs p-2.5 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
              Tags / Keywords (Comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. sorting, bst, algorithms, pyq"
              className="w-full bg-white border border-border rounded-xl text-xs p-2.5 text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        {/* Drag-and-Drop PDF Upload Zone */}
        <div>
          <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-1.5">
            PDF Document <span className="text-danger">*</span>
          </label>

          {!selectedFile ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
                dragActive
                  ? 'border-primary bg-primary-light/50'
                  : 'border-border hover:border-slate-400 bg-slate-50/50'
              }`}
            >
              <UploadCloud className="w-10 h-10 text-primary mx-auto mb-2" />
              <p className="text-xs font-semibold text-text-primary">
                Click to browse or drag and drop your PDF here
              </p>
              <p className="text-[11px] text-text-muted mt-1">
                Standard PDF documents up to 50 MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-100 text-primary flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-text-primary truncate max-w-sm">
                      {selectedFile.name}
                    </p>
                    <p className="text-[11px] text-text-muted">{selectedFile.size}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-1 rounded-lg text-text-muted hover:text-danger hover:bg-red-50"
                  aria-label="Remove attached file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-text-muted">
                <span>{uploadProgress === 100 ? 'File verified and ready' : 'Simulating upload verification…'}</span>
                <span>{uploadProgress}%</span>
              </div>
            </div>
          )}
        </div>

        {/* Publishing Status Toggle */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-text-primary">Publishing Status</h4>
            <p className="text-[11px] text-text-secondary mt-0.5">
              Drafts remain invisible to students until published by a coordinator.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
              <input
                type="radio"
                name="status"
                value="published"
                checked={formData.status === 'published'}
                onChange={handleChange}
                className="text-primary focus:ring-primary"
              />
              <span className="text-emerald-700">Publish Immediately</span>
            </label>
            <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer ml-3">
              <input
                type="radio"
                name="status"
                value="draft"
                checked={formData.status === 'draft'}
                onChange={handleChange}
                className="text-primary focus:ring-primary"
              />
              <span className="text-amber-700">Save as Draft</span>
            </label>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-4 border-t border-border flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/notes')}
            className="px-5 py-2.5 rounded-xl border border-border text-xs font-semibold text-text-secondary hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || uploadProgress < 100}
            className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-xs flex items-center gap-2 disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Saving changes…' : isEdit ? 'Update Note' : 'Upload & Publish Note'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
