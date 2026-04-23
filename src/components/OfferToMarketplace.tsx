import { useState } from "react";
import { Search, X } from "lucide-react";

interface OfferToMarketplaceProps {
  setActiveTab?: (tab: string) => void;
}

export function OfferToMarketplace({ setActiveTab }: OfferToMarketplaceProps) {
  const [isManualMatchOpen, setIsManualMatchOpen] = useState(false);
  const [selectedPublicSpu, setSelectedPublicSpu] = useState<string | null>(null);
  const [matchPercentage, setMatchPercentage] = useState<number | null>(null);

  const handleCloseManualMatch = () => {
    setIsManualMatchOpen(false);
    setSelectedPublicSpu(null);
    setMatchPercentage(null);
  };

  const openManualMatch = (percentage: number | null) => {
    setIsManualMatchOpen(true);
    setMatchPercentage(percentage);
    if (percentage && percentage >= 85) {
      setSelectedPublicSpu('spu1'); // Auto pre-fill if there's a high match
    } else {
      setSelectedPublicSpu(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">Supplier Dashboard</div>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">出价到集市</h1>
          <p className="text-sm text-zinc-500">将您的自营商品出价并发布到公共集市</p>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 p-4 md:p-6 mb-4 md:mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <h2 className="text-base md:text-lg font-black tracking-tight">第一步：在售商品匹配到集市商品</h2>
            <span className="text-xs text-zinc-400">更新时间：2026/4/5 19:14:09</span>
          </div>
          <button className="bg-black text-white px-6 py-2 text-sm font-bold hover:bg-zinc-800 transition-colors w-full md:w-auto">
            一键匹配
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
          <div className="border-l-4 border-black pl-4">
            <div className="text-sm font-bold text-zinc-800 mb-1">已映射公共库</div>
            <div className="text-xs text-zinc-500 mb-4">匹配度&gt;90%已自动匹配</div>
            <div className="flex items-end justify-between">
              <button onClick={() => setActiveTab && setActiveTab('marketplace_on_sale')} className="text-xs text-blue-600 hover:underline">查看列表&gt;</button>
              <span className="text-3xl font-black text-black">7423</span>
            </div>
          </div>
          <div className="border-l-4 border-zinc-300 pl-4">
            <div className="text-sm font-bold text-zinc-800 mb-1">待人工确认映射</div>
            <div className="text-xs text-zinc-500 mb-4">匹配度&lt;90% 或未找到匹配项</div>
            <div className="flex items-end justify-between">
              <span className="text-xs text-transparent">查看列表&gt;</span>
              <span className="text-3xl font-black text-zinc-500">17736</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 shadow-sm">
        <div className="p-4 border-b border-zinc-200 flex flex-col md:flex-row md:items-center justify-between bg-zinc-50 gap-4">
          <h3 className="font-black text-lg">待人工确认映射</h3>
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2 sm:gap-0">
            <div className="flex w-full">
              <select className="border border-zinc-200 border-r-0 px-4 py-2 text-sm focus:outline-none bg-white">
                <option>商品标题</option>
                <option>货号</option>
              </select>
              <input 
                type="text" 
                placeholder="请填写商品名称" 
                className="border border-zinc-200 px-4 py-2 text-sm focus:outline-none w-full sm:w-64"
              />
            </div>
            <button className="bg-black text-white px-6 py-2 text-sm font-bold hover:bg-zinc-800 transition-colors w-full sm:w-auto">
              查询
            </button>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 bg-zinc-50 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
          <div className="col-span-5">商家商品信息</div>
          <div className="col-span-5">公共库商品信息</div>
          <div className="col-span-1 text-center">匹配度</div>
          <div className="col-span-1 text-center">操作</div>
        </div>

        {/* Row 1 */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 px-4 md:px-6 py-4 border-b border-zinc-200 items-start md:items-center hover:bg-zinc-50 transition-colors">
          <div className="flex md:col-span-5 gap-4 items-start md:items-center w-full">
            <div className="w-16 h-16 bg-zinc-100 p-1 shrink-0">
              <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
            <div>
              <div className="md:hidden text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">商家商品</div>
              <div className="text-sm font-bold mb-1">CHANEL香奈儿 24年秋冬系列单排扣V长袖针织衫 女款 黑色</div>
              <div className="text-[10px] text-zinc-400">货号: P78433-K11320-NZZ03</div>
            </div>
          </div>
          <div className="flex md:col-span-5 gap-4 items-start md:items-center w-full border-t border-zinc-100 md:border-t-0 pt-4 md:pt-0">
            <div className="w-10 h-10 md:w-16 md:h-16 bg-zinc-100 p-1 flex items-center justify-center text-zinc-400 shrink-0">
              <Search size={24} className="md:w-6 md:h-6 w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold mb-1 text-zinc-400">未找到高置信匹配项</div>
              <div className="text-[10px] text-zinc-400">请手动搜索公共库</div>
            </div>
          </div>
          <div className="hidden md:block col-span-1 text-center font-bold text-zinc-400">-</div>
          <div className="md:col-span-1 text-center w-full md:w-auto flex justify-end md:block mt-2 md:mt-0">
            <button onClick={() => openManualMatch(null)} className="w-full md:w-auto bg-black text-white px-4 py-2 text-xs font-bold hover:bg-zinc-800 transition-colors md:bg-transparent md:text-black md:hover:underline md:px-0">手动匹配</button>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 px-4 md:px-6 py-4 border-b border-zinc-200 items-start md:items-center hover:bg-zinc-50 transition-colors">
          <div className="flex md:col-span-5 gap-4 items-start md:items-center w-full">
            <div className="w-16 h-16 bg-zinc-100 p-1 shrink-0">
              <img src="https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
            <div>
              <div className="md:hidden text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">商家商品</div>
              <div className="text-sm font-bold mb-1">Burberry博柏利 纯色宽松纽扣直筒休闲男款 卡其色</div>
              <div className="text-[10px] text-zinc-400">货号: 81083411</div>
            </div>
          </div>
          <div className="flex md:col-span-5 gap-4 items-start md:items-center w-full border-t border-zinc-100 md:border-t-0 pt-4 md:pt-0">
            <div className="w-10 h-10 md:w-16 md:h-16 bg-zinc-100 p-1 shrink-0">
              <img src="https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
            <div>
              <div className="md:hidden text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 text-orange-500">发现相似项</div>
              <div className="text-sm font-bold mb-1">Burberry男款腰带环休闲长裤</div>
              <div className="text-[10px] text-zinc-400">货号: 81083411</div>
            </div>
          </div>
          <div className="hidden md:block col-span-1 text-center font-bold text-orange-500">85%</div>
          <div className="md:col-span-1 text-center flex justify-end md:block mt-2 md:mt-0 w-full md:w-auto">
            <button onClick={() => openManualMatch(85)} className="w-full md:w-auto bg-black text-white px-4 py-2 text-xs font-bold hover:bg-zinc-800 transition-colors md:bg-transparent md:text-black md:hover:underline md:px-0">手动匹配</button>
          </div>
        </div>

      </div>

      {/* Manual Match Modal */}
      {isManualMatchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleCloseManualMatch}></div>
          <div className="relative bg-white w-full h-full md:h-auto md:max-w-4xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col overflow-hidden md:rounded-md">
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-zinc-100">
              <h2 className="text-base md:text-lg font-black uppercase tracking-tight">手动匹配公共库商品</h2>
              <button onClick={handleCloseManualMatch} className="text-zinc-400 hover:text-black transition-colors shrink-0"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
            {!selectedPublicSpu ? (
              <>
                <div className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Left: My Product */}
                    <div className="flex-1 md:border-r border-zinc-100 md:pr-8">
                      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">我的自营商品</div>
                      <div className="flex gap-4 items-start mb-6">
                        <div className="w-24 h-24 bg-zinc-100 p-2">
                          <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div>
                          <div className="text-sm font-bold mb-2">CHANEL香奈儿 24年秋冬系列单排扣V长袖针织衫 女款 黑色</div>
                          <div className="text-xs text-zinc-500 mb-1">品牌: CHANEL</div>
                          <div className="text-xs text-zinc-500 mb-1">分类: 服饰 / 针织衫</div>
                          <div className="text-xs text-zinc-500 font-mono">货号: P78433-K11320-NZZ03</div>
                        </div>
                      </div>
                      
                      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">包含的 SKU</div>
                      <div className="space-y-2">
                        <div className="text-xs bg-zinc-50 p-2 border border-zinc-100 flex justify-between">
                          <span>S码 / 黑色</span>
                          <span className="font-mono text-zinc-500">条码: 3145891234567</span>
                        </div>
                        <div className="text-xs bg-zinc-50 p-2 border border-zinc-100 flex justify-between">
                          <span>M码 / 黑色</span>
                          <span className="font-mono text-zinc-500">条码: 3145891234568</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Search Public Library */}
                    <div className="flex-1">
                      <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">搜索公共库 (选择 SPU)</div>
                      
                      <div className="flex gap-2 mb-6">
                        <div className="flex-1 flex items-center gap-2 border border-zinc-200 px-3 py-2">
                          <Search size={16} className="text-zinc-400" />
                          <input 
                            type="text" 
                            defaultValue="P78433" 
                            className="w-full text-sm font-bold outline-none" 
                            placeholder="输入货号或名称搜索..."
                          />
                        </div>
                        <button className="bg-black text-white px-4 py-2 text-sm font-bold hover:bg-zinc-800 transition-colors">
                          搜索
                        </button>
                      </div>

                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                        {/* Search Result 1 */}
                        <label className="flex items-start gap-4 p-3 border border-zinc-200 cursor-pointer hover:border-black transition-colors">
                          <input type="radio" name="public_spu" className="mt-1 accent-black" />
                          <div className="flex gap-3">
                            <div className="w-16 h-16 bg-zinc-100 p-1">
                              <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <div>
                              <div className="text-sm font-bold mb-1">Chanel女款V领开衫</div>
                              <div className="text-xs text-zinc-500 font-mono mb-1">货号: P78433K11320NZZ03</div>
                              <div className="text-[10px] text-zinc-400">包含 4 个 SKU</div>
                            </div>
                          </div>
                        </label>

                        {/* Search Result 2 */}
                        <label className="flex items-start gap-4 p-3 border border-zinc-200 cursor-pointer hover:border-black transition-colors">
                          <input type="radio" name="public_spu" className="mt-1 accent-black" />
                          <div className="flex gap-3">
                            <div className="w-16 h-16 bg-zinc-100 p-1">
                              <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-contain mix-blend-multiply grayscale" />
                            </div>
                            <div>
                              <div className="text-sm font-bold mb-1">Chanel女款V领开衫 (灰色款)</div>
                              <div className="text-xs text-zinc-500 font-mono mb-1">货号: P78433K11320NZZ04</div>
                              <div className="text-[10px] text-zinc-400">包含 4 个 SKU</div>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-6 border-t border-zinc-100 bg-zinc-50 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <button className="w-full sm:w-auto px-6 py-2 text-sm font-bold border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors">申请新增至公共库</button>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button onClick={handleCloseManualMatch} className="flex-1 sm:flex-none px-6 py-2 text-sm font-bold text-zinc-600 hover:text-black transition-colors border border-zinc-200 sm:border-none">取消</button>
                    <button onClick={() => setSelectedPublicSpu('spu1')} className="flex-1 sm:flex-none bg-black text-white px-8 py-2 text-sm font-bold hover:bg-zinc-800 transition-colors text-center">下一步</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 md:p-6">
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">SKU 映射表</div>
                  
                  <div className="flex flex-col md:flex-row gap-4 md:items-center mb-6 p-4 bg-zinc-50 border border-zinc-100">
                    <div className="flex-1 flex gap-4 items-center border-b md:border-b-0 md:border-r border-zinc-200 pb-4 md:pb-0 md:pr-4">
                      <div className="w-12 h-12 bg-zinc-100 p-1 flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">我的自营商品</div>
                        <div className="text-sm font-bold leading-tight">CHANEL香奈儿 24年秋冬系列单排扣V长袖针织衫 女款 黑色</div>
                      </div>
                    </div>
                    <div className="flex-1 flex gap-4 items-center pt-2 md:pt-0 md:pl-4">
                      <div className="w-12 h-12 bg-zinc-100 p-1 flex-shrink-0">
                        <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">公共库商品</div>
                        <div className="text-sm font-bold leading-tight">Chanel女款V领开衫</div>
                      </div>
                    </div>
                  </div>

                  <div className="border border-zinc-200">
                    <div className="grid grid-cols-2 bg-zinc-50 border-b border-zinc-200 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      <div className="p-3 border-r border-zinc-200">我的 SKU</div>
                      <div className="p-3">映射到公共库 SKU</div>
                    </div>
                    <div className="grid grid-cols-2 border-b border-zinc-100 items-center">
                      <div className="p-3 border-r border-zinc-200 text-sm font-bold">S码 / 黑色</div>
                      <div className="p-3">
                        <select className="w-full border border-zinc-200 px-3 py-2 text-sm focus:border-black focus:ring-0 outline-none bg-white cursor-pointer">
                          <option value="">请选择匹配的 SKU...</option>
                          <option value="s" selected>S码 / 黑色</option>
                          <option value="m">M码 / 黑色</option>
                          <option value="l">L码 / 黑色</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 items-center">
                      <div className="p-3 border-r border-zinc-200 text-sm font-bold">M码 / 黑色</div>
                      <div className="p-3">
                        <select className="w-full border border-zinc-200 px-3 py-2 text-sm focus:border-black focus:ring-0 outline-none bg-white cursor-pointer">
                          <option value="">请选择匹配的 SKU...</option>
                          <option value="s">S码 / 黑色</option>
                          <option value="m" selected>M码 / 黑色</option>
                          <option value="l">L码 / 黑色</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-6 border-t border-zinc-100 bg-zinc-50 flex flex-col sm:flex-row justify-end gap-3">
                  <button onClick={() => setSelectedPublicSpu(null)} className="w-full sm:w-auto px-6 py-2 text-sm font-bold text-zinc-600 hover:text-black transition-colors border border-zinc-200 sm:border-none bg-white sm:bg-transparent">上一步</button>
                  <button onClick={handleCloseManualMatch} className="w-full sm:w-auto bg-black text-white px-8 py-2 text-sm font-bold hover:bg-zinc-800 transition-colors text-center">确认映射并出价</button>
                </div>
              </>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
