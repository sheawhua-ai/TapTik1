import { Search, Edit, Trash2, X } from "lucide-react";
import { useState } from "react";

const INITIAL_WAREHOUSES = [
  { id: '1', name: 'UNIBUY香港', code: '1567-001', currency: 'HKD', paymentPlatform: 'WALLTY', dropshipping: true, skuCount: 5128 },
  { id: '2', name: 'UNIBUY大陆', code: '1567-002', currency: 'CNY', paymentPlatform: 'WEIXIN', dropshipping: true, skuCount: 0 },
];

export function WarehouseManagement() {
  const [warehouses, setWarehouses] = useState(INITIAL_WAREHOUSES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto flex flex-col h-[calc(100vh-80px)]">
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">Infrastructure</div>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">仓库管理</h1>
          <p className="text-sm text-zinc-500">管理您的发货仓库及代发配置</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 bg-white p-4 border border-zinc-200 shadow-sm">
        <div className="flex gap-4 items-center">
          <div className="relative w-64">
            <input 
              type="text" 
              placeholder="请输入仓库名称" 
              className="w-full border border-zinc-200 px-4 py-2 text-sm focus:border-black focus:ring-0 outline-none" 
            />
          </div>
          <button className="bg-teal-500 text-white text-sm px-6 py-2 hover:bg-teal-600 transition-colors">
            查询
          </button>
          <button className="bg-zinc-100 text-zinc-600 text-sm px-6 py-2 hover:bg-zinc-200 transition-colors">
            重置
          </button>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-teal-500 text-white text-sm px-6 py-2 hover:bg-teal-600 transition-colors"
        >
          新增仓库
        </button>
      </div>

      <div className="bg-white border border-zinc-200 shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-xs font-bold text-zinc-600">
              <tr>
                <th className="p-4 font-medium text-center">仓库名称</th>
                <th className="p-4 font-medium text-center">仓库编码</th>
                <th className="p-4 font-medium text-center">币种</th>
                <th className="p-4 font-medium text-center">支付平台</th>
                <th className="p-4 font-medium text-center">订单代发</th>
                <th className="p-4 font-medium text-center">SKU数量</th>
                <th className="p-4 font-medium text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {warehouses.map(warehouse => (
                <tr key={warehouse.id} className="hover:bg-zinc-50 transition-colors text-center">
                  <td className="p-4">{warehouse.name}</td>
                  <td className="p-4">{warehouse.code}</td>
                  <td className="p-4">{warehouse.currency}</td>
                  <td className="p-4">{warehouse.paymentPlatform}</td>
                  <td className="p-4">
                    {warehouse.dropshipping ? (
                      <span className="text-teal-500 border border-teal-500 px-2 py-0.5 text-xs rounded-sm">支持</span>
                    ) : (
                      <span className="text-zinc-400 border border-zinc-200 px-2 py-0.5 text-xs rounded-sm">不支持</span>
                    )}
                  </td>
                  <td className="p-4">{warehouse.skuCount}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-3 text-teal-500">
                      <button className="hover:text-teal-700 transition-colors">修改</button>
                      <button className="hover:text-teal-700 transition-colors">删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-zinc-200 flex justify-end items-center text-sm text-zinc-500 bg-zinc-50">
          <div className="flex items-center gap-4">
            <span>共 {warehouses.length} 条</span>
            <select className="border border-zinc-200 px-2 py-1 bg-white outline-none">
              <option>20条/页</option>
              <option>50条/页</option>
            </select>
            <div className="flex items-center gap-2">
              <button className="text-zinc-400 hover:text-black">&lt;</button>
              <span className="text-teal-500 font-bold">1</span>
              <button className="text-zinc-400 hover:text-black">&gt;</button>
            </div>
            <div className="flex items-center gap-2">
              <span>前往</span>
              <input type="text" defaultValue="1" className="w-10 border border-zinc-200 text-center py-1 outline-none" />
              <span>页</span>
            </div>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
          <div className="relative w-[600px] bg-white shadow-2xl rounded-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h2 className="text-lg font-medium">添加仓库</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-zinc-400 hover:text-black transition-colors"><X size={20} /></button>
            </div>
            
            <div className="p-6 flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <label className="w-24 text-right text-sm"><span className="text-red-500 mr-1">*</span>仓库名称</label>
                <input type="text" placeholder="请输入仓库名称" className="flex-1 border border-zinc-200 px-3 py-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none rounded-sm" />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-24 text-right text-sm"><span className="text-red-500 mr-1">*</span>所在地</label>
                <select className="flex-1 border border-zinc-200 px-3 py-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none rounded-sm bg-white text-zinc-500">
                  <option value="">请选择所在地</option>
                  <option value="hk">香港</option>
                  <option value="cn">中国大陆</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label className="w-24 text-right text-sm"><span className="text-red-500 mr-1">*</span>币种</label>
                <input type="text" placeholder="选择所在地后自动填充" disabled className="flex-1 border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none rounded-sm text-zinc-400" />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-24 text-right text-sm"><span className="text-red-500 mr-1">*</span>支付平台</label>
                <select disabled className="flex-1 border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none rounded-sm text-zinc-400">
                  <option value="">选择所在地后自动填充</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label className="w-24 text-right text-sm">订单代发</label>
                <div className="flex-1 flex items-center">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" name="toggle" id="toggle" defaultChecked className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out translate-x-5 border-teal-500" style={{ top: '2px', left: '2px' }}/>
                    <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-teal-500 cursor-pointer"></label>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-zinc-100 flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-2 border border-zinc-200 text-sm hover:bg-zinc-50 transition-colors rounded-sm">取消</button>
              <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-2 bg-teal-500 text-white text-sm hover:bg-teal-600 transition-colors rounded-sm">确定</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
