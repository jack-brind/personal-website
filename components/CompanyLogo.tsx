import Image from "next/image";

const brandColours: Record<string, string> = {
  PandaDoc: "bg-pandadoc",
  itris: "bg-itris",
};

export function CompanyLogo({
  name,
  size = 16,
}: {
  name: string;
  size?: number;
}) {
  const colour = brandColours[name] || "bg-zinc-800";

  return (
    <div className={`p-2 ${colour} rounded-lg`}>
      <Image
        height={size}
        width={size}
        src={`/${name}.svg`}
        alt={`${name} logo`}
      />
    </div>
  );
}
