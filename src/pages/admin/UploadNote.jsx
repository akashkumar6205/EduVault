import React from 'react';
import { UploadForm } from '../../components/admin/UploadForm';
import { createNote } from '../../services/notesService';

export function UploadNote() {
  const handleCreate = async (noteData) => {
    return await createNote(noteData);
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="pb-4 border-b border-border">
        <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
          Upload New Study Material
        </h1>
        <p className="text-xs text-text-secondary mt-0.5">
          Add syllabus lecture notes, formulas, or question banks directly to the repository
        </p>
      </div>

      <UploadForm onSubmit={handleCreate} isEdit={false} />
    </div>
  );
}
