import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";

export function MultiSelectDropdown({ label, options, selected, onChange, placeholder, disabled }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((o: any) => o.label.toLowerCase().includes(search.toLowerCase()));
  
  return (
    <div className="relative" ref={dropdownRef}>
      {label && <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">{label}</label>}
      <div 
        className={`w-full border border-zinc-200 px-3 py-2 text-sm bg-white flex justify-between items-center ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="truncate text-zinc-600">
          {selected.length > 0 
            ? selected.map((s: any) => options.find((o: any) => o.value === s)?.label).join(', ') 
            : placeholder}
        </span>
        <ChevronDown size={14} className="text-zinc-400" />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-zinc-200 shadow-lg max-h-60 flex flex-col">
          <div className="p-2 border-b border-zinc-100 flex items-center gap-2 bg-zinc-50">
            <Search size={14} className="text-zinc-400" />
            <input 
              type="text" 
              placeholder="搜索..." 
              className="w-full bg-transparent text-xs outline-none"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="overflow-y-auto p-1 flex flex-col">
            {filteredOptions.length > 0 ? filteredOptions.map((opt: any) => (
              <label key={opt.value} className="flex items-center gap-2 text-xs cursor-pointer hover:bg-zinc-50 p-2">
                <input 
                  type="checkbox" 
                  checked={selected.includes(opt.value)}
                  onChange={() => {
                    if (selected.includes(opt.value)) onChange(selected.filter((v: any) => v !== opt.value));
                    else onChange([...selected, opt.value]);
                  }}
                  className="accent-black"
                />
                {opt.label}
              </label>
            )) : (
              <div className="p-2 text-xs text-zinc-400 text-center">无匹配项</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
