import { useState, useRef, useEffect } from "react";
import { Search, X, Filter, AlertCircle, ChevronDown } from "lucide-react";

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
    <div className="relative w-48" ref={dropdownRef}>
      <div 
        className="w-full border border-zinc-200 px-4 py-2 text-sm bg-white cursor-pointer flex justify-between items-center h-[38px]"
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

export function MarketplaceOnSale() {
  const [selectedSpu, setSelectedSpu] = useState<string | null>(null);
  const [activeWarehouseTab, setActiveWarehouseTab] = useState<'domestic' | 'overseas'>('domestic');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const brands = [
    { value: 'mcqueen', label: 'Alexander McQueen' },
    { value: 'burberry', label: 'Burberry' },
  ];

  const categories = [
    { value: 'accessories', label: '配饰' },
    { value: 'clothing', label: '服饰' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">Supplier Dashboard</div>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">集市在售</h1>
          <p className="text-sm text-zinc-500">管理您已发布到集市的现货商品</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 bg-white border border-zinc-200 px-3 py-2 w-80">
            <Search size={16} className="text-zinc-400" />
            <input 
              type="text" 
              placeholder="搜索商品名称、货号..." 
              className="w-full text-sm outline-none" 
            />
          </div>
          
          {/* Multi-selects */}
          <MultiSelectDropdown 
            options={brands} 
            selected={selectedBrands} 
            onChange={setSelectedBrands} 
            placeholder="选择品牌 (多选)" 
          />

          <MultiSelectDropdown 
            options={categories} 
            selected={selectedCategories} 
            onChange={setSelectedCategories} 
            placeholder="选择分类 (多选)" 
          />

          <div className="relative">
            <select className="appearance-none border border-zinc-200 px-4 py-2 pr-8 text-sm focus:border-black focus:ring-0 outline-none bg-white w-32 cursor-pointer">
              <option value="">全部状态</option>
              <option value="triggered">已触发底价</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          <button className="border border-zinc-200 px-6 py-2 text-sm font-bold hover:bg-zinc-50 transition-colors bg-white">
            重置
          </button>
          <button className="bg-black text-white px-8 py-2 text-sm font-bold hover:bg-zinc-800 transition-colors">
            查询
          </button>
          <div className="ml-auto flex gap-2">
            <button className="border border-zinc-200 px-6 py-2 text-sm font-bold hover:bg-zinc-50 transition-colors bg-white">
              批量取消出价
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 shadow-sm">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          <div className="col-span-1 flex justify-center">
            <input type="checkbox" className="w-4 h-4 accent-black" />
          </div>
          <div className="col-span-4">商品信息</div>
          <div className="col-span-2">品牌类目</div>
          <div className="col-span-2 text-right">批发供货价</div>
          <div className="col-span-2 text-right">集市最低价</div>
          <div className="col-span-1 text-center">操作</div>
        </div>

        {/* Row 1: RMB Lowest */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 items-center hover:bg-zinc-50 transition-colors">
          <div className="col-span-1 flex justify-center">
            <input type="checkbox" className="w-4 h-4 accent-black" />
          </div>
          <div className="col-span-4 flex gap-4 items-center">
            <div className="w-12 h-12 bg-zinc-100 p-1">
              <img src="https://images.unsplash.com/photo-1599643478514-4a820c56a8f9?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
            <div>
              <div className="text-xs font-bold mb-1">Alexander McQueen男款骷髅头编织手链</div>
              <div className="text-[10px] text-zinc-400">货号: 554602J16KG1000</div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="text-xs font-bold">Alexander McQueen</div>
            <div className="text-[10px] text-zinc-500">配饰</div>
          </div>
          <div className="col-span-2 text-right">
            <div className="text-xs font-bold">¥800.00</div>
          </div>
          <div className="col-span-2 text-right">
            <div className="text-xs font-bold text-zinc-400">¥780.00</div>
          </div>
          <div className="col-span-1 flex flex-col items-center gap-2">
            <button onClick={() => setSelectedSpu('mcqueen1')} className="text-[10px] font-bold text-black hover:underline">查看详情</button>
          </div>
        </div>

        {/* Row 2: HKD Lowest */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 items-center hover:bg-zinc-50 transition-colors">
          <div className="col-span-1 flex justify-center">
            <input type="checkbox" className="w-4 h-4 accent-black" />
          </div>
          <div className="col-span-4 flex gap-4 items-center">
            <div className="w-12 h-12 bg-zinc-100 p-1">
              <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
            <div>
              <div className="text-xs font-bold mb-1">CHANEL香奈儿 24年秋冬系列单排扣V长袖针织衫 女款 黑色</div>
              <div className="text-[10px] text-zinc-400">货号: P78433-K11320-NZZ03</div>
            </div>
          </div>
          <div className="col-span-2">
            <div className="text-xs font-bold">CHANEL</div>
            <div className="text-[10px] text-zinc-500">服饰</div>
          </div>
          <div className="col-span-2 text-right">
            <div className="text-xs font-bold">约 ¥2,800.00</div>
            <div className="text-[10px] text-zinc-400 mt-1">HK$3,000.00</div>
          </div>
          <div className="col-span-2 text-right">
            <div className="text-xs font-bold text-zinc-400">约 ¥2,750.00</div>
            <div className="text-[10px] text-zinc-400 mt-1">HK$2,950.00</div>
          </div>
          <div className="col-span-1 flex flex-col items-center gap-2">
            <button onClick={() => setSelectedSpu('chanel1')} className="text-[10px] font-bold text-black hover:underline">查看详情</button>
          </div>
        </div>

      </div>

      {/* SPU Details Drawer */}
      {selectedSpu && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedSpu(null)}></div>
          <div className="relative w-[1000px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-100">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight mb-1">集市在售详情</h2>
                <div className="text-xs text-zinc-500 font-mono">货号: 554602J16KG1000</div>
              </div>
              <button onClick={() => setSelectedSpu(null)} className="text-zinc-400 hover:text-black transition-colors"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {/* Product Header */}
              <div className="p-8 border-b border-zinc-100 bg-white flex gap-6 items-center">
                <div className="w-24 h-24 bg-zinc-100 p-2">
                  <img src="https://images.unsplash.com/photo-1599643478514-4a820c56a8f9?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-zinc-500 mb-1">Alexander McQueen</div>
                  <div className="text-xl font-black tracking-tight mb-2">男款骷髅头编织手链</div>
                  <div className="flex gap-4 text-sm">
                    <span className="text-zinc-500">分类: 配饰</span>
                    <span className="text-zinc-500">已映射集市公共库</span>
                  </div>
                </div>
              </div>

              {/* SKU Info Section */}
              <div className="p-8 bg-zinc-50/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black uppercase tracking-widest">在售 SKU 规格</h3>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setActiveWarehouseTab('domestic')}
                      className={`text-xs font-bold pb-1 transition-colors ${activeWarehouseTab === 'domestic' ? 'text-black border-b-2 border-black' : 'text-zinc-400 hover:text-black'}`}
                    >
                      境内仓 (Domestic)
                    </button>
                    <button 
                      onClick={() => setActiveWarehouseTab('overseas')}
                      className={`text-xs font-bold pb-1 transition-colors ${activeWarehouseTab === 'overseas' ? 'text-black border-b-2 border-black' : 'text-zinc-400 hover:text-black'}`}
                    >
                      境外仓 (Overseas)
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200 shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-200 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        <th className="p-4 font-bold">规格</th>
                        <th className="p-4 font-bold">商品所在地</th>
                        <th className="p-4 font-bold">条码 (Barcode)</th>
                        <th className="p-4 font-bold text-right">供货价</th>
                        <th className="p-4 font-bold text-right">集市最低价</th>
                        <th className="p-4 font-bold text-right">库存</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {activeWarehouseTab === 'domestic' ? (
                        <>
                          <tr className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                            <td className="p-4 font-bold text-zinc-800 border-r border-zinc-100" rowSpan={2}>均码</td>
                            <td className="p-4"><span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider">深圳保税仓</span></td>
                            <td className="p-4 font-mono text-xs text-zinc-500">554602J16KG1000-01</td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end">
                                <div className="flex items-center border border-zinc-200 bg-white px-2 py-1 w-24">
                                  <span className="text-xs text-zinc-400 mr-1">¥</span>
                                  <input type="number" defaultValue={800} className="w-full text-xs font-bold outline-none text-right" />
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-right font-bold text-zinc-400">¥780</td>
                            <td className="p-4 text-right font-bold">12</td>
                          </tr>
                          <tr className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                            <td className="p-4"><span className="bg-orange-50 text-orange-600 border border-orange-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider">杭州国内仓</span></td>
                            <td className="p-4 font-mono text-xs text-zinc-500">554602J16KG1000-01</td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end">
                                <div className="flex items-center border border-zinc-200 bg-white px-2 py-1 w-24">
                                  <span className="text-xs text-zinc-400 mr-1">¥</span>
                                  <input type="number" defaultValue={810} className="w-full text-xs font-bold outline-none text-right" />
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-right font-bold text-zinc-400">¥780</td>
                            <td className="p-4 text-right font-bold">5</td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                            <td className="p-4 font-bold text-zinc-800 border-r border-zinc-100" rowSpan={2}>均码</td>
                            <td className="p-4">
                              <span className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider">香港直邮仓</span>
                            </td>
                            <td className="p-4 font-mono text-xs text-zinc-500">554602J16KG1000-01</td>
                            <td className="p-4 text-right">
                              <div className="flex flex-col items-end gap-1">
                                <div className="flex items-center border border-zinc-200 bg-white px-2 py-1 w-24">
                                  <span className="text-xs text-zinc-400 mr-1">HK$</span>
                                  <input type="number" defaultValue={820} className="w-full text-xs font-bold outline-none text-right" />
                                </div>
                                <div className="text-[10px] text-zinc-400">约 ¥750</div>
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <div className="font-bold text-zinc-400">HK$850</div>
                              <div className="text-[10px] text-zinc-400 mt-1">约 ¥780</div>
                            </td>
                            <td className="p-4 text-right font-bold">45</td>
                          </tr>
                          <tr className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                            <td className="p-4">
                              <span className="bg-purple-50 text-purple-600 border border-purple-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider">伦敦海外仓</span>
                            </td>
                            <td className="p-4 font-mono text-xs text-zinc-500">554602J16KG1000-01</td>
                            <td className="p-4 text-right">
                              <div className="flex flex-col items-end gap-1">
                                <div className="flex items-center border border-zinc-200 bg-white px-2 py-1 w-24">
                                  <span className="text-xs text-zinc-400 mr-1">HK$</span>
                                  <input type="number" defaultValue={800} className="w-full text-xs font-bold outline-none text-right" />
                                </div>
                                <div className="text-[10px] text-zinc-400">约 ¥730</div>
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              <div className="font-bold text-zinc-400">HK$850</div>
                              <div className="text-[10px] text-zinc-400 mt-1">约 ¥780</div>
                            </td>
                            <td className="p-4 text-right font-bold">10</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-zinc-200 bg-white flex justify-between items-center">
              <button onClick={() => setSelectedSpu(null)} className="px-6 py-3 text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 transition-colors">从集市下架</button>
              <div className="flex gap-3">
                <button onClick={() => setSelectedSpu(null)} className="px-6 py-3 text-xs font-bold text-zinc-600 hover:text-black transition-colors">关闭</button>
                <button onClick={() => setSelectedSpu(null)} className="bg-black text-white px-8 py-3 text-xs font-bold hover:bg-zinc-800 transition-colors">保存修改</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
