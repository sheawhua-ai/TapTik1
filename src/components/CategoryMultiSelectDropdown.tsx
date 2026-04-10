import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";

export function CategoryMultiSelectDropdown({ label, options, selected, onChange, placeholder, disabled }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeMainCategory, setActiveMainCategory] = useState<string | null>(null);
  
  // Temporary selection state while dropdown is open
  const [tempSelected, setTempSelected] = useState<string[]>([]);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTempSelected([...selected]);
      if (options.length > 0 && !activeMainCategory) {
        setActiveMainCategory(options[0].value);
      }
    }
  }, [isOpen, selected, options]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMainCategoryClick = (value: string) => {
    setActiveMainCategory(value);
  };

  const handleMainCategoryCheck = (parent: any) => {
    const parentValue = parent.value;
    const childValues = parent.subCategories.map((c: any) => c.value);
    
    // Check if all children are currently selected in tempSelected
    const allChildrenSelected = childValues.length > 0 && childValues.every((cv: string) => tempSelected.includes(cv));
    const isParentSelected = tempSelected.includes(parentValue);

    let newTemp = [...tempSelected];
    
    if (isParentSelected || allChildrenSelected) {
      // Deselect parent and all children
      newTemp = newTemp.filter(v => v !== parentValue && !childValues.includes(v));
    } else {
      // Select parent and all children
      if (!newTemp.includes(parentValue)) newTemp.push(parentValue);
      childValues.forEach((cv: string) => {
        if (!newTemp.includes(cv)) newTemp.push(cv);
      });
    }
    setTempSelected(newTemp);
  };

  const handleSubCategoryCheck = (childValue: string, parentValue: string) => {
    let newTemp = [...tempSelected];
    if (newTemp.includes(childValue)) {
      // Deselect child and parent
      newTemp = newTemp.filter(v => v !== childValue && v !== parentValue);
    } else {
      // Select child
      newTemp.push(childValue);
      // Check if all children are now selected
      const parent = options.find((o: any) => o.value === parentValue);
      const allChildrenSelected = parent.subCategories.every((c: any) => newTemp.includes(c.value) || c.value === childValue);
      if (allChildrenSelected && !newTemp.includes(parentValue)) {
        newTemp.push(parentValue);
      }
    }
    setTempSelected(newTemp);
  };

  const handleConfirm = () => {
    onChange(tempSelected);
    setIsOpen(false);
  };

  const handleClear = () => {
    setTempSelected([]);
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

  const activeParent = options.find((o: any) => o.value === activeMainCategory);

  const filteredOptions = options.map((opt: any) => {
    const matchParent = opt.label.toLowerCase().includes(search.toLowerCase());
    const matchingChildren = opt.subCategories.filter((sub: any) => sub.label.toLowerCase().includes(search.toLowerCase()));
    if (matchParent || matchingChildren.length > 0) {
      return {
        ...opt,
        subCategories: matchParent ? opt.subCategories : matchingChildren,
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
        <div className="absolute z-10 w-[400px] mt-1 bg-white border border-zinc-200 shadow-xl flex flex-col text-sm">
          <div className="p-2 border-b border-zinc-100">
            <div className="flex items-center gap-2 bg-zinc-50 px-2 py-1.5 rounded">
              <Search size={14} className="text-zinc-400" />
              <input 
                type="text" 
                placeholder="搜索" 
                className="w-full bg-transparent outline-none"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex h-[300px]">
            {/* Left Column: Main Categories */}
            <div className="w-1/2 border-r border-zinc-100 overflow-y-auto py-1">
              {filteredOptions.map((opt: any) => {
                const childValues = opt.subCategories.map((c: any) => c.value);
                const isAllSelected = tempSelected.includes(opt.value) || (childValues.length > 0 && childValues.every((cv: string) => tempSelected.includes(cv)));
                const isPartiallySelected = !isAllSelected && childValues.some((cv: string) => tempSelected.includes(cv));

                return (
                  <div 
                    key={opt.value}
                    className={`flex items-center justify-between px-3 py-2 cursor-pointer ${activeMainCategory === opt.value ? 'bg-zinc-100 font-bold' : 'hover:bg-zinc-50'}`}
                    onClick={() => handleMainCategoryClick(opt.value)}
                  >
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={isAllSelected}
                        ref={input => {
                          if (input) {
                            input.indeterminate = isPartiallySelected;
                          }
                        }}
                        onChange={() => handleMainCategoryCheck(opt)}
                        onClick={(e) => e.stopPropagation()}
                        className="accent-[#00d1b2]"
                      />
                      <span>{opt.label}</span>
                    </div>
                    <ChevronRight size={14} className="text-zinc-400" />
                  </div>
                );
              })}
              {filteredOptions.length === 0 && (
                <div className="p-4 text-zinc-400 text-center text-xs">无匹配项</div>
              )}
            </div>
            
            {/* Right Column: Sub Categories */}
            <div className="w-1/2 overflow-y-auto py-1 bg-zinc-50/50">
              {activeParent && activeParent.subCategories.map((sub: any) => (
                <div 
                  key={sub.value}
                  className="flex items-center px-4 py-2 hover:bg-zinc-100 cursor-pointer"
                  onClick={() => handleSubCategoryCheck(sub.value, activeParent.value)}
                >
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={tempSelected.includes(sub.value)}
                      onChange={() => {}} // Handled by parent div click
                      className="accent-[#00d1b2]"
                    />
                    <span>{sub.label}</span>
                  </div>
                </div>
              ))}
              {(!activeParent || activeParent.subCategories.length === 0) && (
                <div className="p-4 text-zinc-400 text-center text-xs">无子分类</div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-zinc-100 flex justify-between items-center bg-white">
            <button onClick={handleClear} className="text-[#00d1b2] hover:text-[#00c0a3] text-xs">清除</button>
            <div className="flex gap-2">
              <button onClick={() => setIsOpen(false)} className="px-4 py-1.5 border border-zinc-200 text-xs hover:border-black transition-colors">取消</button>
              <button onClick={handleConfirm} className="px-4 py-1.5 bg-[#00d1b2] text-white text-xs hover:bg-[#00c0a3] transition-colors border border-[#00d1b2]">确定</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
