import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { BranchInfo } from '../data/woodzData';

interface HeroSectionProps {
  selectedBranch: BranchInfo;
  branches: BranchInfo[];
  onSelectBranch: (branchId: string) => void;
  onExploreMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedBranch,
  branches,
  onSelectBranch,
  onExploreMenu,
}) => {
  return (
    <section
      id="accueil"
      className="relative border-b border-[#292524] bg-[#0D0C0B]"
    >
      {/* Main 2-Column Hero Split */}
      <div className="max-w-[1280px] mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Bistro Typography & Branch Quick Selector */}
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              {/* Quiet unboxed text metadata kicker */}
              <div className="flex flex-wrap items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#C5A059] font-medium mb-5">
                <span>Artisan Kebabier en Alsace</span>
                <span aria-hidden="true">·</span>
                <span>100% Bœuf Entrecôte</span>
                <span aria-hidden="true">·</span>
                <span>Pain Boulanger du Jour</span>
              </div>

              <h1
                className="font-display font-bold text-[#F5F2EB] tracking-tight text-balance leading-[1.08] mb-6"
                style={{ fontSize: 'clamp(2.4rem, 4.2vw, 3.85rem)' }}
              >
                L&apos;Excellence du Döner Artisanal{' '}
                <span className="italic font-normal text-[#C5A059]">
                  100% Pur Bœuf Entrecôte
                </span>
                <span className="text-[#D92323]">.</span>
              </h1>

              <p className="text-[#A8A29E] text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
                Chez <strong className="text-[#F5F2EB] font-semibold">Wood&apos;Z Kebab House</strong>, chaque broche est montée à la main à partir de pièces d&apos;entrecôte 100% bœuf rigoureusement sélectionnées. Servie dans notre pain rond pétri et cuit chaque matin, accompagnée de légumes grillés au four, de feta AOP et de frites maison au paprika.
              </p>

              {/* Branch Selector Integrated Cleanly for Multi-Branch Clarity */}
              <div className="mb-8 p-4 bg-[#161412] border border-[#292524]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">
                    Choisissez votre escale Wood&apos;Z en Alsace
                  </span>
                  <span className="text-xs text-[#A8A29E] font-mono-tabular">
                    Tél : {selectedBranch.phone}
                  </span>
                </div>

                <div
                  role="group"
                  aria-label="Sélectionner un restaurant Wood'Z"
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2"
                >
                  {branches.map((branch) => {
                    const isActive = branch.id === selectedBranch.id;
                    return (
                      <button
                        key={branch.id}
                        type="button"
                        onClick={() => onSelectBranch(branch.id)}
                        className={`px-3.5 py-2.5 text-left transition-colors cursor-pointer border ${
                          isActive
                            ? 'bg-[#221F1D] border-[#C5A059] text-[#F5F2EB]'
                            : 'bg-[#0D0C0B] border-[#292524] text-[#A8A29E] hover:text-[#F5F2EB] hover:border-[#44403C]'
                        }`}
                      >
                        <div className="text-xs font-bold tracking-wide whitespace-nowrap truncate">
                          {branch.city}
                        </div>
                        <div className="text-[11px] text-[#A8A29E] truncate mt-0.5 font-mono-tabular">
                          {branch.postalCode} · {branch.isOpenSunday ? '7j/7' : 'Lun–Sam'}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 pt-3 border-t border-[#292524] flex flex-wrap items-center justify-between gap-2 text-xs text-[#A8A29E]">
                  <span className="flex items-center gap-1.5 text-[#F5F2EB]">
                    <MapPin className="w-3.5 h-3.5 text-[#D92323] shrink-0" />
                    {selectedBranch.address}
                  </span>
                  <span>{selectedBranch.hours.weekdays}</span>
                </div>
              </div>
            </div>

            {/* Single Dominant Primary CTA + Quiet Secondary Link */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex items-center gap-3 px-7 py-4 bg-[#D92323] hover:bg-[#B91C1C] text-[#F5F2EB] text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Découvrir la Carte & Commander</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#restaurants"
                className="px-4 py-3 text-sm font-medium text-[#F5F2EB] hover:text-[#C5A059] underline underline-offset-8 decoration-[#C5A059]/60 transition-colors whitespace-nowrap shrink-0"
              >
                Voir nos 3 adresses en Alsace
              </a>
            </div>
          </div>

          {/* Right Column: Hero Showcase Card matching the Wood'Z Poster Aesthetic */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative h-full min-h-[460px] bg-[#161412] border border-[#C5A059]/40 p-3 flex flex-col justify-between overflow-hidden">
              <div className="relative flex-1 overflow-hidden bg-[#0D0C0B]">
                <img
                  src="/assets/aistudio/WOODZ_02_Sandwich_Alaturka_178c2dae.jpg"
                  alt="Sandwich Alaturka Double Viande XXL Wood'Z Kebab House"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="pt-3 px-1 flex items-center justify-between text-xs font-mono-tabular text-[#C5A059]">
                <span>ÉDITION GOURMANDE · DOUBLE VIANDE XXL</span>
                <span className="text-[#F5F2EB] font-semibold">
                  12,90 € Seul · 17,50 € Menu
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width 4-Column Proof & Artisanal Standards Strip below Hero */}
      <div className="border-t border-[#292524] bg-[#12100E]">
        <div className="max-w-[1280px] mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border-r-0 lg:border-r border-[#292524] pr-4">
            <div className="font-mono-tabular text-xs uppercase tracking-widest text-[#C5A059]">
              01. Viande d&apos;Exception
            </div>
            <div className="font-display text-lg font-bold text-[#F5F2EB] mt-1">
              100% Pur Bœuf Entrecôte
            </div>
            <p className="text-xs text-[#A8A29E] mt-1">
              Broches artisanales préparées et tranchées à la main à la commande.
            </p>
          </div>

          <div className="border-r-0 lg:border-r border-[#292524] pr-4">
            <div className="font-mono-tabular text-xs uppercase tracking-widest text-[#C5A059]">
              02. Boulangerie Artisanale
            </div>
            <div className="font-display text-lg font-bold text-[#F5F2EB] mt-1">
              Pain Rond Cuit du Matin
            </div>
            <p className="text-xs text-[#A8A29E] mt-1">
              Moelleux à cœur, croustillant à l&apos;extérieur, parsemé de sésame et nigelle.
            </p>
          </div>

          <div className="border-r-0 lg:border-r border-[#292524] pr-4">
            <div className="font-mono-tabular text-xs uppercase tracking-widest text-[#C5A059]">
              03. Garnitures & Frites
            </div>
            <div className="font-display text-lg font-bold text-[#F5F2EB] mt-1">
              Frites Paprika & Légumes Grillés
            </div>
            <p className="text-xs text-[#A8A29E] mt-1">
              Poivrons, courgettes et oignons rôtis au four, feta véritable et crudités du matin.
            </p>
          </div>

          <div>
            <div className="font-mono-tabular text-xs uppercase tracking-widest text-[#C5A059]">
              04. Ancrage Alsacien
            </div>
            <div className="font-display text-lg font-bold text-[#F5F2EB] mt-1">
              3 Maisons en Alsace
            </div>
            <p className="text-xs text-[#A8A29E] mt-1">
              Sélestat (67600) · Illkirch-Graffenstaden (67400) · Colmar / Houssen (68125).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
