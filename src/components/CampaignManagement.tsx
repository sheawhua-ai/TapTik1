import { useState } from 'react';
import { Copy, ChevronRight, Warehouse, Plus, FileText } from 'lucide-react';
import { CampaignModal } from './CampaignModal';
import { CampaignDetails } from './CampaignDetails';

export function CampaignManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [selectedCampaignIds, setSelectedCampaignIds] = useState<string[]>([]);

  const handleToggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCampaignIds(['M-092-2024', 'M-093-2024']);
    } else {
      setSelectedCampaignIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedCampaignIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  if (selectedCampaign) {
    return <CampaignDetails campaignId={selectedCampaign} onBack={() => setSelectedCampaign(null)} />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">货单管理</h1>
          <p className="text-sm text-zinc-500">监管全球供应链核心节点。精确控制、实时同步。</p>
        </div>
        <div className="flex gap-4 items-center">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-black text-white px-6 py-4 h-full flex items-center gap-2 font-bold hover:bg-zinc-800 transition-colors"
          >
            <Plus size={20} />
            新增货单活动
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-6 items-end">
          <div>
            <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">所属仓库</div>
            <select className="bg-white border border-zinc-200 text-sm font-bold py-2 px-4 pr-8 focus:ring-0 focus:border-black outline-none appearance-none cursor-pointer min-w-[160px]">
              <option>全部仓库</option>
              <option>欧洲仓 (Milan Center)</option>
              <option>亚洲仓 (Hong Kong Hub)</option>
            </select>
          </div>
          <div>
            <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">活动状态</div>
            <div className="flex">
              <button className="bg-black text-white text-xs font-bold px-4 py-2 border border-black">全部</button>
              <button className="bg-white text-zinc-600 hover:text-black text-xs font-bold px-4 py-2 border-y border-r border-zinc-200 hover:border-black transition-colors">活动中</button>
              <button className="bg-white text-zinc-600 hover:text-black text-xs font-bold px-4 py-2 border-y border-r border-zinc-200 hover:border-black transition-colors">待开始</button>
              <button className="bg-white text-zinc-600 hover:text-black text-xs font-bold px-4 py-2 border-y border-r border-zinc-200 hover:border-black transition-colors">已结束</button>
            </div>
          </div>
          <button 
            disabled={selectedCampaignIds.length === 0}
            className="bg-white text-black border border-black text-xs font-bold px-6 py-2 hover:bg-zinc-50 transition-colors disabled:opacity-50 disabled:border-zinc-200 disabled:text-zinc-400 flex items-center gap-2"
          >
            <FileText size={14} />
            合并生成采购单
          </button>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 shadow-sm flex flex-col">
        <div className="grid grid-cols-12 gap-4 px-8 py-4 border-b border-zinc-200 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-widest items-center">
          <div className="col-span-6 flex items-center gap-4">
            <input type="checkbox" className="accent-black" onChange={handleToggleSelectAll} checked={selectedCampaignIds.length === 2} />
            <span>货单详情 (ID / 名称 / 仓库)</span>
          </div>
          <div className="col-span-3">进展情况</div>
          <div className="col-span-3 text-right">操作</div>
        </div>

        {/* Item 1 */}
        <div className="grid grid-cols-12 gap-4 px-8 py-6 border-b border-zinc-200 items-center hover:bg-zinc-50 transition-colors">
          <div className="col-span-6 pr-8 flex items-start gap-4">
            <input 
              type="checkbox" 
              className="accent-black mt-1.5" 
              checked={selectedCampaignIds.includes('M-092-2024')}
              onChange={() => handleToggleSelect('M-092-2024')}
            />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">M-092-2024</span>
                <Copy size={14} className="text-zinc-300 cursor-pointer hover:text-black" />
              </div>
              <h3 className="text-lg font-black tracking-tight leading-tight mb-2">2024 秋季高奢皮具专场：LVMH 联名系列全球分发计划</h3>
              <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-500 uppercase">
                <Warehouse size={14} />
                欧洲仓 (MILAN CENTER)
              </div>
            </div>
          </div>
          <div className="col-span-3 pr-8">
            <div className="flex justify-between items-end mb-1">
              <span className="text-xs font-bold">完成度: 100%</span>
              <span className="text-[10px] text-zinc-400">1,248 / 1,400 件</span>
            </div>
            <div className="w-full h-1 bg-zinc-100 mb-3">
              <div className="h-full bg-black w-full"></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-red-600">剩余：12 小时</span>
              <span className="text-[9px] text-zinc-400 uppercase tracking-widest">截止: 2024-11-20</span>
            </div>
          </div>
          <div className="col-span-3 flex justify-end items-center gap-3">
            <button className="bg-zinc-100 text-zinc-600 text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-zinc-200 transition-colors">生成采购单</button>
            <button className="bg-zinc-100 text-zinc-600 text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-zinc-200 transition-colors">提前结束</button>
            <button 
              onClick={() => setSelectedCampaign('M-092-2024')}
              className="w-8 h-8 border border-zinc-200 flex items-center justify-center hover:border-black transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Item 2 */}
        <div className="grid grid-cols-12 gap-4 px-8 py-6 border-b border-zinc-200 items-center hover:bg-zinc-50 transition-colors">
          <div className="col-span-6 pr-8 flex items-start gap-4">
            <input 
              type="checkbox" 
              className="accent-black mt-1.5" 
              checked={selectedCampaignIds.includes('M-093-2024')}
              onChange={() => handleToggleSelect('M-093-2024')}
            />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">M-093-2024</span>
                <Copy size={14} className="text-zinc-300 cursor-pointer hover:text-black" />
              </div>
              <h3 className="text-lg font-black tracking-tight leading-tight mb-2">瑞士钟表：限量典藏系列 (Geneva Heritage) 二期入库审核</h3>
              <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-500 uppercase">
                <Warehouse size={14} />
                亚洲仓 (HONG KONG HUB)
              </div>
            </div>
          </div>
          <div className="col-span-3 pr-8">
            <div className="flex justify-between items-end mb-1">
              <span className="text-xs font-bold">完成度: 45%</span>
              <span className="text-[10px] text-zinc-400">225 / 500 件</span>
            </div>
            <div className="w-full h-1 bg-zinc-100 mb-3">
              <div className="h-full bg-black w-[45%]"></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-black">剩余：3天 8小时</span>
              <span className="text-[9px] text-zinc-400 uppercase tracking-widest">截止: 2024-11-23</span>
            </div>
          </div>
          <div className="col-span-3 flex justify-end items-center gap-3">
            <button className="bg-zinc-100 text-zinc-600 text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-zinc-200 transition-colors">生成采购单</button>
            <button className="bg-zinc-100 text-zinc-600 text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:bg-zinc-200 transition-colors">提前结束</button>
            <button 
              onClick={() => setSelectedCampaign('M-093-2024')}
              className="w-8 h-8 border border-zinc-200 flex items-center justify-center hover:border-black transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <CampaignModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
}
