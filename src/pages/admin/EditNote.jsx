import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { UploadForm } from '../../components/admin/UploadForm';
import { getNoteById, updateNote } from '../../services/notesService';

export function EditNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const found = await getNoteById(id);
        setNote(found);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [id]);

  const handleUpdate = async (noteData) => {
    return await updateNote(id, noteData);
  };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
        <div className="h-40 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="text-center py-12">
        <p className="text-sm font-semibold">Note not found</p>
        <Link to="/admin/notes" className="text-xs text-primary underline mt-2 block">
          Return to notes table
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div>
          <Link
            to="/admin/notes"
            className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary mb-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Notes Catalog</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
            Edit Note: {note.title}
          </h1>
          <p className="text-xs text-text-secondary mt-0.5">
            Modify syllabus classification, replace document PDF, or change status
          </p>
        </div>
      </div>

      <UploadForm initialData={note} onSubmit={handleUpdate} isEdit={true} />
    </div>
  );
}
