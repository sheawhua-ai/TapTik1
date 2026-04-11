import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ProductManagement } from './components/ProductManagement';
import { OrderManagement } from './components/OrderManagement';
import { FinanceAudit } from './components/FinanceAudit';
import { OfferToMarketplace } from './components/OfferToMarketplace';
import { MarketplaceOnSale } from './components/MarketplaceOnSale';
import { MarketplaceSelection } from './components/MarketplaceSelection';
import { MarkupStrategy } from './components/MarkupStrategy';
import { MySelections } from './components/MySelections';
import { WarehouseManagement } from './components/WarehouseManagement';
import { DistributorOrderManagement } from './components/DistributorOrderManagement';
import { ManifestCampaignManagement } from './components/ManifestCampaignManagement';
import { ManifestOrderManagement } from './components/ManifestOrderManagement';

export default function App() {
  const [activeTab, setActiveTab] = useState('self_product');

  const handleActionClick = () => {
    // Action click handler
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-black selection:text-white flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Header activeTab={activeTab} onActionClick={handleActionClick} />
        
        <main className="ml-64 mt-16 p-8 flex-1 bg-zinc-50/50">
          {/* 自营业务管理 */}
          {activeTab === 'self_product' && <ProductManagement />}
          {activeTab === 'offer_to_marketplace' && <OfferToMarketplace setActiveTab={setActiveTab} />}
          {activeTab === 'marketplace_on_sale' && <MarketplaceOnSale />}
          {activeTab === 'self_order' && <OrderManagement />}
          
          {/* 分销业务管理 */}
          {activeTab === 'dist_market' && <MarketplaceSelection />}
          {activeTab === 'markup_strategy' && <MarkupStrategy />}
          {activeTab === 'dist_mine' && <MySelections />}
          {activeTab === 'dist_order' && <DistributorOrderManagement />}
          
          {/* 货单业务管理 */}
          {activeTab === 'manifest_campaign' && <ManifestCampaignManagement />}
          {activeTab === 'manifest_order' && <ManifestOrderManagement />}
          
          {/* 基础设施 */}
          {activeTab === 'warehouse' && <WarehouseManagement />}
          {activeTab === 'finance' && <FinanceAudit />}
        </main>
      </div>
    </div>
  );
}

