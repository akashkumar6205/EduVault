import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/formatters';

export function SearchBar({
  placeholder = 'Search notes, subjects, units, topics…',
  initialValue = '',
  onSearch,
  variant = 'compact',
  className = '',
  autoNavigate = false
}) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
    if (autoNavigate && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  const isHero = variant === 'hero';

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('relative flex items-center w-full', className)}
    >
      <div className={cn(
        'absolute left-3.5 text-text-muted flex items-center pointer-events-none',
        isHero ? 'left-5' : 'left-3.5'
      )}>
        <Search className={cn('stroke-[2]', isHero ? 'w-5 h-5 text-primary' : 'w-4 h-4 text-text-muted')} />
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (onSearch && !autoNavigate) {
            onSearch(e.target.value);
          }
        }}
        placeholder={placeholder}
        className={cn(
          'w-full bg-white border border-border text-text-primary placeholder:text-text-muted rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          isHero
            ? 'py-4 pl-14 pr-28 text-base shadow-card-hover font-normal'
            : 'py-2 pl-9 pr-8 text-xs sm:text-sm'
        )}
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className={cn(
            'absolute text-text-muted hover:text-text-primary p-1 rounded-full hover:bg-gray-100 transition-colors',
            isHero ? 'right-24' : 'right-2.5'
          )}
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {isHero && (
        <button
          type="submit"
          className="absolute right-2.5 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
        >
          Search
        </button>
      )}
    </form>
  );
}
