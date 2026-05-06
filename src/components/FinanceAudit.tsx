import { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Info, Calendar as CalendarIcon, User, Phone, Building2, CheckCircle2, ChevronRight, FileText, ChevronDown, ChevronUp, Image as ImageIcon, Check, Clock, X, MessageSquare, Filter, ChevronLeft, Package, Settings, CreditCard, Banknote
} from 'lucide-react';

const MOCK_ORDERS = [
  {
    orderId: "O-DEP-88901",
    date: "2024-05-02",
    customerName: "ACME Corp (张三)",
    phone: "138-0013-8000",
    manifestName: "2024夏季新品首单采购",
    depositDue: 4500,
    balanceDue: 10500,
    notes: "销售代下单。客户：张三，电话：138-0013-8000。客户要求尽量发顺丰，包装需加固。",
    products: [
      { name: "MARGIELA GLAM SLAM MINI", sku: "T8013-BLK-MN", qty: 2, price: 9450, confirmed: true },
      { name: "AESTHETIQUE CHRONO NOIR", sku: "AC-202-B", qty: 1, price: 34200, confirmed: false }
    ],
    confirmedPaid: 0,
    reconciliationRecords: [],
    uploadedSlips: [
      { id: "slip-1", uploadTime: "2024-05-02 14:30", imageUrl: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&q=80", status: "pending" }
    ]
  },
  {
    orderId: "O-DEP-88902",
    date: "2024-05-02",
    customerName: "ACME Corp (张三)",
    phone: "138-0013-8000",
    manifestName: "潮流配饰批量补货",
    depositDue: 2000,
    balanceDue: 8000,
    notes: "客户自主下单。昵称：ACME_采购部。请随货附带发票。",
    products: [
      { name: "VANGUARD SILHOUETTE", sku: "VG-SL-01", qty: 5, price: 2180, confirmed: true }
    ],
    confirmedPaid: 2000,
    reconciliationRecords: [
      { id: "rec-1", time: "2024-05-02 10:15", amount: 2000, slipId: "slip-2" }
    ],
    uploadedSlips: [
      { id: "slip-2", uploadTime: "2024-05-02 09:00", imageUrl: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&q=80", status: "confirmed" }
    ]
  },
  {
    orderId: "O-FUL-77234",
    date: "2024-05-02",
    customerName: "TechNova (李经理)",
    phone: "139-2222-3333",
    manifestName: "潮流配饰批量补货",
    depositDue: 28900,
    balanceDue: 0,
    notes: "销售代下单。客户：李经理。全款支付，优先发货。",
    products: [
      { name: "VANGUARD SILHOUETTE", sku: "VG-SL-02", qty: 10, price: 2180, confirmed: true },
      { name: "AESTHETIQUE CHRONO NOIR", sku: "AC-202-W", qty: 2, price: 34200, confirmed: true }
    ],
    confirmedPaid: 28900,
    reconciliationRecords: [
      { id: "rec-2", time: "2024-05-02 10:15", amount: 28900, slipId: "slip-3" }
    ],
    uploadedSlips: [
      { id: "slip-3", uploadTime: "2024-05-02 09:00", imageUrl: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&q=80", status: "confirmed" }
    ]
  },
  {
    orderId: "O-DEP-99001",
    date: "2024-05-02",
    customerName: "Apex Retail (赵总)",
    phone: "137-8888-9999",
    manifestName: "2024秋季高奢皮具专场",
    depositDue: 50000,
    balanceDue: 150000,
    notes: "客户自主下单。昵称：Apex_赵。已付部分定金，剩余定金明天补齐。",
    products: [
      { name: "LVMH 联名款手袋", sku: "LV-001", qty: 10, price: 20000, confirmed: false }
    ],
    confirmedPaid: 20000,
    reconciliationRecords: [
      { id: "rec-3", time: "2024-05-02 11:00", amount: 20000, slipId: "slip-4" }
    ],
    uploadedSlips: [
      { id: "slip-4", uploadTime: "2024-05-02 10:30", imageUrl: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&q=80", status: "confirmed" },
      { id: "slip-5", uploadTime: "2024-05-02 15:45", imageUrl: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&q=80", status: "pending" }
    ]
  },
  {
    orderId: "O-FUL-88902",
    date: "2024-05-01",
    customerName: "GlobalTrade (王总)",
    phone: "135-4444-5555",
    manifestName: "2024夏季新品首单采购",
    depositDue: 26600,
    balanceDue: 0,
    notes: "销售代下单。客户：王总。走对公账户打款。",
    products: [
      { name: "MARGIELA GLAM SLAM MINI", sku: "T8013-BLK-MN", qty: 5, price: 9450, confirmed: true }
    ],
    confirmedPaid: 10000,
    reconciliationRecords: [
      { id: "rec-4", time: "2024-05-01 16:00", amount: 10000, slipId: "slip-6" }
    ],
    uploadedSlips: [
      { id: "slip-6", uploadTime: "2024-05-01 15:30", imageUrl: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&q=80", status: "confirmed" }
    ]
  },
  {
    orderId: "O-DEP-99005",
    date: "2024-05-05",
    customerName: "Boutique 1990 (陈店长)",
    phone: "130-1111-2222",
    manifestName: "潮流配饰批量补货",
    depositDue: 3000,
    balanceDue: 7000,
    notes: "客户自主下单。昵称：陈店长。需要分批发货。",
    products: [
      { name: "VANGUARD SILHOUETTE", sku: "VG-SL-03", qty: 5, price: 2000, confirmed: false }
    ],
    confirmedPaid: 0,
    reconciliationRecords: [],
    uploadedSlips: []
  }
];

export function FinanceAudit() {
  const [activeMainTab, setActiveMainTab] = useState<'reconciliation' | 'withdrawal'>('reconciliation');
  
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  
  const [ordersData, setOrdersData] = useState(MOCK_ORDERS);
  const [inputAmounts, setInputAmounts] = useState<Record<string, string>>({});
  const [viewingSlip, setViewingSlip] = useState<{url?: string, slipId: string, orderId: string, isManual?: boolean} | null>(null);
  
  // Date Range State
  const [dateRange, setDateRange] = useState<{start: string | null, end: string | null}>({ start: "2024-05-01", end: "2024-05-05" });
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date(2024, 4)); // May 2024
  const calendarRef = useRef<HTMLDivElement>(null);

  // Status Filter State
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'partial' | 'completed'>('all');

  // Withdrawal Settings State
  const [autoWithdrawRule, setAutoWithdrawRule] = useState<'t7_signoff_or_confirm' | 't1_track'>('t7_signoff_or_confirm');
  const [withdrawRuleLocked, setWithdrawRuleLocked] = useState(false);
  const [withdrawRuleLockedUntil, setWithdrawRuleLockedUntil] = useState("");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAmountChange = (slipId: string, value: string) => {
    setInputAmounts(prev => ({ ...prev, [slipId]: value }));
  };

  const handleConfirmPayment = (orderId: string, slipId: string) => {
    const amount = parseFloat(inputAmounts[slipId] || "0");
    if (isNaN(amount) || amount <= 0) return;

    setOrdersData(prev => prev.map(order => {
      if (order.orderId === orderId) {
        const updatedOrder = { ...order };
        
        // Update slip status
        updatedOrder.uploadedSlips = updatedOrder.uploadedSlips.map((slip: any) => 
          slip.id === slipId ? { ...slip, status: "confirmed" } : slip
        );

        // Add reconciliation record
        const now = new Date();
        const timeStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        updatedOrder.reconciliationRecords = [
          ...updatedOrder.reconciliationRecords,
          { id: `rec-${Date.now()}`, time: timeStr, amount, slipId }
        ];

        // Update total paid
        updatedOrder.confirmedPaid += amount;
        return updatedOrder;
      }
      return order;
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

  // Filter Orders
  const filteredOrders = ordersData.filter(order => {
    // 1. Date Filter
    if (dateRange.start && order.date < dateRange.start) return false;
    if (dateRange.end && order.date > dateRange.end) return false;

    // 2. Status Filter
    const totalDue = order.depositDue + order.balanceDue;
    
    let status = 'pending';
    if (order.confirmedPaid >= totalDue) status = 'completed';
    else if (order.confirmedPaid > 0) status = 'partial';

    if (statusFilter !== 'all' && status !== statusFilter) return false;

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-zinc-200 rounded-full transition-colors shrink-0">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase mb-1">财务管理</h1>
            <p className="text-xs md:text-sm text-zinc-500">按订单维度核对银行转账汇款及提现管理</p>
          </div>
        </div>
        <div className="bg-zinc-100 text-zinc-600 px-4 py-2 rounded-md flex items-center gap-2 text-xs md:text-sm">
          <Info size={16} className="text-zinc-400 shrink-0" />
          当前版本仅支持银行转账核销
        </div>
      </div>

      <div className="flex gap-8 border-b border-zinc-200 mb-6 overflow-x-auto no-scrollbar whitespace-nowrap">
        <button onClick={() => setActiveMainTab('reconciliation')} className={`pb-3 text-sm font-bold transition-colors ${activeMainTab === 'reconciliation' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>收款核销</button>
        <button onClick={() => setActiveMainTab('withdrawal')} className={`pb-3 text-sm font-bold transition-colors ${activeMainTab === 'withdrawal' ? 'text-black border-b-2 border-black' : 'text-zinc-500 hover:text-black'}`}>对账</button>
      </div>

      {activeMainTab === 'reconciliation' ? (
        <>
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 md:mb-8">
        {/* Date Range Picker */}
        <div className="relative w-full md:w-auto" ref={calendarRef}>
          <button 
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2 shadow-sm hover:border-black transition-colors min-w-[260px] w-full md:w-auto overflow-hidden text-ellipsis whitespace-nowrap text-left"
          >
            <CalendarIcon size={18} className="text-zinc-400 shrink-0" />
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
        <div className="flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2 shadow-sm w-full md:w-auto">
          <Filter size={18} className="text-zinc-400 shrink-0" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-transparent text-sm font-bold focus:outline-none cursor-pointer w-full"
          >
            <option value="all">全部对账状态</option>
            <option value="pending">待核销 (未付款)</option>
            <option value="partial">部分核销 (部分付款)</option>
            <option value="completed">已结清 (全额付款)</option>
          </select>
        </div>

        <div className="text-xs md:text-sm text-zinc-500 md:ml-auto w-full md:w-auto text-left md:text-right">
          共找到 {filteredOrders.length} 个符合条件的订单记录
        </div>
      </div>

      {/* Orders List / Horizontal Layout */}
      <div className="mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredOrders.map(order => {
            const totalDue = order.depositDue + order.balanceDue;
            const pendingAmount = Math.max(0, totalDue - order.confirmedPaid);
            const isFullyPaid = pendingAmount === 0;

            let statusLabel = '待核销';
            let statusClass = 'bg-red-50 text-red-700 border-red-200';
            if (isFullyPaid) {
              statusLabel = '已结清';
              statusClass = 'bg-green-50 text-green-700 border-green-200';
            } else if (order.confirmedPaid > 0) {
              statusLabel = '部分核销';
              statusClass = 'bg-blue-50 text-blue-700 border-blue-200';
            }

            return (
              <div key={order.orderId} className="bg-white border border-zinc-200 shadow-sm flex flex-col hover:border-black transition-colors cursor-pointer group" onClick={() => setSelectedOrderId(order.orderId)}>
                <div className="bg-zinc-50/50 px-4 py-3 border-b border-zinc-100 flex items-center justify-between">
                  <div className="text-[10px] font-bold font-mono">{order.orderId}</div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 border ${statusClass}`}>
                    {statusLabel}
                  </span>
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <div className="mb-4">
                    <div className="text-xs font-bold text-zinc-500 mb-1 flex items-center gap-1"><FileText size={12} /> {order.manifestName}</div>
                    <div className="text-lg font-black tracking-tight leading-tight truncate">{order.customerName}</div>
                    <div className="text-[10px] text-zinc-400 font-mono mt-1">{order.date}</div>
                  </div>
                  
                  <div className="mt-auto grid grid-cols-2 gap-4 border-t border-zinc-100 pt-4">
                    <div>
                      <div className="text-[10px] text-zinc-500 mb-1">订单总价</div>
                      <div className="text-sm font-bold">¥ {totalDue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-zinc-500 mb-1">待付金额</div>
                      <div className={`text-sm font-bold ${pendingAmount > 0 ? 'text-red-500' : 'text-zinc-600'}`}>
                        ¥ {pendingAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 border-t border-zinc-100 bg-zinc-50 flex justify-between items-center group-hover:bg-zinc-100 transition-colors">
                  <span className="text-xs font-bold text-zinc-500">查看详情</span>
                  <ChevronRight size={16} className="text-zinc-400 group-hover:text-black" />
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredOrders.length === 0 && (
          <div className="text-center py-20 text-zinc-500 border border-zinc-200 bg-white">
            所选区间内没有符合条件的订单记录
          </div>
        )}
      </div>
      </>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white border border-zinc-200 p-6 flex flex-col">
              <div className="text-sm font-bold text-zinc-500 mb-2">服务账户余额</div>
              <div className="text-2xl md:text-3xl font-black mb-2">¥ 12,500.00</div>
              <div className="text-xs text-zinc-400 mt-auto">用于扣除税费、运费等服务开支</div>
            </div>
            <div className="bg-white border border-zinc-200 p-6 flex flex-col">
              <div className="text-sm font-bold text-zinc-500 mb-2">分账余额账户</div>
              <div className="text-2xl md:text-3xl font-black text-orange-600 mb-2">-¥ 3,200.00</div>
              <div className="text-xs text-zinc-400 mt-auto">用于代扣税运及向上游支付货款（可为负数）</div>
            </div>
            <div className="bg-white border border-zinc-200 p-6 flex flex-col">
              <div className="text-sm font-bold text-zinc-500 mb-2">累计订单总流水</div>
              <div className="text-2xl md:text-3xl font-black text-zinc-400 mb-2">¥ 1,250,000.00</div>
              <a href="#" className="text-sm text-blue-600 hover:underline mt-auto pt-2">导出流水账单</a>
            </div>
          </div>

          {/* 流水明细块 */}
          <div className="space-y-6">
            {/* 订单流水 */}
            <div className="bg-white border border-zinc-200 shadow-sm">
              <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-tight flex items-center gap-2">
                  <Banknote size={18} />
                  订单流水
                </h2>
                <div className="text-xs text-zinc-500">展示货品金额及扣除的手续费明细</div>
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left text-sm min-w-[700px]">
                  <thead className="bg-zinc-50/50 text-xs text-zinc-500 uppercase">
                    <tr>
                      <th className="px-6 py-3 font-bold border-b border-zinc-200">流水号/时间</th>
                      <th className="px-6 py-3 font-bold border-b border-zinc-200">关联单号</th>
                      <th className="px-6 py-3 font-bold border-b border-zinc-200 text-right">商品付款金额</th>
                      <th className="px-6 py-3 font-bold border-b border-zinc-200 text-right text-orange-600">扣除交易手续费</th>
                      <th className="px-6 py-3 font-bold border-b border-zinc-200 text-right text-green-600">商家实际入账</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-zinc-50 border-b border-zinc-100">
                      <td className="px-6 py-4">
                        <div className="font-mono text-xs">TRX-20240502-01</div>
                        <div className="text-xs text-zinc-400">2024-05-02 10:15</div>
                      </td>
                      <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">O-DEP-88902</td>
                      <td className="px-6 py-4 text-right font-bold">¥ 2,000.00</td>
                      <td className="px-6 py-4 text-right text-orange-600">- ¥ 12.00</td>
                      <td className="px-6 py-4 text-right text-green-600 font-bold">+ ¥ 1,988.00</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 border-b border-zinc-100">
                      <td className="px-6 py-4">
                        <div className="font-mono text-xs">TRX-20240502-02</div>
                        <div className="text-xs text-zinc-400">2024-05-02 11:30</div>
                      </td>
                      <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">O-FUL-77234</td>
                      <td className="px-6 py-4 text-right font-bold">¥ 28,900.00</td>
                      <td className="px-6 py-4 text-right text-orange-600">- ¥ 173.40</td>
                      <td className="px-6 py-4 text-right text-green-600 font-bold">+ ¥ 28,726.60</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 服务账户流水 */}
            <div className="bg-white border border-zinc-200 shadow-sm">
              <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-tight flex items-center gap-2">
                  <CreditCard size={18} />
                  服务账户流水
                </h2>
                <div className="text-xs text-zinc-500">展示充值金额以及税费、运费扣除明细</div>
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left text-sm min-w-[700px]">
                  <thead className="bg-zinc-50/50 text-xs text-zinc-500 uppercase">
                    <tr>
                      <th className="px-6 py-3 font-bold border-b border-zinc-200">流水号/时间</th>
                      <th className="px-6 py-3 font-bold border-b border-zinc-200">交易类型</th>
                      <th className="px-6 py-3 font-bold border-b border-zinc-200">关联单号</th>
                      <th className="px-6 py-3 font-bold border-b border-zinc-200 text-right">金额变动</th>
                      <th className="px-6 py-3 font-bold border-b border-zinc-200 text-right">账户余额</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-zinc-50 border-b border-zinc-100">
                      <td className="px-6 py-4">
                        <div className="font-mono text-xs">SRV-20240502-01</div>
                        <div className="text-xs text-zinc-400">2024-05-02 09:00</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-[10px] font-bold">在线充值</span>
                      </td>
                      <td className="px-6 py-4 text-zinc-400">-</td>
                      <td className="px-6 py-4 text-right text-green-600 font-bold">+ ¥ 5,000.00</td>
                      <td className="px-6 py-4 text-right font-bold">¥ 12,500.00</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 border-b border-zinc-100">
                      <td className="px-6 py-4">
                        <div className="font-mono text-xs">SRV-20240501-88</div>
                        <div className="text-xs text-zinc-400">2024-05-01 16:45</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-[10px] font-bold">扣除税费及运费</span>
                      </td>
                      <td className="px-6 py-4 text-blue-600 hover:underline cursor-pointer">O-FUL-88902</td>
                      <td className="px-6 py-4 text-right text-orange-600 font-bold">- ¥ 650.00</td>
                      <td className="px-6 py-4 text-right font-bold">¥ 7,500.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 分账余额账户 */}
            <div className="bg-white border border-zinc-200 shadow-sm">
              <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-tight flex items-center gap-2">
                  <Package size={18} />
                  分账余额账户
                </h2>
                <div className="text-xs text-zinc-500">用于展示代扣税运、向上游支付货款流水（可为负数）</div>
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left text-sm min-w-[700px]">
                  <thead className="bg-zinc-50/50 text-xs text-zinc-500 uppercase">
                    <tr>
                      <th className="px-6 py-3 font-bold border-b border-zinc-200">流水号/时间</th>
                      <th className="px-6 py-3 font-bold border-b border-zinc-200">交易类型</th>
                      <th className="px-6 py-3 font-bold border-b border-zinc-200">收款方/上游</th>
                      <th className="px-6 py-3 font-bold border-b border-zinc-200 text-right">金额变动</th>
                      <th className="px-6 py-3 font-bold border-b border-zinc-200 text-right">分账余额</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-zinc-50 border-b border-zinc-100">
                      <td className="px-6 py-4">
                        <div className="font-mono text-xs">SPL-20240502-05</div>
                        <div className="text-xs text-zinc-400">2024-05-02 12:30</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-[10px] font-bold">支付上游货款</span>
                      </td>
                      <td className="px-6 py-4 font-bold">欧洲表行</td>
                      <td className="px-6 py-4 text-right text-red-600 font-bold">- ¥ 60,000.00</td>
                      <td className="px-6 py-4 text-right font-bold text-orange-600">- ¥ 3,200.00</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 border-b border-zinc-100">
                      <td className="px-6 py-4">
                        <div className="font-mono text-xs">SPL-20240502-04</div>
                        <div className="text-xs text-zinc-400">2024-05-02 11:15</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-[10px] font-bold">收入订单结算</span>
                      </td>
                      <td className="px-6 py-4 text-zinc-400">-</td>
                      <td className="px-6 py-4 text-right text-blue-600 font-bold">+ ¥ 65,000.00</td>
                      <td className="px-6 py-4 text-right font-bold">¥ 56,800.00</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 border-b border-zinc-100">
                      <td className="px-6 py-4">
                        <div className="font-mono text-xs">SPL-20240501-12</div>
                        <div className="text-xs text-zinc-400">2024-05-01 18:00</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-zinc-200 text-zinc-800 text-[10px] font-bold">代扣跨境税费</span>
                      </td>
                      <td className="px-6 py-4 font-bold">海关专户</td>
                      <td className="px-6 py-4 text-right text-orange-600 font-bold">- ¥ 5,915.00</td>
                      <td className="px-6 py-4 text-right font-bold text-orange-600">- ¥ 8,200.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Drawer */}
      {selectedOrderId && (() => {
        const order = ordersData.find(o => o.orderId === selectedOrderId);
        if (!order) return null;
        
        const totalDue = order.depositDue + order.balanceDue;
        const pendingAmount = Math.max(0, totalDue - order.confirmedPaid);
        const isFullyPaid = pendingAmount === 0;

        return (
          <div className="fixed inset-0 z-40 flex justify-end md:p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedOrderId(null)}></div>
            <div className="relative w-full md:w-[1000px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 md:rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6 border-b border-zinc-100">
                <div>
                  <h2 className="text-lg md:text-xl font-black uppercase tracking-tight mb-1">订单收银核销详情</h2>
                  <div className="text-xs text-zinc-500 font-mono">订单编号: {order.orderId}</div>
                </div>
                <button onClick={() => setSelectedOrderId(null)} className="text-zinc-400 hover:text-black transition-colors"><X size={24} /></button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col md:grid md:grid-cols-12 md:divide-x divide-zinc-200 min-h-full">
                  {/* Order Details */}
                  <div className="md:col-span-7 p-4 md:p-8">
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">货单归属</div>
                    
                    <div className="mb-4">
                      <div className="text-sm font-bold mb-1 flex items-center gap-2">
                        <FileText size={16} className="text-zinc-400" />
                        {order.manifestName}
                      </div>
                    </div>

                    {order.notes && (
                      <div className="bg-orange-50/50 border border-orange-100 p-3 mb-6 text-xs text-orange-900 flex gap-2 rounded-sm">
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
                        <div key={pIdx} className="flex items-center justify-between text-xs bg-zinc-50 p-3 border border-zinc-100">
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="font-bold">{product.name}</span>
                              {product.confirmed ? (
                                <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded-sm border border-green-200">已确认</span>
                              ) : (
                                <span className="text-[10px] text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-sm border border-orange-200">待确认</span>
                              )}
                            </div>
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

                  {/* Reconciliation Panel */}
                  <div className="md:col-span-5 p-4 md:p-8 bg-zinc-50/30 flex flex-col border-t md:border-t-0 border-zinc-200">
                    <div>
                      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">财务核销汇总</div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white border border-zinc-200 p-4">
                          <div className="text-xs text-zinc-500 mb-1">订单总应付</div>
                          <div className="text-xl font-black">¥ {totalDue.toLocaleString()}</div>
                          <div className="text-[10px] text-zinc-400 mt-2">
                            定金: ¥{order.depositDue.toLocaleString()} | 尾款: ¥{order.balanceDue.toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-white border border-zinc-200 p-4">
                          <div className="text-xs text-zinc-500 mb-1">当前待付金额</div>
                          <div className={`text-xl font-black ${pendingAmount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            ¥ {pendingAmount.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-zinc-400 mt-2">
                            已确认收款: ¥{order.confirmedPaid.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Reconciliation Records */}
                      {order.reconciliationRecords.length > 0 && (
                        <div className="mb-6">
                          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-3">已核销记录</div>
                          <div className="space-y-2">
                            {order.reconciliationRecords.map((rec: any) => (
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

                    <div className="border-t border-zinc-200 pt-6 mt-auto">
                      {isFullyPaid ? (
                        <div className="flex items-center justify-center gap-2 bg-green-50 text-green-700 py-3 border border-green-200 font-bold text-sm">
                          <CheckCircle2 size={18} />
                          该订单已全部结清
                        </div>
                      ) : (
                        <div>
                          <div className="text-xs font-bold mb-3 flex items-center justify-between">
                            <span>前端上传的水单记录</span>
                            <span className="text-zinc-400 font-normal">点击查看并核销</span>
                          </div>
                          
                          {order.uploadedSlips.length > 0 ? (
                            <div className="space-y-3">
                              {order.uploadedSlips.map((slip: any) => (
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
                                      onClick={() => setViewingSlip({ url: slip.imageUrl, slipId: slip.id, orderId: order.orderId })}
                                      className="text-xs font-bold bg-black text-white px-4 py-2 hover:bg-zinc-800 transition-colors"
                                    >
                                      查看并核销
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center py-6 text-xs text-zinc-500 bg-white border border-dashed border-zinc-300 gap-3">
                              <span>暂无待核销的水单记录</span>
                              <button 
                                onClick={() => setViewingSlip({ slipId: `manual-${Date.now()}`, orderId: order.orderId, isManual: true })}
                                className="text-xs font-bold bg-black text-white px-4 py-2 hover:bg-zinc-800 transition-colors cursor-pointer"
                              >
                                手动无水单核销
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

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
              <div className="flex-1 bg-zinc-100 p-6 flex flex-col items-center justify-center overflow-hidden">
                {viewingSlip.url ? (
                  <img src={viewingSlip.url} alt="Bank Slip" className="max-w-full max-h-full object-contain shadow-md" />
                ) : (
                  <div className="text-zinc-400 flex flex-col items-center justify-center gap-4">
                    <ImageIcon size={48} className="opacity-20" />
                    <span className="text-sm font-bold">顾客暂未上传水单图片截图</span>
                  </div>
                )}
              </div>
              
              {/* Action Panel */}
              <div className="w-80 border-l border-zinc-200 p-6 flex flex-col bg-zinc-50">
                <div className="mb-6">
                  <div className="text-xs font-bold text-zinc-500 mb-2">核对说明</div>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    请仔细核对左侧水单中的汇款金额。确认无误后，在下方录入实际收到的金额，系统将自动更新该订单的已付总额。
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
                    onClick={() => handleConfirmPayment(viewingSlip.orderId, viewingSlip.slipId)}
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
