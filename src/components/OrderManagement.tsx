import { Search, ChevronRight, X, Package, Truck, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

const INITIAL_ORDERS = [
  {
    id: 'ORD-2024-0815-A',
    type: 'wholesale',
    date: '2024-08-15 10:20',
    brand: 'Hermès',
    productName: 'Hermès Birkin 25',
    spuCount: 2,
    itemCount: 15,
    buyerName: '李四',
    buyerPhone: '139****5678',
    buyerType: '分销商: 星耀代理',
    deliveryMethod: '门店自提',
    warehouse: '香港直邮仓',
    totalPrice: 840000,
    depositPaid: 252000,
    status: 'pending_confirmation',
    statusLabel: '待确认',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=100&q=80',
    items: [
      { id: 'item-1', name: 'Hermès Birkin 25', sku: 'H-B25-GOLD', supplier: 'Euro Boutique - 2891', count: 10, price: 56000, status: 'pending_confirmation', statusLabel: '待确认' },
      { id: 'item-2', name: 'Hermès Kelly 28', sku: 'H-K28-BLK', supplier: 'Euro Boutique - 2891', count: 5, price: 56000, status: 'pending_confirmation', statusLabel: '待确认' }
    ]
  },
  {
    id: 'ORD-2024-0812-B',
    type: 'retail',
    date: '2024-08-12 14:30',
    brand: 'Rolex',
    productName: 'Rolex Submariner',
    spuCount: 1,
    itemCount: 1,
    buyerName: '张三',
    buyerPhone: '138****1234',
    buyerType: '个人买家',
    deliveryMethod: '快递发货',
    warehouse: '深圳保税仓',
    totalPrice: 98500,
    depositPaid: null,
    status: 'pending_shipment',
    statusLabel: '待发货',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=100&q=80',
    items: [
      { id: 'item-3', name: 'Rolex Submariner', sku: '126610LN-0001', supplier: '自营库存', count: 1, price: 98500, status: 'pending_shipment', statusLabel: '待发货' }
    ]
  },
  {
    id: 'ORD-2024-0810-C',
    type: 'distribution',
    date: '2024-08-10 09:15',
    brand: 'CHANEL',
    productName: 'CHANEL Classic Flap',
    spuCount: 1,
    itemCount: 1,
    buyerName: '王五',
    buyerPhone: '137****9012',
    buyerType: '个人买家',
    deliveryMethod: '快递发货',
    warehouse: '深圳保税仓',
    totalPrice: 65000,
    depositPaid: null,
    status: 'shipped',
    statusLabel: '已发货',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=100&q=80',
    items: [
      { id: 'item-4', name: 'CHANEL Classic Flap', sku: 'C-CF-BLK', supplier: '分销商: 潮流前线', count: 1, price: 65000, status: 'shipped', statusLabel: '已发货' }
    ]
  },
  {
    id: 'ORD-2024-0805-D',
    type: 'retail',
    date: '2024-08-05 16:45',
    brand: 'Louis Vuitton',
    productName: 'LV Neverfull MM',
    spuCount: 1,
    itemCount: 1,
    buyerName: '赵六',
    buyerPhone: '136****3456',
    buyerType: '个人买家',
    deliveryMethod: '快递发货',
    warehouse: '香港直邮仓',
    totalPrice: 14500,
    depositPaid: null,
    status: 'completed',
    statusLabel: '已完成',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=100&q=80',
    items: [
      { id: 'item-5', name: 'LV Neverfull MM', sku: 'LV-NF-MM', supplier: '自营库存', count: 1, price: 14500, status: 'completed', statusLabel: '已完成' }
    ]
  }
];

export function OrderManagement() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleConfirmItems = () => {
    if (!selectedOrder) return;
    setOrders(orders.map(order => {
      if (order.id === selectedOrder) {
        const updatedItems = order.items.map(item => 
          selectedItems.includes(item.id) ? { ...item, status: 'pending_shipment', statusLabel: '待发货' } : item
        );
        const allConfirmed = updatedItems.every(item => item.status !== 'pending_confirmation');
        return {
          ...order,
          items: updatedItems,
          status: allConfirmed ? 'pending_shipment' : order.status,
          statusLabel: allConfirmed ? '待发货' : order.statusLabel
        };
      }
      return order;
    }));
    setSelectedItems([]);
  };

  const handleRefundItems = () => {
    if (!selectedOrder) return;
    setOrders(orders.map(order => {
      if (order.id === selectedOrder) {
        let refundAmount = 0;
        const updatedItems = order.items.map(item => {
          if (selectedItems.includes(item.id) && item.status !== 'refunded') {
            refundAmount += item.price * item.count;
            return { ...item, status: 'refunded', statusLabel: '已退款' };
          }
          return item;
        });
        
        const newTotalPrice = order.totalPrice - refundAmount;
        
        return {
          ...order,
          items: updatedItems,
          totalPrice: newTotalPrice
        };
      }
      return order;
    }));
    setSelectedItems([]);
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  const selectedOrderData = orders.find(o => o.id === selectedOrder);

  return (
    <div className="max-w-7xl mx-auto flex h-[calc(100vh-80px)]">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">Operational Dashboard</div>
            <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">订单管理</h1>
            <p className="text-sm text-zinc-500">统一管理零售订单与批发订单，处理库存确认与发货</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-zinc-200 text-zinc-800 text-xs font-bold uppercase tracking-widest px-6 py-3 hover:bg-zinc-300 transition-colors">
              导出数据
            </button>
          </div>
        </div>

        <div className="flex gap-8 border-b border-zinc-200 mb-6">
          <button onClick={() => setActiveTab('all')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'all' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>全部订单</button>
          <button onClick={() => setActiveTab('pending_payment')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'pending_payment' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>待付款</button>
          <button onClick={() => setActiveTab('pending_confirmation')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'pending_confirmation' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>待确认</button>
          <button onClick={() => setActiveTab('pending_shipment')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'pending_shipment' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>待发货</button>
          <button onClick={() => setActiveTab('shipped')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'shipped' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>已发货</button>
          <button onClick={() => setActiveTab('completed')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'completed' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>已完成</button>
          <button onClick={() => setActiveTab('closed')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'closed' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>已关闭</button>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input 
              type="text" 
              placeholder="搜索订单号、买家、商品名称..." 
              className="w-full border border-zinc-200 pl-10 pr-4 py-2 text-sm focus:border-black focus:ring-0 outline-none" 
            />
          </div>
          <select className="border border-zinc-200 px-4 py-2 text-sm focus:border-black focus:ring-0 outline-none bg-white">
            <option value="">所有订单类型</option>
            <option value="retail">零售订单</option>
            <option value="wholesale">批发订单</option>
            <option value="distribution">分销订单</option>
          </select>
          <select className="border border-zinc-200 px-4 py-2 text-sm focus:border-black focus:ring-0 outline-none bg-white">
            <option value="">所有配送方式</option>
            <option value="express">快递发货</option>
            <option value="pickup">门店自提</option>
          </select>
        </div>

        <div className="bg-white border border-zinc-200 shadow-sm">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            <div className="col-span-2">订单编号 / 类型</div>
            <div className="col-span-3">商品 SPU 详情</div>
            <div className="col-span-2">买家</div>
            <div className="col-span-2">配送方式 / 仓库</div>
            <div className="col-span-1 text-right">总价</div>
            <div className="col-span-1 pl-4">状态</div>
            <div className="col-span-1 text-right">操作</div>
          </div>

          {filteredOrders.map(order => (
            <div key={order.id} className="grid grid-cols-12 gap-4 px-6 py-6 border-b border-zinc-200 hover:bg-zinc-50 transition-colors items-center">
              <div className="col-span-2 pr-4">
                <div className="text-xs font-bold mb-1">{order.id}</div>
                <div className="text-[10px] text-zinc-400 mb-2">{order.date}</div>
                <span className={`text-[9px] px-2 py-1 font-bold uppercase tracking-wider ${order.type === 'wholesale' ? 'bg-purple-100 text-purple-800' : order.type === 'distribution' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
                  {order.type === 'wholesale' ? '批发订单' : order.type === 'distribution' ? '分销订单' : '零售订单'}
                </span>
              </div>
              <div className="col-span-3 pr-4">
                <div className="flex gap-3 mb-2">
                  <div className="w-10 h-10 bg-zinc-100 p-1 flex-shrink-0">
                    <img src={order.image} alt={order.brand} className="w-full h-full object-contain mix-blend-multiply grayscale" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-tight truncate w-32">{order.productName}</div>
                    <div className="text-[10px] text-zinc-500">x {order.itemCount}</div>
                  </div>
                </div>
                {order.spuCount > 1 && (
                  <div className="text-[9px] font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 inline-block">共 {order.spuCount} 款 SPU, {order.itemCount} 件</div>
                )}
              </div>
              <div className="col-span-2 pr-4">
                <div className="text-xs font-bold mb-1">{order.buyerName} ({order.buyerPhone})</div>
                <div className="text-[10px] text-zinc-500">{order.buyerType}</div>
              </div>
              <div className="col-span-2 pr-4">
                <div className="text-xs font-bold mb-1">{order.deliveryMethod}</div>
                <div className="text-[10px] text-zinc-500">{order.warehouse}</div>
              </div>
              <div className="col-span-1 text-right">
                <div className="text-sm font-bold mb-1">¥ {order.totalPrice.toLocaleString()}</div>
                {order.depositPaid ? (
                  <div className="text-[9px] text-orange-600 font-bold">已付定金: ¥{order.depositPaid.toLocaleString()}</div>
                ) : (
                  <div className="text-[9px] text-zinc-400">{order.status === 'pending_payment' ? '未付款' : '全额已付'}</div>
                )}
              </div>
              <div className="col-span-1 pl-4">
                <div className={`text-[9px] font-bold px-2 py-1 uppercase tracking-wider inline-block mb-1 ${
                  order.status === 'pending_confirmation' ? 'bg-orange-100 text-orange-800' :
                  order.status === 'pending_shipment' ? 'bg-black text-white' :
                  order.status === 'pending_payment' ? 'bg-red-100 text-red-800' :
                  'bg-zinc-100 text-zinc-800'
                }`}>
                  {order.statusLabel}
                </div>
              </div>
              <div className="col-span-1 text-right">
                <button 
                  onClick={() => setSelectedOrder(order.id)}
                  className="w-8 h-8 border border-zinc-200 inline-flex items-center justify-center hover:border-black transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Detail Drawer */}
      {selectedOrderData && (
        <div className="fixed inset-0 z-50 flex justify-end p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
          <div className="relative w-[800px] bg-white shadow-2xl flex flex-col h-full rounded-xl overflow-hidden animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-100 bg-zinc-50">
              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">订单详情</div>
                <h2 className="text-xl font-black uppercase tracking-tight">{selectedOrderData.id}</h2>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-zinc-400 hover:text-black transition-colors"><X size={24} /></button>
            </div>
          
          <div className="flex-1 overflow-y-auto p-8">
            {/* Order Info */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">买家信息</h3>
                <div className="text-sm font-bold mb-1">{selectedOrderData.buyerName} ({selectedOrderData.buyerPhone})</div>
                <div className="text-xs text-zinc-500 mb-1">{selectedOrderData.buyerType}</div>
                <div className="text-xs text-zinc-500">收货地址: 广东省深圳市南山区...</div>
              </div>
              <div>
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">订单状态</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-1 uppercase tracking-wider ${
                    selectedOrderData.status === 'pending_confirmation' ? 'bg-orange-100 text-orange-800' :
                    selectedOrderData.status === 'pending_shipment' ? 'bg-black text-white' :
                    selectedOrderData.status === 'pending_payment' ? 'bg-red-100 text-red-800' :
                    'bg-zinc-100 text-zinc-800'
                  }`}>{selectedOrderData.statusLabel}</span>
                  <span className={`text-[10px] font-bold px-2 py-1 uppercase tracking-wider ${
                    selectedOrderData.type === 'wholesale' ? 'bg-purple-100 text-purple-800' : selectedOrderData.type === 'distribution' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                  }`}>{selectedOrderData.type === 'wholesale' ? '批发订单' : selectedOrderData.type === 'distribution' ? '分销订单' : '零售订单'}</span>
                </div>
                <div className="text-xs text-zinc-500">下单时间: {selectedOrderData.date}:00</div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-zinc-50 p-6 border border-zinc-200 mb-8">
              <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">支付与结算</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">订单总额</span>
                <span className="text-sm font-bold">¥ {selectedOrderData.totalPrice.toLocaleString()}.00</span>
              </div>
              {selectedOrderData.depositPaid ? (
                <>
                  <div className="flex justify-between items-center mb-2 text-orange-600">
                    <span className="text-sm">已付定金 (30%)</span>
                    <span className="text-sm font-bold">¥ {selectedOrderData.depositPaid.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-zinc-200 mt-2">
                    <span className="text-sm font-bold">待付尾款</span>
                    <span className="text-lg font-black">¥ {(selectedOrderData.totalPrice - selectedOrderData.depositPaid).toLocaleString()}.00</span>
                  </div>
                  {selectedOrderData.status === 'pending_confirmation' && (
                    <div className="mt-4 flex items-start gap-2 text-xs text-zinc-500 bg-white p-3 border border-zinc-200">
                      <AlertCircle size={14} className="text-orange-500 flex-shrink-0 mt-0.5" />
                      <span>确认库存后，系统将自动激活尾款支付，并通知买家。</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex justify-between items-center pt-2 border-t border-zinc-200 mt-2">
                  <span className="text-sm font-bold">已付金额</span>
                  <span className="text-lg font-black">¥ {selectedOrderData.status === 'pending_payment' ? '0.00' : `${selectedOrderData.totalPrice.toLocaleString()}.00`}</span>
                </div>
              )}
            </div>

            {/* Shipping Info (Conditional) */}
            {(selectedOrderData.status === 'shipped' || selectedOrderData.status === 'completed') && (
              <div className="bg-zinc-50 p-6 border border-zinc-200 mb-8">
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">物流信息</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-zinc-500">承运商</span>
                  <span className="text-sm font-bold">顺丰速运</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-zinc-500">物流单号</span>
                  <span className="text-sm font-bold font-mono">SF1234567890123</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-zinc-500">发货时间</span>
                  <span className="text-sm">2024-08-06 10:00:00</span>
                </div>
              </div>
            )}

            {/* Product List */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">商品明细与操作</h3>
                {selectedOrderData.type === 'wholesale' && (
                  <button className="text-xs font-bold border border-black px-4 py-2 hover:bg-zinc-50 transition-colors">生成采购单</button>
                )}
              </div>
              
              <div className="border border-zinc-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-50 border-b border-zinc-200 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    <tr>
                      <th className="p-4 w-10"><input type="checkbox" className="accent-black" /></th>
                      <th className="p-4">商品</th>
                      <th className="p-4">上游供应商</th>
                      <th className="p-4 text-right">数量</th>
                      <th className="p-4 text-right">单价</th>
                      <th className="p-4 text-center">状态</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {selectedOrderData.items.map(item => (
                      <tr key={item.id} className="hover:bg-zinc-50">
                        <td className="p-4"><input type="checkbox" className="accent-black" checked={selectedItems.includes(item.id)} onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems([...selectedItems, item.id]);
                          } else {
                            setSelectedItems(selectedItems.filter(id => id !== item.id));
                          }
                        }} /></td>
                        <td className="p-4">
                          <div className="font-bold text-xs">{item.name}</div>
                          <div className="text-[10px] text-zinc-400">SKU: {item.sku}</div>
                        </td>
                        <td className="p-4 text-xs text-zinc-500">{item.supplier}</td>
                        <td className="p-4 text-right font-mono">{item.count}</td>
                        <td className="p-4 text-right font-mono">¥ {item.price.toLocaleString()}</td>
                        <td className="p-4 text-center"><span className={`${item.status === 'refunded' ? 'text-red-600' : 'text-orange-600'} text-xs font-bold`}>{item.statusLabel}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-6 border-t border-zinc-200 bg-zinc-50 flex justify-between items-center">
            <div className="text-xs text-zinc-500">已选 {selectedItems.length} 件商品</div>
            <div className="flex gap-3">
              {selectedOrderData.status === 'pending_payment' && (
                <button className="bg-black text-white px-6 py-3 text-xs font-bold hover:bg-zinc-800 transition-colors">提醒付款</button>
              )}
              {selectedOrderData.status === 'pending_confirmation' && (
                <>
                  <button onClick={handleRefundItems} disabled={selectedItems.length === 0} className="bg-white border border-zinc-200 px-6 py-3 text-xs font-bold hover:border-black transition-colors text-red-600 disabled:opacity-50">操作退款 (缺货)</button>
                  <button onClick={handleConfirmItems} disabled={selectedItems.length === 0} className="bg-black text-white px-6 py-3 text-xs font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50">确认有货</button>
                </>
              )}
              {selectedOrderData.status === 'pending_shipment' && (
                <>
                  <button onClick={handleRefundItems} disabled={selectedItems.length === 0} className="bg-white border border-zinc-200 px-6 py-3 text-xs font-bold hover:border-black transition-colors text-red-600 disabled:opacity-50">操作退款</button>
                  <button className="bg-black text-white px-6 py-3 text-xs font-bold hover:bg-zinc-800 transition-colors">发货</button>
                </>
              )}
              {(selectedOrderData.status === 'shipped' || selectedOrderData.status === 'completed') && (
                <>
                  <button onClick={handleRefundItems} disabled={selectedItems.length === 0} className="bg-white border border-zinc-200 px-6 py-3 text-xs font-bold hover:border-black transition-colors text-red-600 disabled:opacity-50">
                    {selectedOrderData.type === 'distribution' ? '申请退款' : '同意退款'}
                  </button>
                  {selectedOrderData.status === 'shipped' && <button className="bg-white border border-zinc-200 px-6 py-3 text-xs font-bold hover:border-black transition-colors">查看物流</button>}
                  {selectedOrderData.status === 'completed' && <button className="bg-white border border-zinc-200 px-6 py-3 text-xs font-bold hover:border-black transition-colors">查看售后</button>}
                </>
              )}
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
