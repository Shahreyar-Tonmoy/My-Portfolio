import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiImage } from 'react-icons/fi';
import { resolveAssetUrl } from '../../../context/PortfolioContext';

const ProjectImageSlider = ({ images = [], title = 'Project Screenshot' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleSelectDot = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  // If only 1 image, render clean static image
  if (images.length === 1) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-950">
        <img
          src={resolveAssetUrl(images[0])}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-zinc-950 group/slider select-none">
      {/* Current Slide Image */}
      <img
        src={resolveAssetUrl(images[currentIndex])}
        alt={`${title} - Screenshot ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Subtle top/bottom gradient overlays for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-zinc-950/30 pointer-events-none" />

      {/* Slide Counter Badge */}
      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300 flex items-center gap-1.5 shadow-sm">
        <FiImage className="text-emerald-400 text-xs" />
        <span>
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/65 hover:bg-black text-white flex items-center justify-center backdrop-blur-md border border-white/15 opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Previous image"
      >
        <FiChevronLeft className="text-base" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/65 hover:bg-black text-white flex items-center justify-center backdrop-blur-md border border-white/15 opacity-0 group-hover/slider:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Next image"
      >
        <FiChevronRight className="text-base" />
      </button>

      {/* Pagination Dot Indicators */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={(e) => handleSelectDot(e, idx)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIndex
                ? 'w-5 bg-emerald-400 shadow-sm'
                : 'w-1.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectImageSlider;
