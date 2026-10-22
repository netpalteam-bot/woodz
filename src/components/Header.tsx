import React from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0D0C0B]/95 backdrop-blur-md border-b border-[#292524]">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-3 sm:gap-8 px-4 sm:px-6 py-3.5 sm:py-4">
        {/* Zone 1: Brand title, single text element wordmark */}
        <a
          href="#accueil"
          className="font-display text-base sm:text-xl font-bold tracking-tight text-[#F5F2EB] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#D92323]"
        >
          WOOD&apos;Z <span className="text-[#D92323] italic">Z</span> KEBAB HOUSE
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#A8A29E]"
        >
          <a
            href="#la-carte"
            className="hover:text-[#F5F2EB] hover:underline underline-offset-8 decoration-[#D92323] transition-colors whitespace-nowrap shrink-0"
          >
            La Carte
          </a>
          <a
            href="#savoir-faire"
            className="hover:text-[#F5F2EB] hover:underline underline-offset-8 decoration-[#D92323] transition-colors whitespace-nowrap shrink-0"
          >
            Savoir-Faire
          </a>
          <a
            href="#restaurants"
            className="hover:text-[#F5F2EB] hover:underline underline-offset-8 decoration-[#D92323] transition-colors whitespace-nowrap shrink-0"
          >
            Nos Restaurants
          </a>
          <a
            href="#galerie"
            className="hover:text-[#F5F2EB] hover:underline underline-offset-8 decoration-[#D92323] transition-colors whitespace-nowrap shrink-0"
          >
            Créations
          </a>
          <a
            href="#drive-sync"
            className="hover:text-[#F5F2EB] hover:underline underline-offset-8 decoration-[#C5A059] transition-colors whitespace-nowrap shrink-0"
          >
            Espace Drive
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            className="px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold tracking-wider uppercase text-[#F5F2EB] bg-[#D92323] hover:bg-[#B91C1C] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C5A059]"
          >
            Commander ({cartCount})
          </button>
        </div>
      </div>
    </header>
  );
};
