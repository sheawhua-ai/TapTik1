import { X, UploadCloud, FileText, Trash2, ImagePlus, Search } from 'lucide-react';
import { useState } from 'react';

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CampaignModal({ isOpen, onClose }: CampaignModalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'manual'>('upload');
  const [acceptDeposit, setAcceptDeposit] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[90vh] bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-zinc-100">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-black tracking-tighter uppercase">新增货单活动</h2>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-black">
            <X size={24} />
          </button>
        </div>
        
        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          <div className="grid grid-cols-12 gap-12">
            {/* Left Column */}
            <div className="col-span-4 space-y-8">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">供货仓库与格式</label>
                <select className="w-full bg-zinc-50 border border-zinc-200 py-3 px-4 text-sm focus:ring-0 focus:border-black outline-none appearance-none">
                  <option>米兰总仓</option>
                </select>
              </div>

              <div>
                <div className="flex border-b border-zinc-200 mb-4">
                  <button 
                    onClick={() => setActiveTab('upload')}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'upload' ? 'border-black text-black' : 'border-transparent text-zinc-400 hover:text-black'}`}
                  >
                    上传货单文件
                  </button>
                  <button 
                    onClick={() => setActiveTab('manual')}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors ${activeTab === 'manual' ? 'border-black text-black' : 'border-transparent text-zinc-400 hover:text-black'}`}
                  >
                    手动选品
                  </button>
                </div>

                {activeTab === 'upload' ? (
                  <div>
                    <div className="border-2 border-dashed border-zinc-200 bg-zinc-50 p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-black transition-colors">
                      <UploadCloud className="text-zinc-400 mb-2" size={32} />
                      <div className="text-xs font-bold mb-1">点击或拖拽 CSV / Excel</div>
                      <div className="text-[9px] text-zinc-400 uppercase tracking-widest">系统将自动识别货号和库存</div>
                    </div>
                    <div className="mt-2 bg-black text-white px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText size={16} />
                        <span className="text-[10px] font-mono">Q4_PRE_ORDER_LIST.CSV</span>
                      </div>
                      <button className="text-zinc-400 hover:text-white">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                      <input 
                        type="text" 
                        placeholder="搜索在售商品名称、货号..." 
                        className="w-full border border-zinc-200 pl-10 pr-4 py-2 text-sm focus:border-black focus:ring-0 outline-none bg-zinc-50" 
                      />
                    </div>
                    <div className="text-xs text-zinc-500 text-center py-8 border border-zinc-200 bg-zinc-50">
                      请在右侧列表中勾选需要加入货单的商品
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-8 space-y-10">
              {/* Pricing */}
              <div>
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2 mb-4">全局定价规则</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">汇率转化 (欧元汇率)</label>
                    <div className="relative">
                      <input type="text" defaultValue="7.85" className="w-full bg-zinc-50 border-none py-3 px-4 text-sm font-mono focus:ring-1 focus:ring-black outline-none" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-zinc-400">固定</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">批量加价</label>
                    <input type="text" defaultValue="+ 5.00%" className="w-full bg-zinc-50 border-none py-3 px-4 text-sm font-mono focus:ring-1 focus:ring-black outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">交货方式</label>
                    <select className="w-full bg-zinc-50 border-none py-3 px-4 text-sm font-mono focus:ring-1 focus:ring-black outline-none appearance-none">
                      <option value="hk">香港交货</option>
                      <option value="eu">欧洲交货</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Rules */}
              <div>
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 pb-2 mb-4">活动业务限制</h3>
                <div className="grid grid-cols-5 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">起订金额</label>
                    <input type="text" defaultValue="¥ 100,000" className="w-full bg-zinc-50 border-none py-3 px-4 text-sm font-mono focus:ring-1 focus:ring-black outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">最小起订量</label>
                    <input type="text" defaultValue="20" className="w-full bg-zinc-50 border-none py-3 px-4 text-sm font-mono focus:ring-1 focus:ring-black outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">开始日期</label>
                    <input type="date" min={new Date().toISOString().split('T')[0]} className="w-full bg-zinc-50 border-none py-3 px-4 text-sm font-mono focus:ring-1 focus:ring-black text-zinc-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">截止日期</label>
                    <input type="date" className="w-full bg-zinc-50 border-none py-3 px-4 text-sm font-mono focus:ring-1 focus:ring-black text-zinc-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">预付定金 (%)</label>
                    <input 
                      type="number" 
                      defaultValue={30} 
                      className="w-full bg-zinc-50 border-none py-3 px-4 text-sm font-mono focus:ring-1 focus:ring-black outline-none" 
                    />
                    <div className="text-[9px] text-zinc-400 mt-1">输入 0 表示需要全款</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="mt-12">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                {activeTab === 'upload' ? '解析结果与智能匹配' : '已选择商品列表'}
              </h3>
              <div className="text-[10px] font-bold uppercase tracking-widest">
                <span className="text-zinc-500 mr-4">已匹配/选择: <span className="text-black">18</span></span>
                {activeTab === 'upload' && <span className="text-zinc-500">新增: <span className="text-black">4</span></span>}
              </div>
            </div>
            <div className="border border-zinc-200">
              <table className="w-full text-left">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                  <tr>
                    {activeTab === 'manual' && <th className="px-4 py-3 w-10"><input type="checkbox" className="accent-black" /></th>}
                    <th className="px-4 py-3">状态</th>
                    <th className="px-4 py-3">预览</th>
                    <th className="px-4 py-3">品牌</th>
                    <th className="px-4 py-3">名称/编号</th>
                    <th className="px-4 py-3">分类</th>
                    <th className="px-4 py-3 text-right">原价</th>
                    <th className="px-4 py-3 text-right">活动价</th>
                    <th className="px-4 py-3 text-right">库存</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-sm">
                  <tr className="hover:bg-zinc-50">
                    {activeTab === 'manual' && <td className="px-4 py-3"><input type="checkbox" className="accent-black" defaultChecked /></td>}
                    <td className="px-4 py-3"><span className="bg-black text-white text-[8px] font-bold px-2 py-1 uppercase">{activeTab === 'upload' ? '已匹配' : '已选择'}</span></td>
                    <td className="px-4 py-3"><img src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=100&q=80" alt="Rolex" className="w-10 h-10 object-contain mix-blend-multiply grayscale" /></td>
                    <td className="px-4 py-3 text-xs font-bold">Rolex</td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-xs">Submariner Date</div>
                      <div className="text-[9px] text-zinc-400 font-mono mt-0.5">RLX-126610-LN</div>
                    </td>
                    <td className="px-4 py-3 text-[10px] text-zinc-500 uppercase">手表 / 专业款</td>
                    <td className="px-4 py-3 text-right text-zinc-500 font-mono text-xs">€ 8,200.00</td>
                    <td className="px-4 py-3 text-right">
                      <span className="border border-zinc-200 px-2 py-1 font-bold font-mono text-xs">¥ 67,500.00</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <input type="number" defaultValue={12} className="w-16 bg-white border border-zinc-200 px-2 py-1 font-mono text-xs text-right focus:outline-none focus:border-black" />
                    </td>
                  </tr>
                  {activeTab === 'upload' && (
                    <tr className="bg-zinc-50/50">
                      <td className="px-4 py-3"><span className="bg-zinc-200 text-zinc-600 text-[8px] font-bold px-2 py-1 uppercase">新增</span></td>
                      <td className="px-4 py-3">
                        <div className="w-10 h-10 border border-zinc-200 bg-white flex items-center justify-center">
                          <ImagePlus className="text-zinc-300" size={16} />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs font-bold italic text-zinc-500">Prada</td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-xs italic">Galleria Saffiano Bag</div>
                        <div className="text-[9px] text-zinc-400 font-mono mt-0.5">PRD-1BA896-NZV</div>
                      </td>
                      <td className="px-4 py-3 text-[10px] text-zinc-400 uppercase">选择分类...</td>
                      <td className="px-4 py-3 text-right text-zinc-500 font-mono text-xs">€ 2,450.00</td>
                      <td className="px-4 py-3 text-right">
                        <span className="border border-zinc-200 px-2 py-1 font-bold font-mono text-xs bg-white">¥ 20,200.00</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <input type="number" defaultValue={5} className="w-16 bg-white border border-zinc-200 px-2 py-1 font-mono text-xs text-right focus:outline-none focus:border-black" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <div className="w-2 h-2 bg-zinc-300 rounded-full"></div>
            草稿保存于 14:22
          </div>
          <div className="flex gap-4">
            <button className="bg-white border border-zinc-200 px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:border-black transition-colors">暂存草稿</button>
            <button className="bg-black text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors">保存并发布</button>
          </div>
        </div>
      </div>
    </div>
  );
}
