import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { BranchInfo, BRAND_POSTERS } from '../data/woodzData';

interface BranchesAndCraftSectionProps {
  branches: BranchInfo[];
  selectedBranchId: string;
  onSelectBranch: (branchId: string) => void;
  onSelectPosterLightbox: (poster: (typeof BRAND_POSTERS)[number]) => void;
}

export const BranchesAndCraftSection: React.FC<BranchesAndCraftSectionProps> = ({
  branches,
  selectedBranchId,
  onSelectBranch,
  onSelectPosterLightbox,
}) => {
  return (
    <>
      {/* Section 1: L'Artisanat Wood'Z (Asymmetric Bento Anatomy inspired by WOODZ_12 & WOODZ_02) */}
      <section
        id="savoir-faire"
        className="py-16 lg:py-24 bg-[#0D0C0B] text-[#F5F2EB] border-b border-[#292524]"
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-semibold mb-3">
              <span>Charte de Qualité Artisanale</span>
              <span aria-hidden="true">·</span>
              <span>Alsace</span>
            </div>
            <h2
              className="font-display font-bold text-[#F5F2EB] tracking-tight text-balance"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
            >
              Anatomie d&apos;une Assiette &amp; d&apos;un Pain d&apos;Exception
              <span className="text-[#D92323]">.</span>
            </h2>
            <p className="text-[#A8A29E] text-base leading-relaxed mt-3">
              Chaque création Wood&apos;Z repose sur quatre piliers gastronomiques stricts : une viande d&apos;entrecôte 100% bœuf sans compromis, un pain pétri chaque matin, des légumes méditerranéens rôtis et nos célèbres frites au paprika.
            </p>
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Large Left Feature (7 cols): Assiette Classique Anatomy */}
            <div className="lg:col-span-7 bg-[#161412] border border-[#C5A059]/30 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono-tabular uppercase tracking-widest text-[#C5A059] mb-4">
                  <span>01. Sur Ardoise Noire</span>
                  <span>Viande 100% Bœuf · Qualité Artisanale</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5F2EB] mb-3">
                  Assiette Classique &amp; Signature Wood&apos;Z
                </h3>
                <p className="text-sm text-[#A8A29E] leading-relaxed mb-6">
                  Tranchée finement à la commande sur notre broche d&apos;entrecôte 100% pur bœuf, notre viande est accompagnée de crudités fraîches coupées chaque matin, de frites dorées au paprika doux et d&apos;un pain artisanal chaud parsemé de sésame et de nigelle.
                </p>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#292524] bg-[#0D0C0B]">
                <img
                  src="/assets/aistudio/WOODZ_12_Assiette_Classique_91ba70ff.jpg"
                  alt="Assiette Classique Wood'Z Kebab House"
                  referrerPolicy="no-referrer"
                  style={{
                    transform: 'scale(1.52) translateY(-17%)',
                    transformOrigin: 'center center',
                  }}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Right Stack (5 cols): Two Editorial Craft Cards */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8">
              <div className="bg-[#161412] border border-[#292524] p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#C5A059] mb-2">
                    02. L&apos;Essentiel Artisanal
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#F5F2EB] mb-2">
                    Pain Rond Boulanger &amp; Légumes Grillés
                  </h3>
                  <p className="text-sm text-[#A8A29E] leading-relaxed mb-4">
                    Nos pains ronds sont façonnés par notre artisan boulanger chaque matin. Pour les recettes Alaturka et Le Wood&apos;Z, nous y associons poivrons, courgettes et oignons grillés ainsi que de la véritable Feta.
                  </p>
                </div>
                <div className="relative h-56 overflow-hidden border border-[#292524] bg-[#0D0C0B]">
                  <img
                    src="/assets/aistudio/WOODZ_03_Doner_Simple_84246f27.jpg"
                    alt="Döner Simple Pain Rond Artisanal"
                    referrerPolicy="no-referrer"
                    style={{
                      transform: 'scale(1.58) translate(-8%, -19%)',
                      transformOrigin: 'center center',
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="bg-[#161412] border border-[#292524] p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#C5A059] mb-2">
                    03. Formules Bistro Complètes
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#F5F2EB] mb-2">
                    Sur Plateau Bois ou À Emporter
                  </h3>
                  <p className="text-sm text-[#A8A29E] leading-relaxed mb-4">
                    Que vous choisissiez le Menu Döner Simple ou le Menu Alaturka XXL, chaque formule comprend nos frites au paprika faites maison, deux sauces artisanales et une boisson 33cl.
                  </p>
                </div>
                <div className="relative h-56 overflow-hidden border border-[#292524] bg-[#0D0C0B]">
                  <img
                    src="/assets/aistudio/WOODZ_07_Menu_Alaturka_8579b22a.jpg"
                    alt="Menu Alaturka Plateau Bois"
                    referrerPolicy="no-referrer"
                    style={{
                      transform: 'scale(1.55) translate(-4%, -18%)',
                      transformOrigin: 'center center',
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Nos 3 Maisons en Alsace (inspired by WOODZ_27_Facade_Selestat) */}
      <section
        id="restaurants"
        className="py-16 lg:py-24 bg-[#12100E] text-[#F5F2EB] border-b border-[#292524]"
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-semibold mb-3">
                <span>Votre Escale Gourmande en Alsace</span>
                <span aria-hidden="true">·</span>
                <span>Bas-Rhin (67) &amp; Haut-Rhin (68)</span>
              </div>
              <h2
                className="font-display font-bold text-[#F5F2EB] tracking-tight text-balance"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
              >
                Nos 3 Restaurants Wood&apos;Z Kebab House
                <span className="text-[#D92323]">.</span>
              </h2>
            </div>
            <p className="text-sm text-[#A8A29E] max-w-md">
              Retrouvez l&apos;architecture chaleureuse en bois et l&apos;accueil authentique de Wood&apos;Z à Sélestat, Illkirch-Graffenstaden et Colmar / Houssen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {branches.map((branch, index) => {
              const isSelected = branch.id === selectedBranchId;
              return (
                <article
                  key={branch.id}
                  className={`flex flex-col justify-between bg-[#181512] border transition-colors ${
                    isSelected
                      ? 'border-[#C5A059]'
                      : 'border-[#292524] hover:border-[#C5A059]/50'
                  }`}
                >
                  <div>
                    {/* Architectural Facade Frame */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#0D0C0B] border-b border-[#292524]">
                      <img
                        src={branch.image}
                        alt={branch.name}
                        referrerPolicy="no-referrer"
                        style={{
                          transform: 'scale(1.38) translateY(3%)',
                          transformOrigin: 'center center',
                        }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0B] via-transparent to-[#0D0C0B]/40" />
                      <div className="absolute top-3 right-3 bg-[#0D0C0B]/90 border border-[#C5A059]/60 px-3 py-1 text-[11px] font-mono-tabular uppercase tracking-wider text-[#C5A059]">
                        {branch.zone} · ({branch.postalCode})
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="text-[11px] uppercase tracking-widest text-[#C5A059] font-semibold">
                          0{index + 1}. {branch.flagshipTag}
                        </div>
                        <h3 className="font-display text-2xl font-bold text-[#F5F2EB]">
                          {branch.name.toUpperCase()}
                        </h3>
                      </div>
                    </div>

                    {/* Branch Details */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#D92323] shrink-0 mt-1" />
                        <div>
                          <div className="text-sm font-semibold text-[#F5F2EB]">
                            {branch.address}
                          </div>
                          <div className="text-xs text-[#A8A29E] mt-0.5">
                            {branch.landmark}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                        <a
                          href={`tel:${branch.phone.replace(/\s+/g, '')}`}
                          className="text-sm font-mono-tabular font-semibold text-[#F5F2EB] hover:text-[#C5A059] transition-colors"
                        >
                          {branch.phone}
                        </a>
                      </div>

                      <div className="flex items-start gap-3 pt-3 border-t border-[#292524]">
                        <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                        <div className="text-xs text-[#A8A29E] space-y-1 font-mono-tabular">
                          <div className="text-[#F5F2EB]">{branch.hours.weekdays}</div>
                          <div>{branch.hours.saturday}</div>
                          <div
                            className={
                              branch.isOpenSunday
                                ? 'text-[#C5A059] font-semibold'
                                : 'text-[#A8A29E]'
                            }
                          >
                            {branch.hours.sunday}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectBranch(branch.id);
                        document
                          .getElementById('la-carte')
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`flex-1 py-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        isSelected
                          ? 'bg-[#C5A059] text-[#0D0C0B]'
                          : 'bg-[#D92323] hover:bg-[#B91C1C] text-[#F5F2EB]'
                      }`}
                    >
                      {isSelected
                        ? 'Restaurant Sélectionné'
                        : 'Commander dans ce Wood’Z'}
                    </button>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${branch.name} ${branch.address}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Itinéraire vers ${branch.name}`}
                      className="p-3 bg-[#221F1D] hover:bg-[#292524] text-[#F5F2EB] border border-[#44403C] transition-colors"
                    >
                      <Navigation className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Galerie Officielle & Affiches Signature */}
      <section
        id="galerie"
        className="py-16 lg:py-24 bg-[#0D0C0B] text-[#F5F2EB] border-b border-[#292524]"
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-semibold mb-3">
                <span>Direction Artistique &amp; Campagnes</span>
                <span aria-hidden="true">·</span>
                <span>Wood&apos;Z Studio</span>
              </div>
              <h2
                className="font-display font-bold text-[#F5F2EB] tracking-tight text-balance"
                style={{ fontSize: 'clamp(1.85rem, 3vw, 2.75rem)' }}
              >
                Les Créations &amp; Affiches Officielles Wood&apos;Z
                <span className="text-[#D92323]">.</span>
              </h2>
            </div>
            <p className="text-sm text-[#A8A29E] max-w-md">
              Cliquez sur une affiche pour l&apos;examiner en plein écran. L&apos;esthétique du site prolonge fidèlement l&apos;identité visuelle de nos campagnes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {BRAND_POSTERS.map((poster) => (
              <button
                key={poster.id}
                type="button"
                onClick={() => onSelectPosterLightbox(poster)}
                className="group text-left bg-[#161412] border border-[#292524] hover:border-[#C5A059] p-3 transition-colors cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#0D0C0B]">
                  <img
                    src={poster.src}
                    alt={poster.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                </div>
                <div className="pt-4 pb-2 px-2">
                  <div className="text-[11px] font-mono-tabular uppercase tracking-widest text-[#C5A059]">
                    {poster.category}
                  </div>
                  <div className="font-display text-lg font-bold text-[#F5F2EB] mt-0.5">
                    {poster.title}
                  </div>
                  <div className="text-xs text-[#A8A29E] mt-0.5">
                    {poster.subtitle}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
