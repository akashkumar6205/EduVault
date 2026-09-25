import React, { useState } from 'react';
import { Download, Check } from 'lucide-react';
import { incrementDownloads } from '../services/notesService';
import { cn } from '../utils/formatters';

export function DownloadButton({ note, className = '', variant = 'outline' }) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDownloading(true);
    try {
      await incrementDownloads(note.id);
      
      // Simulate real download by opening link or triggering anchor
      const link = document.createElement('a');
      link.href = note.pdfUrl || '#';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.download = `${note.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  };

  const isPrimary = variant === 'primary';

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={downloading}
      title="Download PDF"
      className={cn(
        'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
        isPrimary
          ? 'bg-primary text-white hover:bg-primary-hover shadow-sm active:scale-98'
          : 'bg-white border border-border text-text-primary hover:bg-gray-50 active:bg-gray-100',
        downloading && 'opacity-70 cursor-wait',
        className
      )}
    >
      {downloaded ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
          <span className="text-emerald-700">Downloaded</span>
        </>
      ) : (
        <>
          <Download className="w-3.5 h-3.5" />
          <span>{downloading ? 'Downloading…' : 'Download'}</span>
        </>
      )}
    </button>
  );
}
