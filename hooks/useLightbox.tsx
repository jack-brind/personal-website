/* eslint-disable @next/next/no-img-element */
"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  type RefObject,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type LightboxImage = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  ref: RefObject<HTMLImageElement>;
};

type LightboxContextType = {
  register: (image: LightboxImage) => void;
  unregister: (id: string) => void;
  open: (id: string) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
  activeId: string | null;
  showNavigation: boolean;
};

// ─── Context ──────────────────────────────────────────────────────────────────

const LightboxContext = createContext<LightboxContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

type ProviderProps = {
  children: React.ReactNode;
  showNavigation?: boolean;
};

export function ImageLightboxProvider({
  children,
  showNavigation = false,
}: ProviderProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<LightboxImage | null>(null);
  const images = useRef<LightboxImage[]>([]);
  const originRect = useRef<DOMRect | null>(null);
  const overlayImageRef = useRef<HTMLImageElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeId || !overlayImageRef.current || !originRect.current) return;

    const rect = originRect.current;
    const el = overlayImageRef.current;
    const backdrop = backdropRef.current;

    // How much smaller the thumbnail is vs the full viewport
    const scaleX = rect.width / window.innerWidth;
    const scaleY = rect.height / window.innerHeight;

    // Where the thumbnail is relative to viewport center
    const translateX = rect.left + rect.width / 2 - window.innerWidth / 2;
    const translateY = rect.top + rect.height / 2 - window.innerHeight / 2;

    // Frame 1: snap to thumbnail position instantly
    el.style.transition = "none";
    el.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
    if (backdrop) {
      backdrop.style.transition = "none";
      backdrop.style.opacity = "0";
    }

    // Frame 2: animate to full size
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = "transform .4s cubic-bezier(0.4, 0, 0.2, 1)";
        el.style.transform = "none";
        if (backdrop) {
          backdrop.style.transition = "opacity 0.3s ease";
          backdrop.style.opacity = "1";
        }
      });
    });
  }, [activeId]);

  const register = useCallback((image: LightboxImage) => {
    images.current.push(image);
  }, []);

  const unregister = useCallback((id: string) => {
    images.current = images.current.filter((img) => img.id !== id);
  }, []);

  const open = useCallback((id: string) => {
    const image = images.current.find((img) => img.id === id);
    if (!image?.ref.current) return;

    const rect = image.ref.current.getBoundingClientRect();
    originRect.current = rect;

    setActiveId(id);
    setActiveImage(image);
  }, []);

  const close = useCallback(() => {
    if (!activeId || !overlayImageRef.current) return;

    const image = images.current.find((img) => img.id === activeId);
    if (!image?.ref.current) return;

    const rect = image.ref.current.getBoundingClientRect();
    const el = overlayImageRef.current;

    const scaleX = rect.width / window.innerWidth;
    const scaleY = rect.height / window.innerHeight;

    const translateX = rect.left + rect.width / 2 - window.innerWidth / 2;
    const translateY = rect.top + rect.height / 2 - window.innerHeight / 2;

    // Animate back to thumbnail position
    el.style.transition = "transform .4s cubic-bezier(0.4, 0, 0.2, 1)";
    el.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;

    const backdrop = backdropRef.current;
    if (backdrop) {
      backdrop.style.transition = "opacity 0.3s ease";
      backdrop.style.opacity = "0";
    }

    // Wait for animation to finish, then clear activeId
    el.addEventListener(
      "transitionend",
      () => {
        setActiveId(null);
        setActiveImage(null);
      },
      { once: true },
    );
  }, [activeId]);

  const next = useCallback(() => {
    if (!activeId) return;
    const index = images.current.findIndex((img) => img.id === activeId);
    const nextImage = images.current[index + 1];
    if (nextImage) open(nextImage.id);
  }, [activeId, open]);

  const prev = useCallback(() => {
    if (!activeId) return;
    const index = images.current.findIndex((img) => img.id === activeId);
    const prevImage = images.current[index - 1];
    if (prevImage) open(prevImage.id);
  }, [activeId, open]);

  // Scroll-to-close
  useEffect(() => {
    if (!activeId) return;

    const startY = window.scrollY;

    const handleScroll = () => {
      if (Math.abs(window.scrollY - startY) > 50) close();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeId, close]);

  // Keyboard listeners
  useEffect(() => {
    if (!activeId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeId, close, next, prev]);

  return (
    <LightboxContext.Provider
      value={{
        register,
        unregister,
        open,
        close,
        next,
        prev,
        activeId,
        showNavigation,
      }}
    >
      {children}
      {activeId && activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={close}
        >
          {/* Backdrop */}
          <div
            ref={backdropRef}
            className="absolute inset-0 bg-black/80"
            style={{ opacity: 0 }}
          />

          {/* Image */}
          <img
            ref={overlayImageRef}
            src={activeImage.src}
            alt={activeImage.alt}
            className="relative w-full object-contain"
            style={{ transformOrigin: "center" }}
          />

          {/* Caption */}
          {activeImage.caption && (
            <p className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/70">
              {activeImage.caption}
            </p>
          )}

          {/* Navigation */}
          {showNavigation && (
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
              >
                ←
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
              >
                →
              </button>
            </div>
          )}
        </div>
      )}
    </LightboxContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context)
    throw new Error("useLightbox must be used within an ImageLightboxProvider");
  return context;
}
