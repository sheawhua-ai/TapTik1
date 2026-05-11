import { Search, ChevronDown, TrendingUp, TrendingDown, X, Copy, AlertCircle } from "lucide-react";
import { useState, useMemo, Fragment, useEffect } from "react";
import { MultiSelectDropdown } from "./MultiSelectDropdown";
import { CategoryMultiSelectDropdown } from "./CategoryMultiSelectDropdown";
import { CATEGORY_HIERARCHY, ALL_BRANDS } from "../lib/constants";

const YOUR_SELECTIONS = [
  { id: 'hermes', brand: 'Hermès', category: '箱包', name: 'Hermès Birkin 25 金扣', no: 'H-B25-GOLD', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=400&q=80', minRetail: '¥168,000', minCost: '¥142,000', suppliers: ['UNIBUY (1567)', '002 (14746)'] },
  { id: 'ggdb', brand: 'Golden Goose', category: '鞋履', name: 'Golden Goose Super-Star 经典做旧运动鞋', no: 'GWF00102.F000317', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80', minRetail: '¥3,058', minCost: '¥2,750', suppliers: ['HANNAH (1795)', '002 (14746)', 'UNIBUY (1567)'] },
  { id: 'maxmara', brand: 'Max Mara', category: '服饰', name: 'Max Mara Madame 101801 经典大衣', no: '101801-MADAME', image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=400&q=80', minRetail: '¥18,500', minCost: '¥15,000', suppliers: ['002 (14746)'] },
];

export function MySelections() {
  const [selectedSpu, setSelectedSpu] = useState<string | null>(null);

  const [filterBrands, setFilterBrands] = useState<string[]>([]);
  const [filterCategories, setFilterCategories] = useState<string[]>([]);

  const [pricingStrategy, setPricingStrategy] = useState<'special' | 'follow' | 'default'>('default');
  const [followSupplierId, setFollowSupplierId] = useState('');
  const [fixedPriceRmb, setFixedPriceRmb] = useState('');
  const [fixedPriceHkd, setFixedPriceHkd] = useState('');
  
  const handleFixedPriceRmbChange = (val: string) => {
    setFixedPriceRmb(val);
    if (val && !isNaN(Number(val))) {
      setFixedPriceHkd(String(Math.round(Number(val) / 0.92)));
    } else {
      setFixedPriceHkd('');
    }
  };

  const handleFixedPriceHkdChange = (val: string) => {
    setFixedPriceHkd(val);
  };

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
              { id: '1567', name: 'UNIBUY (1567)', origin: '中国大陆', channel: 'domestic', costStr: '¥145,000.00', cost: 145000, markupRuleName: '品牌加价 10%', markupFactor: 1.1, stock: 5, currency: 'CNY', exchangeRate: 1 },
              { id: '14746', name: '002 (14746)', origin: '港澳直邮', channel: 'international', costStr: 'HK$155,000.00', cost: 142600, markupRuleName: '品类加价 18.3%', markupFactor: 1.183, stock: 10, currency: 'HKD', exchangeRate: 0.92 }
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
              { id: '1795', name: 'HANNAH (1795)', origin: '港澳直通', channel: 'international', costStr: 'HK$3,000.00', cost: 2760, markupRuleName: '商家特殊 12%', markupFactor: 1.12, stock: 4, currency: 'HKD', exchangeRate: 0.92 },
              { id: '14746', name: '002 (14746)', origin: '港澳物流', channel: 'international', costStr: 'HK$3,100.00', cost: 2852, markupRuleName: '全局 10%', markupFactor: 1.1, stock: 1, currency: 'HKD', exchangeRate: 0.92 },
              { id: '1567', name: 'UNIBUY (1567)', origin: '中国大陆', channel: 'domestic', costStr: '¥2,850.00', cost: 2850, markupRuleName: '全局 10%', markupFactor: 1.1, stock: 12, currency: 'CNY', exchangeRate: 1 },
            ]
          },
          {
            id: '37',
            name: '37',
            suppliers: [
               { id: '14746', name: '002 (14746)', origin: '港澳物流', channel: 'international', costStr: 'HK$3,100.00', cost: 2852, markupRuleName: '全局 10%', markupFactor: 1.1, stock: 1, currency: 'HKD', exchangeRate: 0.92 },
               { id: '1567', name: 'UNIBUY (1567)', origin: '中国大陆', channel: 'domestic', costStr: '¥2,850.00', cost: 2850, markupRuleName: '全局 10%', markupFactor: 1.1, stock: 12, currency: 'CNY', exchangeRate: 1 },
               { id: '1795', name: 'HANNAH (1795)', origin: '港澳直通', channel: 'international', costStr: 'HK$3,150.00', cost: 2898, markupRuleName: '商家特殊 12%', markupFactor: 1.12, stock: 5, currency: 'HKD', exchangeRate: 0.92 },
            ]
          },
          {
            id: '38',
            name: '38',
            suppliers: [
               { id: '1795', name: 'HANNAH (1795)', origin: '港澳直通', channel: 'international', costStr: 'HK$3,000.00', cost: 2760, markupRuleName: '商家特殊 12%', markupFactor: 1.12, stock: 8, currency: 'HKD', exchangeRate: 0.92 },
               { id: '1567', name: 'UNIBUY (1567)', origin: '中国大陆', channel: 'domestic', costStr: '¥2,850.00', cost: 2850, markupRuleName: '全局 10%', markupFactor: 1.1, stock: 15, currency: 'CNY', exchangeRate: 1 },
               { id: '14746', name: '002 (14746)', origin: '港澳物流', channel: 'international', costStr: 'HK$3,100.00', cost: 2852, markupRuleName: '全局 10%', markupFactor: 1.1, stock: 1, currency: 'HKD', exchangeRate: 0.92 },
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
              { id: '14746', name: '002 (14746)', origin: '港澳物流', channel: 'international', costStr: 'HK$16,500.00', cost: 15180, markupRuleName: '全局加价 15%', markupFactor: 1.15, stock: 2, currency: 'HKD', exchangeRate: 0.92 },
              { id: '1567', name: 'UNIBUY (1567)', origin: '中国大陆', channel: 'domestic', costStr: '¥16,500.00', cost: 16500, markupRuleName: '商家特殊 10%', markupFactor: 1.1, stock: 5, currency: 'CNY', exchangeRate: 1 }
            ]
          },
          {
            id: 'M',
            name: 'M',
            suppliers: [
              { id: '14746', name: '002 (14746)', origin: '港澳物流', channel: 'international', costStr: 'HK$16,500.00', cost: 15180, markupRuleName: '全局加价 15%', markupFactor: 1.15, stock: 3, currency: 'HKD', exchangeRate: 0.92 },
              { id: '1567', name: 'UNIBUY (1567)', origin: '中国大陆', channel: 'domestic', costStr: '¥16,500.00', cost: 16500, markupRuleName: '商家特殊 10%', markupFactor: 1.1, stock: 1, currency: 'CNY', exchangeRate: 1 }
            ]
          },
          {
            id: 'L',
            name: 'L',
            suppliers: [
              { id: '14746', name: '002 (14746)', origin: '港澳物流', channel: 'international', costStr: 'HK$16,500.00', cost: 15180, markupRuleName: '全局加价 15%', markupFactor: 1.15, stock: 4, currency: 'HKD', exchangeRate: 0.92 }
            ]
          }
        ]
      }
    };
    return selectedSpu ? db[selectedSpu] : undefined;
  }, [selectedSpu]);

  const currentGlobalFixedPriceRmb = pricingStrategy === 'special' && fixedPriceRmb && !isNaN(Number(fixedPriceRmb)) ? Number(fixedPriceRmb) : null;
  const currentGlobalFixedPriceHkd = pricingStrategy === 'special' && fixedPriceHkd && !isNaN(Number(fixedPriceHkd)) ? Number(fixedPriceHkd) : null;

  const currentProfitRedline = pricingStrategy === 'special' && profitRedline && !isNaN(Number(profitRedline)) ? Number(profitRedline) : null;

  useEffect(() => {
    if (spuData) {
      if (spuData.ruleType === 'special_price') {
        setPricingStrategy('special');
        setFixedPriceRmb(String(spuData.ruleValue));
        if (spuData.ruleValue) {
           setFixedPriceHkd(String(Math.round(Number(spuData.ruleValue) / 0.92)));
        } else {
           setFixedPriceHkd('');
        }
        setFollowSupplierId('14746');
      } else if (spuData.ruleType === 'follow_supplier') {
        setPricingStrategy('follow');
        setFollowSupplierId(String(spuData.ruleValue));
        setFixedPriceRmb('');
        setFixedPriceHkd('');
      } else {
        setPricingStrategy('default');
        setFollowSupplierId('14746');
        setFixedPriceRmb('');
        setFixedPriceHkd('');
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
          <div className="col-span-3 text-right">分销价</div>
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
                  <div className="text-[10px] text-zinc-400">货号: {item.no}</div>
                </div>
              </div>
              <div className="flex justify-between items-center md:contents">
                <div className="text-xs text-zinc-500 md:hidden ml-8">分销价</div>
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
                    <div className={`text-sm font-black mb-1 ${pricingStrategy === 'follow' ? 'text-black' : 'text-zinc-600'}`}>跟随指定商家分销价</div>
                    <div className="text-[10px] text-zinc-500 leading-relaxed">若配置了跟随商家，将优先读取该商家的指导分销价。</div>
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
                         <div className="flex gap-2">
                           <div className="flex-1">
                             <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">境内特例价 (¥)</label>
                             <input 
                                type="number" 
                                value={fixedPriceRmb}
                                onChange={(e) => handleFixedPriceRmbChange(e.target.value)}
                                placeholder="RMB金额" 
                                className="w-full border border-zinc-200 px-3 py-2 text-sm font-bold focus:border-black focus:ring-0 outline-none" 
                             />
                           </div>
                           <div className="flex-1">
                             <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">境外特例价 (HK$)</label>
                             <input 
                                type="number" 
                                value={fixedPriceHkd}
                                onChange={(e) => handleFixedPriceHkdChange(e.target.value)}
                                placeholder="HKD金额" 
                                className="w-full border border-zinc-200 px-3 py-2 text-sm font-bold focus:border-black focus:ring-0 outline-none" 
                             />
                           </div>
                         </div>
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
                         <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xs font-black uppercase tracking-widest">排队读取商家零售版</h4>
                         </div>
                         <div className="flex flex-col gap-3 max-w-2xl">
                            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest">全局配置的优先级</label>
                            <div className="flex items-center gap-2">
                               <div className="bg-white border border-zinc-200 px-4 py-2 text-sm font-bold flex items-center gap-2">
                                  <span className="text-[10px] bg-black text-white px-1.5 py-0.5">1</span>
                                  002 (14746)
                               </div>
                               <span className="text-zinc-300">→</span>
                               <div className="bg-white border border-zinc-200 px-4 py-2 text-sm font-bold flex items-center gap-2">
                                  <span className="text-[10px] bg-black text-white px-1.5 py-0.5">2</span>
                                  HANNAH (1795)
                               </div>
                               <span className="text-zinc-300">→</span>
                               <div className="bg-white border border-zinc-200 px-4 py-2 text-sm font-bold flex items-center gap-2">
                                  <span className="text-[10px] bg-black text-white px-1.5 py-0.5">3</span>
                                  UNIBUY (1567)
                               </div>
                            </div>
                         </div>
                         <p className="mt-4 text-[10px] text-zinc-500 bg-white p-3 border border-zinc-100">
                            <strong>计价逻辑说明:</strong> 此排序由「加价策略」全局设定所控制。系统将依序检查上述商家是否在同一SKU上提供了报价。如果此商家的报价包含境内(人民币)价格，将作为境内分销价基准；若包含境外(港币)价格，将作为境外分销价基准，两侧独立跟随。若上述商家均无报价，则采用「默认加价规则」。
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
                <h3 className="text-xs md:text-sm font-black uppercase tracking-widest mb-4 md:mb-6">SKU 规格与报价 (包含所有商家)</h3>
                <div className="bg-white border border-zinc-200 shadow-sm overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px] table-fixed">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-200 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        <th className="p-4 font-bold border-r border-zinc-200 w-1/4">规格</th>
                        <th className="p-0 font-bold border-r border-zinc-200 w-[37.5%] text-[10px]">
                           <div className="flex px-6 py-4 w-full">
                              <div className="w-1/4">境内商家</div>
                              <div className="w-1/5">供货价</div>
                              <div className="w-1/5">分销价</div>
                              <div className="w-1/4">利润</div>
                              <div className="w-[10%] text-right">库存</div>
                           </div>
                        </th>
                        <th className="p-0 font-bold w-[37.5%] text-[10px]">
                           <div className="flex px-6 py-4 w-full">
                              <div className="w-1/4">境外商家</div>
                              <div className="w-1/5">供货价</div>
                              <div className="w-1/5">分销价</div>
                              <div className="w-1/4">利润</div>
                              <div className="w-[10%] text-right">库存</div>
                           </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm align-top">
                      {(() => {
                        return spuData.skus.map((sku) => {
                          // 1. Determine baseline retail price for this specific SKU (Independent channels)
                          let targetRetailPriceRMB: number | null = null;
                          let targetRetailPriceHKD: number | null = null;
                          let pricingModeRMB = '';
                          let pricingModeHKD = '';
                          let followedBenchmarkIdRMB = '';
                          let followedBenchmarkIdHKD = '';
                          
                          if (pricingStrategy === 'special') {
                             if (currentGlobalFixedPriceRmb !== null) {
                                targetRetailPriceRMB = currentGlobalFixedPriceRmb;
                                pricingModeRMB = '单品特例价';
                             }
                             if (currentGlobalFixedPriceHkd !== null) {
                                targetRetailPriceHKD = currentGlobalFixedPriceHkd;
                                pricingModeHKD = '单品特例价';
                             }
                          } else if (pricingStrategy === 'follow') {
                             const followQueue = ['14746', '1795', '1567'];
                             for (const fId of followQueue) {
                                const matchedQuotes = sku.suppliers.filter((sup: any) => sup.id === fId);
                                if (matchedQuotes.length > 0) {
                                   for (const q of matchedQuotes) {
                                      let rawRetailNative = q.cost * q.markupFactor;
                                      if (q.currency === 'CNY' && targetRetailPriceRMB === null) {
                                         targetRetailPriceRMB = rawRetailNative;
                                         pricingModeRMB = '跟随分销价 (' + q.name.split(' ')[0] + ')';
                                         followedBenchmarkIdRMB = fId;
                                      } else if (q.currency === 'HKD' && targetRetailPriceHKD === null) {
                                         targetRetailPriceHKD = rawRetailNative;
                                         pricingModeHKD = '跟随分销价 (' + q.name.split(' ')[0] + ')';
                                         followedBenchmarkIdHKD = fId;
                                      }
                                   }
                                   break; // Stop after finding the first supplier in queue that has *any* quote
                                }
                             }
                          }
                          
                          if (targetRetailPriceRMB === null) {
                             pricingModeRMB = '无 (按照各商家加价规则)';
                             if (rounding && rounding !== 'none') pricingModeRMB += ` + 尾数化 ${rounding}`;
                          }
                          if (targetRetailPriceHKD === null) {
                             pricingModeHKD = '无 (按照各商家加价规则)';
                             if (rounding && rounding !== 'none') pricingModeHKD += ` + 尾数化 ${rounding}`;
                          }
                        
                          // 2. Process suppliers
                          const processedSuppliers = sku.suppliers.map(supplier => {
                              let calcRetailNative = 0;
                              let calcRetailRMB = 0;
                              let usedStrategy = '';
                              let isBenchmark = false;
                              
                              if (supplier.currency === 'CNY') {
                                 if (targetRetailPriceRMB !== null) {
                                    calcRetailNative = targetRetailPriceRMB;
                                    calcRetailRMB = calcRetailNative;
                                    usedStrategy = pricingModeRMB;
                                    if (pricingStrategy === 'follow' && supplier.id === followedBenchmarkIdRMB) isBenchmark = true;
                                 } else {
                                    calcRetailNative = supplier.cost * supplier.markupFactor;
                                    usedStrategy = supplier.markupRuleName;
                                    if (rounding === '9') calcRetailNative = Math.floor(calcRetailNative / 10) * 10 + 9;
                                    else if (rounding === '0') calcRetailNative = Math.round(calcRetailNative / 10) * 10;
                                    calcRetailRMB = calcRetailNative;
                                 }
                              } else if (supplier.currency === 'HKD') {
                                 if (targetRetailPriceHKD !== null) {
                                    calcRetailNative = targetRetailPriceHKD;
                                    usedStrategy = pricingModeHKD;
                                    if (pricingStrategy === 'follow' && supplier.id === followedBenchmarkIdHKD) isBenchmark = true;
                                 } else {
                                    calcRetailNative = supplier.cost * supplier.markupFactor;
                                    usedStrategy = supplier.markupRuleName;
                                    if (rounding === '9') calcRetailNative = Math.floor(calcRetailNative / 10) * 10 + 9;
                                    else if (rounding === '0') calcRetailNative = Math.round(calcRetailNative / 10) * 10;
                                 }
                                 calcRetailRMB = calcRetailNative * supplier.exchangeRate;
                              }
                              
                              const profitNative = calcRetailNative - supplier.cost;
                              const profitMargin = profitNative / supplier.cost;
                              const profitRMB = calcRetailRMB - (supplier.currency === 'CNY' ? supplier.cost : supplier.cost * supplier.exchangeRate);
                              const inverted = profitNative < 0;
                              
                              const isRedlineBreached = currentProfitRedline !== null && profitRMB < currentProfitRedline;

                              return {
                                 ...supplier,
                                 calcRetailRMB,
                                 calcRetailNative,
                                 profit: profitRMB,
                                 profitMargin,
                                 inverted,
                                 isBenchmark,
                                 usedStrategy,
                                 isRedlineBreached
                              };
                          });
                          
                          // 3. Sort & Group suppliers
                          const domesticSuppliers = processedSuppliers.filter(s => s.channel === 'domestic');
                          const intlSuppliers = processedSuppliers.filter(s => s.channel === 'international');

                          domesticSuppliers.sort((a, b) => a.calcRetailRMB - b.calcRetailRMB);
                          intlSuppliers.sort((a, b) => a.calcRetailRMB - b.calcRetailRMB);

                          const renderSupplierList = (suppliers: any[]) => {
                             if (suppliers.length === 0) return <div className="text-zinc-400 text-xs italic text-center py-4">无报价</div>;
                             return suppliers.map((supplier, index) => {
                                 const isPrimary = index === 0 && !supplier.isRedlineBreached;
                                 const isGray = !isPrimary;
                                 
                                 return (
                                   <div key={supplier.id} className={`flex items-center px-2 py-1.5 mb-1 last:mb-0 text-[11px] ${isPrimary ? 'bg-zinc-100 rounded text-zinc-900 border border-zinc-200/50' : 'text-zinc-500'} ${supplier.isRedlineBreached ? 'opacity-50' : ''}`}>
                                      <div className={`w-1/4 truncate pr-2 ${supplier.isBenchmark ? 'text-orange-500 font-bold' : ''}`} title={supplier.name}>
                                         {supplier.name.split(' ')[0]}
                                      </div>
                                      <div className="w-1/5">
                                         {supplier.costStr}
                                      </div>
                                      <div className={`w-1/5 font-bold ${supplier.isRedlineBreached ? 'line-through text-red-400' : (isPrimary ? 'text-black' : '')}`}>
                                         {supplier.currency === 'HKD' ? 'HK$' : '¥'}{supplier.calcRetailNative.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                      </div>
                                      <div className={`w-1/4 flex gap-1 ${supplier.profit < 0 ? 'text-red-500' : (isPrimary ? 'text-zinc-700 font-medium' : '')}`}>
                                         <span>{supplier.profit < 0 ? '-' : ''}¥{Math.abs(supplier.profit).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                                         <span className="opacity-70">({(supplier.profitMargin * 100).toFixed(0)}%)</span>
                                      </div>
                                      <div className={`w-[10%] text-right ${supplier.stock <= 1 && !supplier.isRedlineBreached ? 'text-zinc-700 font-bold' : ''}`}>
                                         {supplier.stock}
                                      </div>
                                   </div>
                                 );
                             });
                          };
  
                          return (
                            <tr key={sku.id} className="border-b border-zinc-200">
                                <td className="p-4 border-r border-zinc-200 bg-white">
                                  <div className="font-black text-sm">{sku.name}</div>
                                  <div className="text-[10px] text-zinc-400 mt-1">供货商家数: {sku.suppliers.length}</div>
                                </td>
                                <td className="p-4 border-r border-zinc-200 bg-zinc-50/50">
                                  {renderSupplierList(domesticSuppliers)}
                                </td>
                                <td className="p-4 bg-zinc-50/50">
                                  {renderSupplierList(intlSuppliers)}
                                </td>
                            </tr>
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
