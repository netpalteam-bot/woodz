import React, { useState } from 'react';
import { Search, Plus, Check, SlidersHorizontal } from 'lucide-react';
import {
  MenuItem,
  MenuCategory,
  MENU_CATEGORIES,
  SAUCES_LIST,
} from '../data/woodzData';
import { filterMenuItems, formatEuroPrice } from '../utils/menuLogic';
import { DishIllustration } from './DishIllustration';

interface MenuSectionProps {
  items: MenuItem[];
  selectedBranchName: string;
  onAddToCart: (
    item: MenuItem,
    isMenuFormula: boolean,
    selectedSauce: string
  ) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  selectedBranchName,
  onAddToCart,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'bistro-grid' | 'carte-table'>('bistro-grid');

  // Track per-card formula mode (Seul vs Menu) and sauce selection
  const [formulaModes, setFormulaModes] = useState<Record<string, boolean>>({});
  const [selectedSauces, setSelectedSauces] = useState<Record<string, string>>({});
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredItems = filterMenuItems(items, activeCategory, searchQuery);

  const handleToggleFormula = (itemId: string, isMenu: boolean) => {
    setFormulaModes((prev) => ({ ...prev, [itemId]: isMenu }));
  };

  const handleSauceChange = (itemId: string, sauce: string) => {
    setSelectedSauces((prev) => ({ ...prev, [itemId]: sauce }));
  };

  const handleTriggerAdd = (item: MenuItem) => {
    const isMenu = Boolean(item.priceMenu && formulaModes[item.id]);
    const sauce = selectedSauces[item.id] || SAUCES_LIST[0];
    onAddToCart(item, isMenu, sauce);
    setRecentlyAddedId(item.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === item.id ? null : prev));
    }, 1200);
  };

  return (
    <section
      id="la-carte"
      className="py-16 lg:py-24 bg-[#F5F2EB] text-[#141210] border-b border-[#E2DCD0]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Editorial Section Header inspired by WOODZ_08 & WOODZ_03 */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[#D6CFC2]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9A3412] font-semibold mb-3">
              <span>La Formule Bistro Authentique</span>
              <span aria-hidden="true">·</span>
              <span>{selectedBranchName}</span>
            </div>
            <h2
              className="font-display font-bold text-[#141210] tracking-tight text-balance"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            >
              La Carte &amp; Nos Spécialités Artisanes
              <span className="text-[#D92323]">.</span>
            </h2>
            <p className="font-display italic text-base sm:text-lg text-[#78716C] mt-2">
              « Simple, généreux &amp; préparé à la minute »
            </p>
          </div>

          {/* Search & European Bistro Table Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <label htmlFor="menu-search" className="sr-only">
                Rechercher un plat ou ingrédient
              </label>
              <Search className="w-4 h-4 text-[#78716C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="menu-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher (ex: Alaturka, feta, box...)"
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white border border-[#D6CFC2] text-sm text-[#141210] placeholder-[#78716C] focus:outline-none focus:border-[#141210]"
              />
            </div>

            <div
              role="group"
              aria-label="Mode d'affichage de la carte"
              className="flex items-center p-1 bg-[#E7E0D3] border border-[#D6CFC2]"
            >
              <button
                type="button"
                onClick={() => setViewMode('bistro-grid')}
                className={`px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'bistro-grid'
                    ? 'bg-[#141210] text-[#F5F2EB]'
                    : 'text-[#57534E] hover:text-[#141210]'
                }`}
              >
                Galerie Illustrée
              </button>
              <button
                type="button"
                onClick={() => setViewMode('carte-table')}
                className={`px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'carte-table'
                    ? 'bg-[#141210] text-[#F5F2EB]'
                    : 'text-[#57534E] hover:text-[#141210]'
                }`}
              >
                Carte Brasserie
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Category Filter Bar (Functional Buttons) */}
        <div
          role="tablist"
          aria-label="Catégories du menu"
          className="flex items-center gap-2 overflow-x-auto py-6 border-b border-[#E2DCD0]"
        >
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                  isActive
                    ? 'bg-[#141210] text-[#F5F2EB] border-[#141210]'
                    : 'bg-white text-[#57534E] border-[#D6CFC2] hover:border-[#141210] hover:text-[#141210]'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            );
          })}
        </div>

        {/* Empty Filter State */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-white border border-[#D6CFC2] my-8 p-8">
            <p className="font-display text-xl text-[#141210] mb-2">
              Aucun plat ne correspond à votre recherche « {searchQuery} ».
            </p>
            <p className="text-sm text-[#78716C] mb-6">
              Essayez un autre mot-clé comme « entrecôte », « feta », « assiette » ou « tiramisu ».
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-[#141210] text-[#F5F2EB] text-xs font-semibold uppercase tracking-wider cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : viewMode === 'bistro-grid' ? (
          /* 3-Column European Bistro Grid with Uniform Aspect Ratio & Tabular Pricing */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
            {filteredItems.map((item) => {
              const isMenuSelected = Boolean(
                item.priceMenu && formulaModes[item.id]
              );
              const activePrice = isMenuSelected && item.priceMenu
                ? item.priceMenu
                : item.priceSeul;
              const isAdded = recentlyAddedId === item.id;

              return (
                <article
                  key={item.id}
                  className="group bg-white border border-[#D6CFC2] flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div>
                    {/* 4:3 High-Fidelity Dish Imagery */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#141210]">
                      <DishIllustration
                        src={item.image}
                        alt={item.name}
                        dishId={item.id}
                        objectPosition={item.imageObjectPosition}
                        className="w-full h-full"
                      />
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      {/* Clean unboxed metadata kicker */}
                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono-tabular uppercase tracking-widest text-[#78716C] mb-2">
                        <span className="whitespace-nowrap truncate">{item.code}</span>
                        {item.tag && (
                          <span className="text-[#D92323] font-semibold whitespace-nowrap shrink-0">
                            {item.tag}
                          </span>
                        )}
                      </div>

                      {/* Title & Price Row */}
                      <div className="flex items-baseline justify-between gap-4 mb-1.5">
                        <h3 className="font-display text-xl font-bold text-[#141210]">
                          {item.name}
                        </h3>
                        <span className="font-mono-tabular text-lg font-bold text-[#141210] whitespace-nowrap shrink-0">
                          {formatEuroPrice(activePrice)}
                        </span>
                      </div>

                      <p className="text-xs font-medium text-[#9A3412] mb-3">
                        {item.subtitle}
                      </p>

                      <p className="text-sm text-[#57534E] leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Clean unboxed ingredient list */}
                      <div className="pt-3 border-t border-[#E7E0D3] text-xs text-[#57534E]">
                        {item.ingredients.join(' · ')}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Formula Selector (Seul vs Menu) + Sauce + Add CTA */}
                  <div className="px-6 pb-6 pt-3 bg-[#FAF8F5] border-t border-[#E7E0D3] flex flex-col gap-3">
                    {item.priceMenu && (
                      <div
                        role="group"
                        aria-label={`Choisir la formule pour ${item.name}`}
                        className="grid grid-cols-2 gap-1.5 p-1 bg-[#E7E0D3]"
                      >
                        <button
                          type="button"
                          onClick={() => handleToggleFormula(item.id, false)}
                          className={`py-1.5 px-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            !isMenuSelected
                              ? 'bg-[#141210] text-[#F5F2EB]'
                              : 'text-[#57534E] hover:text-[#141210]'
                          }`}
                        >
                          Seul · {formatEuroPrice(item.priceSeul)}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleFormula(item.id, true)}
                          className={`py-1.5 px-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isMenuSelected
                              ? 'bg-[#D92323] text-white'
                              : 'text-[#57534E] hover:text-[#141210]'
                          }`}
                        >
                          Menu · {formatEuroPrice(item.priceMenu)}
                        </button>
                      </div>
                    )}

                    {item.category !== 'desserts' && (
                      <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-[#78716C] shrink-0" />
                        <label
                          htmlFor={`sauce-${item.id}`}
                          className="text-[11px] uppercase tracking-wider text-[#78716C] font-semibold shrink-0"
                        >
                          Sauce :
                        </label>
                        <select
                          id={`sauce-${item.id}`}
                          value={selectedSauces[item.id] || SAUCES_LIST[0]}
                          onChange={(e) =>
                            handleSauceChange(item.id, e.target.value)
                          }
                          className="w-full text-xs bg-white border border-[#D6CFC2] px-2.5 py-1.5 text-[#141210] focus:outline-none focus:border-[#141210]"
                        >
                          {SAUCES_LIST.map((sauce) => (
                            <option key={sauce} value={sauce}>
                              {sauce}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => handleTriggerAdd(item)}
                      className={`w-full py-3 px-4 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isAdded
                          ? 'bg-[#15803D] text-white'
                          : 'bg-[#141210] hover:bg-[#D92323] text-[#F5F2EB]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Ajouté à la commande</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>
                            Ajouter ({formatEuroPrice(activePrice)})
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Traditional European Brasserie Tabular Price Sheet View */
          <div className="mt-10 bg-white border border-[#D6CFC2] p-6 sm:p-10">
            <div className="border-b-2 border-[#141210] pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-2xl font-bold text-[#141210]">
                  Récapitulatif Officiel des Tarifs — Wood&apos;Z Kebab House
                </h3>
                <p className="text-xs text-[#78716C] mt-1">
                  Tous nos sandwichs existent en version Seul ou en Formule Menu (+ Frites au paprika &amp; Boisson 33cl).
                </p>
              </div>
              <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#9A3412] font-semibold">
                Prix TTC · Sur Place &amp; À Emporter
              </div>
            </div>

            <div className="divide-y divide-[#E7E0D3]">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#78716C]">
                      <span>{item.code}</span>
                      {item.tag && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#D92323] font-semibold">
                            {item.tag}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="font-display text-lg font-bold text-[#141210]">
                      {item.name}
                    </div>
                    <div className="text-xs text-[#57534E] mt-0.5">
                      {item.description}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right font-mono-tabular">
                      <div className="text-sm font-bold text-[#141210]">
                        Seul : {formatEuroPrice(item.priceSeul)}
                      </div>
                      {item.priceMenu && (
                        <div className="text-xs text-[#D92323] font-semibold">
                          Menu : {formatEuroPrice(item.priceMenu)}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleTriggerAdd(item)}
                      className="px-4 py-2 bg-[#141210] hover:bg-[#D92323] text-[#F5F2EB] text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
