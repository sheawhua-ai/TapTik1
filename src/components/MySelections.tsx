import { Search, ChevronDown, TrendingUp, TrendingDown, X, Copy, AlertCircle } from "lucide-react";
import { useState, useMemo, Fragment, useEffect } from "react";
import { MultiSelectDropdown } from "./MultiSelectDropdown";
import { CategoryMultiSelectDropdown } from "./CategoryMultiSelectDropdown";
import { CATEGORY_HIERARCHY, ALL_BRANDS } from "../lib/constants";

const YOUR_SELECTIONS = [
  { id: 'hermes', brand: 'Hermès', category: '箱包', name: 'Hermès Birkin 25 金扣', no: 'H-B25-GOLD', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=400&q=80', minRetail: '¥168,000.00', minCost: '¥142,000.00', suppliers: ['UNIBUY (1567)', '002 (14746)'] },
  { id: 'ggdb', brand: 'Golden Goose', category: '鞋履', name: 'Golden Goose Super-Star 经典做旧运动鞋', no: 'GWF00102.F000317', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80', minRetail: '¥3,058.00', minCost: '¥2,750.00', suppliers: ['HANNAH (1795)', '002 (14746)', 'UNIBUY (1567)'] },
  { id: 'maxmara', brand: 'Max Mara', category: '服饰', name: 'Max Mara Madame 101801 经典大衣', no: '101801-MADAME', image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=400&q=80', minRetail: '¥18,500.00', minCost: '¥15,000.00', suppliers: ['002 (14746)'] },
];

export function MySelections() {
  const [selectedSpu, setSelectedSpu] = useState<string | null>(null);

  const [filterBrands, setFilterBrands] = useState<string[]>([]);
  const [filterCategories, setFilterCategories] = useState<string[]>([]);

  const [filterMerchants, setFilterMerchants] = useState<string[]>([]);
  const merchants = [
    { value: '1567', label: 'UNIBUY (1567)' },
    { value: '14746', label: '002 (14746)' },
    { value: '1795', label: 'HANNAH (1795)' },
  ];

  const [pricingStrategy, setPricingStrategy] = useState<'special' | 'follow' | 'default'>('default');
  const [followSupplierId, setFollowSupplierId] = useState('');
  const [fixedPrice, setFixedPrice] = useState('');
  const [profitRedline, setProfitRedline] = useState('');
  const [rounding, setRounding] = useState<'9' | '0' | 'none'>('none');
  
  const spuData = useMemo(() => {
    const db: Record<string, { ruleType: string; ruleValue: string | number; rounding?: '9' | '0' | 'none'; skus: any[] }> = {
      hermes: {
        ruleType: 'none',
        ruleValue: '',
        rounding: '9',
        skus: [
          {
            id: 'default',
            name: '默认',
            suppliers: [
              { id: '1567', name: 'UNIBUY (1567)', origin: '中国大陆', costStr: '¥145,000.00', cost: 145000, markupRuleName: '品牌加价 10%', markupFactor: 1.1, stock: 5 },
              { id: '14746', name: '002 (14746)', origin: '港澳 / 保税仓', costStr: 'HK$155,000.00', cost: 142000, markupRuleName: '品类加价 18.3%', markupFactor: 1.183, stock: 10 }
            ]
          }
        ]
      },
      ggdb: {
        ruleType: 'follow_supplier',
        ruleValue: '14746',
        rounding: '9',
        skus: [
          {
            id: '36',
            name: '36',
            suppliers: [
              { id: '1795', name: 'HANNAH (1795)', origin: '港澳', costStr: 'HK$3,000.00', cost: 2750, markupRuleName: '商家特殊 12%', markupFactor: 1.12, stock: 4 },
              { id: '14746', name: '002 (14746)', origin: '韩国直递', costStr: 'KRW 520,000', cost: 2780, markupRuleName: '全局 10%', markupFactor: 1.1, stock: 1 },
              { id: '1567', name: 'UNIBUY (1567)', origin: '中国大陆', costStr: '¥2,850.00', cost: 2850, markupRuleName: '全局 10%', markupFactor: 1.1, stock: 12 },
            ]
          },
          {
            id: '37',
            name: '37',
            suppliers: [
               { id: '14746', name: '002 (14746)', origin: '韩国直递', costStr: 'KRW 520,000', cost: 2780, markupRuleName: '全局 10%', markupFactor: 1.1, stock: 1 },
               { id: '1567', name: 'UNIBUY (1567)', origin: '中国大陆', costStr: '¥2,850.00', cost: 2850, markupRuleName: '全局 10%', markupFactor: 1.1, stock: 12 },
               { id: '9921', name: 'VIP-LUX (9921)', origin: '欧洲直邮', costStr: '€410.00', cost: 3150, markupRuleName: '全局 10%', markupFactor: 1.1, stock: 5 },
            ]
          },
          {
            id: '38',
            name: '38',
            suppliers: [
               { id: '1795', name: 'HANNAH (1795)', origin: '港澳', costStr: 'HK$3,000.00', cost: 2750, markupRuleName: '商家特殊 12%', markupFactor: 1.12, stock: 8 },
               { id: '1567', name: 'UNIBUY (1567)', origin: '中国大陆', costStr: '¥2,850.00', cost: 2850, markupRuleName: '全局 10%', markupFactor: 1.1, stock: 15 },
               { id: '14746', name: '002 (14746)', origin: '韩国直递', costStr: 'KRW 520,000', cost: 2780, markupRuleName: '全局 10%', markupFactor: 1.1, stock: 1 },
            ]
          }
        ]
      },
      maxmara: {
        ruleType: 'special_price',
        ruleValue: 18000,
        rounding: '0',
        skus: [
          {
            id: 'S',
            name: 'S',
            suppliers: [
              { id: '9921', name: 'VIP-LUX (9921)', origin: '欧洲直邮', costStr: '€1,950.00', cost: 15000, markupRuleName: '全局加价 15%', markupFactor: 1.15, stock: 2 },
              { id: '1567', name: 'UNIBUY (1567)', origin: '中国大陆', costStr: '¥16,500.00', cost: 16500, markupRuleName: '商家特殊 10%', markupFactor: 1.1, stock: 5 }
            ]
          },
          {
            id: 'M',
            name: 'M',
            suppliers: [
              { id: '9921', name: 'VIP-LUX (9921)', origin: '欧洲直邮', costStr: '€1,950.00', cost: 15000, markupRuleName: '全局加价 15%', markupFactor: 1.15, stock: 3 },
              { id: '1567', name: 'UNIBUY (1567)', origin: '中国大陆', costStr: '¥16,500.00', cost: 16500, markupRuleName: '商家特殊 10%', markupFactor: 1.1, stock: 1 }
            ]
          },
          {
            id: 'L',
            name: 'L',
            suppliers: [
              { id: '9921', name: 'VIP-LUX (9921)', origin: '欧洲直邮', costStr: '€1,950.00', cost: 15000, markupRuleName: '全局加价 15%', markupFactor: 1.15, stock: 4 }
            ]
          }
        ]
      }
    };
    return selectedSpu ? db[selectedSpu] : undefined;
  }, [selectedSpu]);

  const currentGlobalFixedPrice = pricingStrategy === 'special' && fixedPrice && !isNaN(Number(fixedPrice)) ? Number(fixedPrice) : null;
  const currentProfitRedline = pricingStrategy === 'special' && profitRedline && !isNaN(Number(profitRedline)) ? Number(profitRedline) : null;

  useEffect(() => {
    if (spuData) {
      if (spuData.ruleType === 'special_price') {
        setPricingStrategy('special');
        setFixedPrice(String(spuData.ruleValue));
        setFollowSupplierId('14746');
      } else if (spuData.ruleType === 'follow_supplier') {
        setPricingStrategy('follow');
        setFollowSupplierId(String(spuData.ruleValue));
        setFixedPrice('');
      } else {
        setPricingStrategy('default');
        setFollowSupplierId('14746');
        setFixedPrice('');
      }

      setRounding(spuData.rounding || 'none');
      setProfitRedline('');
    }
  }, [spuData]);

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
          <div className="col-span-6">商品信息</div>
          <div className="col-span-3 text-right">分销零售价</div>
          <div className="col-span-2 text-center">操作</div>
        </div>

        {YOUR_SELECTIONS.map(item => (
          <div key={item.id} className="border-b border-zinc-200">
            <div className="flex flex-col md:grid md:grid-cols-12 gap-4 px-4 md:px-6 py-4 md:items-center hover:bg-zinc-50 transition-colors">
              <div className="hidden md:flex col-span-1 justify-center">
                <input type="checkbox" className="w-4 h-4 accent-black" />
              </div>
              <div className="md:col-span-6 flex gap-4 items-center">
                <div className="md:hidden pt-1">
                  <input type="checkbox" className="w-4 h-4 accent-black" />
                </div>
                <div className="w-16 h-16 md:w-12 md:h-12 bg-zinc-100 p-1 flex-shrink-0">
                  <img src={item.image} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div>
                  <div className="text-sm md:text-xs font-bold mb-1.5">{item.name}</div>
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <span className="text-[10px] text-zinc-600 bg-zinc-100 px-1.5 py-0.5 font-medium">{item.brand}</span>
                    <span className="text-[10px] text-zinc-600 bg-zinc-100 px-1.5 py-0.5 font-medium">{item.category}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 mb-1">
                    {item.suppliers.slice(0, 2).map((sup, idx) => (
                      <span key={idx} className="text-[9px] text-zinc-500 border border-zinc-200 px-1.5 py-0.5 whitespace-nowrap">
                        {sup}
                      </span>
                    ))}
                    {item.suppliers.length > 2 && (
                      <span className="text-[9px] text-zinc-400 border border-dashed border-zinc-200 bg-zinc-50 px-1.5 py-0.5 cursor-help" title={item.suppliers.slice(2).join(', ')}>
                        +{item.suppliers.length - 2}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-zinc-400">货号: {item.no}</div>
                </div>
              </div>
              <div className="flex justify-between items-center md:contents">
                <div className="text-xs text-zinc-500 md:hidden ml-8">分销零售价</div>
                <div className="md:col-span-3 text-right">
                  <div className="text-xs font-bold">{item.minRetail}</div>
                  <div className="text-[10px] text-zinc-400">供货价: {item.minCost} 起</div>
                </div>
              </div>
              <div className="md:col-span-2 flex flex-col items-center gap-2 mt-2 md:mt-0 ml-8 md:ml-0">
                <button 
                  onClick={() => setSelectedSpu(item.id)}
                  className="w-full md:w-auto text-xs text-black font-bold border border-zinc-200 md:border-none py-2 md:py-0 md:hover:underline"
                >
                  查看SKU详情
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Data Drawer */}
      {selectedSpu && spuData && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedSpu(null)}></div>
          <div className="relative w-full md:w-[1100px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6 border-b border-zinc-100">
              <div>
                <h2 className="text-lg md:text-xl font-black uppercase tracking-tight mb-1">商品数据</h2>
                <div className="text-[10px] md:text-xs text-zinc-500 font-mono">SPU: {YOUR_SELECTIONS.find(i => i.id === selectedSpu)?.no}</div>
              </div>
              <button onClick={() => setSelectedSpu(null)} className="text-zinc-400 hover:text-black transition-colors"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {/* Product Header */}
              <div className="p-4 md:p-8 border-b border-zinc-100 bg-white">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                  <div className="w-20 h-20 md:w-24 md:h-24 border border-zinc-200 rounded-lg p-2 flex-shrink-0">
                    <img 
                      src={YOUR_SELECTIONS.find(i => i.id === selectedSpu)?.image} 
                      className="w-full h-full object-contain mix-blend-multiply" 
                    />
                  </div>
                  <div className="pt-0 md:pt-2">
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                      {YOUR_SELECTIONS.find(i => i.id === selectedSpu)?.brand}
                    </div>
                    <div className="text-sm md:text-base font-black tracking-tight leading-none mb-2 text-zinc-800">
                      {YOUR_SELECTIONS.find(i => i.id === selectedSpu)?.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-500">
                      货号: {YOUR_SELECTIONS.find(i => i.id === selectedSpu)?.no}
                      <button className="text-zinc-400 hover:text-black"><Copy size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Priority Pipeline & Special Pricing */}
              <div className="p-4 md:p-8 border-b border-zinc-100 bg-white">
                <h3 className="text-xs md:text-sm font-black uppercase tracking-widest mb-4">全局定价优先级与跟随商家策略</h3>
                
                <div className="flex flex-col md:flex-row gap-0 border border-zinc-200 mb-8 max-w-4xl">
                  <div className={`group flex-1 p-4 border-b md:border-b-0 md:border-r border-zinc-200 cursor-pointer transition-all ${pricingStrategy === 'special' ? 'bg-zinc-50 shadow-[inset_0_2px_0_black]' : 'bg-white hover:bg-zinc-50'}`} onClick={() => {
                    setPricingStrategy('special');
                  }}>
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">优先级 1</span>
                       {pricingStrategy === 'special' ? (
                          <div className="w-4 h-4 bg-black rounded-full border-[4px] border-white ring-1 ring-black shadow-sm"></div>
                       ) : (
                          <div className="w-4 h-4 bg-white rounded-full border border-zinc-300"></div>
                       )}
                    </div>
                    <div className={`text-sm font-black mb-1 ${pricingStrategy === 'special' ? 'text-black' : 'text-zinc-600'}`}>单品特例价格</div>
                    <div className="text-[10px] text-zinc-500 leading-relaxed">在「我的选品」中为特定SPU设置的固定展现价。</div>
                  </div>
                  
                  <div className={`group flex-1 p-4 border-b md:border-b-0 md:border-r border-zinc-200 cursor-pointer transition-all ${pricingStrategy === 'follow' ? 'bg-zinc-50 shadow-[inset_0_2px_0_black]' : 'bg-white hover:bg-zinc-50'}`} onClick={() => {
                    setPricingStrategy('follow');
                  }}>
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">优先级 2</span>
                       {pricingStrategy === 'follow' ? (
                          <div className="w-4 h-4 bg-black rounded-full border-[4px] border-white ring-1 ring-black shadow-sm"></div>
                       ) : (
                          <div className="w-4 h-4 bg-white rounded-full border border-zinc-300"></div>
                       )}
                    </div>
                    <div className={`text-sm font-black mb-1 ${pricingStrategy === 'follow' ? 'text-black' : 'text-zinc-600'}`}>跟随指定商家零售价</div>
                    <div className="text-[10px] text-zinc-500 leading-relaxed">若配置了跟随商家，将优先读取该商家的指导零售价。</div>
                  </div>
                  
                  <div className={`group flex-1 p-4 cursor-pointer transition-all ${pricingStrategy === 'default' ? 'bg-zinc-50 shadow-[inset_0_2px_0_black]' : 'bg-white hover:bg-zinc-50'}`} onClick={() => {
                     setPricingStrategy('default');
                  }}>
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">优先级 3</span>
                       {pricingStrategy === 'default' ? (
                          <div className="w-4 h-4 bg-black rounded-full border-[4px] border-white ring-1 ring-black shadow-sm"></div>
                       ) : (
                          <div className="w-4 h-4 bg-white rounded-full border border-zinc-300"></div>
                       )}
                    </div>
                    <div className={`text-sm font-black mb-1 ${pricingStrategy === 'default' ? 'text-black' : 'text-zinc-600'}`}>加价策略计算</div>
                    <div className="text-[10px] text-zinc-500 leading-relaxed">若前置策略未开启或均未命中，将应用默认的「全局/商家加价规则」与尾数计算。</div>
                  </div>
                </div>

                {/* Configuration Area */}
                <div className="border border-zinc-200 bg-zinc-50/50 p-6">
                   {pricingStrategy === 'special' && (
                     <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <h4 className="text-xs font-black uppercase tracking-widest mb-4">配置单品特例价格</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                     </div>
                   )}

                   {pricingStrategy === 'follow' && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                         <h4 className="text-xs font-black uppercase tracking-widest mb-4">配置跟随商家顺序</h4>
                         <div className="flex flex-col md:flex-row gap-4 items-end max-w-2xl">
                            <div className="w-full">
                               <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">优先跟随商家</label>
                               <select 
                                  value={followSupplierId}
                                  onChange={(e) => setFollowSupplierId(e.target.value)}
                                  className="w-full border border-zinc-200 px-3 py-2 text-sm font-bold focus:border-black focus:ring-0 outline-none bg-white"
                               >
                                  <option value="">请选择...</option>
                                  <option value="1567">UNIBUY (1567)</option>
                                  <option value="14746">002 (14746)</option>
                                  <option value="1795">HANNAH (1795)</option>
                                  <option value="9921">VIP-LUX (9921)</option>
                               </select>
                            </div>
                            <button className="bg-black text-white px-6 py-2 text-sm font-bold whitespace-nowrap hover:bg-zinc-800 transition-colors">
                               保存排序
                            </button>
                         </div>
                         <p className="mt-4 text-[10px] text-zinc-500 bg-white p-3 border border-zinc-100">
                            <strong>计价逻辑说明:</strong> 在前端展现商品价格时，系统将依序检查上述选择的商家是否在同一SKU上提供了「零售指导价」。如果优先级1的商家有配置零售价，则直接采用该金额作为分销最终价；否则继续检查优先级2，依此类推。若选择的商家均无零售价，则进入优先级3，使用下方的加价规则和尾数策略进行计算。
                         </p>
                      </div>
                   )}

                   {pricingStrategy === 'default' && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300 text-center py-4">
                         <p className="text-xs text-zinc-500 font-bold mb-1">将应用默认加价策略</p>
                         <p className="text-[10px] text-zinc-400">目前商品分销价格将由【默认全局加价 (STR-DEFAULT)】策略自动计算得出。</p>
                      </div>
                   )}
                </div>
              </div>

              {/* SKU Info Section */}
              <div className="p-4 md:p-8 bg-zinc-50/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 md:mb-6">
                  <h3 className="text-xs md:text-sm font-black uppercase tracking-widest">SKU 规格与报价 (包含所有商家)</h3>
                  {(() => {
                     let spuPricingMode = '无 (按照各商家加价规则)';
                     let badgeColor = 'text-black';
                     
                     if (pricingStrategy === 'special' && fixedPrice && !isNaN(Number(fixedPrice))) {
                        spuPricingMode = '单品特例价: ¥' + fixedPrice;
                        badgeColor = 'text-purple-700';
                     } else if (pricingStrategy === 'follow' && followSupplierId) {
                        let foundName = followSupplierId;
                        for (const s of spuData.skus) {
                           const b = s.suppliers.find((sup: any) => sup.id === followSupplierId);
                           if (b) { foundName = b.name; break; }
                        }
                        spuPricingMode = '跟随零售价 (' + foundName + ')';
                        badgeColor = 'text-orange-600';
                     } else {
                        spuPricingMode = '无 (按照各商家加价规则)';
                        if (rounding && rounding !== 'none') {
                           spuPricingMode += ` + 尾数化 ${rounding}`;
                        }
                     }
                     
                     return (
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] font-bold text-zinc-500 uppercase">当前SPU应用策略</span>
                           <span className={`font-bold text-xs bg-white px-3 py-1 border border-zinc-200 ${badgeColor}`}>
                             {spuPricingMode}
                           </span>
                        </div>
                     )
                  })()}
                </div>

                <div className="bg-white border border-zinc-200 shadow-sm overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-200 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        <th className="p-4 font-bold">商家 / 商品所在地</th>
                        <th className="p-4 font-bold text-right">集市供货价</th>
                        <th className="p-4 font-bold text-right">分销零售价</th>
                        <th className="p-4 font-bold text-right">利润</th>
                        <th className="p-4 font-bold text-right w-24">库存</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {(() => {
                        // 1. Determine baseline retail price for the ENTIRE SPU
                        let targetRetailPrice: number | null = null;
                        let pricingMode = '';
                        
                        if (pricingStrategy === 'special' && currentGlobalFixedPrice !== null) {
                           targetRetailPrice = currentGlobalFixedPrice;
                           pricingMode = '单品特例价: ¥' + currentGlobalFixedPrice;
                        } else if (pricingStrategy === 'follow' && followSupplierId) {
                           let foundCost = 0;
                           let foundFactor = 0;
                           let foundName = followSupplierId;
                           for (const s of spuData.skus) {
                              const b = s.suppliers.find((sup: any) => sup.id === followSupplierId);
                              if (b) {
                                 foundCost = b.cost;
                                 foundFactor = b.markupFactor;
                                 foundName = b.name;
                                 break;
                              }
                           }
                           
                           if (foundCost > 0) {
                              targetRetailPrice = foundCost * foundFactor;
                              pricingMode = '跟随零售价 (' + foundName + ')';
                           } else {
                              pricingMode = '无 (按照各商家加价规则)';
                              if (rounding && rounding !== 'none') {
                                 pricingMode += ` + 尾数化 ${rounding}`;
                              }
                           }
                        } else {
                           pricingMode = '无 (按照各商家加价规则)';
                           if (rounding && rounding !== 'none') {
                              pricingMode += ` + 尾数化 ${rounding}`;
                           }
                        }
                        
                        return spuData.skus.map((sku) => {
                          // 2. Process suppliers
                          const processedSuppliers = sku.suppliers.map(supplier => {
                              let calcRetail = 0;
                              let usedStrategy = '';
                              let isBenchmark = false;
                              
                              if (targetRetailPrice !== null) {
                                  calcRetail = targetRetailPrice;
                                  usedStrategy = pricingMode;
                                  if (pricingStrategy === 'follow' && supplier.id === followSupplierId) {
                                     isBenchmark = true;
                                  }
                              } else {
                                  calcRetail = supplier.cost * supplier.markupFactor;
                                  usedStrategy = supplier.markupRuleName;
                                  
                                  if (rounding === '9') {
                                     calcRetail = Math.floor(calcRetail / 10) * 10 + 9;
                                  } else if (rounding === '0') {
                                     calcRetail = Math.round(calcRetail / 10) * 10;
                                  }
                              }
                              
                              const profit = calcRetail - supplier.cost;
                              const profitMargin = profit / supplier.cost;
                              const inverted = profit < 0;
                              
                              const isRedlineBreached = currentProfitRedline !== null && profit < currentProfitRedline;
                              
                              return {
                                 ...supplier,
                                 calcRetail,
                                 profit,
                                 profitMargin,
                                 inverted,
                                 isBenchmark,
                                 usedStrategy,
                                 isRedlineBreached
                              };
                          });
                          
                          // 3. Sort suppliers
                          processedSuppliers.sort((a, b) => a.calcRetail - b.calcRetail);
  
                          return (
                            <Fragment key={sku.id}>
                              <tr className="bg-zinc-100/80 border-y border-zinc-200">
                                <td colSpan={5} className="p-4">
                                  <div className="flex items-center justify-between">
                                    <span className="font-black text-sm">规格: {sku.name}</span>
                                  </div>
                                </td>
                              </tr>
                              {processedSuppliers.map((supplier, index) => (
                              <tr key={supplier.id} className={`border-b border-zinc-100 transition-colors ${supplier.isRedlineBreached ? 'bg-red-50/50 hover:bg-red-50' : 'hover:bg-zinc-50'}`}>
                                <td className="p-4">
                                  <div className="text-xs font-bold mb-1">
                                    {supplier.name} 
                                    {index === 0 && !supplier.isRedlineBreached && <span className="ml-[6px] text-[10px] bg-black text-white px-1.5 py-0.5 font-normal rounded-sm">当前露出商家</span>}
                                    {supplier.isBenchmark && <span className="ml-[6px] text-[10px] bg-orange-100 text-orange-700 px-1 py-0.5 rounded-sm">基准</span>}
                                    {supplier.isRedlineBreached && <span className="ml-[6px] text-[10px] bg-red-100 text-red-700 px-1 py-0.5 rounded-sm">触碰红线 (下架)</span>}
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    <span className="bg-zinc-100 text-zinc-600 border border-zinc-200 px-2 py-1 text-[10px] font-bold uppercase tracking-wider">{supplier.origin}</span>
                                  </div>
                                  <div className="text-[10px] text-zinc-500 mt-2">应用策略: {supplier.usedStrategy}</div>
                                </td>
                                <td className="p-4 text-right">
                                  <div className="font-bold text-zinc-500">{supplier.costStr}</div>
                                  <div className="text-[10px] text-zinc-400 mt-1">
                                    {supplier.costStr !== `¥${supplier.cost.toLocaleString('en-US')}` && `约 ¥${supplier.cost.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
                                  </div>
                                </td>
                                <td className="p-4 text-right">
                                  {supplier.isRedlineBreached ? (
                                    <div className="font-bold text-zinc-400 line-through text-lg">¥{supplier.calcRetail.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                  ) : (
                                    <div className="font-bold text-black text-lg">¥{supplier.calcRetail.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                                  )}
                                </td>
                                <td className="p-4 text-right">
                                  <div className={`font-bold ${supplier.inverted || supplier.isRedlineBreached ? 'text-red-600' : 'text-black'}`}>
                                    {supplier.profit < 0 ? '-' : ''}¥{Math.abs(supplier.profit).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                  </div>
                                  <div className={`text-[10px] ${supplier.inverted || supplier.isRedlineBreached ? 'text-red-600' : 'text-zinc-400'}`}>
                                    {supplier.inverted ? '价格倒挂' : `${(supplier.profitMargin * 100).toFixed(1)}%`}
                                  </div>
                                </td>
                                <td className={`p-4 text-right font-bold ${supplier.stock <= 1 && !supplier.isRedlineBreached ? 'text-orange-600' : (supplier.isRedlineBreached ? 'text-red-400 line-through' : '')}`}>
                                  {supplier.stock <= 1 ? `仅剩 ${supplier.stock}` : supplier.stock}
                                </td>
                              </tr>
                            ))}
                          </Fragment>
                        );
                      });
                    })()}
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
