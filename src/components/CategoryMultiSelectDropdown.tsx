import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";

export function CategoryMultiSelectDropdown({ label, options, selected, onChange, placeholder, disabled }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string[]>([]);
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

  const toggleExpand = (value: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const handleParentChange = (parent: any) => {
    const parentValue = parent.value;
    const childValues = parent.subCategories.map((c: any) => c.value);
    const isParentSelected = selected.includes(parentValue);

    let newSelected = [...selected];
    if (isParentSelected) {
      newSelected = newSelected.filter(v => v !== parentValue && !childValues.includes(v));
    } else {
      if (!newSelected.includes(parentValue)) newSelected.push(parentValue);
      childValues.forEach((cv: string) => {
        if (!newSelected.includes(cv)) newSelected.push(cv);
      });
    }
    onChange(newSelected);
  };

  const handleChildChange = (childValue: string, parentValue: string) => {
    let newSelected = [...selected];
    if (newSelected.includes(childValue)) {
      newSelected = newSelected.filter(v => v !== childValue);
      newSelected = newSelected.filter(v => v !== parentValue);
    } else {
      newSelected.push(childValue);
      const parent = options.find((o: any) => o.value === parentValue);
      const allChildrenSelected = parent.subCategories.every((c: any) => newSelected.includes(c.value) || c.value === childValue);
      if (allChildrenSelected && !newSelected.includes(parentValue)) {
        newSelected.push(parentValue);
      }
    }
    onChange(newSelected);
  };

  const getDisplayValue = () => {
    if (selected.length === 0) return placeholder;
    const labels: string[] = [];
    options.forEach((opt: any) => {
      if (selected.includes(opt.value)) {
        labels.push(opt.label);
      } else {
        opt.subCategories.forEach((sub: any) => {
          if (selected.includes(sub.value)) {
            labels.push(sub.label);
          }
        });
      }
    });
    return labels.join(', ');
  };

  const filteredOptions = options.map((opt: any) => {
    const matchParent = opt.label.toLowerCase().includes(search.toLowerCase());
    const matchingChildren = opt.subCategories.filter((sub: any) => sub.label.toLowerCase().includes(search.toLowerCase()));
    if (matchParent || matchingChildren.length > 0) {
      return {
        ...opt,
        subCategories: matchParent ? opt.subCategories : matchingChildren,
        isExpanded: search ? true : expanded.includes(opt.value)
      };
    }
    return null;
  }).filter(Boolean);

  return (
    <div className="relative" ref={dropdownRef}>
      {label && <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">{label}</label>}
      <div 
        className={`w-full border border-zinc-200 px-3 py-2 text-sm bg-white flex justify-between items-center ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className="truncate text-zinc-600">
          {getDisplayValue()}
        </span>
        <ChevronDown size={14} className="text-zinc-400" />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-zinc-200 shadow-lg max-h-80 flex flex-col">
          <div className="p-2 border-b border-zinc-100 flex items-center gap-2 bg-zinc-50">
            <Search size={14} className="text-zinc-400" />
            <input 
              type="text" 
              placeholder="搜索分类..." 
              className="w-full bg-transparent text-xs outline-none"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="overflow-y-auto p-1 flex flex-col">
            {filteredOptions.length > 0 ? filteredOptions.map((opt: any) => (
              <div key={opt.value} className="flex flex-col">
                <div className="flex items-center gap-1 hover:bg-zinc-50 p-1.5 rounded">
                  <button onClick={(e) => toggleExpand(opt.value, e)} className="p-0.5 text-zinc-400 hover:text-black">
                    {opt.isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                  <label className="flex items-center gap-2 text-xs cursor-pointer flex-1">
                    <input 
                      type="checkbox" 
                      checked={selected.includes(opt.value)}
                      onChange={() => handleParentChange(opt)}
                      className="accent-black"
                    />
                    <span className="font-bold">{opt.label}</span>
                  </label>
                </div>
                {opt.isExpanded && (
                  <div className="pl-6 flex flex-col gap-1 mb-1">
                    {opt.subCategories.map((sub: any) => (
                      <label key={sub.value} className="flex items-center gap-2 text-xs cursor-pointer hover:bg-zinc-50 p-1.5 rounded">
                        <input 
                          type="checkbox" 
                          checked={selected.includes(sub.value)}
                          onChange={() => handleChildChange(sub.value, opt.value)}
                          className="accent-black"
                        />
                        {sub.label}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )) : (
              <div className="p-2 text-xs text-zinc-400 text-center">无匹配项</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
