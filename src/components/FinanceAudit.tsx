import { useState } from 'react';
import { 
  ArrowLeft, Info, Search, ChevronDown, Filter, ChevronRight, 
  Check, FileText, Link as LinkIcon, X, Image as ImageIcon,
  User, Phone, Building2, CreditCard, RefreshCw, CheckCircle2, Upload, Share2, Download
} from 'lucide-react';

export function FinanceAudit() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('4500');

  return (
    <div className="max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-zinc-200 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-black tracking-tight">财务审核</h1>
        </div>
        <div className="bg-zinc-100 text-zinc-600 px-4 py-2 rounded-md flex items-center gap-2 text-sm">
          <Info size={16} className="text-zinc-400" />
          只有在子订单全部确认后，才可在货单管理页执行发货
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-zinc-200 p-6 rounded-lg shadow-sm">
          <div className="text-xs font-bold text-zinc-500 mb-3">待审核货单总额</div>
          <div className="text-4xl font-black tracking-tight">¥ 1,452,000</div>
        </div>
        <div className="bg-white border border-zinc-200 p-6 rounded-lg shadow-sm">
          <div className="text-xs font-bold text-zinc-500 mb-3">待核款子订单</div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black tracking-tight">48</span>
            <span className="text-sm font-bold text-zinc-500">笔</span>
          </div>
        </div>
        <div className="bg-white border border-zinc-200 p-6 rounded-lg shadow-sm">
          <div className="text-xs font-bold text-zinc-500 mb-3">今日完成勾稽</div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black tracking-tight">12</span>
            <span className="text-sm font-bold text-zinc-500">笔</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text" 
                placeholder="输入货单号 / 子订单号搜索" 
                className="w-full bg-white border border-zinc-200 py-2 pl-10 pr-4 text-sm rounded-md focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
              />
            </div>
            <button className="bg-white border border-zinc-200 px-4 py-2 text-sm rounded-md flex items-center gap-2 hover:border-black transition-colors">
              核款状态
              <ChevronDown size={16} className="text-zinc-400" />
            </button>
          </div>
          <button 
            onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
            className="text-zinc-600 hover:text-black text-sm flex items-center gap-2 transition-colors"
          >
            <Filter size={16} />
            高级筛选
          </button>
        </div>
        
        {/* Advanced Filters */}
        {isAdvancedFilterOpen && (
          <div className="bg-white border border-zinc-200 p-4 rounded-md flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-zinc-600">支付方式:</span>
              <select className="bg-zinc-50 border border-zinc-200 px-3 py-1.5 text-sm rounded-md focus:outline-none focus:border-black">
                <option>全部</option>
                <option>银行转账</option>
                <option>微信支付</option>
                <option>支付宝</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-zinc-600">客户信息:</span>
              <input 
                type="text" 
                placeholder="输入客户姓名或手机号" 
                className="bg-zinc-50 border border-zinc-200 px-3 py-1.5 text-sm rounded-md focus:outline-none focus:border-black w-64"
              />
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white border border-zinc-200 rounded-lg shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 bg-zinc-50 text-xs font-bold text-zinc-500">
          <div className="col-span-3">货单/子订单 & 客户</div>
          <div className="col-span-4">分账详情 (模式)</div>
          <div className="col-span-2">支付方式</div>
          <div className="col-span-1">核款状态</div>
          <div className="col-span-2 text-right">管理操作</div>
        </div>

        {/* Group 1 */}
        <div>
          {/* Group Header */}
          <div className="flex items-center justify-between px-6 py-3 bg-zinc-50/50 border-b border-zinc-200 text-xs">
            <div className="flex items-center gap-4">
              <span className="bg-black text-white px-2 py-1 font-bold rounded-sm">定金模式</span>
              <span className="font-bold">货单编号: C20240501</span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-600">货单名称: 2024夏季新品首单采购</span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-600">仓库/供应商: 华东一号仓 / 凌致服装供应链</span>
              <span className="bg-green-100 text-green-700 px-2 py-0.5 font-bold rounded-sm ml-2">已付货款</span>
            </div>
            <button className="flex items-center gap-1.5 bg-white border border-zinc-200 px-3 py-1.5 rounded-md hover:border-black transition-colors font-bold text-zinc-700">
              <Upload size={14} />
              上传供应商发票并确认已付款
            </button>
          </div>
          
          {/* Row 1 */}
          <div className="grid grid-cols-12 gap-4 px-6 py-6 border-b border-zinc-200 items-start hover:bg-zinc-50 transition-colors">
            <div className="col-span-3">
              <div className="font-bold text-sm mb-2">O-DEP-88901</div>
              <div className="flex items-center gap-2 text-xs text-zinc-600 mb-1">
                <User size={14} className="text-zinc-400" />
                ACME Corp (张三)
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-600">
                <Phone size={14} className="text-zinc-400" />
                138-0013-8000
              </div>
            </div>
            <div className="col-span-4 space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-32">
                  <div className="text-xs text-zinc-500 mb-0.5">定金 (30%)</div>
                  <div className="font-bold text-sm">¥ 4,500</div>
                </div>
                <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded-sm">待审核</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32">
                  <div className="text-xs text-zinc-500 mb-0.5">尾款 (70%)</div>
                  <div className="font-bold text-sm">¥ 10,500</div>
                </div>
                <span className="bg-zinc-100 text-zinc-500 text-[10px] font-bold px-2 py-1 rounded-sm">未开始</span>
              </div>
            </div>
            <div className="col-span-2 flex items-center gap-2 text-sm font-medium">
              <Building2 size={16} className="text-zinc-400" />
              银行转账
            </div>
            <div className="col-span-1 text-sm font-medium text-zinc-600">
              待确认
            </div>
            <div className="col-span-2 flex flex-col items-end gap-3">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-black text-white text-xs font-bold px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors"
              >
                确认付款金额
              </button>
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <button className="flex items-center gap-1 hover:text-black transition-colors"><FileText size={14}/> 查看凭证</button>
                <button className="flex items-center gap-1 hover:text-black transition-colors"><LinkIcon size={14}/> 银行勾稽</button>
              </div>
            </div>
          </div>
        </div>

        {/* Group 2 */}
        <div>
          {/* Group Header */}
          <div className="flex items-center justify-between px-6 py-3 bg-zinc-50/50 border-b border-zinc-200 text-xs">
            <div className="flex items-center gap-4">
              <span className="bg-black text-white px-2 py-1 font-bold rounded-sm">全款模式</span>
              <span className="font-bold">货单编号: C20240502</span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-600">货单名称: 潮流配饰批量补货</span>
              <span className="text-zinc-300">|</span>
              <span className="text-zinc-600">仓库/供应商: 华南二号仓 / 卓尚饰品</span>
              <span className="bg-green-100 text-green-700 px-2 py-0.5 font-bold rounded-sm ml-2">已付货款</span>
            </div>
            <button className="flex items-center gap-1.5 bg-white border border-zinc-200 px-3 py-1.5 rounded-md hover:border-black transition-colors font-bold text-zinc-700">
              <Upload size={14} />
              上传供应商发票并确认已付款
            </button>
          </div>
          
          {/* Row 2.1 */}
          <div className="grid grid-cols-12 gap-4 px-6 py-6 border-b border-zinc-200 items-start hover:bg-zinc-50 transition-colors">
            <div className="col-span-3">
              <div className="font-bold text-sm mb-2">O-FUL-77234</div>
              <div className="flex items-center gap-2 text-xs text-zinc-600 mb-1">
                <User size={14} className="text-zinc-400" />
                TechNova (李经理)
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-600">
                <Phone size={14} className="text-zinc-400" />
                139-2222-3333
              </div>
            </div>
            <div className="col-span-4">
              <div className="text-xs text-zinc-500 mb-0.5">单次全款支付</div>
              <div className="font-bold text-sm">¥ 28,900</div>
            </div>
            <div className="col-span-2 flex items-center gap-2 text-sm font-medium">
              <CreditCard size={16} className="text-green-600" />
              微信支付
            </div>
            <div className="col-span-1 flex flex-col items-start gap-2">
              <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded-sm">已收全款</span>
              <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                <RefreshCw size={10} /> 自动同步
              </div>
            </div>
            <div className="col-span-2 flex flex-col items-end gap-3">
              <div className="text-xs text-zinc-500">系统自动确认</div>
              <button 
                onClick={() => setIsInvoiceModalOpen(true)}
                className="text-xs text-zinc-500 hover:text-black transition-colors flex items-center gap-1"
              >
                <FileText size={14} /> 查看交易详情
              </button>
            </div>
          </div>

          {/* Row 2.2 */}
          <div className="grid grid-cols-12 gap-4 px-6 py-6 border-b border-zinc-200 items-start hover:bg-zinc-50 transition-colors">
            <div className="col-span-3">
              <div className="font-bold text-sm mb-2">O-FUL-88902</div>
              <div className="flex items-center gap-2 text-xs text-zinc-600 mb-1">
                <User size={14} className="text-zinc-400" />
                GlobalTrade (王总)
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-600">
                <Phone size={14} className="text-zinc-400" />
                135-4444-5555
              </div>
            </div>
            <div className="col-span-4">
              <div className="text-xs text-zinc-500 mb-0.5">单次全款支付</div>
              <div className="font-bold text-sm">¥ 26,600</div>
            </div>
            <div className="col-span-2 flex items-center gap-2 text-sm font-medium">
              <Building2 size={16} className="text-zinc-400" />
              银行转账
            </div>
            <div className="col-span-1 flex flex-col items-start gap-2">
              <span className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded-sm">全额收讫</span>
            </div>
            <div className="col-span-2 flex flex-col items-end gap-3">
              <div className="flex items-center gap-1 text-xs text-zinc-600">
                <CheckCircle2 size={14} /> 银行勾稽已完成
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-500">
                <button className="hover:text-black transition-colors">查看凭证</button>
                <button 
                  onClick={() => setIsInvoiceModalOpen(true)}
                  className="hover:text-black transition-colors flex items-center gap-1"
                >
                  <FileText size={14} /> 查看交易详情
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-white flex items-center justify-between text-xs text-zinc-500">
          <div>显示 1 - 2 个货单组，共 120 条子记录</div>
          <div className="flex items-center gap-2">
            <button className="w-6 h-6 flex items-center justify-center hover:bg-zinc-100 rounded transition-colors">
              <ArrowLeft size={14} />
            </button>
            <button className="w-6 h-6 flex items-center justify-center hover:bg-zinc-100 rounded transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h2 className="text-lg font-bold">确认收款核销</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-black transition-colors">
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs text-zinc-500 mb-1">订单简报</div>
                  <div className="text-lg font-bold">O-DEP-88901</div>
                </div>
                <div className="text-sm text-zinc-600">
                  客户: <span className="font-bold text-black">ACME Corp</span>
                </div>
              </div>

              <div className="bg-zinc-50 rounded-lg p-4 mb-6">
                <div className="text-xs font-bold text-zinc-500 mb-4">收款明细</div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-zinc-600 mb-0.5">定金 (30%)</div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">¥</span>
                      <input 
                        type="number" 
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="text-lg font-bold border-b border-zinc-300 focus:border-black outline-none w-24 bg-transparent"
                      />
                    </div>
                  </div>
                  <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">已收到</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-zinc-600 mb-0.5">尾款 (70%)</div>
                    <div className="text-lg font-bold">¥ 10,500</div>
                  </div>
                  <span className="text-sm font-medium text-zinc-500">待处理</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-zinc-500 mb-2">支付方式</div>
                <div className="flex items-center justify-between border border-zinc-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 font-medium">
                    <Building2 size={18} className="text-zinc-400" />
                    银行转账
                  </div>
                  <button className="flex items-center gap-2 text-xs font-bold bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded transition-colors">
                    <ImageIcon size={14} />
                    查看水单
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-bold text-zinc-600 hover:text-black transition-colors"
              >
                取消
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-black text-white px-6 py-2 text-sm font-bold rounded-md hover:bg-zinc-800 transition-colors"
              >
                确认收款并勾稽
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsInvoiceModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-zinc-50">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FileText size={20} />
                交易详情 (发票)
              </h2>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 text-sm font-bold bg-white border border-zinc-200 px-3 py-1.5 rounded-md hover:border-black transition-colors">
                  <Share2 size={16} />
                  转发分享链接
                </button>
                <button className="flex items-center gap-2 text-sm font-bold bg-black text-white px-3 py-1.5 rounded-md hover:bg-zinc-800 transition-colors">
                  <Download size={16} />
                  下载 PDF
                </button>
                <button onClick={() => setIsInvoiceModalOpen(false)} className="text-zinc-400 hover:text-black transition-colors ml-2">
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* Modal Body - Invoice Content */}
            <div className="p-8 overflow-y-auto">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">INVOICE</h1>
                  <div className="text-sm text-zinc-500">发票编号: INV-20240502-001</div>
                  <div className="text-sm text-zinc-500">开票日期: 2024-05-02</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black uppercase tracking-tighter mb-1">Monolithic Curator</div>
                  <div className="text-sm text-zinc-500">上海市静安区南京西路 1266 号</div>
                  <div className="text-sm text-zinc-500">contact@monolithic.com</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12 mb-12">
                <div>
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">致 (Billed To)</div>
                  <div className="font-bold text-lg mb-1">TechNova</div>
                  <div className="text-sm text-zinc-600">联系人: 李经理</div>
                  <div className="text-sm text-zinc-600">电话: 139-2222-3333</div>
                  <div className="text-sm text-zinc-600">地址: 深圳市南山区科技园南区</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">订单信息 (Order Info)</div>
                  <div className="text-sm text-zinc-600 mb-1"><span className="font-bold">子订单号:</span> O-FUL-77234</div>
                  <div className="text-sm text-zinc-600 mb-1"><span className="font-bold">关联货单:</span> C20240502 (潮流配饰批量补货)</div>
                  <div className="text-sm text-zinc-600"><span className="font-bold">支付方式:</span> 微信支付 (单次全款)</div>
                </div>
              </div>

              <table className="w-full mb-8">
                <thead>
                  <tr className="border-b-2 border-black text-left">
                    <th className="py-3 text-xs font-bold uppercase tracking-widest text-zinc-500">商品名称 (Item)</th>
                    <th className="py-3 text-xs font-bold uppercase tracking-widest text-zinc-500">规格 (SKU)</th>
                    <th className="py-3 text-xs font-bold uppercase tracking-widest text-zinc-500 text-right">单价 (Price)</th>
                    <th className="py-3 text-xs font-bold uppercase tracking-widest text-zinc-500 text-center">数量 (Qty)</th>
                    <th className="py-3 text-xs font-bold uppercase tracking-widest text-zinc-500 text-right">总价 (Total)</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-zinc-100">
                    <td className="py-4 font-bold">AESTHETIQUE CHRONO NOIR</td>
                    <td className="py-4 text-zinc-500">黑色 / 纳帕皮 / Mini</td>
                    <td className="py-4 text-right">¥ 1,200.00</td>
                    <td className="py-4 text-center">10</td>
                    <td className="py-4 text-right font-bold">¥ 12,000.00</td>
                  </tr>
                  <tr className="border-b border-zinc-100">
                    <td className="py-4 font-bold">AESTHETIQUE CHRONO NOIR</td>
                    <td className="py-4 text-zinc-500">白色 / 亮面 / Mini</td>
                    <td className="py-4 text-right">¥ 1,200.00</td>
                    <td className="py-4 text-center">5</td>
                    <td className="py-4 text-right font-bold">¥ 6,000.00</td>
                  </tr>
                  <tr className="border-b border-zinc-100">
                    <td className="py-4 font-bold">VANGUARD SILHOUETTE</td>
                    <td className="py-4 text-zinc-500">银色 / 钛金属 / 标准</td>
                    <td className="py-4 text-right">¥ 2,180.00</td>
                    <td className="py-4 text-center">5</td>
                    <td className="py-4 text-right font-bold">¥ 10,900.00</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between py-2 text-sm">
                    <span className="text-zinc-500">小计 (Subtotal)</span>
                    <span>¥ 28,900.00</span>
                  </div>
                  <div className="flex justify-between py-2 text-sm border-b border-zinc-200">
                    <span className="text-zinc-500">税费 (Tax 0%)</span>
                    <span>¥ 0.00</span>
                  </div>
                  <div className="flex justify-between py-4 text-lg font-black">
                    <span>总计 (Total)</span>
                    <span>¥ 28,900.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
