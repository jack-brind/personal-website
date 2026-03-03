"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { useLightbox } from "@/hooks/useLightbox";

export function Figure({
  src,
  alt,
  caption,
  id,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption?: string;
  id: string;
  width: number;
  height: number;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const { register, unregister, open } = useLightbox();

  useEffect(() => {
    register({
      id,
      src,
      alt,
      caption,
      ref: imageRef as React.RefObject<HTMLImageElement>,
    });
    return () => unregister(id);
  }, [id, src, alt, caption, register, unregister]);

  return (
    <figure className="flex flex-col gap-2">
      <div
        className="cursor-zoom-in border bg-elevated rounded-lg overflow-hidden"
        onClick={() => open(id)}
      >
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto rounded-md object-cover"
        />
      </div>
      {caption && (
        <figcaption className="font-serif italic text-sm text-secondary font-medium mt-1 mb-4">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
