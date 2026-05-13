import { Search, X, Copy, Plus, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import { MultiSelectDropdown } from "./MultiSelectDropdown";
import { CategoryMultiSelectDropdown } from "./CategoryMultiSelectDropdown";
import { CATEGORY_HIERARCHY, ALL_BRANDS } from "../lib/constants";

export function MarketplaceSelection() {
  const [selectedSpu, setSelectedSpu] = useState<string | null>(null);
  const [isMarkupModalOpen, setIsMarkupModalOpen] = useState(false);
  
  // Scope State
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [filterBrands, setFilterBrands] = useState<string[]>([]);
  const [filterCategories, setFilterCategories] = useState<string[]>([]);
  const [filterMerchants, setFilterMerchants] = useState<string[]>([]);
  
  const merchants = [
    { value: '1567', label: 'UNIBUY (1567)' },
    { value: '14746', label: '002 (14746)' },
    { value: '1795', label: 'HANNAH (1795)' },
  ];

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  // Markup Strategy State
  const [strategyName, setStrategyName] = useState('');
  const [markupRate, setMarkupRate] = useState('');
  const [selectedStrategyBrands, setSelectedStrategyBrands] = useState<string[]>([]);
  const [selectedStrategyCategories, setSelectedStrategyCategories] = useState<string[]>([]);
  const [strategyPriceTailRule, setStrategyPriceTailRule] = useState('none');
  
  const markupValue = Number(markupRate) || 0;
  const isSaveDisabled = !strategyName || !markupRate;

  const supplyPrice = 100;
  let calculatedSellingPrice = supplyPrice * (1 + markupValue / 100);
  if (strategyPriceTailRule === '9') {
    calculatedSellingPrice = Math.floor(calculatedSellingPrice / 10) * 10 + 9;
  } else if (strategyPriceTailRule === '0') {
    calculatedSellingPrice = Math.floor(calculatedSellingPrice / 10) * 10;
  }
  
  const sellingPrice = markupValue ? calculatedSellingPrice.toFixed(2) : '0.00';
  const profit = markupValue ? (Number(sellingPrice) - supplyPrice).toFixed(2) : '0.00';
  const calculatedGrossMargin = markupValue && Number(sellingPrice) > 0 ? ((Number(profit) / Number(sellingPrice)) * 100).toFixed(2) : '0.00';

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-start mb-6 md:mb-8 gap-4">
        <div>
          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">Distributor Dashboard</div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-2">从集市选品</h1>
          <p className="text-xs md:text-sm text-zinc-500">浏览并选择集市上的商品加入您的分销库</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input 
            type="text" 
            placeholder="搜索商品名称、货号..." 
            className="w-full border border-zinc-200 pl-10 pr-4 py-2 text-sm focus:border-black focus:ring-0 outline-none bg-white" 
          />
        </div>
        <div className="grid grid-cols-2 lg:flex gap-4">
          <div className="w-full lg:w-40">
            <MultiSelectDropdown 
              options={merchants} 
              selected={filterMerchants} 
              onChange={setFilterMerchants} 
              placeholder="全部商家" 
            />
          </div>
          <div className="w-full lg:w-40">
            <MultiSelectDropdown 
              options={ALL_BRANDS} 
              selected={filterBrands} 
              onChange={setFilterBrands} 
              placeholder="全部品牌" 
            />
          </div>
          <div className="w-full lg:w-48 col-span-2 lg:col-span-1">
            <CategoryMultiSelectDropdown 
              options={CATEGORY_HIERARCHY} 
              selected={filterCategories} 
              onChange={setFilterCategories} 
              placeholder="全部分类" 
            />
          </div>
          <select className="col-span-2 md:col-span-1 border border-zinc-200 px-4 py-2 text-sm focus:border-black focus:ring-0 outline-none bg-white w-full md:w-auto h-[38px] md:h-auto">
            <option value="">是否配置</option>
            <option value="yes">已配置策略</option>
            <option value="no">未配置</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="border border-zinc-200 px-6 py-2 text-sm font-bold hover:bg-zinc-50 transition-colors bg-white">
            重置
          </button>
          <button className="bg-black text-white px-6 py-2 text-sm font-bold hover:bg-zinc-800 transition-colors">
            查询
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-zinc-50 p-4 border border-zinc-200 mb-6 gap-3">
        <div className="text-xs sm:text-sm">
          当前筛选条件下共有 <span className="font-black text-base sm:text-lg">1,248</span> 个 SPU
        </div>
        <button 
          onClick={() => {
            setSelectedStrategyBrands([...filterBrands]);
            setSelectedStrategyCategories([...filterCategories]);
            setIsMarkupModalOpen(true);
          }}
          className="w-full sm:w-auto bg-black text-white px-6 py-2 text-sm font-bold hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          配置加价策略
        </button>
      </div>

      <div className="bg-white border border-zinc-200 shadow-sm">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          <div className="col-span-5">商品信息</div>
          <div className="col-span-1 text-center">库存</div>
          <div className="col-span-2 text-right">集市价</div>
          <div className="col-span-1 text-center">供应商数</div>
          <div className="col-span-2 text-center">加价策略</div>
          <div className="col-span-1 text-center">操作</div>
        </div>

        {/* Row 1 */}
        <div className="border-b border-zinc-200">
          <div className="flex flex-col md:grid md:grid-cols-12 gap-4 px-4 md:px-6 py-4 md:items-center hover:bg-zinc-50 transition-colors">
            <div className="md:col-span-5 flex gap-4 items-center">
              <div className="w-16 h-16 md:w-12 md:h-12 bg-zinc-100 p-1 flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div>
                <div className="text-sm md:text-xs font-bold mb-1">Represent男款徽标圆领卫衣</div>
                <div className="text-[10px] text-zinc-400">货号: M0427262</div>
              </div>
            </div>
            <div className="flex justify-between items-center md:contents">
              <div className="text-xs text-zinc-500 md:hidden">库存</div>
              <div className="md:col-span-1 md:text-center text-xs font-bold">15</div>
            </div>
            <div className="flex justify-between items-center md:contents">
              <div className="text-xs text-zinc-500 md:hidden">集市价</div>
              <div className="md:col-span-2 text-right text-xs font-bold">
                <div>HK$1,290</div>
                <div className="text-[10px] text-zinc-400 font-normal">约 ¥1,180</div>
              </div>
            </div>
            <div className="flex justify-between items-center md:contents">
              <div className="text-xs text-zinc-500 md:hidden">供应商数</div>
              <div className="md:col-span-1 md:text-center text-xs">2</div>
            </div>
            <div className="flex justify-between items-center md:contents">
              <div className="text-xs text-zinc-500 md:hidden">加价策略</div>
              <div className="md:col-span-2 md:text-center">
                <span className="text-orange-500 text-xs font-bold">未配置</span>
              </div>
            </div>
            <div className="mt-3 md:mt-0 md:col-span-1 text-center">
              <button 
                onClick={() => setSelectedSpu('represent')}
                className="w-full md:w-auto text-xs text-black font-bold border border-zinc-200 md:border-none py-2 md:py-0 md:hover:underline"
              >
                查看详情
              </button>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="border-b border-zinc-200">
          <div className="flex flex-col md:grid md:grid-cols-12 gap-4 px-4 md:px-6 py-4 md:items-center hover:bg-zinc-50 transition-colors">
            <div className="md:col-span-5 flex gap-4 items-center">
              <div className="w-16 h-16 md:w-12 md:h-12 bg-zinc-100 p-1 flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div>
                <div className="text-sm md:text-xs font-bold mb-1">Nike Air Max 90 经典运动鞋</div>
                <div className="text-[10px] text-zinc-400">货号: NK-AM90-RED</div>
              </div>
            </div>
            <div className="flex justify-between items-center md:contents">
              <div className="text-xs text-zinc-500 md:hidden">库存</div>
              <div className="md:col-span-1 md:text-center text-xs font-bold">42</div>
            </div>
            <div className="flex justify-between items-center md:contents">
              <div className="text-xs text-zinc-500 md:hidden">集市价</div>
              <div className="md:col-span-2 text-right text-xs font-bold">¥899</div>
            </div>
            <div className="flex justify-between items-center md:contents">
              <div className="text-xs text-zinc-500 md:hidden">供应商数</div>
              <div className="md:col-span-1 md:text-center text-xs">1</div>
            </div>
            <div className="flex justify-between items-center md:contents">
              <div className="text-xs text-zinc-500 md:hidden">加价策略</div>
              <div className="md:col-span-2 md:text-center">
                <span className="text-emerald-600 text-xs font-bold">默认全局加价</span>
              </div>
            </div>
            <div className="mt-3 md:mt-0 md:col-span-1 text-center">
              <button 
                onClick={() => setSelectedSpu('nike')}
                className="w-full md:w-auto text-xs text-black font-bold border border-zinc-200 md:border-none py-2 md:py-0 md:hover:underline"
              >
                查看详情
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Data Drawer */}
      {selectedSpu && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedSpu(null)}></div>
          <div className="relative w-full md:w-[1100px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6 border-b border-zinc-100">
              <div>
                <h2 className="text-lg md:text-xl font-black uppercase tracking-tight mb-1">商品数据</h2>
                <div className="text-[10px] md:text-xs text-zinc-500 font-mono">SPU: M0427262</div>
              </div>
              <button onClick={() => setSelectedSpu(null)} className="text-zinc-400 hover:text-black transition-colors"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {/* Product Header */}
              <div className="p-4 md:p-8 border-b border-zinc-100 bg-white">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                  <div className="w-20 h-20 md:w-24 md:h-24 border border-zinc-200 rounded-lg p-2 flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="pt-0 md:pt-2">
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Represent</div>
                    <div className="text-sm md:text-base font-black tracking-tight leading-none mb-2 text-zinc-800">Represent男款徽标圆领卫衣</div>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-500">
                      货号: M0427262
                      <button className="text-zinc-400 hover:text-black"><Copy size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SKU Info Section */}
              <div className="p-4 md:p-8 bg-zinc-50/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-3">
                  <h3 className="text-xs md:text-sm font-black uppercase tracking-widest">SKU 规格与报价</h3>
                </div>

                <div className="bg-white border border-zinc-200 shadow-sm overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px] table-fixed">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-200 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        <th className="p-4 font-bold border-r border-zinc-200 w-1/4">规格</th>
                        <th className="p-0 font-bold border-r border-zinc-200 w-[37.5%] text-[10px]">
                           <div className="flex px-6 py-4 w-full">
                              <div className="w-1/2">境内商家</div>
                              <div className="w-1/4 text-right">供货价</div>
                              <div className="w-1/4 text-right">库存</div>
                           </div>
                        </th>
                        <th className="p-0 font-bold w-[37.5%] text-[10px]">
                           <div className="flex px-6 py-4 w-full">
                              <div className="w-1/2">境外商家</div>
                              <div className="w-1/4 text-right">供货价</div>
                              <div className="w-1/4 text-right">库存</div>
                           </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm align-top">
                      <tr className="border-b border-zinc-200">
                          <td className="p-4 border-r border-zinc-200 bg-white">
                            <div className="font-black text-sm">M码</div>
                            <div className="text-[10px] text-zinc-400 mt-1">供货商家数: 3</div>
                          </td>
                          <td className="p-4 border-r border-zinc-200 bg-zinc-50/50">
                            <div className="flex items-center px-2 py-1.5 mb-1 last:mb-0 text-[11px] bg-zinc-100 rounded text-zinc-900 border border-zinc-200/50">
                              <div className="w-1/2 truncate pr-2" title="UNIBUY (1567)">
                                  UNIBUY (1567)
                              </div>
                              <div className="w-1/4 text-right font-bold text-emerald-600">
                                  ¥1,180
                              </div>
                              <div className="w-1/4 text-right">
                                  1
                              </div>
                            </div>
                          </td>
                          <td className="p-4 bg-zinc-50/50">
                            <div className="flex items-center px-2 py-1.5 mb-1 last:mb-0 text-[11px] bg-zinc-100 rounded text-zinc-900 border border-zinc-200/50">
                              <div className="w-1/2 truncate pr-2" title="HK Premium - 8821">
                                  HK Premium
                              </div>
                              <div className="w-1/4 text-right font-bold text-emerald-600">
                                  HK$1,290
                              </div>
                              <div className="w-1/4 text-right">
                                  5
                              </div>
                            </div>
                            <div className="flex items-center px-2 py-1.5 mb-1 last:mb-0 text-[11px] text-zinc-500">
                              <div className="w-1/2 truncate pr-2" title="002 (14746)">
                                  002 (14746)
                              </div>
                              <div className="w-1/4 text-right font-bold text-emerald-600">
                                  €135
                              </div>
                              <div className="w-1/4 text-right">
                                  12
                              </div>
                            </div>
                          </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Strategy Modal */}
      {isMarkupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMarkupModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-[600px] shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-zinc-100 flex-shrink-0">
              <h2 className="text-base md:text-lg font-black uppercase tracking-tight">新增加价策略</h2>
              <button onClick={() => setIsMarkupModalOpen(false)} className="text-zinc-400 hover:text-black transition-colors"><X size={20} /></button>
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

              <div className="bg-zinc-50 p-4 border border-zinc-200 text-sm">
                <div className="font-bold mb-2">当前筛选条件带入：</div>
                <div className="text-zinc-600">
                  已选品牌：<span className="font-bold text-black">{selectedStrategyBrands.length > 0 ? selectedStrategyBrands.map(b => ALL_BRANDS.find(sb => sb.value === b)?.label || b).join(', ') : '全部品牌'}</span>
                </div>
                <div className="text-zinc-600 mt-1">
                  已选分类：<span className="font-bold text-black">{selectedStrategyCategories.length > 0 ? selectedStrategyCategories.map(c => {
                    const mainCat = CATEGORY_HIERARCHY.find(sc => sc.value === c);
                    if (mainCat) return mainCat.label;
                    for (const cat of CATEGORY_HIERARCHY) {
                      const subCat = cat.subCategories.find(sub => sub.value === c);
                      if (subCat) return subCat.label;
                    }
                    return c;
                  }).join(', ') : '全部分类'}</span>
                </div>
                <div className="text-[10px] text-zinc-400 mt-2">您可以在下方手动修改适用范围</div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <MultiSelectDropdown 
                  label="适用商家 (留空则适用全部)" 
                  options={merchants} 
                  selected={[]} 
                  onChange={() => {}} 
                  placeholder="全部商家" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CategoryMultiSelectDropdown 
                  label="适用分类 (可选)" 
                  options={CATEGORY_HIERARCHY} 
                  selected={selectedStrategyCategories} 
                  onChange={setSelectedStrategyCategories} 
                  placeholder="选择分类" 
                />
                <MultiSelectDropdown 
                  label="适用品牌 (可选)" 
                  options={ALL_BRANDS} 
                  selected={selectedStrategyBrands} 
                  onChange={setSelectedStrategyBrands} 
                  placeholder="全部品牌" 
                />
              </div>

              <div className="border-t border-zinc-100 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">顺加加价率 (%)</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="number" 
                        placeholder="例如: 25" 
                        value={markupRate}
                        onChange={(e) => setMarkupRate(e.target.value)}
                        className="w-full border border-zinc-200 px-3 py-2 text-sm focus:border-black focus:ring-0 outline-none" 
                      />
                      <span className="text-sm font-bold">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">展现价尾数规则</label>
                    <div className="relative">
                      <select 
                        value={strategyPriceTailRule}
                        onChange={(e) => setStrategyPriceTailRule(e.target.value)}
                        className="w-full border border-zinc-200 px-3 py-2 text-sm focus:border-black focus:ring-0 outline-none appearance-none bg-white"
                      >
                        <option value="none">不处理 (精确到元)</option>
                        <option value="9">固定以 9 结尾</option>
                        <option value="0">固定以 0 结尾</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
                
                {markupRate && (
                  <div className="bg-zinc-50 p-4 border border-zinc-200 text-xs md:text-sm">
                    <div className="text-zinc-500 mb-2">示例: 假设集市供货价为 ¥100</div>
                    <div className="font-mono mb-1">
                      分销零售价计算 = ¥100 × (1 + {markupRate}%) = ¥{(100 * (1 + markupValue / 100)).toFixed(2)}
                    </div>
                    <div className="font-mono mb-1 mt-2">
                      最终展现价 = <span className="font-bold text-black">¥{sellingPrice}</span> <span className="text-[10px] text-zinc-400 ml-1">(不考虑尾数规则情况)</span>
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
              <button onClick={() => setIsMarkupModalOpen(false)} className="px-6 py-2 text-xs font-bold text-zinc-600 hover:text-black transition-colors border border-zinc-200 bg-white md:bg-transparent md:border-none md:w-auto w-full text-center">取消</button>
              <button 
                onClick={() => setIsMarkupModalOpen(false)} 
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
