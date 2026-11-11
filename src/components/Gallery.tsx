"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { tattoos, Tattoo, getTattoosByStyle } from "@/data/tattoos";
import { styles } from "@/data/artists";

export function Gallery() {
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [filteredTattoos] = useState(() => getTattoosByStyle("All"));

  useEffect(() => {
    // Filter when style changes
  }, [selectedStyle]);

  const currentTattoos = getTattoosByStyle(selectedStyle);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % currentTattoos.length);
  }, [currentTattoos.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + currentTattoos.length) % currentTattoos.length);
  }, [currentTattoos.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, nextImage, prevImage, closeLightbox]);

  return (
    <section className="py-16 md:py-24" aria-label="Tattoo Gallery">
      <div className="container">
        <header className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of custom tattoos across various styles and artists.
          </p>
        </header>

        <div className="mb-8 overflow-x-auto pb-4 -mx-4 px-4" role="tablist" aria-label="Filter by style">
          <div className="flex gap-2 min-w-max">
            {styles.map((style) => (
              <button
                key={style}
                role="tab"
                aria-selected={selectedStyle === style}
                aria-controls={`panel-${style}`}
                id={`tab-${style}`}
                onClick={() => setSelectedStyle(style)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedStyle === style
                    ? "bg-accent text-background shadow-lg shadow-accent/30"
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <div id="gallery-grid" role="tabpanel" aria-label={`${selectedStyle} tattoos`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentTattoos.map((tattoo, index) => (
            <article
              key={tattoo.id}
              className="group relative aspect-square overflow-hidden rounded-xl bg-muted cursor-zoom-in"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={tattoo.thumbnail || tattoo.image}
                alt={`${tattoo.title} by ${tattoo.artistId}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-semibold text-sm">{tattoo.title}</h3>
                <p className="text-xs text-muted-foreground">{tattoo.placement} • {tattoo.styles[0]}</p>
              </div>
            </article>
          ))}
        </div>

        {lightboxOpen && (
          <div
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Tattoo detail view"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors"
              aria-label="Close lightbox"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 z-10 p-3 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors hidden md:flex"
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 z-10 p-3 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors hidden md:flex"
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div className="max-w-5xl w-full aspect-[4/3] md:aspect-[3/2] relative">
              <Image
                src={currentTattoos[lightboxIndex].image}
                alt={currentTattoos[lightboxIndex].title}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-background/95 to-transparent">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-wrap gap-2 mb-3">
                  {currentTattoos[lightboxIndex].styles.map((style) => (
                    <span key={style} className="px-3 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border">
                      {style}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{currentTattoos[lightboxIndex].title}</h3>
                <p className="text-muted-foreground mb-4">
                  {currentTattoos[lightboxIndex].placement} • {currentTattoos[lightboxIndex].size}
                </p>
                {currentTattoos[lightboxIndex].description && (
                  <p className="text-foreground/90">{currentTattoos[lightboxIndex].description}</p>
                )}
              </div>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
              <button onClick={prevImage} className="p-2 rounded-full bg-muted/50 hover:bg-muted" aria-label="Previous">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button onClick={nextImage} className="p-2 rounded-full bg-muted/50 hover:bg-muted" aria-label="Next">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}