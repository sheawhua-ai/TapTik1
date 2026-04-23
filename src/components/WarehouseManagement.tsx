import { Search, Edit, Trash2, X } from "lucide-react";
import { useState } from "react";

const INITIAL_WAREHOUSES = [
  { id: '1', name: 'UNIBUY香港', code: '1567-001', location: 'hk', currency: 'HKD', dropshipping: true, autoConfirmStock: false, skuCount: 5128 },
  { id: '2', name: 'UNIBUY大陆', code: '1567-002', location: 'cn', currency: 'CNY', dropshipping: true, autoConfirmStock: true, skuCount: 0 },
];

export function WarehouseManagement() {
  const [warehouses, setWarehouses] = useState(INITIAL_WAREHOUSES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<any>(null);
  
  // Add Modal State
  const [addName, setAddName] = useState('');
  const [addLocation, setAddLocation] = useState('');
  const [addDropshipping, setAddDropshipping] = useState(true);
  const [addAutoConfirmStock, setAddAutoConfirmStock] = useState(false);

  // Edit Modal State
  const [editDropshipping, setEditDropshipping] = useState(false);
  const [editAutoConfirmStock, setEditAutoConfirmStock] = useState(false);
  const [editName, setEditName] = useState('');

  const handleAddWarehouse = () => {
    if (!addName || !addLocation) {
      alert('请填写必填项');
      return;
    }
    const newWarehouse = {
      id: Date.now().toString(),
      name: addName,
      code: `1567-00${warehouses.length + 1}`,
      location: addLocation,
      currency: addLocation === 'hk' ? 'HKD' : 'CNY',
      dropshipping: addLocation === 'bonded' ? true : addDropshipping,
      autoConfirmStock: addAutoConfirmStock,
      skuCount: 0
    };
    setWarehouses([...warehouses, newWarehouse]);
    setIsAddModalOpen(false);
    setAddName('');
    setAddLocation('');
    setAddDropshipping(true);
    setAddAutoConfirmStock(false);
  };

  const openEditModal = (warehouse: any) => {
    setEditingWarehouse(warehouse);
    setEditDropshipping(warehouse.location === 'bonded' ? true : warehouse.dropshipping);
    setEditAutoConfirmStock(warehouse.autoConfirmStock || false);
    setEditName(warehouse.name);
    setIsEditModalOpen(true);
  };

  const handleEditWarehouse = () => {
    if (!editName) {
      alert('请填写仓库名称');
      return;
    }
    setWarehouses(warehouses.map(w => 
      w.id === editingWarehouse.id ? { ...w, dropshipping: w.location === 'bonded' ? true : editDropshipping, autoConfirmStock: editAutoConfirmStock, name: editName } : w
    ));
    setIsEditModalOpen(false);
    setEditingWarehouse(null);
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col min-h-[calc(100vh-140px)] md:h-[calc(100vh-80px)] pb-12 overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-6 md:mb-8 gap-4">
        <div>
          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">Infrastructure</div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-2">仓库管理</h1>
          <p className="text-xs md:text-sm text-zinc-500">管理您的发货仓库及代发配置</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-white p-4 border border-zinc-200 shadow-sm gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="请输入仓库名称" 
              className="w-full border border-zinc-200 px-4 py-2 text-sm focus:border-black focus:ring-0 outline-none max-w-full" 
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none bg-black text-white text-sm px-6 py-2 hover:bg-zinc-800 transition-colors font-bold">
              查询
            </button>
            <button className="flex-1 md:flex-none bg-white border border-zinc-200 text-zinc-600 text-sm px-6 py-2 hover:border-black hover:text-black transition-colors font-bold">
              重置
            </button>
          </div>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="w-full md:w-auto bg-black text-white text-sm px-6 py-2 hover:bg-zinc-800 transition-colors font-bold shrink-0 mt-2 md:mt-0 max-w-full"
        >
          新增仓库
        </button>
      </div>

      <div className="bg-white border border-zinc-200 shadow-sm flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm min-w-[800px]">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <tr>
                <th className="p-4 font-bold text-left">仓库名称</th>
                <th className="p-4 font-bold text-left">仓库编码</th>
                <th className="p-4 font-bold text-center">币种</th>
                <th className="p-4 font-bold text-center">支持订单代发</th>
                <th className="p-4 font-bold text-center">自动确认有货</th>
                <th className="p-4 font-bold text-center">SKU数量</th>
                <th className="p-4 font-bold text-right">操作</th>
              </tr>
            </thead>
            <div className="md:hidden p-4 text-xs font-bold text-zinc-500 bg-zinc-50 border-b border-zinc-200 text-center w-full min-w-[800px]">向右滑动查看更多列</div>
            <tbody className="divide-y divide-zinc-100">
              {warehouses.map(warehouse => (
                <tr key={warehouse.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="p-4 text-left font-bold">{warehouse.name}</td>
                  <td className="p-4 text-left font-mono text-xs">{warehouse.code}</td>
                  <td className="p-4 text-center font-bold text-xs">{warehouse.currency}</td>
                  <td className="p-4 text-center">
                    {warehouse.dropshipping ? (
                      <span className="text-black border border-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">支持</span>
                    ) : (
                      <span className="text-zinc-400 border border-zinc-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">不支持</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {warehouse.autoConfirmStock ? (
                      <span className="text-black border border-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">开启</span>
                    ) : (
                      <span className="text-zinc-400 border border-zinc-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">关闭</span>
                    )}
                  </td>
                  <td className="p-4 text-center font-bold">{warehouse.skuCount}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-3 text-black font-bold text-xs">
                      <button onClick={() => openEditModal(warehouse)} className="hover:text-zinc-500 transition-colors">修改</button>
                      <button className="hover:text-zinc-500 transition-colors">删除</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-zinc-200 flex flex-col md:flex-row justify-between md:items-center text-xs md:text-sm text-zinc-500 bg-zinc-50 gap-4">
          <div>共 {warehouses.length} 条</div>
          <div className="flex flex-wrap items-center gap-4">
            <select className="border border-zinc-200 px-2 py-1 bg-white outline-none font-bold">
              <option>20条/页</option>
              <option>50条/页</option>
            </select>
            <div className="flex items-center gap-2">
              <button className="text-zinc-400 hover:text-black">&lt;</button>
              <span className="text-black font-bold">1</span>
              <button className="text-zinc-400 hover:text-black">&gt;</button>
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
                <label className="w-24 text-right text-sm font-bold"><span className="text-red-500 mr-1">*</span>仓库名称</label>
                <input 
                  type="text" 
                  placeholder="请输入仓库名称" 
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  className="flex-1 border border-zinc-200 px-3 py-2 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none" 
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-24 text-right text-sm font-bold"><span className="text-red-500 mr-1">*</span>所在地</label>
                <select 
                  value={addLocation}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAddLocation(val);
                    if (val === 'bonded') {
                      setAddDropshipping(true);
                    }
                  }}
                  className="flex-1 border border-zinc-200 px-3 py-2 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none bg-white text-zinc-500"
                >
                  <option value="">请选择所在地</option>
                  <option value="hk">香港</option>
                  <option value="cn">中国大陆</option>
                  <option value="bonded">保税区</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label className="w-24 text-right text-sm font-bold"><span className="text-red-500 mr-1">*</span>币种</label>
                <input 
                  type="text" 
                  placeholder="选择所在地后自动填充" 
                  value={addLocation === 'hk' ? 'HKD' : (addLocation === 'cn' || addLocation === 'bonded') ? 'CNY' : ''}
                  disabled 
                  className="flex-1 border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none text-zinc-400" 
                />
              </div>
              <div className="flex items-start gap-4">
                <label className="w-24 text-right text-sm font-bold mt-0.5">支持订单代发</label>
                <div className="flex-1">
                  <div className={`relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in ${addLocation === 'bonded' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <input 
                      type="checkbox" 
                      id="add-toggle" 
                      checked={addLocation === 'bonded' ? true : addDropshipping}
                      disabled={addLocation === 'bonded'}
                      onChange={(e) => setAddDropshipping(e.target.checked)}
                      className={`toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none transition-transform duration-200 ease-in-out ${(addLocation === 'bonded' || addDropshipping) ? 'translate-x-5 border-black' : 'translate-x-0 border-zinc-300'} ${addLocation === 'bonded' ? 'cursor-not-allowed' : 'cursor-pointer'}`} 
                      style={{ top: '2px', left: '2px' }}
                    />
                    <label 
                      htmlFor="add-toggle" 
                      className={`toggle-label block overflow-hidden h-6 rounded-full ${(addLocation === 'bonded' || addDropshipping) ? 'bg-black' : 'bg-zinc-300'} ${addLocation === 'bonded' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    ></label>
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1">下游同步开启后，允许获取最终买家信息，并由我直发。</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <label className="w-24 text-right text-sm font-bold mt-0.5">自动确认有货</label>
                <div className="flex-1">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input 
                      type="checkbox" 
                      id="add-auto-confirm-toggle" 
                      checked={addAutoConfirmStock}
                      onChange={(e) => setAddAutoConfirmStock(e.target.checked)}
                      className={`toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out ${addAutoConfirmStock ? 'translate-x-5 border-black' : 'translate-x-0 border-zinc-300'}`} 
                      style={{ top: '2px', left: '2px' }}
                    />
                    <label 
                      htmlFor="add-auto-confirm-toggle" 
                      className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${addAutoConfirmStock ? 'bg-black' : 'bg-zinc-300'}`}
                    ></label>
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1">开启后，下游订单生成时将自动确认库存，无需人工二次确认。</div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-zinc-100 flex justify-end gap-3 bg-zinc-50">
              <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-2 border border-zinc-200 text-sm font-bold hover:border-black transition-colors bg-white">取消</button>
              <button onClick={handleAddWarehouse} className="px-6 py-2 bg-black text-white text-sm font-bold hover:bg-zinc-800 transition-colors">确定</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editingWarehouse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
          <div className="relative w-[600px] bg-white shadow-2xl rounded-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h2 className="text-lg font-medium">修改仓库</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-zinc-400 hover:text-black transition-colors"><X size={20} /></button>
            </div>
            
            <div className="p-6 flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <label className="w-24 text-right text-sm font-bold"><span className="text-red-500 mr-1">*</span>仓库名称</label>
                <input 
                  type="text" 
                  value={editName} 
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 border border-zinc-200 px-3 py-2 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none" 
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-24 text-right text-sm font-bold">仓库编码</label>
                <input type="text" value={editingWarehouse.code} disabled className="flex-1 border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none text-zinc-400" />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-24 text-right text-sm font-bold">币种</label>
                <input type="text" value={editingWarehouse.currency} disabled className="flex-1 border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none text-zinc-400" />
              </div>
              <div className="flex items-start gap-4">
                <label className="w-24 text-right text-sm font-bold mt-0.5">支持订单代发</label>
                <div className="flex-1">
                  <div className={`relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in ${editingWarehouse.location === 'bonded' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <input 
                      type="checkbox" 
                      id="edit-toggle" 
                      checked={editingWarehouse.location === 'bonded' ? true : editDropshipping}
                      disabled={editingWarehouse.location === 'bonded'}
                      onChange={(e) => setEditDropshipping(e.target.checked)}
                      className={`toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none transition-transform duration-200 ease-in-out ${(editingWarehouse.location === 'bonded' || editDropshipping) ? 'translate-x-5 border-black' : 'translate-x-0 border-zinc-300'} ${editingWarehouse.location === 'bonded' ? 'cursor-not-allowed' : 'cursor-pointer'}`} 
                      style={{ top: '2px', left: '2px' }}
                    />
                    <label 
                      htmlFor="edit-toggle" 
                      className={`toggle-label block overflow-hidden h-6 rounded-full ${(editingWarehouse.location === 'bonded' || editDropshipping) ? 'bg-black' : 'bg-zinc-300'} ${editingWarehouse.location === 'bonded' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    ></label>
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1">下游同步开启后，允许获取最终买家信息，并由我直发。</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <label className="w-24 text-right text-sm font-bold mt-0.5">自动确认有货</label>
                <div className="flex-1">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input 
                      type="checkbox" 
                      id="edit-auto-confirm-toggle" 
                      checked={editAutoConfirmStock}
                      onChange={(e) => setEditAutoConfirmStock(e.target.checked)}
                      className={`toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out ${editAutoConfirmStock ? 'translate-x-5 border-black' : 'translate-x-0 border-zinc-300'}`} 
                      style={{ top: '2px', left: '2px' }}
                    />
                    <label 
                      htmlFor="edit-auto-confirm-toggle" 
                      className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${editAutoConfirmStock ? 'bg-black' : 'bg-zinc-300'}`}
                    ></label>
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1">开启后，下游订单生成时将自动确认库存，无需人工二次确认。</div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-zinc-100 flex justify-end gap-3 bg-zinc-50">
              <button onClick={() => setIsEditModalOpen(false)} className="px-6 py-2 border border-zinc-200 text-sm font-bold hover:border-black transition-colors bg-white">取消</button>
              <button onClick={handleEditWarehouse} className="px-6 py-2 bg-black text-white text-sm font-bold hover:bg-zinc-800 transition-colors">确定</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
