import { Search, Bell, Download, FileText, Menu } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  activeTab: string;
  onActionClick: () => void;
  toggleMobileMenu: () => void;
}

export function Header({ activeTab, onActionClick, toggleMobileMenu }: HeaderProps) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const downloadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (downloadRef.current && !downloadRef.current.contains(event.target as Node)) {
        setIsDownloadOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mockDownloads = [
    { id: 1, name: '采购单_20240815.xlsx', type: '生成采购单', time: '10分钟前' },
    { id: 2, name: '订单导出_202408.csv', type: '下载订单', time: '2小时前' },
    { id: 3, name: '商品库存_最新.xlsx', type: '下载商品', time: '昨天 15:30' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 md:left-64 h-16 bg-white/80 backdrop-blur-md border-b border-zinc-200 flex items-center justify-between px-4 md:px-8 z-30">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden text-black shrink-0 p-2 -ml-2" onClick={toggleMobileMenu}>
          <Menu size={20} />
        </button>
        <div className="relative w-full max-w-sm hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索全球 SKU 编号、订单..." 
            className="w-full bg-zinc-100 border-transparent focus:bg-white focus:border-black focus:ring-0 text-sm py-2 pl-10 pr-4 rounded-none transition-all outline-none"
          />
        </div>
        <button className="sm:hidden text-zinc-500 hover:text-black transition-colors shrink-0">
          <Search size={20} />
        </button>
      </div>
      <div className="flex items-center gap-4 md:gap-6 shrink-0">
        <button className="text-zinc-500 hover:text-black transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-black rounded-full"></span>
        </button>
        <div className="relative" ref={downloadRef}>
          <button 
            onClick={() => setIsDownloadOpen(!isDownloadOpen)}
            className="text-zinc-500 hover:text-black transition-colors"
          >
            <Download size={20} />
          </button>
          {isDownloadOpen && (
            <div className="absolute right-0 mt-4 w-80 bg-white border border-zinc-200 shadow-2xl flex flex-col">
              <div className="px-4 py-3 border-b border-zinc-100 bg-zinc-50 flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">下载任务中心</span>
                <span className="text-[10px] text-zinc-400">可多次下载</span>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {mockDownloads.map(task => (
                  <div key={task.id} className="p-4 border-b border-zinc-100 hover:bg-zinc-50 transition-colors flex items-start gap-3">
                    <FileText size={16} className="text-zinc-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-bold mb-1">{task.name}</div>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                        <span className="bg-zinc-100 px-1.5 py-0.5">{task.type}</span>
                        <span>{task.time}</span>
                      </div>
                    </div>
                    <button className="text-xs font-bold border border-zinc-200 px-3 py-1.5 hover:border-black transition-colors">
                      下载
                    </button>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t border-zinc-100 bg-zinc-50">
                <button className="text-xs font-bold text-zinc-500 hover:text-black transition-colors">查看全部任务</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
