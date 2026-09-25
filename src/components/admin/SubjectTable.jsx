import React, { useState } from 'react';
import { Edit2, Trash2, Plus, AlertTriangle, BookOpen } from 'lucide-react';
import { Modal } from '../Modal';
import { BRANCHES, SEMESTERS } from '../../utils/constants';

export function SubjectTable({
  subjects = [],
  onCreateSubject,
  onUpdateSubject,
  onDeleteSubject,
  isLoading = false
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    branch: 'CSE',
    semester: 3,
    description: '',
    status: 'active'
  });

  const openCreateModal = () => {
    setEditingSubject(null);
    setFormData({
      code: '',
      name: '',
      branch: 'CSE',
      semester: 3,
      description: '',
      status: 'active'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (subject) => {
    setEditingSubject(subject);
    setFormData({
      code: subject.code,
      name: subject.name,
      branch: subject.branch,
      semester: subject.semester,
      description: subject.description,
      status: subject.status || 'active'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.code) return;

    if (editingSubject) {
      await onUpdateSubject(editingSubject.id, formData);
    } else {
      await onCreateSubject(formData);
    }
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await onDeleteSubject(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-text-primary">Curriculum Subjects</h2>
          <p className="text-xs text-text-secondary">Organized across branches and semesters</p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Subject</span>
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-border text-text-secondary uppercase text-[11px] font-semibold tracking-wider">
                <th className="py-3 px-4">Subject Code</th>
                <th className="py-3 px-4">Subject Name & Description</th>
                <th className="py-3 px-4">Branch</th>
                <th className="py-3 px-4">Semester</th>
                <th className="py-3 px-4">Materials</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subjects.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                    {sub.code}
                  </td>
                  <td className="py-3.5 px-4 max-w-sm">
                    <p className="font-semibold text-text-primary">{sub.name}</p>
                    <p className="text-text-muted text-[11px] line-clamp-1 mt-0.5">
                      {sub.description}
                    </p>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-text-primary">
                    {sub.branch}
                  </td>
                  <td className="py-3.5 px-4 text-text-secondary">
                    Semester {sub.semester}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-primary">
                    {sub.noteCount || 0} notes
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEditModal(sub)}
                        className="p-1.5 text-text-secondary hover:text-primary hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit subject"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(sub)}
                        className="p-1.5 text-text-secondary hover:text-danger hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete subject"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSubject ? 'Edit Curriculum Subject' : 'Add New Subject'}
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-text-primary mb-1">
                Subject Code <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="e.g. CS401"
                required
                className="w-full bg-white border border-border rounded-lg p-2.5 uppercase font-mono focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-text-primary mb-1">
                Branch <span className="text-danger">*</span>
              </label>
              <select
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full bg-white border border-border rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:outline-none"
              >
                {BRANCHES.map(b => (
                  <option key={b.id} value={b.code}>{b.code}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-text-primary mb-1">
              Full Subject Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Operating Systems Architecture"
              required
              className="w-full bg-white border border-border rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-text-primary mb-1">
              Semester
            </label>
            <select
              value={formData.semester}
              onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })}
              className="w-full bg-white border border-border rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:outline-none"
            >
              {SEMESTERS.map(s => (
                <option key={s} value={s}>Semester {s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-text-primary mb-1">
              Course Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Key units and topic coverage for this syllabus course…"
              className="w-full bg-white border border-border rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-border flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-border text-text-secondary hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover shadow-xs"
            >
              {editingSubject ? 'Save Changes' : 'Create Subject'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Subject Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Confirm Subject Deletion"
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-red-50 text-danger rounded-xl border border-red-200 flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p>
              Are you sure you want to remove <strong>"{deleteTarget?.name}" ({deleteTarget?.code})</strong>?
              Associated notes will need to be reassigned.
            </p>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="px-4 py-2 rounded-lg border border-border text-text-secondary hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              className="px-4 py-2 rounded-lg bg-danger text-white font-medium hover:bg-danger-dark shadow-xs"
            >
              Delete Subject
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
