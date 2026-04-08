import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ProductManagement } from './components/ProductManagement';
import { CampaignManagement } from './components/CampaignManagement';
import { OrderManagement } from './components/OrderManagement';
import { FinanceAudit } from './components/FinanceAudit';
import { CampaignModal } from './components/CampaignModal';
import { OfferToMarketplace } from './components/OfferToMarketplace';
import { MarketplaceOnSale } from './components/MarketplaceOnSale';
import { MarketplaceSelection } from './components/MarketplaceSelection';
import { MarkupStrategy } from './components/MarkupStrategy';
import { MySelections } from './components/MySelections';
import { WarehouseManagement } from './components/WarehouseManagement';

export default function App() {
  const [activeTab, setActiveTab] = useState('product');
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);

  const handleActionClick = () => {
    if (activeTab === 'campaign') {
      setIsCampaignModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans antialiased selection:bg-black selection:text-white flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Header activeTab={activeTab} onActionClick={handleActionClick} />
        
        <main className="ml-64 mt-16 p-8 flex-1 bg-zinc-50/50">
          {activeTab === 'product' && <ProductManagement />}
          {activeTab === 'offer_to_marketplace' && <OfferToMarketplace />}
          {activeTab === 'marketplace_on_sale' && <MarketplaceOnSale />}
          {activeTab === 'marketplace_selection' && <MarketplaceSelection />}
          {activeTab === 'markup_strategy' && <MarkupStrategy />}
          {activeTab === 'my_selections' && <MySelections />}
          {activeTab === 'campaign' && <CampaignManagement />}
          {activeTab === 'order' && <OrderManagement />}
          {activeTab === 'finance' && <FinanceAudit />}
          {activeTab === 'warehouse' && <WarehouseManagement />}
        </main>
      </div>

      <CampaignModal 
        isOpen={isCampaignModalOpen} 
        onClose={() => setIsCampaignModalOpen(false)} 
      />
    </div>
  );
}

