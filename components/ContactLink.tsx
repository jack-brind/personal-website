"use client";

import { Check, Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/Button";

export function ContactLink({
  href,
  label,
  copyValue,
}: {
  href: string;
  label: string;
  copyValue: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(copyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
    toast(
      <div className="flex items-start gap-3">
        <CopyCheck size={16} className="shrink-0 text-secondary " />
        <p className="font-medium text-body-xs">{`${label} ${href.startsWith("mailto:") ? "" : "link"} copied!`}</p>
      </div>,
      { position: "bottom-right" },
    );
  }

  function handleLinkClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (href.startsWith("mailto:")) {
      const confirmed = window.confirm("Open your email client?");
      if (!confirmed) e.preventDefault();
    }
  }

  return (
    <div className="group flex items-center gap-1.5 w-30">
      <a
        href={href}
        className="underline text-body-sm text-primary hover:text-primary/75 decoration-muted underline-offset-4"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleLinkClick}
      >
        {label}
      </a>
      <Button
        variant="ghost"
        size="xs"
        className="relative opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
      >
        <Copy
          className={`transition-all duration-200 ${copied ? "opacity-0 blur-[2px] scale-75" : "opacity-100 blur-0 scale-100"}`}
        />
        <Check
          className={`absolute transition-all duration-200 ${copied ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-[2px] scale-75"}`}
        />
      </Button>
    </div>
  );
}
