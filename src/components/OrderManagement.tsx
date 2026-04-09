import { Search, ChevronRight, X, Package, Truck, CheckCircle, AlertCircle, Download, Upload, FileText } from "lucide-react";
import { useState } from "react";

const INITIAL_ORDERS = [
  // --- 待确认 (pending_confirmation) ---
  {
    id: 'ORD-2024-0815-A1', type: 'retail', date: '2024-08-15 10:20', brand: 'Hermès', productName: 'Hermès Birkin 25', spuCount: 1, itemCount: 1,
    buyerName: '李四', buyerPhone: '139****5678', buyerType: '个人买家', deliveryMethod: '门店自提', warehouse: '香港直邮仓', shippingAddress: '香港特别行政区中环...',
    totalPrice: 156000, depositPaid: null, status: 'pending_confirmation', subStatus: 'pending', statusLabel: '待确认',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-1', name: 'Hermès Birkin 25', sku: 'H-B25-GOLD', supplier: '自营库存', count: 1, price: 156000, status: 'pending_confirmation', statusLabel: '待确认' }]
  },
  {
    id: 'ORD-2024-0815-A2', type: 'distribution', date: '2024-08-15 10:25', brand: 'Rolex', productName: 'Rolex Daytona', spuCount: 1, itemCount: 1,
    buyerName: '王五', buyerPhone: '138****1234', buyerType: 'C端买家', deliveryMethod: '快递发货', warehouse: '深圳保税仓', 
    shippingMode: 'transit', supplierName: '欧洲表行', shippingAddress: '北京市朝阳区建国路...',
    totalPrice: 285000, depositPaid: null, status: 'pending_confirmation', subStatus: 'pending', statusLabel: '待供货商确认',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-2', name: 'Rolex Daytona', sku: '116500LN', supplier: '欧洲表行', count: 1, price: 285000, status: 'pending_confirmation', statusLabel: '待供货商确认' }]
  },
  {
    id: 'ORD-2024-0815-A3', type: 'wholesale', date: '2024-08-15 10:30', brand: 'CHANEL', productName: 'CHANEL CF', spuCount: 1, itemCount: 2,
    buyerName: '隐藏', buyerPhone: '隐藏', buyerType: '下游分销商', deliveryMethod: '中转仓发货', warehouse: '香港直邮仓',
    shippingMode: 'transit', distributorName: '星耀代理', transitWarehouse: '星耀香港中转仓', shippingAddress: '香港特别行政区新界...',
    totalPrice: 130000, depositPaid: null, status: 'partial_pending_confirmation', subStatus: 'confirmed', statusLabel: '部分待确认',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=100&q=80',
    items: [
      { id: 'item-3', name: 'CHANEL CF', sku: 'C-CF-BLK', supplier: '自营库存', count: 1, price: 65000, status: 'pending_confirmation', statusLabel: '待确认' },
      { id: 'item-3-2', name: 'CHANEL CF', sku: 'C-CF-WHT', supplier: '自营库存', count: 1, price: 65000, status: 'pending_shipment', statusLabel: '待发货' }
    ]
  },

  // --- 待发货 (pending_shipment) ---
  {
    id: 'ORD-2024-0814-B1', type: 'retail', date: '2024-08-14 14:20', brand: 'Louis Vuitton', productName: 'LV Neverfull', spuCount: 1, itemCount: 1,
    buyerName: '陈七', buyerPhone: '136****3456', buyerType: '个人买家', deliveryMethod: '快递发货', warehouse: '香港直邮仓', shippingAddress: '上海市徐汇区...',
    totalPrice: 14500, depositPaid: null, status: 'pending_shipment', statusLabel: '待发货',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-4', name: 'LV Neverfull', sku: 'LV-NF-MM', supplier: '自营库存', count: 1, price: 14500, status: 'pending_shipment', statusLabel: '待发货' }]
  },
  {
    id: 'ORD-2024-0814-B2', type: 'distribution', date: '2024-08-14 14:25', brand: 'Gucci', productName: 'Gucci Marmont', spuCount: 1, itemCount: 1,
    buyerName: '林八', buyerPhone: '135****7890', buyerType: 'C端买家', deliveryMethod: '快递发货', warehouse: '深圳保税仓', 
    shippingMode: 'dropship', supplierName: '米兰精品', shippingAddress: '广州市天河区...',
    totalPrice: 18500, depositPaid: null, status: 'pending_shipment', statusLabel: '待发货',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-5', name: 'Gucci Marmont', sku: 'G-MM-BLK', supplier: '米兰精品', count: 1, price: 18500, status: 'pending_shipment', statusLabel: '待发货' }]
  },
  {
    id: 'ORD-2024-0814-B3', type: 'wholesale', date: '2024-08-14 14:30', brand: 'Dior', productName: 'Lady Dior', spuCount: 1, itemCount: 1,
    buyerName: '周九', buyerPhone: '134****1234', buyerType: 'C端买家 (代发)', deliveryMethod: '快递发货', warehouse: '北京寄售仓',
    shippingMode: 'dropship', distributorName: '潮流前线', shippingAddress: '成都市武侯区...',
    totalPrice: 42000, depositPaid: null, status: 'pending_shipment', statusLabel: '待发货',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-6', name: 'Lady Dior', sku: 'D-LD-MED', supplier: '自营库存', count: 1, price: 42000, status: 'pending_shipment', statusLabel: '待发货' }]
  },

  // --- 已发货 (shipped) ---
  {
    id: 'ORD-2024-0813-C1', type: 'retail', date: '2024-08-13 09:15', brand: 'Patek Philippe', productName: 'Nautilus 5711', spuCount: 1, itemCount: 1,
    buyerName: '吴十', buyerPhone: '133****5678', buyerType: 'VIP买家', deliveryMethod: '专人配送', warehouse: '香港直邮仓', shippingAddress: '深圳市南山区...',
    totalPrice: 850000, depositPaid: null, status: 'shipped', statusLabel: '已发货',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-7', name: 'Nautilus 5711', sku: 'PP-5711-1A', supplier: '自营库存', count: 1, price: 850000, status: 'shipped', statusLabel: '已发货' }]
  },
  {
    id: 'ORD-2024-0813-C2', type: 'distribution', date: '2024-08-13 09:20', brand: 'Celine', productName: 'Celine Triomphe', spuCount: 1, itemCount: 1,
    buyerName: '郑一', buyerPhone: '132****9012', buyerType: 'C端买家', deliveryMethod: '快递发货', warehouse: '深圳保税仓', 
    shippingMode: 'transit', supplierName: '巴黎买手店', shippingAddress: '杭州市西湖区...',
    totalPrice: 26500, depositPaid: null, status: 'shipped', statusLabel: '已发货',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-8', name: 'Celine Triomphe', sku: 'C-TR-BLK', supplier: '巴黎买手店', count: 1, price: 26500, status: 'shipped', statusLabel: '已发货' }]
  },
  {
    id: 'ORD-2024-0813-C3', type: 'wholesale', date: '2024-08-13 09:25', brand: 'Cartier', productName: 'Cartier Tank', spuCount: 1, itemCount: 1,
    buyerName: '隐藏', buyerPhone: '隐藏', buyerType: '下游分销商', deliveryMethod: '中转仓发货', warehouse: '上海寄售仓',
    shippingMode: 'transit', distributorName: '星耀代理', transitWarehouse: '星耀上海保税仓', shippingAddress: '上海市浦东新区...',
    totalPrice: 32000, depositPaid: null, status: 'shipped', statusLabel: '已发货',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-9', name: 'Cartier Tank', sku: 'C-TANK-S', supplier: '自营库存', count: 1, price: 32000, status: 'shipped', statusLabel: '已发货' }]
  },

  // --- 已完成 (completed) ---
  {
    id: 'ORD-2024-0810-D1', type: 'retail', date: '2024-08-10 16:45', brand: 'Bottega Veneta', productName: 'BV Jodie', spuCount: 1, itemCount: 1,
    buyerName: '冯三', buyerPhone: '130****7890', buyerType: '个人买家', deliveryMethod: '快递发货', warehouse: '香港直邮仓', shippingAddress: '南京市建邺区...',
    totalPrice: 19500, depositPaid: null, status: 'completed', statusLabel: '已完成',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-10', name: 'BV Jodie', sku: 'BV-JD-MINI', supplier: '自营库存', count: 1, price: 19500, status: 'completed', statusLabel: '已完成' }]
  },
  {
    id: 'ORD-2024-0810-D2', type: 'distribution', date: '2024-08-10 16:50', brand: 'Prada', productName: 'Prada Cleo', spuCount: 1, itemCount: 1,
    buyerName: '卫四', buyerPhone: '189****1234', buyerType: 'C端买家', deliveryMethod: '快递发货', warehouse: '深圳保税仓', 
    shippingMode: 'dropship', supplierName: '意式奢品', shippingAddress: '武汉市武昌区...',
    totalPrice: 17500, depositPaid: null, status: 'completed', statusLabel: '已完成',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-11', name: 'Prada Cleo', sku: 'P-CL-BLK', supplier: '意式奢品', count: 1, price: 17500, status: 'completed', statusLabel: '已完成' }]
  },
  {
    id: 'ORD-2024-0810-D3', type: 'wholesale', date: '2024-08-10 16:55', brand: 'Van Cleef & Arpels', productName: 'VCA Alhambra', spuCount: 1, itemCount: 1,
    buyerName: '蒋五', buyerPhone: '188****5678', buyerType: 'C端买家 (代发)', deliveryMethod: '门店自提', warehouse: '北京寄售仓',
    shippingMode: 'dropship', distributorName: '潮流前线', shippingAddress: '北京市海淀区...',
    totalPrice: 21500, depositPaid: null, status: 'completed', statusLabel: '已完成',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-12', name: 'VCA Alhambra', sku: 'VCA-AL-RED', supplier: '自营库存', count: 1, price: 21500, status: 'completed', statusLabel: '已完成' }]
  },

  // --- 已取消 (closed) ---
  {
    id: 'ORD-2024-0805-E1', type: 'retail', date: '2024-08-05 11:10', brand: 'Fendi', productName: 'Fendi Peekaboo', spuCount: 1, itemCount: 1,
    buyerName: '沈六', buyerPhone: '187****9012', buyerType: '个人买家', deliveryMethod: '快递发货', warehouse: '香港直邮仓', shippingAddress: '苏州市工业园区...',
    totalPrice: 35000, depositPaid: null, status: 'closed', statusLabel: '已取消',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-13', name: 'Fendi Peekaboo', sku: 'F-PK-MED', supplier: '自营库存', count: 1, price: 35000, status: 'closed', statusLabel: '已取消' }]
  },
  {
    id: 'ORD-2024-0805-E2', type: 'distribution', date: '2024-08-05 11:15', brand: 'Balenciaga', productName: 'Balenciaga Hourglass', spuCount: 1, itemCount: 1,
    buyerName: '韩七', buyerPhone: '186****3456', buyerType: 'C端买家', deliveryMethod: '快递发货', warehouse: '深圳保税仓', 
    shippingMode: 'transit', supplierName: '潮牌集合店', shippingAddress: '重庆市渝北区...',
    totalPrice: 16500, depositPaid: null, status: 'closed', statusLabel: '已取消',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-14', name: 'Balenciaga Hourglass', sku: 'B-HG-BLK', supplier: '潮牌集合店', count: 1, price: 16500, status: 'closed', statusLabel: '已取消' }]
  },
  {
    id: 'ORD-2024-0805-E3', type: 'wholesale', date: '2024-08-05 11:20', brand: 'Audemars Piguet', productName: 'AP Royal Oak', spuCount: 1, itemCount: 1,
    buyerName: '隐藏', buyerPhone: '隐藏', buyerType: '下游分销商', deliveryMethod: '中转仓发货', warehouse: '上海寄售仓',
    shippingMode: 'transit', distributorName: '星耀代理', transitWarehouse: '星耀香港中转仓', shippingAddress: '香港特别行政区九龙...',
    totalPrice: 450000, depositPaid: null, status: 'closed', statusLabel: '已取消',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=100&q=80',
    items: [{ id: 'item-15', name: 'AP Royal Oak', sku: 'AP-RO-15500', supplier: '自营库存', count: 1, price: 450000, status: 'closed', statusLabel: '已取消' }]
  }
];

export function OrderManagement() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const [subStatusFilter, setSubStatusFilter] = useState('');
  const [warehouseFilter, setWarehouseFilter] = useState('');
  const [partialStatusFilter, setPartialStatusFilter] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [downloads, setDownloads] = useState<{id: string, name: string, date: string, status: string}[]>([]);

  const getOrderOverallStatusLabel = (order: any, currentTab: string) => {
    if (currentTab === 'all') {
      const statuses = new Set(order.items.map((i: any) => i.status));
      if (statuses.size === 1) {
        return order.items[0].statusLabel;
      }
      
      const parts = [];
      if (order.items.some((i: any) => i.status === 'pending_confirmation')) parts.push('部分待确认');
      if (order.items.some((i: any) => i.status === 'pending_shipment')) parts.push('部分待发货');
      if (order.items.some((i: any) => i.status === 'shipped')) parts.push('部分已发货');
      if (order.items.some((i: any) => i.status === 'pending_refund')) parts.push('部分待退款');
      
      return parts.join(' / ') || order.statusLabel;
    }

    const hasCurrentStatus = order.items.some((i: any) => i.status === currentTab);
    const hasOtherStatus = order.items.some((i: any) => i.status !== currentTab);

    if (hasCurrentStatus) {
      if (hasOtherStatus) {
        if (currentTab === 'pending_confirmation') return '部分待确认';
        if (currentTab === 'pending_shipment') return '部分待发货';
        if (currentTab === 'shipped') return '部分已发货';
        if (currentTab === 'pending_refund') return '部分待退款';
      } else {
        if (currentTab === 'pending_confirmation') return '待确认';
        if (currentTab === 'pending_shipment') return '待发货';
        if (currentTab === 'shipped') return '已发货';
        if (currentTab === 'pending_refund') return '待退款';
      }
    }
    
    return order.statusLabel;
  };

  const handleGeneratePO = () => {
    const newDownload = {
      id: `PO-${Date.now()}`,
      name: `采购单_${new Date().toISOString().split('T')[0]}.xlsx`,
      date: new Date().toLocaleString(),
      status: '已生成'
    };
    setDownloads([newDownload, ...downloads]);
    alert('采购单已生成，请前往“下载列表”查看并下载。');
  };

  const handleConfirmItems = () => {
    if (!selectedOrder) return;
    setOrders(orders.map(order => {
      if (order.id === selectedOrder) {
        const updatedItems = order.items.map(item => 
          selectedItems.includes(item.id) ? { ...item, status: 'pending_shipment', statusLabel: '待发货' } : item
        );
        return {
          ...order,
          items: updatedItems,
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
        const updatedItems = order.items.map(item => {
          if (selectedItems.includes(item.id) && item.status !== 'pending_refund' && item.status !== 'refunded') {
            return { ...item, status: 'pending_refund', statusLabel: '待退款' };
          }
          return item;
        });
        
        return {
          ...order,
          items: updatedItems,
        };
      }
      return order;
    }));
    setSelectedItems([]);
  };

  const handleShipItems = () => {
    if (!selectedOrder) return;
    setOrders(orders.map(order => {
      if (order.id === selectedOrder) {
        const updatedItems = order.items.map(item => 
          selectedItems.includes(item.id) ? { ...item, status: 'shipped', statusLabel: '已发货' } : item
        );
        return { ...order, items: updatedItems };
      }
      return order;
    }));
    setSelectedItems([]);
  };

  const handleProcessRefund = () => {
    if (!selectedOrder) return;
    setOrders(orders.map(order => {
      if (order.id === selectedOrder) {
        let refundAmount = 0;
        const updatedItems = order.items.map(item => {
          if (selectedItems.includes(item.id) && item.status === 'pending_refund') {
            refundAmount += item.price * item.count;
            return { ...item, status: 'refunded', statusLabel: '已退款' };
          }
          return item;
        });
        const newTotalPrice = order.totalPrice - refundAmount;
        return { ...order, items: updatedItems, totalPrice: newTotalPrice };
      }
      return order;
    }));
    setSelectedItems([]);
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'downloads') return false;
    
    let matchesTab = false;
    if (activeTab === 'all') {
      matchesTab = true;
    } else if (['pending_confirmation', 'pending_shipment', 'shipped', 'pending_refund'].includes(activeTab)) {
      matchesTab = order.items.some((item: any) => item.status === activeTab);
    } else {
      matchesTab = order.status === activeTab;
    }

    if (!matchesTab) return false;
    
    if (warehouseFilter && order.warehouse !== warehouseFilter) return false;

    if (partialStatusFilter) {
      const hasActiveStatus = order.items.some((i: any) => i.status === activeTab);
      const hasOtherStatus = order.items.some((i: any) => i.status !== activeTab);
      
      if (partialStatusFilter === 'full' && hasOtherStatus) return false;
      if (partialStatusFilter === 'partial' && !hasOtherStatus) return false;
    }
    
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
          <button onClick={() => setActiveTab('pending_confirmation')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'pending_confirmation' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>待确认</button>
          <button onClick={() => setActiveTab('pending_shipment')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'pending_shipment' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>待发货</button>
          <button onClick={() => setActiveTab('shipped')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'shipped' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>已发货</button>
          <button onClick={() => setActiveTab('pending_refund')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'pending_refund' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>待退款</button>
          <button onClick={() => setActiveTab('completed')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'completed' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>已完成</button>
          <button onClick={() => setActiveTab('closed')} className={`pb-3 text-xs font-bold transition-colors ${activeTab === 'closed' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>已关闭</button>
          <button onClick={() => setActiveTab('downloads')} className={`pb-3 text-xs font-bold transition-colors ml-auto ${activeTab === 'downloads' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>下载列表</button>
        </div>

        {activeTab !== 'downloads' && (
          <div className="flex gap-4 mb-6 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
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
            <select 
              value={warehouseFilter}
              onChange={(e) => setWarehouseFilter(e.target.value)}
              className="border border-zinc-200 px-4 py-2 text-sm focus:border-black focus:ring-0 outline-none bg-white"
            >
              <option value="">所有仓库</option>
              <option value="香港直邮仓">香港直邮仓</option>
              <option value="深圳保税仓">深圳保税仓</option>
              <option value="北京寄售仓">北京寄售仓</option>
              <option value="上海寄售仓">上海寄售仓</option>
            </select>
            
            {['pending_confirmation', 'pending_shipment', 'shipped', 'pending_refund'].includes(activeTab) && (
              <select 
                value={partialStatusFilter}
                onChange={(e) => setPartialStatusFilter(e.target.value)}
                className="border border-zinc-200 px-4 py-2 text-sm focus:border-black focus:ring-0 outline-none bg-white"
              >
                <option value="">全部状态 (含部分)</option>
                <option value="full">全部{activeTab === 'pending_confirmation' ? '待确认' : activeTab === 'pending_shipment' ? '待发货' : activeTab === 'shipped' ? '已发货' : '待退款'}</option>
                <option value="partial">部分{activeTab === 'pending_confirmation' ? '待确认' : activeTab === 'pending_shipment' ? '待发货' : activeTab === 'shipped' ? '已发货' : '待退款'}</option>
              </select>
            )}
          </div>
        )}

        {activeTab === 'pending_confirmation' && (
          <div className="flex justify-between items-center bg-zinc-50 border border-zinc-200 p-4 mb-6">
            <div className="text-sm font-bold">批量处理</div>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-white border border-zinc-200 text-black px-4 py-2 text-xs font-bold hover:border-black transition-colors flex items-center gap-2"
              >
                <Upload size={14} />
                上传确认单
              </button>
              <button 
                onClick={handleGeneratePO}
                className="bg-black text-white px-4 py-2 text-xs font-bold hover:bg-zinc-800 transition-colors flex items-center gap-2"
              >
                <FileText size={14} />
                生成采购单
              </button>
            </div>
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
                <span className={`text-[9px] px-2 py-1 font-bold uppercase tracking-wider ${order.type === 'wholesale' ? 'bg-purple-100 text-purple-800' : order.type === 'distribution' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>
                  {order.type === 'wholesale' ? '批发订单' : order.type === 'distribution' ? '分销订单' : '零售订单'}
                </span>
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
                  {order.type === 'wholesale' && order.shippingMode === 'transit' ? (
                    <>
                      <div className="text-xs font-bold mb-1">{order.distributorName}</div>
                      <div className="text-[10px] text-zinc-500">中转仓接收 (C端隐藏)</div>
                    </>
                  ) : (
                    <>
                      <div className="text-xs font-bold mb-1">{order.buyerName} ({order.buyerPhone})</div>
                      <div className="text-[10px] text-zinc-500">{order.buyerType}</div>
                    </>
                  )}
                </div>
                <div className="col-span-2 pr-4">
                  <div className="text-xs font-bold mb-1">{order.deliveryMethod}</div>
                  <div className="text-[10px] text-zinc-500">
                    {order.type === 'wholesale' && order.shippingMode === 'transit' ? order.transitWarehouse :
                     order.type === 'distribution' && order.shippingMode === 'transit' ? order.warehouse :
                     order.warehouse}
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <div className="text-sm font-bold mb-1">¥ {order.totalPrice.toLocaleString()}</div>
                  {order.depositPaid ? (
                    <div className="text-[9px] text-orange-600 font-bold">已付定金: ¥{order.depositPaid.toLocaleString()}</div>
                  ) : (
                    <div className="text-[9px] text-zinc-400">{order.status === 'pending_payment' ? '未付款' : '全额已付'}</div>
                  )}
                </div>
                <div className="col-span-2 pl-4">
                  <div className={`text-[9px] font-bold px-2 py-1 uppercase tracking-wider inline-block mb-1 ${
                    getOrderOverallStatusLabel(order, activeTab).includes('部分') ? 'bg-yellow-100 text-yellow-800' :
                    order.items.every((i: any) => i.status === 'pending_confirmation') ? 'bg-orange-100 text-orange-800' :
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
                {selectedOrderData.type === 'wholesale' && selectedOrderData.shippingMode === 'transit' ? (
                  <>
                    <div className="text-sm font-bold mb-1">下游分销商: {selectedOrderData.distributorName}</div>
                    <div className="text-sm font-bold mb-1">中转仓: {selectedOrderData.transitWarehouse}</div>
                    <div className="text-xs text-zinc-500 mb-1">C端买家信息已隐藏 (下游配置为中转仓模式)</div>
                  </>
                ) : selectedOrderData.type === 'wholesale' && selectedOrderData.shippingMode === 'dropship' ? (
                  <>
                    <div className="text-sm font-bold mb-1">{selectedOrderData.buyerName} ({selectedOrderData.buyerPhone})</div>
                    <div className="text-xs text-zinc-500 mb-1">C端买家 (下游 {selectedOrderData.distributorName} 配置为代发模式)</div>
                    <div className="text-xs text-zinc-500">收货地址: {selectedOrderData.shippingAddress}</div>
                  </>
                ) : selectedOrderData.type === 'distribution' ? (
                  <>
                    <div className="text-sm font-bold mb-1">{selectedOrderData.buyerName} ({selectedOrderData.buyerPhone})</div>
                    <div className="text-xs text-zinc-500 mb-1">C端买家 (我的客户)</div>
                    <div className="text-xs text-zinc-500 mb-2">收货地址: {selectedOrderData.shippingAddress}</div>
                    <div className="text-xs text-zinc-500 mt-2 p-2 bg-orange-50 border border-orange-100 rounded-sm">
                      <span className="font-bold text-orange-800">上游货主:</span> {selectedOrderData.supplierName}
                      <br/>
                      <span className="text-[10px] text-orange-600">发货模式: {selectedOrderData.shippingMode === 'transit' ? '发往我的中转仓' : '由上游直接代发'}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-sm font-bold mb-1">{selectedOrderData.buyerName} ({selectedOrderData.buyerPhone})</div>
                    <div className="text-xs text-zinc-500 mb-1">{selectedOrderData.buyerType}</div>
                    <div className="text-xs text-zinc-500">收货地址: {selectedOrderData.shippingAddress}</div>
                  </>
                )}
              </div>
              <div>
                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">订单状态</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold px-2 py-1 uppercase tracking-wider ${
                    getOrderOverallStatusLabel(selectedOrderData, activeTab).includes('部分') ? 'bg-yellow-100 text-yellow-800' :
                    selectedOrderData.items.every((i: any) => i.status === 'pending_confirmation') ? 'bg-orange-100 text-orange-800' :
                    selectedOrderData.items.every((i: any) => i.status === 'pending_shipment') ? 'bg-black text-white' :
                    selectedOrderData.items.every((i: any) => i.status === 'pending_refund') ? 'bg-red-100 text-red-800' :
                    selectedOrderData.status === 'pending_payment' ? 'bg-red-100 text-red-800' :
                    'bg-zinc-100 text-zinc-800'
                  }`}>{getOrderOverallStatusLabel(selectedOrderData, activeTab)}</span>
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
              {(() => {
                const selectedItemsData = selectedOrderData.items.filter((i: any) => selectedItems.includes(i.id));
                
                const showPaymentReminder = selectedOrderData.status === 'pending_payment';
                
                const showConfirmBtn = activeTab === 'pending_confirmation' || (activeTab === 'all' && selectedOrderData.items.some((i: any) => i.status === 'pending_confirmation'));
                const canConfirm = selectedItems.length > 0 && selectedItemsData.every((i: any) => i.status === 'pending_confirmation');

                const showShipBtn = activeTab === 'pending_shipment' || (activeTab === 'all' && selectedOrderData.items.some((i: any) => i.status === 'pending_shipment'));
                const canShip = selectedItems.length > 0 && selectedItemsData.every((i: any) => i.status === 'pending_shipment');

                const showProcessRefundBtn = activeTab === 'pending_refund' || (activeTab === 'all' && selectedOrderData.items.some((i: any) => i.status === 'pending_refund'));
                const canProcessRefund = selectedItems.length > 0 && selectedItemsData.every((i: any) => i.status === 'pending_refund');

                const showRefundBtn = ['pending_confirmation', 'pending_shipment', 'shipped', 'completed'].includes(activeTab) || 
                                      (activeTab === 'all' && selectedOrderData.items.some((i: any) => ['pending_confirmation', 'pending_shipment', 'shipped', 'completed'].includes(i.status)));
                const canRefund = selectedItems.length > 0 && selectedItemsData.every((i: any) => ['pending_confirmation', 'pending_shipment', 'shipped', 'completed'].includes(i.status));
                
                let refundLabel = '提交退款';
                if (selectedItemsData.length > 0) {
                  if (selectedItemsData.every((i: any) => i.status === 'pending_confirmation')) refundLabel = '提交退款 (缺货)';
                  else if (selectedItemsData.every((i: any) => i.status === 'shipped' || i.status === 'completed')) refundLabel = selectedOrderData.type === 'distribution' ? '申请退款' : '同意退款';
                } else {
                  if (activeTab === 'pending_confirmation') refundLabel = '提交退款 (缺货)';
                  else if (activeTab === 'shipped' || activeTab === 'completed') refundLabel = selectedOrderData.type === 'distribution' ? '申请退款' : '同意退款';
                }

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
                        className="bg-white border border-zinc-200 px-6 py-3 text-xs font-bold hover:border-black transition-colors text-red-600 disabled:opacity-50"
                      >
                        {refundLabel}
                      </button>
                    )}

                    {showConfirmBtn && (
                      <button 
                        onClick={handleConfirmItems} 
                        disabled={!canConfirm} 
                        className="bg-black text-white px-6 py-3 text-xs font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50"
                      >
                        {selectedOrderData.type === 'distribution' ? '确认有货 (供货商)' : '确认有货'}
                      </button>
                    )}

                    {showShipBtn && (
                      <button 
                        onClick={handleShipItems} 
                        disabled={!canShip} 
                        className="bg-black text-white px-6 py-3 text-xs font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50"
                      >
                        发货
                      </button>
                    )}

                    {showProcessRefundBtn && (
                      <button 
                        onClick={handleProcessRefund} 
                        disabled={!canProcessRefund} 
                        className="bg-black text-white px-6 py-3 text-xs font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50"
                      >
                        退款
                      </button>
                    )}

                    {showLogisticsBtn && (
                      <button className="bg-white border border-zinc-200 px-6 py-3 text-xs font-bold hover:border-black transition-colors">查看物流</button>
                    )}

                    {showAfterSalesBtn && (
                      <button className="bg-white border border-zinc-200 px-6 py-3 text-xs font-bold hover:border-black transition-colors">查看售后</button>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
