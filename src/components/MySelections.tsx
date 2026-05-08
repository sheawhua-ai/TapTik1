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

  const [filterMerchants, setFilterMerchants] = useState<string[]>([]);
  const merchants = [
    { value: '1567', label: 'UNIBUY (1567)' },
    { value: '14746', label: '002 (14746)' },
    { value: '1795', label: 'HANNAH (1795)' },
  ];

  const [isSpecialRuleEnabled, setIsSpecialRuleEnabled] = useState(false);
  const [fixedPrice, setFixedPrice] = useState('');
  const [profitRedline, setProfitRedline] = useState('');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-6 md:mb-8 gap-4">
        <div>
          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">Distributor Dashboard</div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-2">我的选品</h1>
          <p className="text-xs md:text-sm text-zinc-500">管理您已选择的分销商品及利润情况</p>
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

      <div className="bg-white border border-zinc-200 shadow-sm">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
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
          <div className="flex flex-col md:grid md:grid-cols-12 gap-4 px-4 md:px-6 py-4 md:items-center hover:bg-zinc-50 transition-colors">
            <div className="hidden md:flex col-span-1 justify-center">
              <input type="checkbox" className="w-4 h-4 accent-black" />
            </div>
            <div className="md:col-span-5 flex gap-4 items-center">
              <div className="md:hidden pt-1">
                <input type="checkbox" className="w-4 h-4 accent-black" />
              </div>
              <div className="w-16 h-16 md:w-12 md:h-12 bg-zinc-100 p-1 flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div>
                <div className="text-sm md:text-xs font-bold mb-1">Hermès Birkin 25 金扣</div>
                <div className="text-[10px] text-zinc-400">货号: H-B25-GOLD</div>
              </div>
            </div>
            <div className="flex justify-between items-center md:contents">
              <div className="text-xs text-zinc-500 md:hidden ml-8">分销零售价</div>
              <div className="md:col-span-2 text-right">
                <div className="text-xs font-bold">¥168,000.00</div>
                <div className="text-[10px] text-zinc-400">供货价: ¥142,000.00</div>
              </div>
            </div>
            <div className="flex justify-between items-center md:contents">
              <div className="text-xs text-zinc-500 md:hidden ml-8">加价策略</div>
              <div className="md:col-span-3 md:text-center">
                <div className="text-xs font-bold text-emerald-600">顺加加价 18.3%</div>
              </div>
            </div>
            <div className="md:col-span-1 flex flex-col items-center gap-2 mt-2 md:mt-0 ml-8 md:ml-0">
              <button 
                onClick={() => setSelectedSpu('hermes')}
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
            <div className="hidden md:flex col-span-1 justify-center">
              <input type="checkbox" className="w-4 h-4 accent-black" />
            </div>
            <div className="md:col-span-5 flex gap-4 items-center">
              <div className="md:hidden pt-1">
                <input type="checkbox" className="w-4 h-4 accent-black" />
              </div>
              <div className="w-16 h-16 md:w-12 md:h-12 bg-zinc-100 p-1 flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=100&q=80" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div>
                <div className="text-sm md:text-xs font-bold mb-1">Rolex Submariner Date 黑水鬼</div>
                <div className="text-[10px] text-zinc-400">货号: 126610LN</div>
              </div>
            </div>
            <div className="flex justify-between items-center md:contents">
              <div className="text-xs text-zinc-500 md:hidden ml-8">分销零售价</div>
              <div className="md:col-span-2 text-right">
                <div className="text-xs font-bold">¥93,500.00</div>
                <div className="text-[10px] text-zinc-400">供货价: ¥85,000.00</div>
              </div>
            </div>
            <div className="flex justify-between items-center md:contents">
              <div className="text-xs text-zinc-500 md:hidden ml-8">加价策略</div>
              <div className="md:col-span-3 md:text-center">
                <div className="text-xs font-bold text-emerald-600">全局加价 10%</div>
              </div>
            </div>
            <div className="md:col-span-1 flex flex-col items-center gap-2 mt-2 md:mt-0 ml-8 md:ml-0">
              <button 
                onClick={() => setSelectedSpu('rolex')}
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
                <div className="text-[10px] md:text-xs text-zinc-500 font-mono">SPU: {selectedSpu === 'hermes' ? 'H-B25-GOLD' : '126610LN'}</div>
              </div>
              <button onClick={() => setSelectedSpu(null)} className="text-zinc-400 hover:text-black transition-colors"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {/* Product Header */}
              <div className="p-4 md:p-8 border-b border-zinc-100 bg-white">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                  <div className="w-20 h-20 md:w-24 md:h-24 border border-zinc-200 rounded-lg p-2 flex-shrink-0">
                    <img 
                      src={selectedSpu === 'hermes' 
                        ? "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=200&q=80" 
                        : "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=200&q=80"} 
                      className="w-full h-full object-contain mix-blend-multiply" 
                    />
                  </div>
                  <div className="pt-0 md:pt-2">
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                      {selectedSpu === 'hermes' ? 'Hermès' : 'Rolex'}
                    </div>
                    <div className="text-sm md:text-base font-black tracking-tight leading-none mb-2 text-zinc-800">
                      {selectedSpu === 'hermes' ? 'Hermès Birkin 25 金扣' : 'Rolex Submariner Date 黑水鬼'}
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-500">
                      货号: {selectedSpu === 'hermes' ? 'H-B25-GOLD' : '126610LN'}
                      <button className="text-zinc-400 hover:text-black"><Copy size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Strategy Info Section */}
              <div className="p-4 md:p-8 border-b border-zinc-100 bg-white">
                <h3 className="text-xs md:text-sm font-black uppercase tracking-widest mb-4 md:mb-6">全局/商家价格策略</h3>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-zinc-50 p-4 border border-zinc-200">
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">当前命中策略</div>
                    <div className="text-sm font-bold truncate">默认全局加价 (STR-DEFAULT)</div>
                  </div>
                  <div className="bg-zinc-50 p-4 border border-zinc-200">
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">加价规则</div>
                    <div className="text-sm font-bold text-emerald-600">顺加加价 18.3% <span className="text-zinc-400 font-normal ml-2">/ 尾数 9 结尾</span></div>
                  </div>
                </div>
              </div>

              {/* Special Pricing & Protection Section */}
              <div className="p-4 md:p-8 border-b border-zinc-100 bg-white">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h3 className="text-xs md:text-sm font-black uppercase tracking-widest">单品特殊定价与红线保护</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] md:text-xs font-bold text-zinc-500">启用特殊规则</span>
                    <label className="relative flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={isSpecialRuleEnabled} onChange={(e) => setIsSpecialRuleEnabled(e.target.checked)} />
                      <div className="w-9 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black"></div>
                    </label>
                  </div>
                </div>
                
                {isSpecialRuleEnabled ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">固定展现价 (¥)</label>
                      <input 
                        type="number" 
                        value={fixedPrice}
                        onChange={(e) => setFixedPrice(e.target.value)}
                        placeholder="覆盖当前策略的自动计算价格" 
                        className="w-full border border-zinc-200 px-3 py-2 text-sm font-bold focus:border-black focus:ring-0 outline-none" 
                      />
                      <p className="mt-1.5 text-[10px] text-zinc-500">此价格将优先于全局或商家加价策略进行展现。</p>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">毛利红线 (¥)</label>
                      <div className="flex relative">
                        <input 
                          type="number" 
                          value={profitRedline}
                          onChange={(e) => setProfitRedline(e.target.value)}
                          placeholder="例如：2000" 
                          className="w-full border border-zinc-200 border-r-0 px-3 py-2 text-sm font-bold focus:border-black focus:ring-0 outline-none" 
                        />
                        <button className="bg-black text-white px-4 text-xs font-bold whitespace-nowrap">应用保护</button>
                      </div>
                      <p className="mt-1.5 text-[10px] text-red-500 font-bold">若集市供货价上涨导致单件毛利低于此金额，该商品将自动下架。</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-zinc-50 p-6 border border-zinc-200 text-center flex flex-col items-center justify-center">
                    <p className="text-xs text-zinc-500 font-bold mb-1">当前未开启单品特殊定价</p>
                    <p className="text-[10px] text-zinc-400">商品分销价格将由【默认全局加价 (STR-DEFAULT)】策略自动计算得出。</p>
                  </div>
                )}
              </div>

              {/* SKU Info Section */}
              <div className="p-4 md:p-8 bg-zinc-50/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 md:mb-6">
                  <h3 className="text-xs md:text-sm font-black uppercase tracking-widest">SKU 规格与报价</h3>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setActiveWarehouseTab('domestic')}
                      className={`text-[10px] md:text-xs font-bold pb-1 transition-colors ${activeWarehouseTab === 'domestic' ? 'text-black border-b-2 border-black' : 'text-zinc-400 hover:text-black'}`}
                    >
                      境内商品 (Domestic)
                    </button>
                    <button 
                      onClick={() => setActiveWarehouseTab('overseas')}
                      className={`text-[10px] md:text-xs font-bold pb-1 transition-colors ${activeWarehouseTab === 'overseas' ? 'text-black border-b-2 border-black' : 'text-zinc-400 hover:text-black'}`}
                    >
                      境外商品 (Overseas)
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200 shadow-sm overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
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
                            <td className="p-4 text-xs">UNIBUY (1567)</td>
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
                            <td className="p-4 text-xs">002 (14746)</td>
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
