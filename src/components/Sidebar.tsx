import { Package, Layers, ReceiptText, Wallet, Store, ShoppingBag, Settings, ListPlus, ArrowUpRight, CheckSquare, ListOrdered, Building2 } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const supplierItems = [
    { id: 'product', label: '商品管理', icon: Package },
    { id: 'offer_to_marketplace', label: '出价到集市', icon: ArrowUpRight },
    { id: 'marketplace_on_sale', label: '集市在售', icon: Store },
  ];

  const distributorItems = [
    { id: 'marketplace_selection', label: '从集市选品', icon: ShoppingBag },
    { id: 'markup_strategy', label: '配置加价策略', icon: Settings },
    { id: 'my_selections', label: '我的选品', icon: CheckSquare },
  ];

  const otherItems = [
    { id: 'campaign', label: '货单管理', icon: Layers },
    { id: 'order', label: '订单管理', icon: ReceiptText },
    { id: 'finance', label: '财务审计', icon: Wallet },
    { id: 'warehouse', label: '仓库管理', icon: Building2 },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-zinc-50 border-r border-zinc-200 flex flex-col z-40 overflow-y-auto">
      <div className="h-16 flex items-center px-6 border-b border-zinc-200 flex-shrink-0">
        <span className="text-lg font-black tracking-tighter uppercase">Monolithic Curator</span>
      </div>
      
      <div className="p-6 border-b border-zinc-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <img src="https://i.pravatar.cc/150?img=11" alt="User" className="w-10 h-10 rounded-none bg-zinc-200 object-cover grayscale" />
          <div>
            <div className="text-sm font-bold">系统管理员</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">采购主管</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-4 flex flex-col gap-6 px-3">
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">我是供货商</div>
          <div className="flex flex-col gap-1">
            {supplierItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-sm transition-colors ${
                    isActive 
                      ? 'bg-black text-white' 
                      : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="px-3 mb-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">我是分销商</div>
          <div className="flex flex-col gap-1">
            {distributorItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-sm transition-colors ${
                    isActive 
                      ? 'bg-black text-white' 
                      : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="px-3 mb-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">其他业务</div>
          <div className="flex flex-col gap-1">
            {otherItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-sm transition-colors ${
                    isActive 
                      ? 'bg-black text-white' 
                      : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

    </aside>
  );
}
