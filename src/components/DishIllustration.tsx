import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

interface DishIllustrationProps {
  src: string;
  alt: string;
  dishId: string;
  objectPosition?: string;
  className?: string;
}

/**
 * Calibration table for the studio food photography crops so that
 * poster headlines in the top 40% and URL footers in the bottom 8%
 * are cleanly framed out, leaving only the pure 8K studio food photography.
 */
const STUDIO_CROP_CALIBRATION: Record<
  string,
  { scale: number; translateY: string; translateX?: string }
> = {
  // WOODZ_02_Sandwich_Alaturka
  'sandwich-alaturka': { scale: 1.52, translateY: '-16%' },
  'sandwich-woodz': { scale: 1.62, translateY: '-18%', translateX: '-3%' },
  'tiramisu-pistache': { scale: 1.68, translateY: '-19%', translateX: '4%' },

  // WOODZ_03_Doner_Simple
  'sandwich-doner-simple': { scale: 1.58, translateY: '-19%', translateX: '-8%' },
  'menu-kids': { scale: 1.65, translateY: '-20%', translateX: '-10%' },

  // WOODZ_07_Menu_Alaturka
  'menu-alaturka': { scale: 1.55, translateY: '-18%', translateX: '-5%' },
  'menu-woodz-signature': { scale: 1.62, translateY: '-19%', translateX: '-2%' },
  'box-legumes-viande': { scale: 1.65, translateY: '-20%', translateX: '6%' },

  // WOODZ_08_Menu_Doner_Simple
  'menu-doner': { scale: 1.52, translateY: '-16%' },
  'sandwich-americain': { scale: 1.68, translateY: '-17%', translateX: '12%' },
  'box-viande-frites': { scale: 1.68, translateY: '-17%', translateX: '-6%' },
  'tiramisu-kinder-caramel': { scale: 1.72, translateY: '-18%', translateX: '-12%' },

  // WOODZ_12_Assiette_Classique
  'assiette-classique': { scale: 1.56, translateY: '-18%' },
  'assiette-woodz': { scale: 1.64, translateY: '-19%', translateX: '4%' },
  'assiette-alaturka': { scale: 1.66, translateY: '-20%', translateX: '-5%' },
  'frites-paprika-grande': { scale: 1.85, translateY: '-14%', translateX: '-14%' },
};

export const DishIllustration: React.FC<DishIllustrationProps> = ({
  src,
  alt,
  dishId,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  // If the image was updated from Google Drive (blob: or external URL), show normal cover without poster crop
  const isLocalPosterAsset = src.startsWith('/assets/aistudio/WOODZ_');
  const crop = isLocalPosterAsset
    ? STUDIO_CROP_CALIBRATION[dishId] || { scale: 1.55, translateY: '-17%' }
    : { scale: 1, translateY: '0%' };

  return (
    <div
      className={`relative overflow-hidden bg-[#151311] select-none ${className}`}
    >
      {!hasError ? (
        <>
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            style={{
              transform: `scale(${crop.scale}) translate(${crop.translateX || '0%'}, ${crop.translateY})`,
              transformOrigin: 'center center',
            }}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          {/* Subtle studio lighting rim vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at center, transparent 55%, rgba(13,12,11,0.45) 100%)',
            }}
          />
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#1C1917] to-[#0D0C0B] text-center">
          <Utensils className="w-8 h-8 text-[#C5A059] mb-2 opacity-80" />
          <span className="font-display text-sm text-[#F5F2EB] tracking-wide">
            {alt}
          </span>
          <span className="text-xs text-[#A8A29E] mt-1">
            Wood&apos;Z Kebab House · 100% Bœuf
          </span>
        </div>
      )}

      {/* Subtle artisanal inner hairline border */}
      <div
        data-dish-frame={dishId}
        className="pointer-events-none absolute inset-2.5 border border-[#C5A059]/25"
      />
    </div>
  );
};
