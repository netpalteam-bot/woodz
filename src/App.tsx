import React, { useState } from 'react';
import { X } from 'lucide-react';
import {
  INITIAL_MENU_ITEMS,
  ALSACE_BRANCHES,
  BRAND_POSTERS,
  MenuItem,
} from './data/woodzData';
import {
  CartItem,
  addOrIncrementCartItem,
  updateCartItemQuantity,
  calculateCartTotals,
  matchDriveFilesToMenu,
} from './utils/menuLogic';
import { DriveFileItem } from './utils/auth';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { BranchesAndCraftSection } from './components/BranchesAndCraftSection';
import { DriveSyncSection } from './components/DriveSyncSection';
import { OrderDrawer } from './components/OrderDrawer';

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('selestat');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [lightboxPoster, setLightboxPoster] = useState<
    (typeof BRAND_POSTERS)[number] | null
  >(null);

  const selectedBranch =
    ALSACE_BRANCHES.find((b) => b.id === selectedBranchId) || ALSACE_BRANCHES[0];

  const handleAddToCart = (
    item: MenuItem,
    isMenuFormula: boolean,
    selectedSauce: string
  ) => {
    const unitPrice =
      isMenuFormula && item.priceMenu ? item.priceMenu : item.priceSeul;
    setCart((prev) =>
      addOrIncrementCartItem(prev, {
        item,
        isMenuFormula,
        unitPrice,
        quantity: 1,
        selectedSauce,
        selectedBranchId,
      })
    );
  };

  const handleUpdateQuantity = (cartKey: string, delta: number) => {
    setCart((prev) => updateCartItemQuantity(prev, cartKey, delta));
  };

  const handleDriveFilesLoaded = (files: DriveFileItem[]) => {
    setMenuItems((prev) => matchDriveFilesToMenu(prev, files));
  };

  const cartTotals = calculateCartTotals(cart);

  return (
    <div className="min-h-screen flex flex-col bg-[#0D0C0B] text-[#F5F2EB]">
      {/* Strict 3-Zone Top Navigation Bar */}
      <Header
        cartCount={cartTotals.totalItems}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section with Branch Switcher & 4-Column Proof Strip */}
        <HeroSection
          selectedBranch={selectedBranch}
          branches={ALSACE_BRANCHES}
          onSelectBranch={setSelectedBranchId}
          onExploreMenu={() =>
            document
              .getElementById('la-carte')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
        />

        {/* Complete Interactive European Bistro Menu */}
        <MenuSection
          items={menuItems}
          selectedBranchName={selectedBranch.name}
          onAddToCart={handleAddToCart}
        />

        {/* Craftsmanship Anatomy, 3 Alsace Branches & Official Campaign Posters */}
        <BranchesAndCraftSection
          branches={ALSACE_BRANCHES}
          selectedBranchId={selectedBranchId}
          onSelectBranch={setSelectedBranchId}
          onSelectPosterLightbox={(poster) => setLightboxPoster(poster)}
        />

        {/* Live Google Drive WOODZ-Gemini Folder Integration */}
        <DriveSyncSection onDriveFilesLoaded={handleDriveFilesLoaded} />
      </main>

      {/* Quiet European Bistro Footer */}
      <footer className="bg-[#090807] text-[#A8A29E] border-t border-[#292524] py-12">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="font-display text-lg font-bold text-[#F5F2EB]">
              WOOD&apos;Z <span className="text-[#D92323] italic">Z</span> KEBAB HOUSE
            </div>
            <p className="text-xs text-[#A8A29E] mt-1">
              Artisan Kebabier en Alsace · Viande 100% Bœuf Entrecôte &amp; Pain Boulanger du Jour.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a href="#la-carte" className="hover:text-[#F5F2EB] transition-colors">
              La Carte
            </a>
            <a href="#savoir-faire" className="hover:text-[#F5F2EB] transition-colors">
              Savoir-Faire
            </a>
            <a href="#restaurants" className="hover:text-[#F5F2EB] transition-colors">
              Sélestat (67600)
            </a>
            <a href="#restaurants" className="hover:text-[#F5F2EB] transition-colors">
              Illkirch (67400)
            </a>
            <a href="#restaurants" className="hover:text-[#F5F2EB] transition-colors">
              Houssen / Colmar (68125)
            </a>
          </div>

          <div className="text-xs font-mono-tabular text-[#78716C]">
            © {new Date().getFullYear()} Wood&apos;Z Kebab House · woodz-kebab-house.fr
          </div>
        </div>
      </footer>

      {/* Slide-Over Click & Collect Order Drawer */}
      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        branches={ALSACE_BRANCHES}
        selectedBranchId={selectedBranchId}
        onSelectBranch={setSelectedBranchId}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={() => setCart([])}
      />

      {/* Lightbox Modal for Official Campaign Posters */}
      {lightboxPoster && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxPoster.title}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLightboxPoster(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-[#161412] border border-[#C5A059] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#292524]">
              <div>
                <div className="text-[11px] font-mono-tabular uppercase tracking-widest text-[#C5A059]">
                  {lightboxPoster.category}
                </div>
                <div className="font-display text-lg font-bold text-[#F5F2EB]">
                  {lightboxPoster.title}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLightboxPoster(null)}
                aria-label="Fermer l'aperçu"
                className="p-2 text-[#A8A29E] hover:text-[#F5F2EB] border border-[#292524] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-[#0D0C0B]">
              <img
                src={lightboxPoster.src}
                alt={lightboxPoster.title}
                referrerPolicy="no-referrer"
                className="max-h-[72vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
