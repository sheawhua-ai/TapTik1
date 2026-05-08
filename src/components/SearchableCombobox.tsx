import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface SearchableComboboxProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchableCombobox({ options, value, onChange, placeholder = "搜索...", className = "" }: SearchableComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value);
  const displayValue = isOpen ? search : (selectedOption ? selectedOption.label : "");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(o => 
    o.label.toLowerCase().includes(search.toLowerCase()) || 
    o.value.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`relative ${className}`} ref={wrapperRef}>
      <div 
        className="flex items-center w-full border border-zinc-200 bg-white group focus-within:border-black"
        onClick={() => setIsOpen(true)}
      >
        <input
          type="text"
          className="w-full px-3 py-2 text-sm focus:outline-none focus:ring-0 bg-transparent"
          value={displayValue}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
        />
        <ChevronDown size={16} className="text-zinc-400 mr-3 cursor-pointer flex-shrink-0" />
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-zinc-200 shadow-xl max-h-60 overflow-y-auto">
          <div className="py-1">
            <div 
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-zinc-50 ${!value ? 'font-bold bg-zinc-50/50' : ''}`}
              onClick={() => {
                onChange('');
                setIsOpen(false);
                setSearch('');
              }}
            >
              未选择 (跳过)
            </div>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-zinc-50 ${value === option.value ? 'font-bold bg-zinc-50/50' : ''}`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setSearch('');
                  }}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-sm text-zinc-500">
                无匹配项
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
