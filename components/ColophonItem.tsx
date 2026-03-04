import Image from "next/image";

const fontClassMap: Record<string, string> = {
  Inter: "font-sans",
  "Inter Display": "font-display",
  Lora: "font-serif",
  "JetBrains Mono": "font-mono",
};

export function ColophonItem({
  logo,
  name,
  version,
  description,
  variant = "Tech",
}: {
  logo?: string;
  name: string;
  version?: string;
  description: string;
  variant: "Tech" | "Font";
}) {
  if (variant === "Tech")
    return (
      <div className="flex items-center">
        <div className="flex items-center gap-2 w-48">
          {logo && (
            <Image
              src={`/logos/${logo}.png`}
              alt={`${name} logo`}
              height={20}
              width={20}
            />
          )}
          <span className="font-semibold text-body-sm">{name}</span>
          {version && (
            <span className="text-secondary font-medium text-body-sm tabular-nums">
              {version}
            </span>
          )}
        </div>
        <span className="text-secondary font-medium text-body-sm">
          {description}
        </span>
      </div>
    );

  if (variant === "Font")
    return (
      <div className="flex items-center">
        <div className="flex items-center gap-2 w-48">
          <span className={fontClassMap[name]}>Aa</span>
          <span className="font-semibold text-body-sm">{name}</span>
        </div>
        <span className="text-secondary font-medium text-body-sm">
          {description}
        </span>
      </div>
    );
}
