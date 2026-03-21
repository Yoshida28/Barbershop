import React from 'react';

interface ImageAutoSliderProps {
  images?: string[];
  title?: string;
  subtitle?: string;
  speed?: number; // seconds for one loop
  onImageClick?: () => void;
}

export const ImageAutoSlider: React.FC<ImageAutoSliderProps> = ({
  images = [],
  title = 'The Archive',
  subtitle = 'Visuals',
  speed = 36,
  onImageClick,
}) => {
  const duplicated = [...images, ...images];

  return (
    <div className="w-full relative overflow-hidden bg-[#0b0a08] py-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10 flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] font-bold text-[#c4a15a]/60 mb-3">
            {subtitle}
          </p>
          <h2 className="text-5xl md:text-6xl font-display uppercase tracking-tight text-[#c4a15a] leading-none">
            {title}
          </h2>
        </div>
        {onImageClick && (
          <button
            onClick={onImageClick}
            className="text-xs uppercase tracking-widest font-bold text-[#a88a4e] hover:text-[#c4a15a] transition-colors flex items-center gap-2 group"
          >
            View Gallery
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform duration-200"
            >
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#0b0a08] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#0b0a08] to-transparent z-10 pointer-events-none" />

      {/* Scrolling strip */}
      <div
        className="flex gap-5 w-max"
        style={{
          animation: `sliderScroll ${speed}s linear infinite`,
        }}
      >
        {duplicated.map((src, i) => (
          <div
            key={i}
            onClick={onImageClick}
            className={`
              flex-shrink-0 w-56 h-64 md:w-72 md:h-80 rounded-xl overflow-hidden shadow-2xl
              border border-[#c4a15a]/10 hover:border-[#c4a15a]/35
              transition-all duration-500 relative
              ${onImageClick ? 'cursor-pointer' : ''}
              group
            `}
          >
            <img
              src={src}
              alt={`Archive ${(i % images.length) + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              style={{ filter: 'contrast(1.15) brightness(1.05) saturate(1.1)' }}
              loading="lazy"
            />
            {/* subtle gold shimmer on hover */}
            <div className="absolute inset-0 bg-[#c4a15a]/0 group-hover:bg-[#c4a15a]/8 transition-colors duration-500 pointer-events-none rounded-xl" />
          </div>
        ))}
      </div>

      {/* Tap hint */}
      {onImageClick && (
        <p className="text-center text-[10px] uppercase tracking-[0.35em] text-[#7f6738] mt-8">
          Tap any image to explore the full gallery
        </p>
      )}

      <style>{`
        @keyframes sliderScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default ImageAutoSlider;
