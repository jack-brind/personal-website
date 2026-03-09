"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useLightbox } from "@/hooks/useLightbox";

export function InlineImage({
  src,
  alt,
  caption,
  width,
  height,
  imageWidth,
  imageHeight,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  imageWidth?: string;
  imageHeight?: string;
  className?: string;
}) {
  return (
    <figure className="flex flex-col gap-2">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={twMerge(
          "w-full h-auto rounded-md object-cover mx-auto mt-10 mb-6",
          imageWidth,
          imageHeight,
          className,
        )}
      />
      {caption && (
        <figcaption className="font-serif italic text-secondary font-medium mt-1 mb-10">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Figure({
  src,
  alt,
  caption,
  id,
  width,
  height,
  imageWidth,
  imageHeight,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  id: string;
  width: number;
  height: number;
  imageWidth?: string;
  imageHeight?: string;
  className?: string;
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
    <figure className="flex flex-col gap-2 mt-10 mb-6">
      <div
        className="cursor-zoom-in border bg-elevated rounded-lg overflow-hidden mx-auto"
        onClick={() => open(id)}
      >
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={twMerge(
            "w-full h-auto rounded-md object-cover",
            imageWidth,
            imageHeight,
            className,
          )}
        />
      </div>
      {caption && (
        <figcaption className="font-serif italic text-secondary font-medium mt-1 mb-4">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
