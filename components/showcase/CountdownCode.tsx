"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { LuCopy, LuMousePointerClick, LuRefreshCw } from "react-icons/lu";
import { Button } from "@/components/ui/Button";

const INITIAL_CODE = "467309";
const COUNTDOWN_SECONDS = 180;

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function CountdownCode() {
  const [code, setCode] = useState(INITIAL_CODE);
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const [copied, setCopied] = useState(false);
  const [tabularNums, setTabularNums] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [suppressTooltip, setSuppressTooltip] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const handleRegenerate = useCallback(() => {
    setCode(generateCode());
    setSecondsLeft(COUNTDOWN_SECONDS);
    setCopied(false);
    setSuppressTooltip(false);
  }, []);

  const handleCopy = useCallback(async () => {
    if (secondsLeft <= 0) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setSuppressTooltip(true);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
  }, [code, secondsLeft]);

  const isExpired = secondsLeft <= 0;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <>
      <div className="bg-elevated border rounded-lg mt-9 mb-3">
        <div className="mt-12 mb-4 not-prose w-108 mx-auto">
          <Button
            type="button"
            variant="ghost"
            onClick={isExpired ? handleRegenerate : handleCopy}
            aria-label={isExpired ? "Regenerate code" : `Copy code ${code}`}
            className="relative h-24 w-full rounded-lg bg-[#F8F9FB] border border-border hover:bg-[#F5F6F9]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setSuppressTooltip(false);
            }}
          >
            <span
              className="text-[1.75rem] tracking-[0.175rem] font-[450] text-primary transition-opacity lining-nums tabular-nums"
              style={{
                fontFeatureSettings:
                  '"calt" 1, "salt" 1, "ss01" 1, "cv01" 1, "cv02" 1, "cv03" 1, "cv04" 1, "cv09" 1',
                opacity: isExpired ? 0.5 : 1,
              }}
            >
              {code}
            </span>

            {!isExpired && (
              <span
                aria-hidden
                className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md bg-primary text-default text-xs font-medium whitespace-nowrap transition-opacity ${isHovered && !suppressTooltip ? "opacity-100" : "opacity-0"}`}
              >
                {"Copy code"}
              </span>
            )}

            <Button
              asChild
              variant="ghost"
              aria-hidden
              className={`absolute top-3 right-3 h-7 text-secondary text-xs hover:bg-zinc-200 ${copied ? "w-auto px-2" : "w-7"}`}
            >
              <span>
                {isExpired ? (
                  <LuRefreshCw size={14} />
                ) : copied ? (
                  "Copied"
                ) : (
                  <LuCopy size={14} />
                )}
              </span>
            </Button>
          </Button>

          <div
            className="mt-2 flex items-center justify-end gap-3 text-xs"
            style={{
              fontFeatureSettings:
                '"calt" 1, "salt" 1, "ss01" 1, "cv01" 1, "cv02" 1, "cv03" 1, "cv04" 1, "cv09" 1',
              fontVariantNumeric: tabularNums ? "tabular-nums" : "normal",
            }}
          >
            {isExpired ? (
              <span className="font-medium text-red-600">Expired</span>
            ) : (
              <span className="text-muted">
                Expires in {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
              </span>
            )}
          </div>

          <div className="mt-14 flex items-center justify-center gap-2 text-xs text-muted">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <Button
                type="button"
                variant="ghost"
                role="switch"
                aria-checked={tabularNums}
                onClick={() => setTabularNums((v) => !v)}
                className={`relative h-4 w-7 min-w-0 p-0 justify-start rounded-full transition-colors ${
                  tabularNums
                    ? "bg-accent hover:bg-accent"
                    : "bg-border-dark hover:bg-border-dark"
                }`}
              >
                <span
                  className={`inline-block size-3 rounded-full bg-white transition-transform ${
                    tabularNums ? "translate-x-3.5" : "translate-x-0.5"
                  }`}
                />
              </Button>
              <span>tabular-nums</span>
            </label>
          </div>
        </div>
      </div>
      <span className="font-serif italic text-sm text-secondary font-medium mb-4 flex items-center gap-1.5">
        <LuMousePointerClick size={16} style={{ transform: "scaleX(-1)" }} />
        Fig 05. Demo of the code copy interaction and countdown behaviour
      </span>
    </>
  );
}
