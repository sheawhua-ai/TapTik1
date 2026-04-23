import { useState, useRef, useEffect } from "react";
import { Plus, X, AlertCircle, ChevronDown, Search } from "lucide-react";

function MultiSelectDropdown({ label, options, selected, onChange, placeholder }: any) {
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
      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">{label}</label>
      <div 
        className="w-full border border-zinc-200 px-3 py-2 text-sm bg-white cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
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

export function MarkupStrategy() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [strategyName, setStrategyName] = useState('');
  const [markupRate, setMarkupRate] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isSelfOperatedPriority, setIsSelfOperatedPriority] = useState(true);

  const markupValue = Number(markupRate) || 0;
  const isSaveDisabled = !strategyName || !markupRate;

  const supplyPrice = 100;
  const sellingPrice = markupValue ? (supplyPrice * (1 + markupValue / 100)).toFixed(2) : '0.00';
  const profit = markupValue ? (Number(sellingPrice) - supplyPrice).toFixed(2) : '0.00';
  const calculatedGrossMargin = markupValue ? ((markupValue / (100 + markupValue)) * 100).toFixed(2) : '0.00';

  const brands = [
    { value: 'chanel', label: 'CHANEL' },
    { value: 'rolex', label: 'Rolex' },
    { value: 'represent', label: 'Represent' },
  ];

  const categories = [
    { value: 'clothing', label: '服饰' },
    { value: 'watches', label: '腕表' },
    { value: 'bags', label: '包袋' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-6 md:mb-8 gap-4">
        <div>
          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">Distributor Dashboard</div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-2">配置加价策略</h1>
          <p className="text-xs md:text-sm text-zinc-500">设置您的分销利润空间和定价规则</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          新增策略
        </button>
      </div>

      {/* Self-operated Priority Toggle */}
      <div className="bg-white border border-zinc-200 p-4 md:p-6 mb-6 md:mb-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-sm md:text-base font-black tracking-tight">自营优先</h2>
            <div className="group relative">
              <AlertCircle size={14} className="text-zinc-400 cursor-help" />
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 bottom-full mb-2 w-48 md:w-64 bg-black text-white text-xs p-2 hidden group-hover:block z-10 text-center">
                开启时，商品优先展现自营有库存的 SKU 价格。关闭时，按 SKU 最低供应价展现。
              </div>
            </div>
          </div>
          <p className="text-[10px] md:text-xs text-zinc-500">
            {isSelfOperatedPriority 
              ? "当前状态：已开启。商品优先展现自营有库存的 SKU 价格。" 
              : "当前状态：已关闭。商品按 SKU 最低供应价展现。"}
          </p>
        </div>
        <label className="relative flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={isSelfOperatedPriority}
            onChange={(e) => setIsSelfOperatedPriority(e.target.checked)}
          />
          <div className="w-11 h-6 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
        </label>
      </div>

      <div className="bg-white border border-zinc-200 shadow-sm">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          <div className="col-span-4">策略名称</div>
          <div className="col-span-4">适用范围 (品牌/分类)</div>
          <div className="col-span-2 text-center">加价规则</div>
          <div className="col-span-2 text-right">操作</div>
        </div>

        {/* Strategy Row 1 */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 px-4 md:px-6 py-4 md:py-6 border-b border-zinc-200 md:items-center hover:bg-zinc-50 transition-colors">
          <div className="md:col-span-4 flex justify-between items-start md:block">
            <div>
              <div className="text-sm font-bold">默认全局加价</div>
              <div className="text-[10px] text-zinc-400 mt-1">创建于 2024-01-01</div>
            </div>
            <div className="md:hidden">
              <button className="text-xs font-bold text-zinc-500 hover:text-black transition-colors mr-3 border border-zinc-200 px-3 py-1">编辑</button>
              <button className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors border border-red-200 px-3 py-1 bg-red-50">删除</button>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-wrap gap-1">
            <span className="bg-zinc-100 text-zinc-600 px-2 py-1 text-[10px] font-bold">全部品牌</span>
            <span className="bg-zinc-100 text-zinc-600 px-2 py-1 text-[10px] font-bold">全部分类</span>
          </div>
          <div className="md:col-span-2 flex justify-between items-center md:block md:text-center mt-2 md:mt-0">
            <div className="text-xs text-zinc-500 md:hidden">加价规则</div>
            <div className="text-right md:text-center">
              <div className="text-sm font-bold text-emerald-600">+ 15%</div>
              <div className="text-[10px] text-zinc-400 mt-1">毛利率约 13.0%</div>
            </div>
          </div>
          <div className="hidden md:block col-span-2 text-right">
            <button className="text-xs font-bold text-zinc-500 hover:text-black transition-colors mr-4">编辑</button>
            <button className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors">删除</button>
          </div>
        </div>

        {/* Strategy Row 2 */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 px-4 md:px-6 py-4 md:py-6 border-b border-zinc-200 md:items-center hover:bg-zinc-50 transition-colors">
          <div className="md:col-span-4 flex justify-between items-start md:block">
            <div>
              <div className="text-sm font-bold">高奢腕表策略</div>
              <div className="text-[10px] text-zinc-400 mt-1">创建于 2024-03-15</div>
            </div>
            <div className="md:hidden">
              <button className="text-xs font-bold text-zinc-500 hover:text-black transition-colors mr-3 border border-zinc-200 px-3 py-1">编辑</button>
              <button className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors border border-red-200 px-3 py-1 bg-red-50">删除</button>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-wrap gap-1">
            {/* Brands */}
            <span className="bg-zinc-100 text-zinc-600 px-2 py-1 text-[10px] font-bold">Rolex</span>
            <span className="bg-zinc-100 text-zinc-600 px-2 py-1 text-[10px] font-bold">Patek Philippe</span>
            <span className="bg-zinc-100 text-zinc-600 px-2 py-1 text-[10px] font-bold">3+</span>
            {/* Categories */}
            <span className="bg-orange-50 text-orange-600 px-2 py-1 text-[10px] font-bold">腕表</span>
          </div>
          <div className="md:col-span-2 flex justify-between items-center md:block md:text-center mt-2 md:mt-0">
            <div className="text-xs text-zinc-500 md:hidden">加价规则</div>
            <div className="text-right md:text-center">
              <div className="text-sm font-bold text-emerald-600">+ 8%</div>
              <div className="text-[10px] text-zinc-400 mt-1">毛利率约 7.4%</div>
            </div>
          </div>
          <div className="hidden md:block col-span-2 text-right">
            <button className="text-xs font-bold text-zinc-500 hover:text-black transition-colors mr-4">编辑</button>
            <button className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors">删除</button>
          </div>
        </div>
      </div>

      {/* Add Strategy Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-[600px] shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-zinc-100 flex-shrink-0">
              <h2 className="text-base md:text-lg font-black uppercase tracking-tight">新增加价策略</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-black transition-colors"><X size={20} /></button>
            </div>
            
            <div className="p-4 md:p-6 space-y-6 overflow-y-auto flex-1">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">策略名称</label>
                <input 
                  type="text" 
                  value={strategyName}
                  onChange={(e) => setStrategyName(e.target.value)}
                  placeholder="例如：美妆类目加价" 
                  className="w-full border border-zinc-200 px-3 py-2 text-sm focus:border-black focus:ring-0 outline-none" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MultiSelectDropdown 
                  label="适用品牌 (可选)" 
                  options={brands} 
                  selected={selectedBrands} 
                  onChange={setSelectedBrands} 
                  placeholder="全部品牌" 
                />
                <MultiSelectDropdown 
                  label="适用分类 (可选)" 
                  options={categories} 
                  selected={selectedCategories} 
                  onChange={setSelectedCategories} 
                  placeholder="全部分类" 
                />
              </div>

              <div className="border-t border-zinc-100 pt-6">
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">顺加加价率 (%)</label>
                <div className="flex items-center gap-2 mb-3">
                  <input 
                    type="number" 
                    placeholder="例如: 25" 
                    value={markupRate}
                    onChange={(e) => setMarkupRate(e.target.value)}
                    className="w-full md:w-32 border border-zinc-200 px-3 py-2 text-sm focus:border-black focus:ring-0 outline-none" 
                  />
                  <span className="text-sm font-bold">%</span>
                </div>
                
                {markupRate && (
                  <div className="bg-zinc-50 p-4 border border-zinc-200 text-xs md:text-sm">
                    <div className="text-zinc-500 mb-2">示例: 假设集市供货价为 ¥100</div>
                    <div className="font-mono mb-1">
                      分销零售价 = 供货价 × (1 + 顺加加价率) = <span className="font-bold text-black">¥{sellingPrice}</span>
                    </div>
                    <div className="font-mono mb-1">
                      预计利润 = 分销零售价 - 供货价 = <span className="font-bold text-emerald-600">¥{profit}</span>
                    </div>
                    <div className="font-mono text-zinc-500 text-xs mt-2 pt-2 border-t border-zinc-200">
                      折合毛利率 ≈ {calculatedGrossMargin}%
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 md:p-6 border-t border-zinc-100 bg-zinc-50 flex flex-col md:flex-row justify-end gap-3 flex-shrink-0">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 text-xs font-bold text-zinc-600 hover:text-black transition-colors w-full md:w-auto text-center border border-zinc-200 bg-white md:bg-transparent md:border-none">取消</button>
              <button 
                onClick={() => setIsModalOpen(false)} 
                disabled={isSaveDisabled}
                className={`w-full md:w-auto px-6 py-2 text-xs font-bold transition-colors ${
                  isSaveDisabled 
                    ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed' 
                    : 'bg-black text-white hover:bg-zinc-800'
                }`}
              >
                保存策略
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
