import { Search, ChevronDown, TrendingUp, TrendingDown, X, Copy } from "lucide-react";
import { useState, useMemo } from "react";
import { MultiSelectDropdown } from "./MultiSelectDropdown";
import { CategoryMultiSelectDropdown } from "./CategoryMultiSelectDropdown";
import { CATEGORY_HIERARCHY, ALL_BRANDS } from "../lib/constants";

export function MySelections() {
  const [selectedSpu, setSelectedSpu] = useState<string | null>(null);
  const [activeWarehouseTab, setActiveWarehouseTab] = useState<'domestic' | 'overseas'>('domestic');

  const [filterBrands, setFilterBrands] = useState<string[]>([]);
  const [filterCategories, setFilterCategories] = useState<string[]>([]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">Distributor Dashboard</div>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">我的选品</h1>
          <p className="text-sm text-zinc-500">管理您已选择的分销商品及利润情况</p>
        </div>
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
        <button className="border border-zinc-200 px-6 py-2 text-sm font-bold hover:bg-zinc-50 transition-colors bg-white">
          重置
        </button>
        <button className="bg-black text-white px-8 py-2 text-sm font-bold hover:bg-zinc-800 transition-colors">
          查询
        </button>
      </div>

      <div className="bg-white border border-zinc-200 shadow-sm">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          <div className="col-span-1 flex justify-center">
            <input type="checkbox" className="w-4 h-4 accent-black" />
          </div>
          <div className="col-span-5">商品信息</div>
          <div className="col-span-2 text-right">分销零售价</div>
          <div className="col-span-3 text-center">当前加价策略</div>
          <div className="col-span-1 text-center">操作</div>
        </div>

        {/* Row 1 */}
        <div className="border-b border-zinc-200">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-zinc-50 transition-colors">
            <div className="col-span-1 flex justify-center">
              <input type="checkbox" className="w-4 h-4 accent-black" />
            </div>
            <div className="col-span-5 flex gap-4 items-center">
              <div className="w-12 h-12 bg-zinc-100 p-1 flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div>
                <div className="text-xs font-bold mb-1">Hermès Birkin 25 金扣</div>
                <div className="text-[10px] text-zinc-400">货号: H-B25-GOLD</div>
              </div>
            </div>
            <div className="col-span-2 text-right">
              <div className="text-xs font-bold">¥168,000.00</div>
              <div className="text-[10px] text-zinc-400">供货价: ¥142,000.00</div>
            </div>
            <div className="col-span-3 text-center">
              <div className="text-xs font-bold text-emerald-600">顺加加价 18.3%</div>
            </div>
            <div className="col-span-1 flex flex-col items-center gap-2">
              <button 
                onClick={() => setSelectedSpu('hermes')}
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
            <div className="col-span-1 flex justify-center">
              <input type="checkbox" className="w-4 h-4 accent-black" />
            </div>
            <div className="col-span-5 flex gap-4 items-center">
              <div className="w-12 h-12 bg-zinc-100 p-1 flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div>
                <div className="text-xs font-bold mb-1">Rolex Submariner Date 黑水鬼</div>
                <div className="text-[10px] text-zinc-400">货号: 126610LN</div>
              </div>
            </div>
            <div className="col-span-2 text-right">
              <div className="text-xs font-bold">¥93,500.00</div>
              <div className="text-[10px] text-zinc-400">供货价: ¥85,000.00</div>
            </div>
            <div className="col-span-3 text-center">
              <div className="text-xs font-bold text-emerald-600">全局加价 10%</div>
            </div>
            <div className="col-span-1 flex flex-col items-center gap-2">
              <button 
                onClick={() => setSelectedSpu('rolex')}
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
                <div className="text-xs text-zinc-500 font-mono">SPU: {selectedSpu === 'hermes' ? 'H-B25-GOLD' : '126610LN'}</div>
              </div>
              <button onClick={() => setSelectedSpu(null)} className="text-zinc-400 hover:text-black transition-colors"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {/* Product Header */}
              <div className="p-8 border-b border-zinc-100 bg-white flex justify-between items-start">
                <div className="flex gap-6 items-start">
                  <div className="w-24 h-24 border border-zinc-200 rounded-lg p-2 flex-shrink-0">
                    <img 
                      src={selectedSpu === 'hermes' 
                        ? "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=200&q=80" 
                        : "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=200&q=80"} 
                      className="w-full h-full object-contain mix-blend-multiply" 
                    />
                  </div>
                  <div className="pt-2">
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                      {selectedSpu === 'hermes' ? 'Hermès' : 'Rolex'}
                    </div>
                    <div className="text-base font-black tracking-tight leading-none mb-2 text-zinc-800">
                      {selectedSpu === 'hermes' ? 'Hermès Birkin 25 金扣' : 'Rolex Submariner Date 黑水鬼'}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                      货号: {selectedSpu === 'hermes' ? 'H-B25-GOLD' : '126610LN'}
                      <button className="text-zinc-400 hover:text-black"><Copy size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategy Info Section */}
              <div className="p-8 border-b border-zinc-100 bg-white">
                <h3 className="text-sm font-black uppercase tracking-widest mb-6">价格策略</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-zinc-50 p-4 border border-zinc-200">
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">当前策略</div>
                    <div className="text-sm font-bold">顺加加价</div>
                  </div>
                  <div className="bg-zinc-50 p-4 border border-zinc-200">
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">加价率</div>
                    <div className="text-sm font-bold text-emerald-600">18.3%</div>
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
                        <th className="p-4 font-bold">商品所在地</th>
                        <th className="p-4 font-bold">当前排队商家</th>
                        <th className="p-4 font-bold text-right">集市供货价</th>
                        <th className="p-4 font-bold text-right">我的分销价</th>
                        <th className="p-4 font-bold text-right">利润</th>
                        <th className="p-4 font-bold text-right">库存</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {activeWarehouseTab === 'domestic' ? (
                        <>
                          <tr className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                            <td className="p-4 font-bold text-zinc-800">默认</td>
                            <td className="p-4"><span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider">中国大陆</span></td>
                            <td className="p-4 text-xs">Global Luxury Hub - 1567</td>
                            <td className="p-4 text-right font-bold text-zinc-500">¥145,000.00</td>
                            <td className="p-4 text-right font-bold text-emerald-600">¥168,000.00</td>
                            <td className="p-4 text-right">
                              <div className="font-bold text-emerald-600">¥23,000</div>
                              <div className="text-[10px] text-zinc-400">15.8%</div>
                            </td>
                            <td className="p-4 text-right font-bold">5</td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                            <td className="p-4 font-bold text-zinc-800">默认</td>
                            <td className="p-4">
                              <div className="flex flex-wrap gap-1">
                                <span className="bg-blue-50 text-blue-600 border border-blue-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider">港澳</span>
                                <span className="bg-purple-50 text-purple-600 border border-purple-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wider">保税仓</span>
                              </div>
                            </td>
                            <td className="p-4 text-xs">Euro Boutique - 2891</td>
                            <td className="p-4 text-right">
                              <div className="font-bold text-zinc-500">HK$155,000.00</div>
                              <div className="text-[10px] text-zinc-400 mt-1">约 ¥142,000 (含税)</div>
                            </td>
                            <td className="p-4 text-right">
                              <div className="font-bold text-emerald-600">HK$183,000.00</div>
                              <div className="text-[10px] text-zinc-400 mt-1">约 ¥168,000</div>
                            </td>
                            <td className="p-4 text-right">
                              <div className="font-bold text-emerald-600">HK$28,000</div>
                              <div className="text-[10px] text-zinc-400">18.3%</div>
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
          </div>
        </div>
      )}
    </div>
  );
}
