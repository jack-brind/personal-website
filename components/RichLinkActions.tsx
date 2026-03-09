"use client";

import { useState } from "react";
import { toast } from "sonner";
import { LuCopy, LuCheck, LuCopyCheck, LuGithub } from "react-icons/lu";
import { Button } from "./ui/Button";

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
    <div className="flex flex-col gap-1 shrink-0">
      {sourceUrl && (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <Button variant="ghost" size="icon-xs" asChild>
            <span>
              <LuGithub />
            </span>
          </Button>
        </a>
      )}
      <Button variant="ghost" size="icon-xs" onClick={handleCopy}>
        <LuCopy
          className={`transition-all duration-200 ${copied ? "opacity-0 blur-[1px]" : "opacity-100 blur-0"}`}
        />
        <LuCheck
          className={`absolute transition-all duration-200 ${copied ? "opacity-100 blur-0" : "opacity-0 blur-[1px]"}`}
        />
      </Button>
    </div>
  );
}
