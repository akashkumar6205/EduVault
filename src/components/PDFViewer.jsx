import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Download,
  Bookmark,
  FileText,
  RotateCw,
  Printer
} from 'lucide-react';
import { BookmarkButton } from './BookmarkButton';
import { DownloadButton } from './DownloadButton';
import { cn } from '../utils/formatters';

export function PDFViewer({ note, onReport }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalPages = note.pages || 32;

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(p => p + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(p => p - 1);
  };

  const handleZoomIn = () => {
    if (zoom < 150) setZoom(z => z + 10);
  };

  const handleZoomOut = () => {
    if (zoom > 70) setZoom(z => z - 10);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={cn(
        'bg-slate-900 rounded-xl overflow-hidden shadow-modal flex flex-col transition-all duration-200 border border-slate-700',
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[680px] w-full'
      )}
    >
      {/* Top Toolbar */}
      <div className="bg-slate-800/90 backdrop-blur-xs border-b border-slate-700 px-4 py-2.5 flex items-center justify-between text-white shrink-0 flex-wrap gap-2">
        {/* Left: Document info */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-slate-100 truncate block max-w-[200px] sm:max-w-xs">
              {note.title}.pdf
            </span>
            <span className="text-[10px] text-slate-400 block">
              {note.fileSize} • {note.type}
            </span>
          </div>
        </div>

        {/* Center: Page Navigation & Zoom controls */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Pagination */}
          <div className="flex items-center gap-1 bg-slate-700/60 rounded-lg px-2 py-1 text-xs">
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="p-0.5 rounded text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-200 px-1 font-mono">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="p-0.5 rounded text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Zoom */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-700/60 rounded-lg px-2 py-1 text-xs">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 70}
              className="p-0.5 rounded text-slate-300 hover:text-white disabled:opacity-30"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs text-slate-200 px-1 font-mono w-10 text-center">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 150}
              className="p-0.5 rounded text-slate-300 hover:text-white disabled:opacity-30"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          <DownloadButton
            note={note}
            variant="primary"
            className="text-xs py-1 px-2.5 h-8 bg-indigo-600 hover:bg-indigo-500 text-white"
          />
          <BookmarkButton
            noteId={note.id}
            className="text-slate-300 hover:text-white hover:bg-slate-700 h-8 w-8 p-0"
          />
          <button
            type="button"
            onClick={toggleFullscreen}
            className="hidden sm:flex p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            aria-label="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Document View Canvas Area */}
      <div className="flex-1 overflow-auto bg-slate-950 p-4 sm:p-8 flex justify-center items-start">
        <div
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          className="transition-transform duration-150 w-full max-w-2xl bg-white shadow-2xl rounded-sm p-8 sm:p-12 text-slate-900 border border-slate-200"
        >
          {/* Simulated University Header */}
          <div className="border-b-2 border-slate-800 pb-4 mb-6 text-center">
            <p className="text-[10px] tracking-widest uppercase font-semibold text-slate-500">
              Department of {note.branch} Engineering • Academic Resource
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {note.subject}
            </h2>
            <div className="flex items-center justify-center gap-4 text-xs text-slate-600 mt-2">
              <span className="font-semibold">Semester {note.semester}</span>
              <span>•</span>
              <span className="font-semibold">Unit {note.unit}</span>
              <span>•</span>
              <span>{note.type}</span>
            </div>
          </div>

          {/* Document Section Content */}
          <div className="space-y-6 text-sm text-slate-800 leading-relaxed font-serif">
            <div>
              <h3 className="text-base font-bold font-sans text-slate-900 pb-1 mb-2 border-b border-slate-200">
                1.{currentPage} — {note.title}
              </h3>
              <p className="text-justify text-xs sm:text-sm text-slate-700">
                {note.description}
              </p>
            </div>

            {/* Simulated Diagram / Formulas based on subject */}
            <div className="my-6 p-4 rounded bg-slate-50 border border-slate-300 font-mono text-xs text-slate-800">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-sans font-semibold">
                Theorem & Theoretical Formulation
              </div>
              <div className="bg-white p-3 rounded border border-slate-200 text-center font-bold text-slate-900 space-y-1">
                <div>∀ x ∈ S,  T(n) = a T(n/b) + f(n)</div>
                <div className="text-[11px] text-slate-600 font-normal">
                  Case 1: If f(n) = O(n^(log_b(a) - ε)), then T(n) = Θ(n^(log_b(a)))
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <p>
                <strong>Key Principles & Methodology:</strong> The structure follows standard curricular syllabi verified by the academic committee. All derivations assume ideal steady-state response and zero initial perturbation unless otherwise annotated.
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs">
                <li>Strict time complexity constraints apply across all boundary representations.</li>
                <li>Verification with university model examination guidelines.</li>
                <li>Practical algorithmic implementations tested under standard benchmark environments.</li>
              </ul>
            </div>

            {/* Page Footer */}
            <div className="pt-8 mt-12 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400 font-sans">
              <span>Eduvault Verified Document • {note.author || 'Academic Coordinator'}</span>
              <span>Page {currentPage} of {totalPages}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="sm:hidden bg-slate-900 border-t border-slate-800 p-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="p-1 rounded bg-slate-800 text-slate-300 disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-slate-300 font-mono">
            {currentPage}/{totalPages}
          </span>
          <button
            type="button"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="p-1 rounded bg-slate-800 text-slate-300 disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <DownloadButton note={note} variant="primary" className="py-1 px-3 text-xs" />
          <BookmarkButton noteId={note.id} className="text-white hover:bg-slate-800 p-1.5" />
        </div>
      </div>
    </div>
  );
}
