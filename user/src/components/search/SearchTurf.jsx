import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

const SearchTurf = ({ value, onChange, autoFocus = false, children }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  return (
    <div className="flex items-center gap-2 rounded-2xl border border-base-300 bg-base-100 px-3 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25">
      <Search size={20} className="shrink-0 opacity-60" aria-hidden="true" />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, town or sport"
        aria-label="Search turfs"
        className="h-[52px] w-full min-w-0 bg-transparent text-base outline-none [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="btn btn-circle btn-ghost btn-xs"
        >
          <X size={14} />
        </button>
      )}
      {children}
    </div>
  );
};

export default SearchTurf;
