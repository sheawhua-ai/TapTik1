import { X, Search, CheckCircle2, ChevronRight, Upload } from 'lucide-react';
import { useState } from 'react';

// Mock data based on selected IDs
const MOCK_PRODUCT_DATA: Record<string, any> = {
  'rolex': {
    brand: 'Rolex',
    name: 'Submariner Date',
    spuCode: 'RX-126610LN',
    specs: '40mm, 41mm',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=200&q=80',
    category: '腕表'
  },
  'burberry': {
    brand: 'Burberry',
    name: '经典格纹纯棉衬衫',
    spuCode: 'BB-SHIRT-CHK',
    specs: 'S码, M码, L码',
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=200&q=80',
    category: '服饰'
  },
  'gucci': {
    brand: 'Gucci',
    name: 'Ophidia GG 小号托特包',
    spuCode: 'GC-547551',
    specs: '小号',
    image: '', // Needs image
    category: '箱包'
  }
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedIds: string[];
  onSuccess: () => void;
}

export function BatchApplyCommonProductModal({ isOpen, onClose, selectedIds, onSuccess }: Props) {
  const [step, setStep] = useState<1 | 2>(1); // 1: edit/review, 2: success

  if (!isOpen) return null;

  const productsToApply = selectedIds.map(id => MOCK_PRODUCT_DATA[id] || {
    brand: '未知品牌',
    name: '未知商品',
    spuCode: id,
    specs: '',
    image: '',
    category: '未分类'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-zinc-200">
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight">批量申请新建公共库商品</h2>
            <p className="text-xs text-zinc-500 mt-1">自动带入原商品的基础信息（价格与库存除外），请确认后提交</p>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-black transition-colors rounded-full p-2 hover:bg-zinc-100">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-zinc-50 p-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="bg-blue-50 text-blue-700 px-4 py-3 text-sm border border-blue-100 mb-6 flex items-start gap-2">
                <span className="font-bold">提示：</span> 
                <span>系统已自动为您带入品牌、类目、图片及规格信息。提交后将进入公共商品库审核队列。</span>
              </div>

              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-white border border-zinc-200 text-[10px] font-bold text-zinc-500 uppercase tracking-widest shadow-sm">
                <div className="col-span-1">主图</div>
                <div className="col-span-3">品牌 / SPU 名称</div>
                <div className="col-span-2">分类</div>
                <div className="col-span-2">原 SPU 编码</div>
                <div className="col-span-4">包含规格 (SKU 属性)</div>
              </div>

              {productsToApply.map((product, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-4 px-6 py-5 bg-white border border-zinc-200 items-center shadow-sm">
                  <div className="col-span-1">
                    <div className="w-12 h-12 bg-zinc-100 flex items-center justify-center border border-zinc-200">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-zinc-400 cursor-pointer hover:text-black hover:bg-zinc-50 w-full h-full">
                          <Upload size={14} className="mb-0.5" />
                          <span className="text-[8px]">上传</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">{product.brand}</div>
                    <input 
                      type="text" 
                      defaultValue={product.name} 
                      className="text-sm font-bold w-full border-b border-transparent hover:border-zinc-300 focus:border-black focus:outline-none bg-transparent transition-colors pb-0.5"
                    />
                  </div>
                  <div className="col-span-2 flex items-center">
                    <select 
                      defaultValue={product.category}
                      className="text-sm border border-zinc-200 px-2 py-1 bg-white outline-none focus:border-black w-full"
                    >
                      <option value="腕表">腕表</option>
                      <option value="箱包">箱包</option>
                      <option value="服饰">服饰</option>
                      <option value="珠宝">珠宝</option>
                      <option value="美妆">美妆</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <input 
                      type="text" 
                      defaultValue={product.spuCode} 
                      className="text-sm font-mono w-full border-b border-transparent hover:border-zinc-300 focus:border-black focus:outline-none bg-transparent pb-0.5"
                    />
                  </div>
                  <div className="col-span-4">
                    <div className="flex flex-wrap gap-1.5">
                      {product.specs.split(',').map((spec: string, i: number) => (
                        <span key={i} className="bg-zinc-100 text-zinc-600 text-[10px] px-2 py-1 rounded-sm border border-zinc-200">
                          {spec.trim() || '通用规格'}
                        </span>
                      ))}
                      <button className="text-[10px] text-blue-600 hover:text-blue-800 px-1 font-bold">+ 补充规格</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-black uppercase mb-2">申请已提交</h3>
              <p className="text-zinc-500 mb-8 text-center max-w-md">
                成功为 {productsToApply.length} 个商品提交了公共库创建申请。平台运营审核通过后，这些商品将正式上架至公共商品库。
              </p>
              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-zinc-200 font-bold hover:bg-zinc-50 transition-colors"
                >
                  关闭
                </button>
                <button
                  onClick={onSuccess}
                  className="px-6 py-2 bg-black text-white font-bold hover:bg-zinc-800 transition-colors"
                >
                  返回商品管理
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-zinc-200 bg-white">
            <div className="text-sm">
              已选中 <span className="font-bold">{productsToApply.length}</span> 个商品 
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 border border-zinc-200 font-bold hover:bg-zinc-50 transition-colors text-sm"
              >
                取消
              </button>
              <button
                onClick={() => setStep(2)}
                className="px-8 py-2.5 bg-black text-white font-bold hover:bg-zinc-800 transition-colors text-sm flex items-center gap-2"
              >
                提交申请
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
