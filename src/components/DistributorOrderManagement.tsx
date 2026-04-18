import { Search, ChevronRight, X, FileText, Truck } from "lucide-react";
import { useState } from "react";

const INITIAL_ORDERS = [
  // --- 待付款 (pending_payment) ---
  {
    id: 'DIST-2024-0816-NEW', type: 'distribution', date: '2024-08-16 09:30', brand: 'Chanel', productName: 'Chanel Classic Flap', spuCount: 1, itemCount: 1,
    buyerName: '周八', buyerPhone: '136****5555', buyerType: 'C端买家', deliveryMethod: '快递发货', warehouse: '香港直邮仓', 
    shippingMode: 'transit', supplierName: '欧洲表行', distributorName: '潮流买手A', shippingAddress: '上海市黄浦区...',
    totalPrice: 65000, totalCostPrice: 60000, status: 'pending_payment', statusLabel: '待付款',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-new', name: 'Chanel Classic Flap', sku: 'CH-CF-BLK', supplier: '欧洲表行', count: 1, price: 65000, status: 'pending_payment', statusLabel: '待付款' }],
    progress: [
      { id: 'p1', time: '2024-08-16 09:30', description: '买家下单，等待付款', items: '全部 (1件)', amountChange: '-' }
    ]
  },
  {
    id: 'DIST-2024-0815-A2', type: 'distribution', date: '2024-08-15 10:25', brand: 'Rolex', productName: 'Rolex Daytona', spuCount: 1, itemCount: 1,
    buyerName: '王五', buyerPhone: '138****1234', buyerType: 'C端买家', deliveryMethod: '快递发货', warehouse: '深圳保税仓', 
    shippingMode: 'transit', supplierName: '欧洲表行', distributorName: '轻奢尚品B', shippingAddress: '北京市朝阳区建国路...',
    totalPrice: 285000, totalCostPrice: 260000, status: 'pending_confirmation', statusLabel: '待供货商确认',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-2', name: 'Rolex Daytona', sku: '116500LN', supplier: '欧洲表行', count: 1, price: 285000, status: 'pending_confirmation', statusLabel: '待供货商确认' }],
    progress: [
      { id: 'p1', time: '2024-08-15 10:30', description: '买家付款成功', items: '全部 (1件)', amountChange: '+¥285,000' }
    ]
  },
  {
    id: 'DIST-2024-0814-B2', type: 'distribution', date: '2024-08-14 14:25', brand: 'Gucci', productName: 'Gucci Marmont', spuCount: 1, itemCount: 1,
    buyerName: '林八', buyerPhone: '135****7890', buyerType: 'C端买家', deliveryMethod: '快递发货', warehouse: '深圳保税仓', 
    shippingMode: 'dropship', supplierName: '米兰精品', distributorName: '潮流买手A', shippingAddress: '广州市天河区...',
    totalPrice: 18500, totalCostPrice: 16000, status: 'pending_shipment', statusLabel: '待发货',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-5', name: 'Gucci Marmont', sku: 'G-MM-BLK', supplier: '米兰精品', count: 1, price: 18500, status: 'pending_shipment', statusLabel: '待发货' }],
    progress: [
      { id: 'p1', time: '2024-08-14 14:30', description: '买家付款成功', items: '全部 (1件)', amountChange: '+¥18,500' },
      { id: 'p2', time: '2024-08-14 16:00', description: '供货商确认有货', items: 'Gucci Marmont', amountChange: '-' }
    ]
  },
  {
    id: 'DIST-2024-0814-B3', type: 'distribution', date: '2024-08-14 16:20', brand: 'Dior', productName: 'Dior Saddle', spuCount: 1, itemCount: 1,
    buyerName: '吴九', buyerPhone: '139****1234', buyerType: 'C端买家', deliveryMethod: '快递发货', warehouse: '香港直邮仓', 
    shippingMode: 'transit', supplierName: '欧洲表行', distributorName: '潮流买手A', shippingAddress: '北京市海淀区...',
    totalPrice: 24500, totalCostPrice: 22000, status: 'supplier_shipped', statusLabel: '上游已发货 (待入库)',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-dior', name: 'Dior Saddle', sku: 'D-SDL-BLK', supplier: '欧洲表行', count: 1, price: 24500, status: 'supplier_shipped', statusLabel: '上游已发货 (待入库)' }],
    shipments: [
      { id: 'PKG-UP-001', type: 'upstream', company: 'FedEx国际', trackingNumber: 'FX9988776655', contents: 'Dior Saddle (1件)' }
    ],
    progress: [
      { id: 'p1', time: '2024-08-14 16:25', description: '买家付款成功', items: '全部 (1件)', amountChange: '+¥24,500' },
      { id: 'p2', time: '2024-08-15 09:00', description: '供货商已发货(段一)', items: '全部 (1件)', amountChange: '-' }
    ]
  },
  {
    id: 'DIST-2024-0813-C3', type: 'distribution', date: '2024-08-13 09:10', brand: 'Prada', productName: 'Prada Cleo', spuCount: 1, itemCount: 1,
    buyerName: '赵六', buyerPhone: '139****5678', buyerType: 'C端买家', deliveryMethod: '快递发货', warehouse: '香港直邮仓', 
    shippingMode: 'transit', supplierName: '欧洲表行', distributorName: '时尚优选C', shippingAddress: '上海市浦东新区...',
    totalPrice: 15200, totalCostPrice: 14000, status: 'pending_refund', statusLabel: '待退款',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-6', name: 'Prada Cleo', sku: 'P-CLEO-WHT', supplier: '欧洲表行', count: 1, price: 15200, status: 'pending_refund', statusLabel: '待退款' }],
    progress: [
      { id: 'p1', time: '2024-08-13 09:15', description: '买家付款成功', items: '全部 (1件)', amountChange: '+¥15,200' },
      { id: 'p2', time: '2024-08-13 11:00', description: '供货商确认缺货', items: 'Prada Cleo', amountChange: '产生退款 ¥15,200' }
    ]
  },
  {
    id: 'DIST-2024-0812-D4', type: 'distribution', date: '2024-08-12 11:45', brand: 'Hermes', productName: 'Hermes Birkin 30', spuCount: 2, itemCount: 2,
    buyerName: '李七', buyerPhone: '137****1111', buyerType: 'C端买家', deliveryMethod: '快递发货', warehouse: '上海中转仓', 
    shippingMode: 'transit', supplierName: '巴黎代购A', distributorName: '轻奢尚品B', shippingAddress: '浙江省杭州市西湖区...',
    totalPrice: 155000, totalCostPrice: 140000, status: 'shipped', statusLabel: '已发货',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=100&q=80',
    items: [
      { id: 'item-7', name: 'Hermes Birkin 30', sku: 'H-BK30-BLK', supplier: '巴黎代购A', count: 1, price: 120000, status: 'shipped', statusLabel: '已发货' },
      { id: 'item-8', name: 'Hermes Twilly', sku: 'H-TW-01', supplier: '巴黎代购A', count: 1, price: 35000, status: 'shipped', statusLabel: '已发货' }
    ],
    shipments: [
      { id: 'PKG-001', type: 'upstream', company: 'DHL国际', trackingNumber: 'DHL1029384756', contents: '全部商品由供货商发出' },
      { id: 'PKG-002', type: 'downstream', company: '顺丰速运', trackingNumber: 'SF1029384757', contents: 'Hermes Birkin 30 (1件)' },
      { id: 'PKG-003', type: 'downstream', company: '顺丰速运', trackingNumber: 'SF1029384758', contents: 'Hermes Twilly (1件)' }
    ],
    progress: [
      { id: 'p1', time: '2024-08-12 11:50', description: '买家付款成功', items: '全部 (2件)', amountChange: '+¥155,000' },
      { id: 'p2', time: '2024-08-12 15:00', description: '供货商已发货', items: '全部 (2件)', amountChange: '-' },
      { id: 'p3', time: '2024-08-13 10:00', description: '中转仓签收并发出', items: '全部 (2件)', amountChange: '-' }
    ]
  }
];

export function DistributorOrderManagement() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [filterSupplier, setFilterSupplier] = useState<string | null>(null);
  const [filterBuyer, setFilterBuyer] = useState<string | null>(null);
  const [filterDistributor, setFilterDistributor] = useState<string | null>(null);
  const [newProgressDesc, setNewProgressDesc] = useState('');
  const [newProgressAmount, setNewProgressAmount] = useState('');

  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [tempPrice, setTempPrice] = useState('');

  const handleUpdatePrice = () => {
    if (!selectedOrder) return;
    const newPrice = parseFloat(tempPrice);
    if (isNaN(newPrice) || newPrice < 0) return;
    
    const orderData = orders.find(o => o.id === selectedOrder);
    if (!orderData) return;
    
    if (orderData.totalCostPrice && newPrice < orderData.totalCostPrice) {
      alert(`修改后的订单总金额不能低于上游成本价 (¥${orderData.totalCostPrice.toLocaleString()})`);
      return;
    }

    setOrders(orders.map(order => {
      if (order.id === selectedOrder) {
        return {
          ...order,
          totalPrice: newPrice
        };
      }
      return order;
    }));
    setIsEditingPrice(false);
  };

  const handleAddManualProgress = () => {
    if (!selectedOrder || !newProgressDesc) return;
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    setOrders(orders.map(order => {
      if (order.id === selectedOrder) {
        const newProgress = {
          id: `p-${Date.now()}`,
          time: now,
          description: newProgressDesc,
          items: '-',
          amountChange: newProgressAmount || '-'
        };
        return {
          ...order,
          progress: [...(order.progress || []), newProgress]
        };
      }
      return order;
    }));
    setNewProgressDesc('');
    setNewProgressAmount('');
  };

  const filteredOrders = orders.filter(order => {
    let matchesTab = false;
    if (activeTab === 'all') {
      matchesTab = true;
    } else {
      matchesTab = order.status === activeTab;
    }

    if (!matchesTab) return false;

    if (filterSupplier && order.supplierName !== filterSupplier) return false;
    if (filterBuyer && order.buyerName !== filterBuyer) return false;
    if (filterDistributor && order.distributorName !== filterDistributor) return false;

    return true;
  });

  const selectedOrderData = orders.find(o => o.id === selectedOrder);

  return (
    <div className="max-w-7xl mx-auto flex h-[calc(100vh-80px)]">
      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">Distributor Orders</div>
            <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">分销订单管理</h1>
            <p className="text-sm text-zinc-500">管理您的分销订单，查看上游供货商发货状态</p>
          </div>
        </div>

        <div className="flex gap-8 border-b border-zinc-200 mb-6">
          <button onClick={() => setActiveTab('all')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'all' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>全部订单</button>
          <button onClick={() => setActiveTab('pending_payment')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'pending_payment' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>待付款</button>
          <button onClick={() => setActiveTab('pending_confirmation')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'pending_confirmation' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>待供货商确认</button>
          <button onClick={() => setActiveTab('pending_shipment')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'pending_shipment' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>待发货</button>
          <button onClick={() => setActiveTab('supplier_shipped')} className={`pb-3 text-xs font-bold transition-colors flex items-center gap-1 ${activeTab === 'supplier_shipped' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-zinc-500 hover:text-black'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            上游已发货
          </button>
          <button onClick={() => setActiveTab('shipped')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'shipped' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>已发货</button>
          <button onClick={() => setActiveTab('pending_refund')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'pending_refund' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>待退款</button>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input 
                type="text" 
                placeholder="搜索订单号、买家、商品名称..." 
                className="w-full border border-zinc-200 pl-10 pr-4 py-2 text-sm focus:border-black focus:ring-0 outline-none" 
              />
            </div>
          </div>
          {(filterSupplier || filterBuyer || filterDistributor) && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-500 font-bold">当前筛选:</span>
              {filterSupplier && (
                <span className="bg-zinc-200 text-zinc-800 px-2 py-1 flex items-center gap-1">
                  供应商/货主: {filterSupplier} <X size={12} className="cursor-pointer hover:text-black" onClick={() => setFilterSupplier(null)} />
                </span>
              )}
              {filterBuyer && (
                <span className="bg-zinc-200 text-zinc-800 px-2 py-1 flex items-center gap-1">
                  买家: {filterBuyer} <X size={12} className="cursor-pointer hover:text-black" onClick={() => setFilterBuyer(null)} />
                </span>
              )}
              {filterDistributor && (
                <span className="bg-zinc-200 text-zinc-800 px-2 py-1 flex items-center gap-1">
                  分销商: {filterDistributor} <X size={12} className="cursor-pointer hover:text-black" onClick={() => setFilterDistributor(null)} />
                </span>
              )}
              <button onClick={() => { setFilterSupplier(null); setFilterBuyer(null); setFilterDistributor(null); }} className="text-zinc-500 hover:text-black hover:underline ml-2">清除全部</button>
            </div>
          )}
        </div>

        <div className="bg-white border border-zinc-200 shadow-sm">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            <div className="col-span-3">商品详情</div>
            <div className="col-span-2">买家信息</div>
            <div className="col-span-2">上游供货商</div>
            <div className="col-span-2 text-right">总价</div>
            <div className="col-span-2 pl-4">状态</div>
            <div className="col-span-1 text-right">操作</div>
          </div>

          {filteredOrders.map(order => (
            <div key={order.id} className="border-b border-zinc-200 hover:border-black transition-colors bg-white mb-4 shadow-sm">
              <div className="bg-zinc-50 px-6 py-3 border-b border-zinc-200 flex items-center gap-4">
                <span className="font-bold text-xs">{order.id}</span>
                <span className="text-[10px] text-zinc-500">{order.date}</span>
                {order.distributorName && (
                  <span 
                    className="text-[10px] text-blue-600 ml-4 cursor-pointer hover:underline"
                    onClick={() => setFilterDistributor(order.distributorName!)}
                  >
                    分销商: {order.distributorName}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-12 gap-4 px-6 py-6 items-center">
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
                </div>
                <div className="col-span-2 pr-4">
                  <div 
                    className="text-xs font-bold mb-1 text-blue-600 cursor-pointer hover:underline"
                    onClick={() => setFilterBuyer(order.buyerName)}
                  >
                    {order.buyerName}
                  </div>
                  <div className="text-[10px] text-zinc-500 truncate" title={order.shippingAddress}>{order.shippingAddress}</div>
                </div>
                <div className="col-span-2 pr-4">
                  <div 
                    className="text-xs font-bold mb-1 text-blue-600 cursor-pointer hover:underline"
                    onClick={() => setFilterSupplier(order.supplierName)}
                  >
                    {order.supplierName}
                  </div>
                  <div className="text-[10px] text-zinc-500">{order.shippingMode === 'dropship' ? '代发' : '发往中转仓'}</div>
                </div>
                <div className="col-span-2 text-right">
                  <div className="text-sm font-bold mb-1">¥ {order.totalPrice.toLocaleString()}</div>
                </div>
                <div className="col-span-2 pl-4">
                  <div className={`text-[9px] font-bold px-2 py-1 uppercase tracking-wider inline-block mb-1 ${
                    order.status === 'pending_payment' ? 'bg-red-100 text-red-800' :
                    order.status === 'pending_confirmation' ? 'bg-orange-100 text-orange-800' :
                    order.status === 'pending_shipment' ? 'bg-black text-white' :
                    order.status === 'supplier_shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'pending_refund' ? 'bg-red-100 text-red-800' :
                    'bg-zinc-100 text-zinc-800'
                  }`}>
                    {order.statusLabel}
                  </div>
                  {(order as any).shipments && (order as any).shipments.length > 0 && (
                    <div className="mt-2 space-y-2">
                       {(() => {
                         const upstream = (order as any).shipments.filter((s:any) => s.type === 'upstream');
                         const downstream = (order as any).shipments.filter((s:any) => s.type === 'downstream');
                         return (
                           <>
                             {upstream.length > 0 && (
                               <div className="text-[10px] text-zinc-500 bg-blue-50/50 p-1.5 rounded-sm">
                                 <div className="font-bold text-blue-600/70 mb-1 flex items-center gap-1"><Truck size={10} /> 上游发货物流:</div>
                                 <div className="space-y-1">
                                   {upstream.map((s:any) => (
                                     <div key={s.id}>
                                       <span className="text-zinc-800">{s.company}</span>
                                       <a href="#" onClick={(e) => { e.preventDefault(); alert(`查看物流轨迹\r\n\r\n单号: ${s.trackingNumber}\r\n状态: 运输中...\r\n包裹内容: ${s.contents}`); }} className="text-blue-600 hover:underline ml-1">
                                         {s.trackingNumber}
                                       </a>
                                     </div>
                                   ))}
                                 </div>
                               </div>
                             )}
                             {downstream.length > 0 && (
                               <div className="text-[10px] text-zinc-500 bg-green-50/50 p-1.5 rounded-sm">
                                 <div className="font-bold text-green-600/80 mb-1 flex items-center gap-1"><Truck size={10} /> 发往买家物流:</div>
                                 <div className="space-y-1">
                                   {downstream.map((s:any) => (
                                     <div key={s.id}>
                                       <span className="text-zinc-800">{s.company}</span>
                                       <a href="#" onClick={(e) => { e.preventDefault(); alert(`查看物流轨迹\r\n\r\n单号: ${s.trackingNumber}\r\n状态: 运输中...\r\n包裹内容: ${s.contents}`); }} className="text-blue-600 hover:underline ml-1">
                                         {s.trackingNumber}
                                       </a>
                                     </div>
                                   ))}
                                 </div>
                               </div>
                             )}
                           </>
                         )
                       })()}
                    </div>
                  )}
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
            </div>
          ))}
        </div>
      </div>

      {selectedOrderData && (
        <div className="fixed inset-0 z-50 flex justify-end p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
          <div className="relative w-[800px] bg-white shadow-2xl flex flex-col h-full rounded-xl overflow-hidden animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-100 bg-zinc-50">
              <div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">订单详情</div>
                <h2 className="text-xl font-black uppercase tracking-tight">{selectedOrderData.id}</h2>
              </div>
              <button 
                onClick={() => {
                  setSelectedOrder(null);
                  setIsEditingPrice(false);
                }} 
                className="text-zinc-400 hover:text-black transition-colors"><X size={24} />
              </button>
            </div>
          
            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">买家/收件信息</h3>
                  <div className="text-sm font-bold mb-1">{selectedOrderData.buyerName} ({selectedOrderData.buyerPhone})</div>
                  <div className="text-xs text-zinc-500 mb-2">收货地址: {selectedOrderData.shippingAddress}</div>
                  <div className="text-xs text-zinc-500 mt-2 p-2 bg-orange-50 border border-orange-100 rounded-sm">
                    <span className="font-bold text-orange-800">上游货主:</span> {selectedOrderData.supplierName}
                    <br/>
                    <span className="text-[10px] text-orange-600">发货模式: {selectedOrderData.shippingMode === 'transit' ? '发往我的中转仓' : '由上游直接代发'}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">订单状态</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-1 uppercase tracking-wider ${
                      selectedOrderData.status === 'pending_payment' ? 'bg-red-100 text-red-800' :
                      selectedOrderData.status === 'pending_confirmation' ? 'bg-orange-100 text-orange-800' :
                      selectedOrderData.status === 'pending_shipment' ? 'bg-black text-white' :
                      selectedOrderData.status === 'supplier_shipped' ? 'bg-blue-100 text-blue-800' :
                      selectedOrderData.status === 'pending_refund' ? 'bg-red-100 text-red-800' :
                      'bg-zinc-100 text-zinc-800'
                    }`}>{selectedOrderData.statusLabel}</span>
                    <span className="text-[10px] font-bold px-2 py-1 uppercase tracking-wider bg-orange-100 text-orange-800">分销订单</span>
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
                <div className="flex justify-between items-center pt-2 border-t border-zinc-200 mt-2">
                  <span className="text-sm font-bold">已付金额</span>
                  <span className="text-lg font-black">¥ {selectedOrderData.status === 'pending_payment' ? '0.00' : `${selectedOrderData.totalPrice.toLocaleString()}.00`}</span>
                </div>

                {selectedOrderData.status === 'pending_payment' && (
                  <div className="mt-4 pt-4 border-t border-zinc-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold">修改订单总额</span>
                      {isEditingPrice ? (
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={tempPrice}
                              onChange={(e) => setTempPrice(e.target.value)}
                              className="border border-zinc-300 px-2 py-1 text-sm w-24"
                              placeholder="新价格"
                            />
                            <button
                              onClick={handleUpdatePrice}
                              className="bg-black text-white px-3 py-1 text-xs font-bold"
                            >
                              保存
                            </button>
                            <button
                              onClick={() => setIsEditingPrice(false)}
                              className="text-zinc-500 hover:text-black text-xs font-bold"
                            >
                              取消
                            </button>
                          </div>
                          {(selectedOrderData.warehouse === '香港直邮仓' || selectedOrderData.warehouse === '深圳保税仓') && parseFloat(tempPrice) > 0 && (
                            <div className="text-[10px] text-zinc-500 text-right mt-1">
                              商品实付款: ¥{(parseFloat(tempPrice) / 1.091).toFixed(2)}，关税 (9.1%): ¥{(parseFloat(tempPrice) - parseFloat(tempPrice) / 1.091).toFixed(2)}
                            </div>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setTempPrice(selectedOrderData.totalPrice.toString());
                            setIsEditingPrice(true);
                          }}
                          className="text-blue-600 text-xs font-bold hover:underline"
                        >
                          改价
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Product List */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">商品明细与操作</h3>
                </div>
                
                <div className="border border-zinc-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-50 border-b border-zinc-200 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      <tr>
                        <th className="p-4 w-10">
                          <input type="checkbox" className="accent-black" disabled />
                        </th>
                        <th className="p-4">商品</th>
                        <th className="p-4">上游供应商</th>
                        <th className="p-4 text-right">数量</th>
                        <th className="p-4 text-right">单价</th>
                        <th className="p-4 text-center">状态</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {selectedOrderData.items.map((item: any) => (
                        <tr key={item.id} className="hover:bg-zinc-50">
                          <td className="p-4">
                            <input type="checkbox" className="accent-black" disabled />
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-xs">{item.name}</div>
                            <div className="text-[10px] text-zinc-400">SKU: {item.sku}</div>
                          </td>
                          <td className="p-4 text-xs text-zinc-500">{item.supplier}</td>
                          <td className="p-4 text-right font-mono">{item.count}</td>
                          <td className="p-4 text-right font-mono">¥ {item.price.toLocaleString()}</td>
                          <td className="p-4 text-center"><span className="text-orange-600 text-xs font-bold">{item.statusLabel}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Logistics Trackings */}
              {selectedOrderData.shipments && selectedOrderData.shipments.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-1"><Truck size={14} /> 物流跟踪 (分段发货)</h3>
                  <div className="border border-zinc-200 bg-white">
                    {(() => {
                      const upstream = selectedOrderData.shipments.filter((s: any) => s.type === 'upstream');
                      const downstream = selectedOrderData.shipments.filter((s: any) => s.type === 'downstream');
                      return (
                        <div className="divide-y divide-zinc-200">
                           {upstream.length > 0 && (
                             <div className="p-6">
                               <div className="text-xs font-bold mb-4 flex items-center gap-2">
                                 <span className="w-2 h-2 rounded-full bg-blue-500"></span> 段一：上游发货 
                                 <span className="text-[10px] text-zinc-500 font-normal">({selectedOrderData.supplierName} ➔ {selectedOrderData.warehouse || '中转仓/代发'})</span>
                               </div>
                               <div className="space-y-4 pl-4 border-l-2 border-zinc-100 ml-1">
                                 {upstream.map((s: any) => (
                                   <div key={s.id} className="text-xs">
                                     <div className="font-bold text-zinc-800 flex items-center gap-2">
                                       {s.company} 
                                       <span 
                                         className="text-blue-600 cursor-pointer hover:underline" 
                                         onClick={(e) => { e.preventDefault(); alert(`查看物流轨迹\r\n\r\n单号: ${s.trackingNumber}\r\n状态: 运输中...\r\n包裹内容: ${s.contents}`); }}
                                       >
                                         {s.trackingNumber}
                                       </span>
                                     </div>
                                     <div className="text-zinc-500 mt-1">包裹内容: {s.contents}</div>
                                   </div>
                                 ))}
                               </div>
                             </div>
                           )}
                           {downstream.length > 0 && (
                             <div className="p-6 bg-zinc-50/50">
                               <div className="text-xs font-bold mb-4 flex items-center gap-2">
                                 <span className="w-2 h-2 rounded-full bg-green-500"></span> 段二：发往买家 
                                 <span className="text-[10px] text-zinc-500 font-normal">({selectedOrderData.warehouse || '中转仓/代发' } ➔ {selectedOrderData.buyerName})</span>
                               </div>
                               <div className="space-y-4 pl-4 border-l-2 border-zinc-100 ml-1">
                                 {downstream.map((s: any) => (
                                   <div key={s.id} className="text-xs">
                                     <div className="font-bold text-zinc-800 flex items-center gap-2">
                                       {s.company} 
                                       <span 
                                         className="text-blue-600 cursor-pointer hover:underline" 
                                         onClick={(e) => { e.preventDefault(); alert(`查看物流轨迹\r\n\r\n单号: ${s.trackingNumber}\r\n状态: 运输中...\r\n包裹内容: ${s.contents}`); }}
                                       >
                                         {s.trackingNumber}
                                       </span>
                                     </div>
                                     <div className="text-zinc-500 mt-1">包裹内容: {s.contents}</div>
                                   </div>
                                 ))}
                               </div>
                             </div>
                           )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* Order Progress Details */}
              <div className="mt-8">
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">订单进程明细</h3>
                <div className="border border-zinc-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-zinc-50 border-b border-zinc-200 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      <tr>
                        <th className="p-4">操作时间</th>
                        <th className="p-4">进程说明</th>
                        <th className="p-4">涉及商品</th>
                        <th className="p-4">金额变动</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-zinc-100 text-zinc-800">
                      {selectedOrderData.progress?.map((p: any) => (
                        <tr key={p.id} className="hover:bg-zinc-50 transition-colors">
                          <td className="p-4 font-mono text-xs">{p.time}</td>
                          <td className="p-4 font-bold text-black">{p.description}</td>
                          <td className="p-4">{p.items}</td>
                          <td className="p-4 font-mono">{p.amountChange}</td>
                        </tr>
                      ))}
                      {(!selectedOrderData.progress || selectedOrderData.progress.length === 0) && (
                        <tr>
                          <td colSpan={4} className="p-8 text-center text-zinc-500 text-xs">暂无进程记录</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <div className="p-4 bg-zinc-50 border-t border-zinc-200 flex gap-4 items-center">
                    <input 
                      type="text" 
                      placeholder="手动添加进程说明 (如: 供货商部分退款)" 
                      value={newProgressDesc}
                      onChange={(e) => setNewProgressDesc(e.target.value)}
                      className="flex-1 bg-white border border-zinc-200 px-3 py-2 text-xs text-black focus:border-black outline-none"
                    />
                    <input 
                      type="text" 
                      placeholder="金额变动 (如: -¥5,000)" 
                      value={newProgressAmount}
                      onChange={(e) => setNewProgressAmount(e.target.value)}
                      className="w-48 bg-white border border-zinc-200 px-3 py-2 text-xs text-black focus:border-black outline-none"
                    />
                    <button 
                      onClick={handleAddManualProgress}
                      disabled={!newProgressDesc}
                      className="bg-black text-white px-4 py-2 text-xs font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      添加记录
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-6 border-t border-zinc-200 bg-zinc-50 flex justify-between items-center">
              <div className="text-xs text-zinc-500">已选 0 件商品</div>
              <div className="flex gap-3">
                {selectedOrderData.status === 'pending_payment' ? (
                  <button 
                    onClick={() => {
                      setTempPrice(selectedOrderData.totalPrice.toString());
                      setIsEditingPrice(true);
                    }}
                    className="bg-black text-white px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                  >
                    修改订单金额
                  </button>
                ) : (
                  <button className="bg-white border border-zinc-200 text-black px-6 py-2 text-xs font-bold uppercase tracking-widest hover:border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    申请退款
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
