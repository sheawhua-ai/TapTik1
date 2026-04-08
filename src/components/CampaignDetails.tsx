import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

interface CampaignDetailsProps {
  campaignId: string;
  onBack: () => void;
}

export function CampaignDetails({ campaignId, onBack }: CampaignDetailsProps) {
  const [expandedSpus, setExpandedSpus] = useState<Record<string, boolean>>({ 'margiela': true });
  
  const [skuData, setSkuData] = useState({
    confirmedTotal: 42,
  });

  const toggleSpu = (id: string) => setExpandedSpus(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
        <button onClick={onBack} className="hover:text-black transition-colors">货单管理</button>
        <ChevronRight size={14} />
        <span className="text-black font-bold">货单详情</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-black tracking-tighter uppercase">秋季系列合并采购单</h1>
            <span className="bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">活动中</span>
          </div>
          <div className="text-sm text-zinc-500 italic font-mono">货单编号: 3939948219939</div>
        </div>
      </div>

      {/* KPIs & Actions */}
      <div className="flex justify-between items-end mb-4">
        <div className="flex gap-12">
          <div>
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">已下单词值</div>
            <div className="text-2xl font-black">¥2,480,000</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">拼单进度 (已选/总需求)</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black">74%</span>
              <span className="text-xs text-zinc-500">/ 918 已选 (总计 1,240 件)</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">截止日期</div>
            <div className="text-2xl font-black text-red-600">10月24日, 18:00</div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-zinc-200 mb-12 relative">
        <div className="absolute top-0 left-0 h-full bg-black w-[74%]"></div>
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-4 bg-black"></div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-2 h-4 bg-zinc-300"></div>
      </div>

      {/* Table */}
      <div className="bg-white border border-zinc-200 shadow-sm mb-8">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          <div className="col-span-6">商品名称 / 规格 SKU</div>
          <div className="col-span-2 text-right">单价</div>
          <div className="col-span-2 text-center">已下单库存</div>
          <div className="col-span-2 text-center">剩余库存</div>
        </div>

        {/* SPU Row 1 */}
        <div className="border-b border-zinc-200">
          <div 
            className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-zinc-50 transition-colors cursor-pointer"
            onClick={() => toggleSpu('margiela')}
          >
            <div className="col-span-6 flex items-center gap-4">
              {expandedSpus['margiela'] ? <ChevronDown size={16} className="text-zinc-400" /> : <ChevronRight size={16} className="text-zinc-400" />}
              <div className="w-10 h-10 bg-black flex items-center justify-center text-white font-black text-xs">
                SKM
              </div>
              <div>
                <div className="text-sm font-black tracking-tight uppercase">MARGIELA GLAM SLAM MINI</div>
                <div className="text-[10px] text-zinc-400 font-mono">SPU: S56WG0108PR818</div>
              </div>
            </div>
            <div className="col-span-2 text-right text-sm font-bold">¥9,450.00</div>
            <div className="col-span-2 text-center font-black text-lg">124</div>
            <div className="col-span-2 text-center font-black text-lg text-zinc-400">88</div>
          </div>

          {/* SKU Rows */}
          {expandedSpus['margiela'] && (
            <div className="bg-zinc-50/50 border-t border-zinc-100">
              {/* SKU 1 */}
              <div className="border-b border-zinc-100">
                <div className="grid grid-cols-12 gap-4 px-6 py-3 items-center pl-14">
                  <div className="col-span-6 flex items-start gap-3">
                    <div className="w-4 h-4 border-l border-b border-zinc-300 rounded-bl mt-2"></div>
                    <div>
                      <div className="text-xs font-bold">黑色 / 纳帕皮 / Mini</div>
                      <div className="text-[10px] text-zinc-400 font-mono">SKU: T8013-BLK-MN</div>
                    </div>
                  </div>
                  <div className="col-span-2 text-right text-zinc-400">-</div>
                  <div className="col-span-2 text-center font-bold text-sm">
                    82
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <input 
                      type="number" 
                      value={skuData.confirmedTotal} 
                      onChange={(e) => setSkuData({ ...skuData, confirmedTotal: Number(e.target.value) })}
                      onClick={(e) => e.stopPropagation()}
                      className="w-20 border border-zinc-300 px-2 py-1 text-center text-sm font-bold outline-none focus:border-black"
                    />
                  </div>
                </div>
              </div>

              {/* SKU 2 */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 items-center pl-14">
                <div className="col-span-6 flex items-start gap-3">
                  <div className="w-4 h-4 border-l border-b border-zinc-300 rounded-bl mt-2"></div>
                  <div>
                    <div className="text-xs font-bold">白色 / 亮面 / Mini</div>
                    <div className="text-[10px] text-zinc-400 font-mono">SKU: T1003-WHT-MN</div>
                  </div>
                </div>
                <div className="col-span-2 text-right text-zinc-400">-</div>
                <div className="col-span-2 text-center font-bold text-sm">42</div>
                <div className="col-span-2 flex justify-center">
                  <input 
                    type="number" 
                    defaultValue={42} 
                    onClick={(e) => e.stopPropagation()}
                    className="w-20 border border-zinc-300 px-2 py-1 text-center text-sm font-bold outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SPU Row 2 */}
        <div className="border-b border-zinc-200">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-zinc-50 transition-colors cursor-pointer">
            <div className="col-span-6 flex items-center gap-4">
              <ChevronRight size={16} className="text-zinc-400" />
              <div className="w-10 h-10 bg-blue-50 flex items-center justify-center text-blue-500 font-black text-xs">
                AC
              </div>
              <div>
                <div className="text-sm font-black tracking-tight uppercase">AESTHETIQUE CHRONO NOIR</div>
                <div className="text-[10px] text-zinc-400 font-mono">SPU: AC-202-B</div>
              </div>
            </div>
            <div className="col-span-2 text-right text-sm font-bold">¥34,200.00</div>
            <div className="col-span-2 text-center font-black text-lg">18</div>
            <div className="col-span-2 text-center font-black text-lg text-zinc-400">0</div>
          </div>
        </div>
      </div>
    </div>
  );
}
