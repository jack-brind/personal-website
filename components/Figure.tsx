"use client";

import Image from "next/image";
import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";

// ease-out-quart — used for both CSS transitions and the RAF close loop
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({
  src,
  alt,
  caption,
  thumbnailRect,
  containerRef,
  intrinsicWidth,
  intrinsicHeight,
  containerRadius,
  lightboxBg,
  onClose,
}: {
  src: string;
  alt: string;
  caption?: string;
  thumbnailRect: DOMRect;
  containerRef: React.RefObject<HTMLDivElement | null>;
  intrinsicWidth: number;
  intrinsicHeight: number;
  containerRadius: number;
  lightboxBg: string;
  onClose: () => void;
}) {
  // overlayRef is on the wrapper <div> — the animated element that carries the
  // border and background. imageInnerRef is on the <img> only for the .complete check.
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLImageElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const closingRef = useRef(false);
  const readyRef = useRef(false);
  // Overlay wrapper's natural rendered width and centre — set once on open, used in close RAF
  const actualWidthRef = useRef(0);
  const actualCenterXRef = useRef(0);
  const actualCenterYRef = useRef(0);
  const closeRafRef = useRef(0);

  const EASING = "cubic-bezier(0.165, 0.84, 0.44, 1)";
  const DURATION_OPEN = 280;
  const DURATION_CLOSE = 210; // ~20% faster than open per convention

  const runOpenAnimation = useCallback(() => {
    if (readyRef.current) return;
    readyRef.current = true;

    const el = overlayRef.current;
    if (!el) return;

    // Measure the wrapper's actual rendered position while it sits at its flex-layout
    // resting position (visibility: hidden, no transform). When a caption is present the
    // image wrapper is shifted above the viewport centre — storing the actual centre ensures
    // open and close translations are accurate regardless of caption height.
    const elRect = el.getBoundingClientRect();
    const actualWidth = elRect.width;
    const actualCenterX = elRect.left + elRect.width / 2;
    const actualCenterY = elRect.top + elRect.height / 2;
    actualWidthRef.current = actualWidth;
    actualCenterXRef.current = actualCenterX;
    actualCenterYRef.current = actualCenterY;

    const scale = thumbnailRect.width / actualWidth;
    const tx = thumbnailRect.left + thumbnailRect.width / 2 - actualCenterX;
    const ty = thumbnailRect.top + thumbnailRect.height / 2 - actualCenterY;

    // Snap to thumbnail position (still hidden), matching rounded corners.
    // borderRadius is fixed at containerRadius/scale throughout — as the transform
    // scale grows from openScale→1, the visual radius naturally grows from
    // containerRadius to containerRadius/scale (proportional to image size, no per-frame writes).
    el.style.transition = "none";
    el.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    el.style.borderRadius = `${containerRadius / scale}px`;

    // Reduced motion: skip animation entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = "none";
      el.style.visibility = "visible";
      if (backdropRef.current) backdropRef.current.style.opacity = "1";
      if (captionRef.current) {
        captionRef.current.style.opacity = "1";
        captionRef.current.style.transform = "none";
        captionRef.current.style.filter = "blur(0)";
      }
      return;
    }

    // Fade in backdrop (paired with image: same duration + easing)
    if (backdropRef.current) {
      backdropRef.current.style.transition = `opacity ${DURATION_OPEN}ms ${EASING}`;
      backdropRef.current.style.opacity = "1";
    }

    // Reveal the wrapper at the thumbnail position, then animate to centre
    requestAnimationFrame(() => {
      el.style.visibility = "visible";
      requestAnimationFrame(() => {
        el.style.transition = `transform ${DURATION_OPEN}ms ${EASING}`;
        el.style.transform = "none";
      });
    });

    // Fade + slide + unblur the caption in after the image is mostly settled
    setTimeout(() => {
      if (captionRef.current) {
        captionRef.current.style.transition = `opacity 150ms ${EASING}, transform 150ms ${EASING}, filter 150ms ${EASING}`;
        captionRef.current.style.opacity = "1";
        captionRef.current.style.transform = "none";
        captionRef.current.style.filter = "blur(0)";
      }
    }, 180);
  }, [thumbnailRect, containerRadius]);

  // If the image is already cached, onLoad won't fire — check complete after mount
  useEffect(() => {
    if (imageInnerRef.current?.complete) runOpenAnimation();
  }, [runOpenAnimation]);

  const handleClose = useCallback(() => {
    if (closingRef.current || !overlayRef.current || !containerRef.current)
      return;
    closingRef.current = true;

    // Reduced motion: dismiss instantly
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }

    // Caption out immediately
    if (captionRef.current) {
      captionRef.current.style.transition = `opacity 100ms ${EASING}, transform 100ms ${EASING}, filter 100ms ${EASING}`;
      captionRef.current.style.opacity = "0";
      captionRef.current.style.transform = "translateY(6px)";
      captionRef.current.style.filter = "blur(4px)";
    }

    const el = overlayRef.current;
    // Cancel any in-progress CSS open transition so RAF takes over cleanly
    el.style.transition = "none";

    // Backdrop fades out with CSS — doesn't need per-frame tracking
    if (backdropRef.current) {
      backdropRef.current.style.transition = `opacity ${DURATION_CLOSE}ms ${EASING}`;
      backdropRef.current.style.opacity = "0";
    }

    const actualWidth = actualWidthRef.current;

    // Set border-radius once before the RAF loop. Animating it per-frame on an
    // overflow-hidden element forces a layer repaint every frame (border-radius changes
    // the clip shape), which causes juddering. Setting CSS borderRadius = containerRadius /
    // initialTargetScale means visual radius (= CSS × scale) naturally arrives at
    // containerRadius when scale reaches targetScale — no per-frame writes needed.
    if (containerRadius > 0 && actualWidth > 0) {
      const initialRect = containerRef.current.getBoundingClientRect();
      const initialTargetScale = initialRect.width / actualWidth;
      el.style.borderRadius = `${containerRadius / initialTargetScale}px`;
    }

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!containerRef.current) {
        onClose();
        return;
      }
      if (startTime === null) startTime = timestamp;
      const t = Math.min((timestamp - startTime) / DURATION_CLOSE, 1);
      const eased = easeOutQuart(t);

      // Re-measure the document container every frame so the target tracks it
      // as the page scrolls — the wrapper (with border) matches the container (with border).
      const rect = containerRef.current.getBoundingClientRect();
      const targetScale = rect.width / actualWidth;
      const targetTx = rect.left + rect.width / 2 - actualCenterXRef.current;
      const targetTy = rect.top + rect.height / 2 - actualCenterYRef.current;

      // Interpolate from centre (0, 0, scale=1) towards container's current position
      const tx = targetTx * eased;
      const ty = targetTy * eased;
      const scale = 1 + (targetScale - 1) * eased;

      el.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;

      if (t < 1) {
        closeRafRef.current = requestAnimationFrame(animate);
      } else {
        onClose();
      }
    };

    closeRafRef.current = requestAnimationFrame(animate);
  }, [containerRef, onClose, containerRadius]);

  // Cancel any in-flight close RAF on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(closeRafRef.current);
    };
  }, []);

  // Scroll-to-close: fire on the very first scroll event so the container
  // position is captured accurately and the close animation lands cleanly.
  useEffect(() => {
    const handleScroll = () => handleClose();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleClose]);

  // Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 p-8 cursor-zoom-out"
      onClick={handleClose}
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-default"
        style={{ opacity: 0 }}
      />
      {/* Wrapper carries the border, background and border-radius animation */}
      <div
        ref={overlayRef}
        className="relative border rounded-lg overflow-hidden"
        style={{
          transformOrigin: "center",
          visibility: "hidden",
          backgroundColor: lightboxBg,
          maxWidth: "calc(100vw - 4rem)",
        }}
      >
        <Image
          ref={imageInnerRef}
          src={src}
          alt={alt}
          width={intrinsicWidth}
          height={intrinsicHeight}
          onLoad={runOpenAnimation}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "calc(90vh - 4rem)",
            width: "auto",
            height: "auto",
          }}
        />
      </div>
      {caption && (
        <p
          ref={captionRef}
          className="relative text-center text-secondary font-serif italic text-base"
          style={{
            opacity: 0,
            transform: "translateY(6px)",
            filter: "blur(4px)",
          }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}

// ─── Figure ───────────────────────────────────────────────────────────────────

export function Figure({
  src,
  alt,
  caption,
  width,
  height,
  zoom = true,
  border = true,
  lightboxBg = "white",
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  zoom?: boolean;
  border?: boolean;
  lightboxBg?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [thumbnailRect, setThumbnailRect] = useState<DOMRect | null>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const handleOpen = () => {
    if (!zoom || !containerRef.current) return;
    setThumbnailRect(containerRef.current.getBoundingClientRect());
  };

  return (
    <figure className="flex flex-col gap-2 my-10">
      <div
        ref={containerRef}
        className={twMerge(
          border && "border bg-elevated rounded-lg overflow-hidden",
          zoom && "cursor-zoom-in",
          className,
        )}
        onClick={handleOpen}
        style={thumbnailRect ? { visibility: "hidden" } : undefined}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="font-serif italic text-secondary font-medium mt-1 mb-4">
          {caption}
        </figcaption>
      )}
      {mounted &&
        thumbnailRect &&
        createPortal(
          <Lightbox
            src={src}
            alt={alt}
            caption={caption}
            thumbnailRect={thumbnailRect}
            containerRef={containerRef}
            intrinsicWidth={width}
            intrinsicHeight={height}
            containerRadius={border ? 8 : 0}
            lightboxBg={lightboxBg}
            onClose={() => setThumbnailRect(null)}
          />,
          document.body,
        )}
    </figure>
  );
}
