import { Search, Bell, Settings } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onActionClick: () => void;
}

export function Header({ activeTab, onActionClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-zinc-200 flex items-center justify-between px-8 z-30">
      <div className="flex items-center w-96">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <input 
            type="text" 
            placeholder="搜索全球 SKU 编号、订单..." 
            className="w-full bg-zinc-100 border-transparent focus:bg-white focus:border-black focus:ring-0 text-sm py-2 pl-10 pr-4 rounded-none transition-all outline-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-zinc-500 hover:text-black transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-black rounded-full"></span>
        </button>
        <button className="text-zinc-500 hover:text-black transition-colors">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
}
