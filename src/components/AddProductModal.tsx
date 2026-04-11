import { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const [activeWarehouseTab, setActiveWarehouseTab] = useState<'domestic' | 'overseas'>('domestic');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-[1100px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-100">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight mb-1">新增商品</h2>
            <div className="text-xs text-zinc-500 font-mono">PRODUCT ENTRY</div>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-black transition-colors"><X size={24} /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* SPU Info Section */}
          <div className="p-8 border-b border-zinc-100 bg-white">
            <h3 className="text-sm font-black uppercase tracking-widest mb-6">SPU 基础信息</h3>
            
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">商品主图 (多图)</label>
                <div className="flex gap-2">
                  <div className="w-20 h-20 bg-zinc-50 border border-dashed border-zinc-300 flex items-center justify-center text-zinc-400 hover:text-black hover:border-black cursor-pointer transition-colors">
                    <Plus size={20} />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-6">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">品牌</label>
                <input type="text" placeholder="输入品牌" className="w-full border border-zinc-200 px-3 py-2 text-sm font-bold focus:border-black focus:ring-0 outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">分类</label>
                <input type="text" placeholder="输入分类" className="w-full border border-zinc-200 px-3 py-2 text-sm font-bold focus:border-black focus:ring-0 outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">商品名称</label>
                <input type="text" placeholder="输入商品名称" className="w-full border border-zinc-200 px-3 py-2 text-sm font-bold focus:border-black focus:ring-0 outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5 text-red-500">货号 (必填)</label>
                <input type="text" placeholder="输入货号" className="w-full border border-zinc-200 px-3 py-2 text-sm font-bold focus:border-black focus:ring-0 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">品牌原价 (¥)</label>
                <input type="number" placeholder="0.00" className="w-full border border-zinc-200 px-3 py-2 text-sm font-bold focus:border-black focus:ring-0 outline-none" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">颜色 (SPU级)</label>
                <input type="text" placeholder="输入颜色" className="w-full border border-zinc-200 px-3 py-2 text-sm font-bold focus:border-black focus:ring-0 outline-none" />
              </div>
            </div>
          </div>

          {/* SKU Info Section */}
          <div className="p-8 bg-zinc-50/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest">SKU 规格与库存</h3>
              <div className="flex gap-4">
                <button 
                  onClick={() => setActiveWarehouseTab('domestic')}
                  className={`text-xs font-bold pb-1 transition-colors ${activeWarehouseTab === 'domestic' ? 'text-black border-b-2 border-black' : 'text-zinc-400 hover:text-black'}`}
                >
                  境内仓 (Domestic)
                </button>
                <button 
                  onClick={() => setActiveWarehouseTab('overseas')}
                  className={`text-xs font-bold pb-1 transition-colors ${activeWarehouseTab === 'overseas' ? 'text-black border-b-2 border-black' : 'text-zinc-400 hover:text-black'}`}
                >
                  境外仓 (Overseas)
                </button>
              </div>
            </div>

            <div className="bg-white border border-zinc-200 p-4 mb-4 flex items-end gap-4 shadow-sm">
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">批量修改供货价</label>
                <input type="number" placeholder="输入金额" className="w-full border border-zinc-200 px-3 py-2 text-xs font-bold focus:border-black focus:ring-0 outline-none" />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">批量修改零售价</label>
                <input type="number" placeholder="输入金额" className="w-full border border-zinc-200 px-3 py-2 text-xs font-bold focus:border-black focus:ring-0 outline-none" />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">批量修改库存</label>
                <input type="number" placeholder="输入数量" className="w-full border border-zinc-200 px-3 py-2 text-xs font-bold focus:border-black focus:ring-0 outline-none" />
              </div>
              <button className="bg-black text-white px-4 py-2 text-xs font-bold hover:bg-zinc-800 transition-colors h-[34px]">应用批量修改</button>
            </div>

            <div className="bg-white border border-zinc-200 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-200 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    <th className="p-4 font-bold">规格 (尺码)</th>
                    <th className="p-4 font-bold">所在仓库</th>
                    <th className="p-4 font-bold">条码 (Barcode)</th>
                    <th className="p-4 font-bold text-right">批发供货价</th>
                    <th className="p-4 font-bold text-right">零售价</th>
                    <th className="p-4 font-bold text-right">库存</th>
                    <th className="p-4 font-bold text-center">操作</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                    <td className="p-4"><input type="text" placeholder="如 S码" className="w-20 border border-zinc-200 px-2 py-1.5 text-xs font-bold focus:border-black focus:ring-0 outline-none" /></td>
                    <td className="p-4">
                      <select className="border border-zinc-200 px-2 py-1.5 text-xs font-bold focus:border-black focus:ring-0 outline-none">
                        <option>选择仓库</option>
                        {activeWarehouseTab === 'domestic' ? (
                          <>
                            <option>深圳保税仓</option>
                            <option>杭州国内仓</option>
                          </>
                        ) : (
                          <>
                            <option>香港直邮仓</option>
                            <option>伦敦海外仓</option>
                          </>
                        )}
                      </select>
                    </td>
                    <td className="p-4"><input type="text" placeholder="输入条码" className="w-full border border-zinc-200 px-2 py-1.5 text-xs font-mono focus:border-black focus:ring-0 outline-none" /></td>
                    <td className="p-4">
                      <div className="flex items-center border border-zinc-200 bg-white px-2 py-1.5 w-28 ml-auto">
                        <span className="text-xs text-zinc-400 mr-1">¥</span>
                        <input type="number" placeholder="0.00" className="w-full text-xs font-bold outline-none text-right" />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center border border-zinc-200 bg-white px-2 py-1.5 w-28 ml-auto">
                        <span className="text-xs text-zinc-400 mr-1">¥</span>
                        <input type="number" placeholder="0.00" className="w-full text-xs font-bold outline-none text-right" />
                      </div>
                    </td>
                    <td className="p-4"><input type="number" placeholder="0" className="w-20 ml-auto border border-zinc-200 px-2 py-1.5 text-xs font-bold text-right focus:border-black focus:ring-0 outline-none" /></td>
                    <td className="p-4 text-center">
                      <button className="text-xs font-bold text-zinc-400 hover:text-red-500 transition-colors">删除</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="p-4 border-t border-zinc-100">
                <button className="text-xs font-bold text-black border-b border-black pb-0.5 hover:text-zinc-600 hover:border-zinc-600 transition-colors flex items-center gap-1">
                  <Plus size={12} />
                  增加 SKU
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-zinc-200 bg-white flex justify-between items-center">
          <div className="text-xs text-zinc-500 italic">* 库存设置为 0 即自动下架该仓库的对应规格</div>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-6 py-3 text-xs font-bold text-zinc-600 hover:text-black transition-colors">取消</button>
            <button onClick={onClose} className="bg-black text-white px-8 py-3 text-xs font-bold hover:bg-zinc-800 transition-colors">确认新增商品</button>
          </div>
        </div>
      </div>
    </div>
  );
}
