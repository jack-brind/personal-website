"use client";

import { useState } from "react";
import { toast } from "sonner";
import { LuCopy, LuCheck, LuCopyCheck } from "react-icons/lu";
import { Button } from "./ui/Button";
import Image from "next/image";

export function RichLinkActions({
  href,
  sourceUrl,
}: {
  href: string;
  sourceUrl?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    await navigator.clipboard.writeText(href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
    toast(
      <div className="flex items-start gap-3">
        <LuCopyCheck size={16} className="shrink-0 text-secondary" />
        <p className="font-medium text-body-sm">Link copied!</p>
      </div>,
      { position: "bottom-right" },
    );
  }

  return (
    <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100">
      {sourceUrl && (
        <Button variant="ghost" size="icon-sm" asChild>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/logos/github.png"
              alt="GitHub logo"
              width={16}
              height={16}
              className="opacity-75 dark:invert dark:opacity-60"
            />
          </a>
        </Button>
      )}
      <Button variant="ghost" size="icon-sm" onClick={handleCopy}>
        <LuCopy
          className={`text-secondary transition-all duration-200 ${copied ? "opacity-0 blur-[1px]" : "opacity-100 blur-0"}`}
        />
        <LuCheck
          className={`text-secondary absolute transition-all duration-200 ${copied ? "opacity-100 blur-0" : "opacity-0 blur-[1px]"}`}
        />
      </Button>
    </div>
  );
}
