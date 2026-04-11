import { Search, ChevronRight, X, Package, Truck, CheckCircle, AlertCircle, Download, Upload, FileText } from "lucide-react";
import { useState } from "react";

const INITIAL_ORDERS = [
  // --- 待发货 (pending_shipment) ---
  {
    id: 'ORD-2024-0814-B1', type: 'retail', date: '2024-08-14 14:20', brand: 'Christian Louboutin', productName: 'Oversized Sneaker', spuCount: 1, itemCount: 2,
    manager: '张三 (M001)', distributor: null,
    buyerName: '陈七', buyerPhone: '136****3456', buyerType: '个人买家', deliveryMethod: '跨境快递', warehouse: '香港直邮仓', shippingAddress: '上海市徐汇区...',
    totalPrice: 9000, depositPaid: null, status: 'pending_shipment', statusLabel: '待发货',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=100&q=80',
    items: [
      { id: 'item-4', name: 'Oversized Sneaker (35码)', sku: 'CL-OS-35', productNumber: '553680WHGP5', supplier: '自营库存', count: 1, price: 4500, status: 'pending_shipment', statusLabel: '待发货' },
      { id: 'item-5', name: 'Oversized Sneaker (36码)', sku: 'CL-OS-36', productNumber: '553680WHGP5', supplier: '自营库存', count: 1, price: 4500, status: 'pending_shipment', statusLabel: '待发货' }
    ],
    progress: [
      { id: 'p1', time: '2024-08-14 14:25', description: '买家付款成功', items: '全部 (2件)', amountChange: '+¥9,000' }
    ]
  },

  // --- 已发货 (shipped) ---
  {
    id: 'ORD-2024-0813-C1', type: 'retail', date: '2024-08-13 09:15', brand: 'Patek Philippe', productName: 'Nautilus 5711', spuCount: 2, itemCount: 2,
    manager: null, distributor: '李四代购',
    buyerName: '吴十', buyerPhone: '133****5678', buyerType: 'VIP买家', deliveryMethod: '门店自提', warehouse: '深圳保税仓', shippingAddress: '深圳市南山区...',
    totalPrice: 950000, depositPaid: null, status: 'shipped', statusLabel: '已发货',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=100&q=80',
    items: [
      { id: 'item-7', name: 'Nautilus 5711', sku: 'PP-5711-1A', productNumber: '5711/1A-010', supplier: '自营库存', count: 1, price: 850000, status: 'shipped', statusLabel: '已发货' },
      { id: 'item-8', name: 'Aquanaut 5167', sku: 'PP-5167-1A', productNumber: '5167A-001', supplier: '自营库存', count: 1, price: 100000, status: 'shipped', statusLabel: '已发货' }
    ],
    progress: [
      { id: 'p1', time: '2024-08-13 09:20', description: '买家付款成功', items: '全部 (2件)', amountChange: '+¥950,000' },
      { id: 'p2', time: '2024-08-13 14:00', description: '商品发货', items: '全部 (2件)', amountChange: '-' }
    ]
  },

  // --- 已完成 (completed) ---
  {
    id: 'ORD-2024-0810-D1', type: 'retail', date: '2024-08-10 16:45', brand: 'Bottega Veneta', productName: 'BV Jodie', spuCount: 1, itemCount: 1,
    manager: '赵六 (M003)', distributor: null,
    buyerName: '冯三', buyerPhone: '130****7890', buyerType: '个人买家', deliveryMethod: '非跨境快递', warehouse: '上海寄售仓', shippingAddress: '南京市建邺区...',
    totalPrice: 19500, depositPaid: null, status: 'completed', statusLabel: '已完成',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-10', name: 'BV Jodie', sku: 'BV-JD-MINI', productNumber: '651876VCPP5', supplier: '自营库存', count: 1, price: 19500, status: 'completed', statusLabel: '已完成' }],
    progress: [
      { id: 'p1', time: '2024-08-10 16:50', description: '买家付款成功', items: '全部 (1件)', amountChange: '+¥19,500' },
      { id: 'p2', time: '2024-08-11 09:00', description: '商品发货', items: 'BV Jodie', amountChange: '-' },
      { id: 'p3', time: '2024-08-13 10:00', description: '买家确认收货', items: '全部 (1件)', amountChange: '-' }
    ]
  },

  // --- 已取消 (closed) ---
  {
    id: 'ORD-2024-0805-E1', type: 'retail', date: '2024-08-05 11:10', brand: 'Fendi', productName: 'Fendi Peekaboo', spuCount: 1, itemCount: 1,
    manager: null, distributor: '王小二名品',
    buyerName: '沈六', buyerPhone: '187****9012', buyerType: '个人买家', deliveryMethod: '跨境快递', warehouse: '香港直邮仓', shippingAddress: '苏州市工业园区...',
    totalPrice: 35000, depositPaid: null, status: 'closed', statusLabel: '已取消',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-13', name: 'Fendi Peekaboo', sku: 'F-PK-MED', productNumber: '8BN290', supplier: '自营库存', count: 1, price: 35000, status: 'closed', statusLabel: '已取消' }],
    progress: [
      { id: 'p1', time: '2024-08-05 11:40', description: '订单超时未支付自动取消', items: '-', amountChange: '-' }
    ]
  }
];

export function OrderManagement() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const [filterManager, setFilterManager] = useState<string | null>(null);
  const [filterDistributor, setFilterDistributor] = useState<string | null>(null);
  const [filterDelivery, setFilterDelivery] = useState<string | null>(null);
  const [filterWarehouse, setFilterWarehouse] = useState<string | null>(null);
  
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isShipModalOpen, setIsShipModalOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');
  const [downloads, setDownloads] = useState<{id: string, name: string, date: string, status: string}[]>([]);
  const [newProgressDesc, setNewProgressDesc] = useState('');
  const [newProgressAmount, setNewProgressAmount] = useState('');

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

  const getOrderOverallStatusLabel = (order: any, currentTab: string) => {
    if (currentTab === 'all') {
      const statuses = new Set(order.items.map((i: any) => i.status));
      if (statuses.size === 1) {
        return order.items[0].statusLabel;
      }
      
      const parts = [];
      if (order.items.some((i: any) => i.status === 'pending_shipment')) parts.push('部分待发货');
      if (order.items.some((i: any) => i.status === 'shipped')) parts.push('部分已发货');
      if (order.items.some((i: any) => i.status === 'pending_refund')) parts.push('部分待退款');
      
      return parts.join(' / ') || order.statusLabel;
    }

    const hasCurrentStatus = order.items.some((i: any) => i.status === currentTab);
    const hasOtherStatus = order.items.some((i: any) => i.status !== currentTab);

    if (hasCurrentStatus) {
      if (hasOtherStatus) {
        if (currentTab === 'pending_shipment') return '部分待发货';
        if (currentTab === 'shipped') return '部分已发货';
        if (currentTab === 'pending_refund') return '部分待退款';
      } else {
        if (currentTab === 'pending_shipment') return '待发货';
        if (currentTab === 'shipped') return '已发货';
        if (currentTab === 'pending_refund') return '待退款';
      }
    }
    
    return order.statusLabel;
  };

  const handleRefundItems = () => {
    if (!selectedOrder) return;
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    setOrders(orders.map(order => {
      if (order.id === selectedOrder) {
        const updatedItems = order.items.map(item => {
          if (selectedItems.includes(item.id) && item.status !== 'pending_refund' && item.status !== 'refunded') {
            return { ...item, status: 'pending_refund', statusLabel: '待退款' };
          }
          return item;
        });
        
        const newProgress = {
          id: `p-${Date.now()}`,
          time: now,
          description: '申请退款',
          items: `已选 (${selectedItems.length}件)`,
          amountChange: '-'
        };

        return {
          ...order,
          items: updatedItems,
          progress: [...(order.progress || []), newProgress]
        };
      }
      return order;
    }));
    setSelectedItems([]);
  };

  const confirmShipment = () => {
    if (!selectedOrder) return;
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    
    setOrders(prevOrders => {
      const orderIndex = prevOrders.findIndex(o => o.id === selectedOrder);
      if (orderIndex === -1) return prevOrders;
      
      const order = prevOrders[orderIndex];
      const isPartial = selectedItems.length < order.items.length;
      
      if (isPartial) {
        const shippedItems = order.items.filter(i => selectedItems.includes(i.id)).map(i => ({ ...i, status: 'shipped', statusLabel: '已发货' }));
        const remainingItems = order.items.filter(i => !selectedItems.includes(i.id));
        
        const shippedTotal = shippedItems.reduce((sum, i) => sum + i.price * i.count, 0);
        const remainingTotal = remainingItems.reduce((sum, i) => sum + i.price * i.count, 0);
        
        const subOrderId = `${order.id}-S${Math.floor(Math.random() * 1000)}`;
        
        const newSubOrder = {
          ...order,
          id: subOrderId,
          items: shippedItems,
          totalPrice: shippedTotal,
          status: 'shipped',
          statusLabel: '已发货',
          progress: [
            { id: `p-${Date.now()}-1`, time: now, description: '子订单生成并已发货', items: `共 ${shippedItems.length} 件`, amountChange: '-' }
          ]
        };
        
        const updatedOriginalOrder = {
          ...order,
          items: remainingItems,
          totalPrice: remainingTotal,
          progress: [
            ...(order.progress || []),
            { id: `p-${Date.now()}-2`, time: now, description: `部分发货，生成子订单 ${subOrderId}`, items: `发货 ${shippedItems.length} 件`, amountChange: '-' }
          ]
        };
        
        const newOrders = [...prevOrders];
        newOrders[orderIndex] = updatedOriginalOrder;
        newOrders.splice(orderIndex + 1, 0, newSubOrder);
        return newOrders;
      } else {
        const updatedItems = order.items.map(item => 
          selectedItems.includes(item.id) ? { ...item, status: 'shipped', statusLabel: '已发货' } : item
        );
        const newProgress = {
          id: `p-${Date.now()}`, time: now, description: '商品发货', items: `已选 (${selectedItems.length}件)`, amountChange: '-'
        };
        const newOrders = [...prevOrders];
        newOrders[orderIndex] = { 
          ...order, 
          status: 'shipped',
          statusLabel: '已发货',
          items: updatedItems,
          progress: [...(order.progress || []), newProgress]
        };
        return newOrders;
      }
    });
    
    setIsShipModalOpen(false);
    setTrackingNumber('');
    setSelectedItems([]);
    setSelectedOrder(null);
  };

  const handleProcessRefund = () => {
    if (!selectedOrder) return;
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    
    setOrders(prevOrders => {
      const orderIndex = prevOrders.findIndex(o => o.id === selectedOrder);
      if (orderIndex === -1) return prevOrders;
      
      const order = prevOrders[orderIndex];
      const isPartial = selectedItems.length < order.items.length;
      
      if (isPartial) {
        const refundedItems = order.items.filter(i => selectedItems.includes(i.id)).map(i => ({ ...i, status: 'refunded', statusLabel: '已退款' }));
        const remainingItems = order.items.filter(i => !selectedItems.includes(i.id));
        
        const refundedTotal = refundedItems.reduce((sum, i) => sum + i.price * i.count, 0);
        const remainingTotal = remainingItems.reduce((sum, i) => sum + i.price * i.count, 0);
        
        const subOrderId = `${order.id}-R${Math.floor(Math.random() * 1000)}`;
        
        const newSubOrder = {
          ...order,
          id: subOrderId,
          items: refundedItems,
          totalPrice: refundedTotal,
          status: 'closed',
          statusLabel: '已退款',
          progress: [
            { id: `p-${Date.now()}-1`, time: now, description: '子订单生成并已退款', items: `共 ${refundedItems.length} 件`, amountChange: `-¥${refundedTotal.toLocaleString()}` }
          ]
        };
        
        const updatedOriginalOrder = {
          ...order,
          items: remainingItems,
          totalPrice: remainingTotal,
          progress: [
            ...(order.progress || []),
            { id: `p-${Date.now()}-2`, time: now, description: `部分退款，生成子订单 ${subOrderId}`, items: `退款 ${refundedItems.length} 件`, amountChange: '-' }
          ]
        };
        
        const newOrders = [...prevOrders];
        newOrders[orderIndex] = updatedOriginalOrder;
        newOrders.splice(orderIndex + 1, 0, newSubOrder);
        return newOrders;
      } else {
        let refundAmount = 0;
        const updatedItems = order.items.map(item => {
          if (selectedItems.includes(item.id)) {
            refundAmount += item.price * item.count;
            return { ...item, status: 'refunded', statusLabel: '已退款' };
          }
          return item;
        });
        const newTotalPrice = order.totalPrice - refundAmount;
        
        const newProgress = {
          id: `p-${Date.now()}`, time: now, description: '确认退款', items: `已选 (${selectedItems.length}件)`, amountChange: `-¥${refundAmount.toLocaleString()}`
        };
        
        const newOrders = [...prevOrders];
        newOrders[orderIndex] = { 
          ...order, 
          items: updatedItems, 
          totalPrice: newTotalPrice,
          status: 'closed',
          statusLabel: '已退款',
          progress: [...(order.progress || []), newProgress]
        };
        return newOrders;
      }
    });
    
    setSelectedItems([]);
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'downloads') return false;
    
    let matchesTab = false;
    if (activeTab === 'all') {
      matchesTab = true;
    } else if (['pending_shipment', 'shipped', 'pending_refund'].includes(activeTab)) {
      matchesTab = order.items.some((item: any) => item.status === activeTab);
    } else {
      matchesTab = order.status === activeTab;
    }

    if (!matchesTab) return false;
    
    if (filterManager && order.manager !== filterManager) return false;
    if (filterDistributor && order.distributor !== filterDistributor) return false;
    if (filterDelivery && order.deliveryMethod !== filterDelivery) return false;
    if (filterWarehouse && order.warehouse !== filterWarehouse) return false;
    
    return true;
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
          <button onClick={() => setActiveTab('pending_shipment')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'pending_shipment' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>待发货</button>
          <button onClick={() => setActiveTab('shipped')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'shipped' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>已发货</button>
          <button onClick={() => setActiveTab('pending_refund')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'pending_refund' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>待退款</button>
          <button onClick={() => setActiveTab('completed')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'completed' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>已完成</button>
          <button onClick={() => setActiveTab('closed')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'closed' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>已关闭</button>
          <button onClick={() => setActiveTab('downloads')} className={`pb-3 text-xs font-bold transition-colors ml-auto ${activeTab === 'downloads' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>下载列表</button>
        </div>

        {activeTab !== 'downloads' && (
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
            {(filterManager || filterDistributor || filterDelivery || filterWarehouse) && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-500 font-bold">当前筛选:</span>
                {filterManager && (
                  <span className="bg-zinc-200 text-zinc-800 px-2 py-1 flex items-center gap-1">
                    主理人: {filterManager} <X size={12} className="cursor-pointer hover:text-black" onClick={() => setFilterManager(null)} />
                  </span>
                )}
                {filterDistributor && (
                  <span className="bg-zinc-200 text-zinc-800 px-2 py-1 flex items-center gap-1">
                    分销商: {filterDistributor} <X size={12} className="cursor-pointer hover:text-black" onClick={() => setFilterDistributor(null)} />
                  </span>
                )}
                {filterDelivery && (
                  <span className="bg-zinc-200 text-zinc-800 px-2 py-1 flex items-center gap-1">
                    配送: {filterDelivery} <X size={12} className="cursor-pointer hover:text-black" onClick={() => setFilterDelivery(null)} />
                  </span>
                )}
                {filterWarehouse && (
                  <span className="bg-zinc-200 text-zinc-800 px-2 py-1 flex items-center gap-1">
                    仓库: {filterWarehouse} <X size={12} className="cursor-pointer hover:text-black" onClick={() => setFilterWarehouse(null)} />
                  </span>
                )}
                <button onClick={() => { setFilterManager(null); setFilterDistributor(null); setFilterDelivery(null); setFilterWarehouse(null); }} className="text-zinc-500 hover:text-black hover:underline ml-2">清除全部</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'pending_refund' && (
          <div className="flex justify-between items-center bg-zinc-50 border border-zinc-200 p-4 mb-6">
            <div className="text-sm font-bold">批量处理</div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  alert('已批量提交退款');
                }}
                className="bg-black text-white px-4 py-2 text-xs font-bold hover:bg-zinc-800 transition-colors flex items-center gap-2"
              >
                批量退款
              </button>
            </div>
          </div>
        )}

        {activeTab === 'downloads' ? (
          <div className="bg-white border border-zinc-200 shadow-sm">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <div className="col-span-4">文件名称</div>
              <div className="col-span-3">生成时间</div>
              <div className="col-span-3">状态</div>
              <div className="col-span-2 text-right">操作</div>
            </div>
            {downloads.length === 0 ? (
              <div className="p-8 text-center text-sm text-zinc-500">暂无下载文件</div>
            ) : (
              downloads.map(file => (
                <div key={file.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 items-center hover:bg-zinc-50">
                  <div className="col-span-4 text-sm font-bold flex items-center gap-2">
                    <FileText size={16} className="text-zinc-400" />
                    {file.name}
                  </div>
                  <div className="col-span-3 text-xs text-zinc-500">{file.date}</div>
                  <div className="col-span-3 text-xs text-green-600 font-bold">{file.status}</div>
                  <div className="col-span-2 text-right">
                    <button className="text-xs font-bold border border-zinc-200 px-4 py-2 hover:border-black transition-colors flex items-center gap-2 ml-auto">
                      <Download size={14} />
                      下载 Excel
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="bg-white border border-zinc-200 shadow-sm">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            <div className="col-span-3">商品 SPU 详情</div>
            <div className="col-span-2">买家</div>
            <div className="col-span-2">配送方式 / 仓库</div>
            <div className="col-span-2 text-right">总价</div>
            <div className="col-span-2 pl-4">状态</div>
            <div className="col-span-1 text-right">操作</div>
          </div>

          {filteredOrders.map(order => (
            <div key={order.id} className="border-b border-zinc-200 hover:border-black transition-colors bg-white mb-4 shadow-sm">
              {/* Order Header */}
              <div className="bg-zinc-50 px-6 py-3 border-b border-zinc-200 flex items-center gap-4">
                <span className="font-bold text-xs">{order.id}</span>
                <span className="text-[10px] text-zinc-500">{order.date}</span>
                {order.manager ? (
                  <span 
                    className="text-[10px] text-blue-600 ml-4 cursor-pointer hover:underline"
                    onClick={() => setFilterManager(order.manager)}
                  >
                    主理人: {order.manager}
                  </span>
                ) : order.distributor ? (
                  <span 
                    className="text-[10px] text-blue-600 ml-4 cursor-pointer hover:underline"
                    onClick={() => setFilterDistributor(order.distributor)}
                  >
                    分销商: {order.distributor}
                  </span>
                ) : null}
              </div>
              {/* Order Body */}
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
                  {order.spuCount > 1 && (
                    <div className="text-[9px] font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 inline-block">共 {order.spuCount} 款 SPU, {order.itemCount} 件</div>
                  )}
                </div>
                <div className="col-span-2 pr-4">
                  <div className="text-xs font-bold mb-1">{order.buyerName} ({order.buyerPhone})</div>
                  <div className="text-[10px] text-zinc-500">{order.buyerType}</div>
                </div>
                <div className="col-span-2 pr-4">
                  <div 
                    className="text-xs font-bold mb-1 text-blue-600 cursor-pointer hover:underline"
                    onClick={() => setFilterDelivery(order.deliveryMethod)}
                  >
                    {order.deliveryMethod}
                  </div>
                  <div 
                    className="text-[10px] text-blue-600 cursor-pointer hover:underline"
                    onClick={() => setFilterWarehouse(order.warehouse)}
                  >
                    {order.warehouse}
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <div className="text-sm font-bold mb-1">¥ {order.totalPrice.toLocaleString()}</div>
                  {order.depositPaid ? (
                    <div className="text-[9px] text-orange-600 font-bold">已付定金: ¥{order.depositPaid.toLocaleString()}</div>
                  ) : (
                    <div className="text-[9px] text-zinc-400">{order.status === 'pending_payment' ? '未付款' : ''}</div>
                  )}
                </div>
                <div className="col-span-2 pl-4">
                  <div className={`text-[9px] font-bold px-2 py-1 uppercase tracking-wider inline-block mb-1 ${
                    getOrderOverallStatusLabel(order, activeTab).includes('部分') ? 'bg-yellow-100 text-yellow-800' :
                    order.items.every((i: any) => i.status === 'pending_shipment') ? 'bg-black text-white' :
                    order.items.every((i: any) => i.status === 'pending_refund') ? 'bg-red-100 text-red-800' :
                    order.status === 'pending_payment' ? 'bg-red-100 text-red-800' :
                    'bg-zinc-100 text-zinc-800'
                  }`}>
                    {getOrderOverallStatusLabel(order, activeTab)}
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
            </div>
          ))}

        </div>
        )}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsUploadModalOpen(false)}></div>
          <div className="relative w-[500px] bg-white shadow-2xl flex flex-col rounded-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-zinc-50">
              <h2 className="text-lg font-black uppercase tracking-tight">上传确认单</h2>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-zinc-400 hover:text-black transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-xs font-bold text-zinc-500 mb-2">选择仓库</label>
                <select className="w-full border border-zinc-200 px-4 py-2 text-sm focus:border-black focus:ring-0 outline-none bg-white">
                  <option value="">请选择仓库</option>
                  <option value="香港直邮仓">香港直邮仓</option>
                  <option value="深圳保税仓">深圳保税仓</option>
                  <option value="北京寄售仓">北京寄售仓</option>
                  <option value="上海寄售仓">上海寄售仓</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-xs font-bold text-zinc-500 mb-2">上传 Excel 文件</label>
                <div className="border-2 border-dashed border-zinc-200 rounded-lg p-8 text-center hover:border-black transition-colors cursor-pointer">
                  <Upload size={24} className="mx-auto text-zinc-400 mb-2" />
                  <div className="text-sm font-bold mb-1">点击或拖拽文件到此处</div>
                  <div className="text-xs text-zinc-400">支持 .xlsx, .xls 格式</div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setIsUploadModalOpen(false)} className="px-4 py-2 text-sm font-bold text-zinc-500 hover:text-black transition-colors">取消</button>
                <button 
                  onClick={() => {
                    alert('上传成功，已批量确认对应供应商的商品。');
                    setIsUploadModalOpen(false);
                  }} 
                  className="bg-black text-white px-6 py-2 text-sm font-bold hover:bg-zinc-800 transition-colors"
                >
                  确认上传
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">买家/收件信息</h3>
                <div className="text-sm font-bold mb-1">{selectedOrderData.buyerName} ({selectedOrderData.buyerPhone})</div>
                <div className="text-xs text-zinc-500 mb-1">{selectedOrderData.buyerType}</div>
                <div className="text-xs text-zinc-500">收货地址: {selectedOrderData.shippingAddress}</div>
              </div>
              <div>
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">订单状态</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-1 uppercase tracking-wider ${
                    getOrderOverallStatusLabel(selectedOrderData, activeTab).includes('部分') ? 'bg-yellow-100 text-yellow-800' :
                    selectedOrderData.items.every((i: any) => i.status === 'pending_shipment') ? 'bg-black text-white' :
                    selectedOrderData.items.every((i: any) => i.status === 'pending_refund') ? 'bg-red-100 text-red-800' :
                    selectedOrderData.status === 'pending_payment' ? 'bg-red-100 text-red-800' :
                    'bg-zinc-100 text-zinc-800'
                  }`}>{getOrderOverallStatusLabel(selectedOrderData, activeTab)}</span>
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
              </div>
              
              <div className="border border-zinc-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-50 border-b border-zinc-200 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    <tr>
                      <th className="p-4 w-10">
                        <input 
                          type="checkbox" 
                          className="accent-black" 
                          onChange={(e) => {
                            if (e.target.checked) {
                              const selectableItems = selectedOrderData.items.filter((i: any) => activeTab === 'all' || i.status === activeTab).map((i: any) => i.id);
                              setSelectedItems(selectableItems);
                            } else {
                              setSelectedItems([]);
                            }
                          }}
                          checked={selectedOrderData.items.filter((i: any) => activeTab === 'all' || i.status === activeTab).length > 0 && selectedItems.length === selectedOrderData.items.filter((i: any) => activeTab === 'all' || i.status === activeTab).length}
                        />
                      </th>
                      <th className="p-4">商品</th>
                      <th className="p-4 text-right">数量</th>
                      <th className="p-4 text-right">单价</th>
                      <th className="p-4 text-center">状态</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {selectedOrderData.items.map((item: any) => (
                      <tr key={item.id} className="hover:bg-zinc-50">
                        <td className="p-4">
                          <input 
                            type="checkbox" 
                            className="accent-black" 
                            checked={selectedItems.includes(item.id)} 
                            disabled={activeTab !== 'all' && item.status !== activeTab}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedItems([...selectedItems, item.id]);
                              } else {
                                setSelectedItems(selectedItems.filter(id => id !== item.id));
                              }
                            }} 
                          />
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-xs">{item.name}</div>
                          <div className="text-[10px] text-zinc-400">货号: {item.productNumber}</div>
                          <div className="text-[10px] text-zinc-400">SKU条码: {item.sku}</div>
                        </td>
                        <td className="p-4 text-right font-mono">{item.count}</td>
                        <td className="p-4 text-right font-mono">¥ {item.price.toLocaleString()}</td>
                        <td className="p-4 text-center"><span className={`${item.status === 'refunded' ? 'text-red-600' : 'text-orange-600'} text-xs font-bold`}>{item.statusLabel}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

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
                    placeholder="手动添加进程说明 (如: 线下退款)" 
                    value={newProgressDesc}
                    onChange={(e) => setNewProgressDesc(e.target.value)}
                    className="flex-1 bg-white border border-zinc-200 px-3 py-2 text-xs text-black focus:border-black outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="金额变动 (如: -¥1,000)" 
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
            <div className="text-xs text-zinc-500">已选 {selectedItems.length} 件商品</div>
            <div className="flex gap-3">
              {(() => {
                const selectedItemsData = selectedOrderData.items.filter((i: any) => selectedItems.includes(i.id));
                
                const showPaymentReminder = selectedOrderData.status === 'pending_payment';
                
                const showShipBtn = activeTab === 'pending_shipment' || (activeTab === 'all' && selectedOrderData.items.some((i: any) => i.status === 'pending_shipment'));
                const canShip = selectedItems.length > 0 && selectedItemsData.every((i: any) => i.status === 'pending_shipment');

                const showProcessRefundBtn = activeTab === 'pending_refund' || (activeTab === 'all' && selectedOrderData.items.some((i: any) => i.status === 'pending_refund'));
                const canProcessRefund = selectedItems.length > 0 && selectedItemsData.every((i: any) => i.status === 'pending_refund');

                const showRefundBtn = ['pending_shipment', 'shipped', 'completed'].includes(activeTab) || 
                                      (activeTab === 'all' && selectedOrderData.items.some((i: any) => ['pending_shipment', 'shipped', 'completed'].includes(i.status)));
                const canRefund = selectedItems.length > 0 && selectedItemsData.every((i: any) => ['pending_shipment', 'shipped', 'completed'].includes(i.status));
                
                let refundLabel = '同意退款';

                const showLogisticsBtn = activeTab === 'shipped' || (activeTab === 'all' && selectedOrderData.items.some((i: any) => i.status === 'shipped'));
                const showAfterSalesBtn = activeTab === 'completed' || (activeTab === 'all' && selectedOrderData.items.some((i: any) => i.status === 'completed'));

                return (
                  <>
                    {showPaymentReminder && (
                      <button className="bg-black text-white px-6 py-3 text-xs font-bold hover:bg-zinc-800 transition-colors">提醒付款</button>
                    )}
                    
                    {showRefundBtn && (
                      <button 
                        onClick={handleRefundItems} 
                        disabled={!canRefund} 
                        className="bg-white border border-zinc-200 text-black px-6 py-3 text-xs font-bold hover:border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {refundLabel}
                      </button>
                    )}

                    {showProcessRefundBtn && (
                      <button 
                        onClick={handleProcessRefund} 
                        disabled={!canProcessRefund} 
                        className="bg-black text-white px-6 py-3 text-xs font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        确认退款
                      </button>
                    )}

                    {showShipBtn && (
                      <button 
                        onClick={() => setIsShipModalOpen(true)} 
                        disabled={!canShip} 
                        className="bg-black text-white px-6 py-3 text-xs font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Package size={14} />
                        发货
                      </button>
                    )}

                    {showLogisticsBtn && (
                      <button 
                        disabled={selectedItems.length === 0} 
                        className="bg-white border border-zinc-200 text-black px-6 py-3 text-xs font-bold hover:border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Truck size={14} />
                        查看物流
                      </button>
                    )}

                    {showAfterSalesBtn && (
                      <button 
                        disabled={selectedItems.length === 0} 
                        className="bg-white border border-zinc-200 text-black px-6 py-3 text-xs font-bold hover:border-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        售后处理
                      </button>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
        </div>
      )}
      {/* Ship Modal */}
      {isShipModalOpen && selectedOrderData && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsShipModalOpen(false)}></div>
          <div className="relative w-[400px] bg-white shadow-2xl flex flex-col rounded-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-zinc-50">
              <h2 className="text-lg font-black uppercase tracking-tight">发货确认</h2>
              <button onClick={() => setIsShipModalOpen(false)} className="text-zinc-400 hover:text-black transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                {selectedOrderData.deliveryMethod === '跨境快递' && (
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 mb-2">物流单号 (系统自动回传)</label>
                    <div className="bg-zinc-50 border border-zinc-200 px-4 py-3 text-sm font-mono font-bold text-zinc-800">
                      顺丰速运: SF8848123456789
                    </div>
                  </div>
                )}
                {selectedOrderData.deliveryMethod === '非跨境快递' && (
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 mb-2">请输入物流单号</label>
                    <input 
                      type="text" 
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      placeholder="请输入快递单号..."
                      className="w-full border border-zinc-200 px-4 py-2 text-sm focus:border-black focus:ring-0 outline-none bg-white"
                    />
                  </div>
                )}
                {selectedOrderData.deliveryMethod === '门店自提' && (
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 mb-2">提货码 (系统自动生成)</label>
                    <div className="bg-zinc-50 border border-zinc-200 px-4 py-3 text-lg font-mono font-black text-center tracking-[0.2em] text-zinc-800">
                      PICKUP-{Math.floor(1000 + Math.random() * 9000)}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setIsShipModalOpen(false)} className="px-4 py-2 text-sm font-bold text-zinc-500 hover:text-black transition-colors">取消</button>
                <button 
                  onClick={confirmShipment} 
                  disabled={selectedOrderData.deliveryMethod === '非跨境快递' && !trackingNumber}
                  className="bg-black text-white px-6 py-2 text-sm font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50"
                >
                  确认发货
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
