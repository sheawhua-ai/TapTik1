import { Search, X, Copy, Plus, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import { MultiSelectDropdown } from "./MultiSelectDropdown";
import { CategoryMultiSelectDropdown } from "./CategoryMultiSelectDropdown";
import { CATEGORY_HIERARCHY, ALL_BRANDS } from "../lib/constants";

export function MarketplaceSelection() {
  const [selectedSpu, setSelectedSpu] = useState<string | null>(null);
  const [activeWarehouseTab, setActiveWarehouseTab] = useState<'domestic' | 'overseas'>('domestic');
  const [isScopeModalOpen, setIsScopeModalOpen] = useState(false);
  const [isMarkupModalOpen, setIsMarkupModalOpen] = useState(false);
  
  // Scope State
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [filterBrands, setFilterBrands] = useState<string[]>([]);
  const [filterCategories, setFilterCategories] = useState<string[]>([]);

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
  
  const markupValue = Number(markupRate) || 0;
  const isSaveDisabled = !strategyName || !markupRate;

  const supplyPrice = 100;
  const sellingPrice = markupValue ? (supplyPrice * (1 + markupValue / 100)).toFixed(2) : '0.00';
  const profit = markupValue ? (Number(sellingPrice) - supplyPrice).toFixed(2) : '0.00';
  const calculatedGrossMargin = markupValue ? ((markupValue / (100 + markupValue)) * 100).toFixed(2) : '0.00';

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">Distributor Dashboard</div>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">从集市选品</h1>
          <p className="text-sm text-zinc-500">浏览并选择集市上的商品加入您的分销库</p>
        </div>
        <button 
          onClick={() => setIsScopeModalOpen(true)}
          className="bg-white border border-zinc-200 text-black px-6 py-2 text-sm font-bold hover:border-black transition-colors"
        >
          设置选品范围
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input 
            type="text" 
            placeholder="搜索商品名称、货号..." 
            className="w-full border border-zinc-200 pl-10 pr-4 py-2 text-sm focus:border-black focus:ring-0 outline-none bg-white" 
          />
        </div>
        <div className="w-40">
          <MultiSelectDropdown 
            options={ALL_BRANDS} 
            selected={filterBrands} 
            onChange={setFilterBrands} 
            placeholder="全部品牌" 
          />
        </div>
        <div className="w-48">
          <CategoryMultiSelectDropdown 
            options={CATEGORY_HIERARCHY} 
            selected={filterCategories} 
            onChange={setFilterCategories} 
            placeholder="全部分类" 
          />
        </div>
        <select className="border border-zinc-200 px-4 py-2 text-sm focus:border-black focus:ring-0 outline-none bg-white">
          <option value="">是否配置</option>
          <option value="yes">已配置策略</option>
          <option value="no">未配置</option>
        </select>
        <button className="border border-zinc-200 px-6 py-2 text-sm font-bold hover:bg-zinc-50 transition-colors bg-white">
          重置
        </button>
        <button className="bg-black text-white px-8 py-2 text-sm font-bold hover:bg-zinc-800 transition-colors">
          查询
        </button>
      </div>

      <div className="flex justify-between items-center bg-zinc-50 p-4 border border-zinc-200 mb-6">
        <div className="text-sm">
          当前筛选条件下共有 <span className="font-black text-lg">1,248</span> 个 SPU
        </div>
        <button 
          onClick={() => {
            setSelectedStrategyBrands([...filterBrands]);
            setSelectedStrategyCategories([...filterCategories]);
            setIsMarkupModalOpen(true);
          }}
          className="bg-black text-white px-6 py-2 text-sm font-bold hover:bg-zinc-800 transition-colors flex items-center gap-2"
        >
          <Plus size={16} />
          配置加价策略
        </button>
      </div>

      <div className="bg-white border border-zinc-200 shadow-sm">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          <div className="col-span-5">商品信息</div>
          <div className="col-span-1 text-center">库存</div>
          <div className="col-span-2 text-right">集市价</div>
          <div className="col-span-1 text-center">供应商数</div>
          <div className="col-span-2 text-center">加价策略</div>
          <div className="col-span-1 text-center">操作</div>
        </div>

        {/* Row 1 */}
        <div className="border-b border-zinc-200">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-zinc-50 transition-colors">
            <div className="col-span-5 flex gap-4 items-center">
              <div className="w-12 h-12 bg-zinc-100 p-1 flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div>
                <div className="text-xs font-bold mb-1">Represent男款徽标圆领卫衣</div>
                <div className="text-[10px] text-zinc-400">货号: M0427262</div>
              </div>
            </div>
            <div className="col-span-1 text-center text-xs font-bold">15</div>
            <div className="col-span-2 text-right text-xs font-bold">
              <div>HK$1,290.00</div>
              <div className="text-[10px] text-zinc-400 font-normal">约 ¥1,180</div>
            </div>
            <div className="col-span-1 text-center text-xs">2</div>
            <div className="col-span-2 text-center">
              <span className="text-orange-500 text-xs font-bold">未配置</span>
            </div>
            <div className="col-span-1 text-center">
              <button 
                onClick={() => setSelectedSpu('represent')}
                className="text-xs text-black font-bold hover:underline"
              >
                查看详情
              </button>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="border-b border-zinc-200">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-zinc-50 transition-colors">
            <div className="col-span-5 flex gap-4 items-center">
              <div className="w-12 h-12 bg-zinc-100 p-1 flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div>
                <div className="text-xs font-bold mb-1">Nike Air Max 90 经典运动鞋</div>
                <div className="text-[10px] text-zinc-400">货号: NK-AM90-RED</div>
              </div>
            </div>
            <div className="col-span-1 text-center text-xs font-bold">42</div>
            <div className="col-span-2 text-right text-xs font-bold">¥899.00</div>
            <div className="col-span-1 text-center text-xs">1</div>
            <div className="col-span-2 text-center">
              <span className="text-emerald-600 text-xs font-bold">默认全局加价</span>
            </div>
            <div className="col-span-1 text-center">
              <button 
                onClick={() => setSelectedSpu('nike')}
                className="text-xs text-black font-bold hover:underline"
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
          <div className="relative w-[1100px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-100">
              <div>
                <h2 className="text-xl font-black uppercase tracking-tight mb-1">商品数据</h2>
                <div className="text-xs text-zinc-500 font-mono">SPU: M0427262</div>
              </div>
              <button onClick={() => setSelectedSpu(null)} className="text-zinc-400 hover:text-black transition-colors"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {/* Product Header */}
              <div className="p-8 border-b border-zinc-100 bg-white">
                <div className="flex gap-6 items-start">
                  <div className="w-24 h-24 border border-zinc-200 rounded-lg p-2 flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="pt-2">
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Represent</div>
                    <div className="text-base font-black tracking-tight leading-none mb-2 text-zinc-800">Represent男款徽标圆领卫衣</div>
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                      货号: M0427262
                      <button className="text-zinc-400 hover:text-black"><Copy size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SKU Info Section */}
              <div className="p-8 bg-zinc-50/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-black uppercase tracking-widest">SKU 规格与报价</h3>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setActiveWarehouseTab('domestic')}
                      className={`text-xs font-bold pb-1 transition-colors ${activeWarehouseTab === 'domestic' ? 'text-black border-b-2 border-black' : 'text-zinc-400 hover:text-black'}`}
                    >
                      境内商品 (Domestic)
                    </button>
                    <button 
                      onClick={() => setActiveWarehouseTab('overseas')}
                      className={`text-xs font-bold pb-1 transition-colors ${activeWarehouseTab === 'overseas' ? 'text-black border-b-2 border-black' : 'text-zinc-400 hover:text-black'}`}
                    >
                      境外商品 (Overseas)
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200 shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-200 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        <th className="p-4 font-bold">规格 (尺码)</th>
                        <th className="p-4 font-bold">所在地</th>
                        <th className="p-4 font-bold">当前排队商家</th>
                        <th className="p-4 font-bold text-right">集市供货价</th>
                        <th className="p-4 font-bold text-right">建议零售价</th>
                        <th className="p-4 font-bold text-right">库存</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                        <td className="p-4 font-bold text-zinc-800" rowSpan={3}>M码</td>
                        <td className="p-4"><span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider">保税仓</span></td>
                        <td className="p-4 text-xs">Global Luxury Hub - 1567</td>
                        <td className="p-4 text-right font-bold text-emerald-600">¥1,180.00</td>
                        <td className="p-4 text-right text-zinc-500">¥1,399.00</td>
                        <td className="p-4 text-right font-bold">1</td>
                      </tr>
                      <tr className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                        <td className="p-4"><span className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider">港澳</span></td>
                        <td className="p-4 text-xs">HK Premium - 8821</td>
                        <td className="p-4 text-right font-bold text-emerald-600">¥1,150.00</td>
                        <td className="p-4 text-right text-zinc-500">¥1,399.00</td>
                        <td className="p-4 text-right font-bold">5</td>
                      </tr>
                      <tr className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                        <td className="p-4"><span className="bg-purple-50 text-purple-600 border border-purple-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider">欧洲</span></td>
                        <td className="p-4 text-xs">Euro Boutique - 2891</td>
                        <td className="p-4 text-right font-bold text-emerald-600">¥1,100.00</td>
                        <td className="p-4 text-right text-zinc-500">¥1,399.00</td>
                        <td className="p-4 text-right font-bold">12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selection Scope Modal */}
      {isScopeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsScopeModalOpen(false)}></div>
          <div className="relative bg-white w-[600px] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h2 className="text-lg font-black uppercase tracking-tight">设置选品范围</h2>
              <button onClick={() => setIsScopeModalOpen(false)} className="text-zinc-400 hover:text-black transition-colors"><X size={20} /></button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">适用品牌</label>
                  <div className="flex flex-wrap gap-2">
                    {ALL_BRANDS.map(brand => (
                      <button
                        key={brand.value}
                        onClick={() => toggleBrand(brand.value)}
                        className={`px-3 py-1.5 text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                          selectedBrands.includes(brand.value)
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400'
                        }`}
                      >
                        {brand.label}
                        {selectedBrands.includes(brand.value) && <X size={12} className="opacity-70" />}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <CategoryMultiSelectDropdown 
                    label="适用分类" 
                    options={CATEGORY_HIERARCHY} 
                    selected={selectedCategories} 
                    onChange={setSelectedCategories} 
                    placeholder="选择分类" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">指定商家</label>
                <textarea 
                  placeholder="输入商家号，多个商家号请用逗号隔开" 
                  className="w-full border border-zinc-200 px-3 py-2 text-sm focus:border-black focus:ring-0 outline-none h-20 resize-none"
                ></textarea>
              </div>
            </div>

            <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex justify-end gap-3">
              <button onClick={() => setIsScopeModalOpen(false)} className="px-6 py-2 text-xs font-bold text-zinc-600 hover:text-black transition-colors">取消</button>
              <button onClick={() => setIsScopeModalOpen(false)} className="bg-black text-white px-6 py-2 text-xs font-bold hover:bg-zinc-800 transition-colors">保存设置</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Strategy Modal */}
      {isMarkupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMarkupModalOpen(false)}></div>
          <div className="relative bg-white w-[600px] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h2 className="text-lg font-black uppercase tracking-tight">新增加价策略</h2>
              <button onClick={() => setIsMarkupModalOpen(false)} className="text-zinc-400 hover:text-black transition-colors"><X size={20} /></button>
            </div>
            
            <div className="p-6 space-y-6">
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
                <div className="text-[10px] text-zinc-400 mt-2">您可以在下方手动修改适用的品牌和分类</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <MultiSelectDropdown 
                  label="适用品牌 (可选)" 
                  options={ALL_BRANDS} 
                  selected={selectedStrategyBrands} 
                  onChange={setSelectedStrategyBrands} 
                  placeholder="全部品牌" 
                />
                <CategoryMultiSelectDropdown 
                  label="适用分类 (可选)" 
                  options={CATEGORY_HIERARCHY} 
                  selected={selectedStrategyCategories} 
                  onChange={setSelectedStrategyCategories} 
                  placeholder="选择分类" 
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
                    className="w-32 border border-zinc-200 px-3 py-2 text-sm focus:border-black focus:ring-0 outline-none" 
                  />
                  <span className="text-sm font-bold">%</span>
                </div>
                
                {markupRate && (
                  <div className="bg-zinc-50 p-4 border border-zinc-200 text-sm">
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

            <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex justify-end gap-3">
              <button onClick={() => setIsMarkupModalOpen(false)} className="px-6 py-2 text-xs font-bold text-zinc-600 hover:text-black transition-colors">取消</button>
              <button 
                onClick={() => setIsMarkupModalOpen(false)} 
                disabled={isSaveDisabled}
                className={`px-6 py-2 text-xs font-bold transition-colors ${
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
