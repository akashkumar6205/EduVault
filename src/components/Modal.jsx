import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-lg',
  className = '',
  isBottomSheet = false
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            aria-hidden="true"
          />

          {/* Modal Dialog Content */}
          <motion.div
            initial={{ opacity: 0, y: isBottomSheet ? 40 : 16, scale: isBottomSheet ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isBottomSheet ? 40 : 16, scale: isBottomSheet ? 1 : 0.98 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`relative w-full ${maxWidth} bg-surface rounded-t-2xl sm:rounded-2xl shadow-modal border border-border overflow-hidden z-10 flex flex-col max-h-[90vh] ${className}`}
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            {(title || subtitle) && (
              <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-slate-50/50">
                <div>
                  {title && <h3 className="text-base font-semibold text-text-primary">{title}</h3>}
                  {subtitle && <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-primary focus:outline-none"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Body */}
            <div className="p-6 overflow-y-auto">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
