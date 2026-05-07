import { useState, useRef, useEffect } from "react";
import { Plus, X, AlertCircle, ChevronDown, Search } from "lucide-react";
import { MultiSelectDropdown } from "./MultiSelectDropdown";
import { CategoryMultiSelectDropdown } from "./CategoryMultiSelectDropdown";
import { CATEGORY_HIERARCHY, ALL_BRANDS } from "../lib/constants";

export function MarkupStrategy() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [strategyName, setStrategyName] = useState('');
  const [markupRate, setMarkupRate] = useState('');
  const [selectedMerchants, setSelectedMerchants] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceTailRule, setPriceTailRule] = useState('none');
  const [isSelfOperatedPriority, setIsSelfOperatedPriority] = useState(true);

  const markupValue = Number(markupRate) || 0;
  const isSaveDisabled = !strategyName || !markupRate;

  const supplyPrice = 100;
  let calculatedSellingPrice = supplyPrice * (1 + markupValue / 100);
  if (priceTailRule === '9') {
    calculatedSellingPrice = Math.floor(calculatedSellingPrice / 10) * 10 + 9;
  } else if (priceTailRule === '99') {
    calculatedSellingPrice = Math.floor(calculatedSellingPrice / 100) * 100 + 99;
  }
  
  const sellingPrice = markupValue ? calculatedSellingPrice.toFixed(2) : '0.00';
  const profit = markupValue ? (Number(sellingPrice) - supplyPrice).toFixed(2) : '0.00';
  const calculatedGrossMargin = markupValue && Number(sellingPrice) > 0 ? ((Number(profit) / Number(sellingPrice)) * 100).toFixed(2) : '0.00';

  const merchants = [
    { value: 'm1', label: 'Global Luxury Hub' },
    { value: 'm2', label: 'Euro Boutique' },
    { value: 'm3', label: 'Tokyo Select' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-6 md:mb-8 gap-4">
        <div>
          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">Distributor Dashboard</div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-2">配置加价策略</h1>
          <p className="text-xs md:text-sm text-zinc-500">按商家、品牌或子分类独立配置您的加价规则与尾数</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto bg-black text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          新增策略
        </button>
      </div>

      <div className="bg-white border border-zinc-200 shadow-sm">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          <div className="col-span-3">策略名称 (ID)</div>
          <div className="col-span-4">适用范围 (商家/分类/品牌)</div>
          <div className="col-span-3 text-center">加价规则 & 尾数处理</div>
          <div className="col-span-2 text-right">操作</div>
        </div>

        {/* Strategy Row 1 */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 px-4 md:px-6 py-4 md:py-6 border-b border-zinc-200 md:items-center hover:bg-zinc-50 transition-colors">
          <div className="md:col-span-3 flex justify-between items-start md:block">
            <div>
              <div className="text-sm font-bold">默认全局加价</div>
              <div className="text-[10px] text-zinc-400 mt-1 font-mono">ID: STR-DEFAULT</div>
            </div>
            <div className="md:hidden">
              <button className="text-xs font-bold text-zinc-500 hover:text-black transition-colors border border-zinc-200 px-3 py-1">编辑</button>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-wrap gap-1">
            <span className="bg-zinc-100 text-zinc-600 px-2 py-1 text-[10px] font-bold">全部商家</span>
            <span className="bg-zinc-100 text-zinc-600 px-2 py-1 text-[10px] font-bold">全部分类</span>
            <span className="bg-zinc-100 text-zinc-600 px-2 py-1 text-[10px] font-bold">全部品牌</span>
          </div>
          <div className="md:col-span-3 flex justify-between items-center md:block md:text-center mt-2 md:mt-0">
            <div className="text-xs text-zinc-500 md:hidden">加价规则</div>
            <div className="text-right md:text-center">
              <div className="text-sm font-bold text-emerald-600">+ 15%</div>
              <div className="text-[10px] text-zinc-400 mt-1">尾数: 以9结尾</div>
            </div>
          </div>
          <div className="hidden md:block col-span-2 text-right">
            <button className="text-xs font-bold text-zinc-500 hover:text-black transition-colors mr-4">编辑</button>
            <button className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors disabled:opacity-50" disabled>删除</button>
          </div>
        </div>

        {/* Strategy Row 2 */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 px-4 md:px-6 py-4 md:py-6 border-b border-zinc-200 md:items-center hover:bg-zinc-50 transition-colors">
          <div className="md:col-span-3 flex justify-between items-start md:block">
            <div>
              <div className="text-sm font-bold">欧洲优选商家-腕表加价</div>
              <div className="text-[10px] text-zinc-400 mt-1 font-mono">ID: STR-8U72B</div>
            </div>
            <div className="md:hidden">
              <button className="text-xs font-bold text-zinc-500 hover:text-black transition-colors mr-3 border border-zinc-200 px-3 py-1">编辑</button>
              <button className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors border border-red-200 px-3 py-1 bg-red-50">删除</button>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-wrap gap-1">
            <span className="bg-blue-50 text-blue-600 px-2 py-1 text-[10px] font-bold">Euro Boutique</span>
            <span className="bg-orange-50 text-orange-600 px-2 py-1 text-[10px] font-bold">腕表</span>
            <span className="bg-zinc-100 text-zinc-600 px-2 py-1 text-[10px] font-bold">Rolex</span>
          </div>
          <div className="md:col-span-3 flex justify-between items-center md:block md:text-center mt-2 md:mt-0">
            <div className="text-xs text-zinc-500 md:hidden">加价规则</div>
            <div className="text-right md:text-center">
              <div className="text-sm font-bold text-emerald-600">+ 8%</div>
              <div className="text-[10px] text-zinc-400 mt-1">尾数: 不处理</div>
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
                  placeholder="例如：特定商家包袋加价" 
                  className="w-full border border-zinc-200 px-3 py-2 text-sm focus:border-black focus:ring-0 outline-none" 
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <MultiSelectDropdown 
                  label="适用商家 (留空则适用全部)" 
                  options={merchants} 
                  selected={selectedMerchants} 
                  onChange={setSelectedMerchants} 
                  placeholder="全部商家" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CategoryMultiSelectDropdown 
                  label="适用分类 (留空则适用全部)" 
                  options={CATEGORY_HIERARCHY} 
                  selected={selectedCategories} 
                  onChange={setSelectedCategories} 
                  placeholder="全部分类" 
                />
                <MultiSelectDropdown 
                  label="适用品牌 (留空则适用全部)" 
                  options={ALL_BRANDS} 
                  selected={selectedBrands} 
                  onChange={setSelectedBrands} 
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
                        value={priceTailRule}
                        onChange={(e) => setPriceTailRule(e.target.value)}
                        className="w-full border border-zinc-200 px-3 py-2 text-sm focus:border-black focus:ring-0 outline-none appearance-none bg-white"
                      >
                        <option value="none">不处理 (精确到分)</option>
                        <option value="9">固定以 9 结尾</option>
                        <option value="99">固定以 99 结尾</option>
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
                    {priceTailRule !== 'none' && (
                      <div className="font-mono mb-1">
                        尾数处理 ({priceTailRule === '9' ? '结尾 9' : '结尾 99'}) = <span className="font-bold text-black">¥{sellingPrice}</span>
                      </div>
                    )}
                    <div className="font-mono mb-1 mt-2">
                      最终展现价 = <span className="font-bold text-black">¥{sellingPrice}</span>
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
