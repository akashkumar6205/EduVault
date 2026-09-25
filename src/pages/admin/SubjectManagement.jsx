import React from 'react';
import { SubjectTable } from '../../components/admin/SubjectTable';
import { useSubjects } from '../../hooks/useSubjects';
import { createSubject, updateSubject, deleteSubject } from '../../services/subjectsService';

export function SubjectManagement() {
  const { subjects, isLoading, refetch } = useSubjects();

  const handleCreate = async (data) => {
    await createSubject(data);
    refetch();
  };

  const handleUpdate = async (id, data) => {
    await updateSubject(id, data);
    refetch();
  };

  const handleDelete = async (id) => {
    await deleteSubject(id);
    refetch();
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="pb-4 border-b border-border">
        <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
          Curriculum Subject Management
        </h1>
        <p className="text-xs text-text-secondary mt-0.5">
          Define and organize syllabus subjects across all university semesters and departments
        </p>
      </div>

      <SubjectTable
        subjects={subjects}
        onCreateSubject={handleCreate}
        onUpdateSubject={handleUpdate}
        onDeleteSubject={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
