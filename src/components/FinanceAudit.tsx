import { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Info, Calendar as CalendarIcon, User, Phone, Building2, CheckCircle2, ChevronRight, FileText, ChevronDown, ChevronUp, Image as ImageIcon, Check, Clock, X, MessageSquare, Filter, ChevronLeft
} from 'lucide-react';

const MOCK_CUSTOMERS = [
  {
    customerId: "c1",
    date: "2024-05-02",
    customerName: "ACME Corp (张三)",
    phone: "138-0013-8000",
    orders: [
      { 
        orderId: "O-DEP-88901", 
        manifestName: "2024夏季新品首单采购", 
        depositDue: 4500, 
        balanceDue: 10500,
        notes: "销售代下单。客户：张三，电话：138-0013-8000。客户要求尽量发顺丰，包装需加固。",
        products: [
          { name: "MARGIELA GLAM SLAM MINI", sku: "T8013-BLK-MN", qty: 2, price: 9450 },
          { name: "AESTHETIQUE CHRONO NOIR", sku: "AC-202-B", qty: 1, price: 34200 }
        ]
      },
      { 
        orderId: "O-DEP-88902", 
        manifestName: "潮流配饰批量补货", 
        depositDue: 2000, 
        balanceDue: 8000,
        notes: "客户自主下单。昵称：ACME_采购部。请随货附带发票。",
        products: [
          { name: "VANGUARD SILHOUETTE", sku: "VG-SL-01", qty: 5, price: 2180 }
        ]
      }
    ],
    confirmedPaid: 0,
    reconciliationRecords: [],
    uploadedSlips: [
      { id: "slip-1", uploadTime: "2024-05-02 14:30", imageUrl: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&q=80", status: "pending" }
    ]
  },
  {
    customerId: "c2",
    date: "2024-05-02",
    customerName: "TechNova (李经理)",
    phone: "139-2222-3333",
    orders: [
      { 
        orderId: "O-FUL-77234", 
        manifestName: "潮流配饰批量补货", 
        depositDue: 28900, 
        balanceDue: 0,
        notes: "销售代下单。客户：李经理。全款支付，优先发货。",
        products: [
          { name: "VANGUARD SILHOUETTE", sku: "VG-SL-02", qty: 10, price: 2180 },
          { name: "AESTHETIQUE CHRONO NOIR", sku: "AC-202-W", qty: 2, price: 34200 }
        ]
      }
    ],
    confirmedPaid: 28900,
    reconciliationRecords: [
      { id: "rec-1", time: "2024-05-02 10:15", amount: 28900, slipId: "slip-0" }
    ],
    uploadedSlips: [
      { id: "slip-0", uploadTime: "2024-05-02 09:00", imageUrl: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&q=80", status: "confirmed" }
    ]
  },
  {
    customerId: "c4",
    date: "2024-05-02",
    customerName: "Apex Retail (赵总)",
    phone: "137-8888-9999",
    orders: [
      { 
        orderId: "O-DEP-99001", 
        manifestName: "2024秋季高奢皮具专场", 
        depositDue: 50000, 
        balanceDue: 150000,
        notes: "客户自主下单。昵称：Apex_赵。已付部分定金，剩余定金明天补齐。",
        products: [
          { name: "LVMH 联名款手袋", sku: "LV-001", qty: 10, price: 20000 }
        ]
      }
    ],
    confirmedPaid: 20000,
    reconciliationRecords: [
      { id: "rec-2", time: "2024-05-02 11:00", amount: 20000, slipId: "slip-2" }
    ],
    uploadedSlips: [
      { id: "slip-2", uploadTime: "2024-05-02 10:30", imageUrl: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&q=80", status: "confirmed" },
      { id: "slip-3", uploadTime: "2024-05-02 15:45", imageUrl: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&q=80", status: "pending" }
    ]
  },
  {
    customerId: "c3",
    date: "2024-05-01",
    customerName: "GlobalTrade (王总)",
    phone: "135-4444-5555",
    orders: [
      { 
        orderId: "O-FUL-88902", 
        manifestName: "2024夏季新品首单采购", 
        depositDue: 26600, 
        balanceDue: 0,
        notes: "销售代下单。客户：王总。走对公账户打款。",
        products: [
          { name: "MARGIELA GLAM SLAM MINI", sku: "T8013-BLK-MN", qty: 5, price: 9450 }
        ]
      }
    ],
    confirmedPaid: 10000,
    reconciliationRecords: [
      { id: "rec-3", time: "2024-05-01 16:00", amount: 10000, slipId: "slip-4" }
    ],
    uploadedSlips: [
      { id: "slip-4", uploadTime: "2024-05-01 15:30", imageUrl: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&q=80", status: "confirmed" }
    ]
  },
  {
    customerId: "c5",
    date: "2024-05-05",
    customerName: "Boutique 1990 (陈店长)",
    phone: "130-1111-2222",
    orders: [
      { 
        orderId: "O-DEP-99005", 
        manifestName: "潮流配饰批量补货", 
        depositDue: 3000, 
        balanceDue: 7000,
        notes: "客户自主下单。昵称：陈店长。需要分批发货。",
        products: [
          { name: "VANGUARD SILHOUETTE", sku: "VG-SL-03", qty: 5, price: 2000 }
        ]
      }
    ],
    confirmedPaid: 0,
    reconciliationRecords: [],
    uploadedSlips: []
  }
];

export function FinanceAudit() {
  const [customersData, setCustomersData] = useState(MOCK_CUSTOMERS);
  const [inputAmounts, setInputAmounts] = useState<Record<string, string>>({});
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const [viewingSlip, setViewingSlip] = useState<{url: string, slipId: string, customerId: string} | null>(null);
  
  // Date Range State
  const [dateRange, setDateRange] = useState<{start: string | null, end: string | null}>({ start: "2024-05-01", end: "2024-05-05" });
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date(2024, 4)); // May 2024
  const calendarRef = useRef<HTMLDivElement>(null);

  // Status Filter State
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'partial' | 'completed'>('all');

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOrder = (orderId: string) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    );
  };

  const handleAmountChange = (slipId: string, value: string) => {
    setInputAmounts(prev => ({ ...prev, [slipId]: value }));
  };

  const handleConfirmPayment = (customerId: string, slipId: string) => {
    const amount = parseFloat(inputAmounts[slipId] || "0");
    if (isNaN(amount) || amount <= 0) return;

    setCustomersData(prev => prev.map(customer => {
      if (customer.customerId === customerId) {
        const updatedCustomer = { ...customer };
        
        // Update slip status
        updatedCustomer.uploadedSlips = updatedCustomer.uploadedSlips.map((slip: any) => 
          slip.id === slipId ? { ...slip, status: "confirmed" } : slip
        );

        // Add reconciliation record
        const now = new Date();
        const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        updatedCustomer.reconciliationRecords = [
          ...updatedCustomer.reconciliationRecords,
          { id: `rec-${Date.now()}`, time: timeStr, amount, slipId }
        ];

        // Update total paid
        updatedCustomer.confirmedPaid += amount;
        return updatedCustomer;
      }
      return customer;
    }));

    setInputAmounts(prev => ({ ...prev, [slipId]: "" }));
    setViewingSlip(null);
  };

  // Calendar Logic
  const daysInMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const handleDateClick = (day: number) => {
    const dateStr = `${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    if (!dateRange.start || (dateRange.start && dateRange.end)) {
      setDateRange({ start: dateStr, end: null });
    } else {
      if (dateStr < dateRange.start) {
        setDateRange({ start: dateStr, end: dateRange.start });
      } else {
        setDateRange({ ...dateRange, end: dateStr });
      }
      setShowCalendar(false);
    }
  };

  const isDateInRange = (dateStr: string) => {
    if (!dateRange.start) return false;
    if (!dateRange.end) return dateStr === dateRange.start;
    return dateStr >= dateRange.start && dateStr <= dateRange.end;
  };

  const isDateSelected = (dateStr: string) => {
    return dateStr === dateRange.start || dateStr === dateRange.end;
  };

  // Filter Customers
  const filteredCustomers = customersData.filter(customer => {
    // 1. Date Filter
    if (dateRange.start && customer.date < dateRange.start) return false;
    if (dateRange.end && customer.date > dateRange.end) return false;

    // 2. Status Filter
    const totalDepositDue = customer.orders.reduce((sum: number, o: any) => sum + o.depositDue, 0);
    const totalBalanceDue = customer.orders.reduce((sum: number, o: any) => sum + o.balanceDue, 0);
    const totalDue = totalDepositDue + totalBalanceDue;
    
    let status = 'pending';
    if (customer.confirmedPaid >= totalDue) status = 'completed';
    else if (customer.confirmedPaid > 0) status = 'partial';

    if (statusFilter !== 'all' && status !== statusFilter) return false;

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-zinc-200 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase mb-1">财务对账</h1>
            <p className="text-sm text-zinc-500">按客户维度核对银行转账汇款</p>
          </div>
        </div>
        <div className="bg-zinc-100 text-zinc-600 px-4 py-2 rounded-md flex items-center gap-2 text-sm">
          <Info size={16} className="text-zinc-400" />
          当前版本仅支持银行转账核销
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex items-center gap-4 mb-8">
        {/* Date Range Picker */}
        <div className="relative" ref={calendarRef}>
          <button 
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2 shadow-sm hover:border-black transition-colors min-w-[260px]"
          >
            <CalendarIcon size={18} className="text-zinc-400" />
            <span className="text-sm font-bold">
              {dateRange.start ? dateRange.start : '选择开始日期'} 
              {' 至 '} 
              {dateRange.end ? dateRange.end : (dateRange.start ? '选择结束日期' : '选择结束日期')}
            </span>
          </button>

          {showCalendar && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-zinc-200 shadow-xl p-4 z-20 w-72">
              <div className="flex items-center justify-between mb-4">
                <button 
                  onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1))}
                  className="p-1 hover:bg-zinc-100 rounded"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="font-bold text-sm">
                  {calendarMonth.getFullYear()}年 {calendarMonth.getMonth() + 1}月
                </div>
                <button 
                  onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1))}
                  className="p-1 hover:bg-zinc-100 rounded"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['日', '一', '二', '三', '四', '五', '六'].map(d => (
                  <div key={d} className="text-[10px] font-bold text-zinc-400">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {paddingDays.map(i => <div key={`pad-${i}`} />)}
                {days.map(day => {
                  const dateStr = `${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const isSelected = isDateSelected(dateStr);
                  const inRange = isDateInRange(dateStr);
                  
                  return (
                    <button
                      key={day}
                      onClick={() => handleDateClick(day)}
                      className={`
                        w-8 h-8 text-xs flex items-center justify-center rounded-full transition-colors
                        ${isSelected ? 'bg-black text-white font-bold' : ''}
                        ${!isSelected && inRange ? 'bg-zinc-100 font-bold' : ''}
                        ${!isSelected && !inRange ? 'hover:bg-zinc-100' : ''}
                      `}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-100 flex justify-end">
                <button 
                  onClick={() => { setDateRange({start: null, end: null}); setShowCalendar(false); }}
                  className="text-xs text-zinc-500 hover:text-black"
                >
                  清除选择
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2 shadow-sm">
          <Filter size={18} className="text-zinc-400" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-transparent text-sm font-bold focus:outline-none cursor-pointer"
          >
            <option value="all">全部对账状态</option>
            <option value="pending">待核销 (未付款)</option>
            <option value="partial">部分核销 (部分付款)</option>
            <option value="completed">已结清 (全额付款)</option>
          </select>
        </div>

        <div className="text-sm text-zinc-500 ml-auto">
          共找到 {filteredCustomers.length} 个符合条件的客户记录
        </div>
      </div>

      {/* Customers List */}
      <div className="space-y-6">
        {filteredCustomers.map(customer => {
          const totalDepositDue = customer.orders.reduce((sum: number, o: any) => sum + o.depositDue, 0);
          const totalBalanceDue = customer.orders.reduce((sum: number, o: any) => sum + o.balanceDue, 0);
          const totalDue = totalDepositDue + totalBalanceDue;
          const pendingAmount = Math.max(0, totalDue - customer.confirmedPaid);
          const isFullyPaid = pendingAmount === 0;

          // Determine Status
          let statusLabel = '待核销';
          let statusClass = 'bg-red-50 text-red-700 border-red-200';
          if (isFullyPaid) {
            statusLabel = '已结清';
            statusClass = 'bg-green-50 text-green-700 border-green-200';
          } else if (customer.confirmedPaid > 0) {
            statusLabel = '部分核销';
            statusClass = 'bg-blue-50 text-blue-700 border-blue-200';
          }

          return (
            <div key={customer.customerId} className="bg-white border border-zinc-200 shadow-sm">
              {/* Customer Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 border-b border-zinc-200">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-zinc-400" />
                    <span className="font-bold text-lg">{customer.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <Phone size={14} />
                    {customer.phone}
                  </div>
                  <div className={`text-xs font-bold px-2 py-1 border rounded-sm ${statusClass}`}>
                    {statusLabel}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-sm text-zinc-500 font-mono">
                    {customer.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold">
                    <Building2 size={16} className="text-zinc-400" />
                    银行转账
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 divide-x divide-zinc-200">
                {/* Orders List */}
                <div className="col-span-7 p-6">
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">当日订单明细</div>
                  <div className="space-y-4">
                    {customer.orders.map((order: any, idx: number) => (
                      <div key={idx} className="border border-zinc-200 bg-white">
                        <div 
                          className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-50 transition-colors"
                          onClick={() => toggleOrder(order.orderId)}
                        >
                          <div className="flex items-center gap-3">
                            {expandedOrders.includes(order.orderId) ? <ChevronUp size={16} className="text-zinc-400" /> : <ChevronDown size={16} className="text-zinc-400" />}
                            <div>
                              <div className="font-bold text-sm mb-1">{order.orderId}</div>
                              <div className="text-xs text-zinc-500 flex items-center gap-1">
                                <FileText size={12} />
                                {order.manifestName}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-8 text-right">
                            <div>
                              <div className="text-[10px] text-zinc-400 mb-1">应付定金</div>
                              <div className="text-sm font-bold">¥ {order.depositDue.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-[10px] text-zinc-400 mb-1">应付尾款</div>
                              <div className="text-sm font-bold">¥ {order.balanceDue.toLocaleString()}</div>
                            </div>
                          </div>
                        </div>

                        {/* Order Products & Notes Details */}
                        {expandedOrders.includes(order.orderId) && (
                          <div className="bg-zinc-50 border-t border-zinc-200 p-4">
                            {/* Order Notes */}
                            {order.notes && (
                              <div className="bg-orange-50/50 border border-orange-100 p-3 mb-4 text-xs text-orange-900 flex gap-2 rounded-sm">
                                <MessageSquare size={14} className="mt-0.5 flex-shrink-0 text-orange-500" />
                                <div>
                                  <span className="font-bold mr-1">订单备注:</span>
                                  {order.notes}
                                </div>
                              </div>
                            )}

                            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">包含商品</div>
                            <div className="space-y-2">
                              {order.products.map((product: any, pIdx: number) => (
                                <div key={pIdx} className="flex items-center justify-between text-xs bg-white p-3 border border-zinc-100">
                                  <div>
                                    <div className="font-bold mb-0.5">{product.name}</div>
                                    <div className="text-zinc-500 font-mono text-[10px]">SKU: {product.sku}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-bold">¥ {product.price.toLocaleString()}</div>
                                    <div className="text-zinc-500">x {product.qty}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reconciliation Panel */}
                <div className="col-span-5 p-6 bg-zinc-50/30 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">财务核销汇总</div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white border border-zinc-200 p-4">
                        <div className="text-xs text-zinc-500 mb-1">业务总应付</div>
                        <div className="text-xl font-black">¥ {totalDue.toLocaleString()}</div>
                        <div className="text-[10px] text-zinc-400 mt-2">
                          定金: ¥{totalDepositDue.toLocaleString()} | 尾款: ¥{totalBalanceDue.toLocaleString()}
                        </div>
                      </div>
                      <div className="bg-white border border-zinc-200 p-4">
                        <div className="text-xs text-zinc-500 mb-1">当前待付金额</div>
                        <div className={`text-xl font-black ${pendingAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          ¥ {pendingAmount.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-zinc-400 mt-2">
                          已确认收款: ¥{customer.confirmedPaid.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    {/* Reconciliation Records */}
                    {customer.reconciliationRecords.length > 0 && (
                      <div className="mb-6">
                        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">已核销记录</div>
                        <div className="space-y-2">
                          {customer.reconciliationRecords.map((rec: any) => (
                            <div key={rec.id} className="flex items-center justify-between text-xs bg-white border border-zinc-200 p-3">
                              <div className="flex items-center gap-2 text-zinc-600">
                                <CheckCircle2 size={14} className="text-green-600" />
                                {rec.time}
                              </div>
                              <div className="font-bold">¥ {rec.amount.toLocaleString()}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-zinc-200 pt-6">
                    {isFullyPaid ? (
                      <div className="flex items-center justify-center gap-2 bg-green-50 text-green-700 py-3 border border-green-200 font-bold text-sm">
                        <CheckCircle2 size={18} />
                        该客户当日业务已全部结清
                      </div>
                    ) : (
                      <div>
                        <div className="text-xs font-bold mb-3 flex items-center justify-between">
                          <span>前端上传的水单记录</span>
                          <span className="text-zinc-400 font-normal">点击查看并核销</span>
                        </div>
                        
                        {customer.uploadedSlips.length > 0 ? (
                          <div className="space-y-3">
                            {customer.uploadedSlips.map((slip: any) => (
                              <div key={slip.id} className="flex items-center justify-between bg-white border border-zinc-200 p-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center text-zinc-400">
                                    <ImageIcon size={18} />
                                  </div>
                                  <div>
                                    <div className="text-xs font-bold mb-0.5">银行汇款凭证</div>
                                    <div className="text-[10px] text-zinc-500 flex items-center gap-1">
                                      <Clock size={10} />
                                      上传于 {slip.uploadTime}
                                    </div>
                                  </div>
                                </div>
                                {slip.status === 'confirmed' ? (
                                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-sm flex items-center gap-1">
                                    <Check size={12} /> 已核销
                                  </span>
                                ) : (
                                  <button 
                                    onClick={() => setViewingSlip({ url: slip.imageUrl, slipId: slip.id, customerId: customer.customerId })}
                                    className="text-xs font-bold bg-black text-white px-4 py-2 hover:bg-zinc-800 transition-colors"
                                  >
                                    查看并核销
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-xs text-zinc-500 bg-white border border-dashed border-zinc-300">
                            暂无待核销的水单记录
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {filteredCustomers.length === 0 && (
          <div className="text-center py-20 text-zinc-500 border border-zinc-200 bg-white">
            所选区间内没有符合条件的客户订单记录
          </div>
        )}
      </div>

      {/* Slip Viewer Modal */}
      {viewingSlip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setViewingSlip(null)}></div>
          <div className="relative bg-white w-full max-w-3xl flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ImageIcon size={20} />
                水单核销
              </h2>
              <button onClick={() => setViewingSlip(null)} className="text-zinc-400 hover:text-black transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row h-[600px]">
              {/* Image Preview */}
              <div className="flex-1 bg-zinc-100 p-6 flex items-center justify-center overflow-hidden">
                <img src={viewingSlip.url} alt="Bank Slip" className="max-w-full max-h-full object-contain shadow-md" />
              </div>
              
              {/* Action Panel */}
              <div className="w-80 border-l border-zinc-200 p-6 flex flex-col bg-zinc-50">
                <div className="mb-6">
                  <div className="text-xs font-bold text-zinc-500 mb-2">核对说明</div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    请仔细核对左侧水单中的汇款金额。确认无误后，在下方录入实际收到的金额，系统将自动更新该客户的已付总额。
                  </p>
                </div>

                <div className="mt-auto">
                  <label className="block text-xs font-bold mb-2">录入实际收到金额</label>
                  <div className="relative mb-4">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">¥</span>
                    <input 
                      type="number" 
                      placeholder="输入金额..."
                      value={inputAmounts[viewingSlip.slipId] || ''}
                      onChange={(e) => handleAmountChange(viewingSlip.slipId, e.target.value)}
                      className="w-full border border-zinc-300 pl-8 pr-4 py-3 text-lg font-bold focus:border-black focus:ring-1 focus:ring-black outline-none bg-white"
                    />
                  </div>
                  <button 
                    onClick={() => handleConfirmPayment(viewingSlip.customerId, viewingSlip.slipId)}
                    disabled={!inputAmounts[viewingSlip.slipId]}
                    className="w-full bg-black text-white px-6 py-3 text-sm font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={16} />
                    确认收款并核销
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
