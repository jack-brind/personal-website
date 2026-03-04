"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/HoverCard";

export function UsesItem({
  logo,
  name,
  description,
  link,
}: {
  logo: string;
  name: string;
  description: string;
  link: string;
}) {
  return (
    <HoverCard openDelay={10} closeDelay={10}>
      <HoverCardTrigger asChild>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${name}`}
          className="relative flex flex-col items-center justify-around rounded-lg h-31 p-1 hover:bg-sunken cursor-pointer group"
        >
          <ArrowUpRight
            size={14}
            className="absolute top-3 right-3 text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <div className="flex flex-col gap-4 items-center">
            <Image src={logo} alt={name} width={32} height={32} />
            <span className="text-sm font-medium">{name}</span>
          </div>
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-60 bg-elevated" side="top">
        <div className="flex items-center gap-2 mb-3">
          <Image src={logo} alt={name} width={16} height={16} />
          <span className="font-semibold text-body-sm">{name}</span>
        </div>
        <p className="text-body-sm text-secondary">{description}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
