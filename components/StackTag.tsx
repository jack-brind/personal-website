import Image from "next/image";

export function StackTag({ logo, name }: { logo: string; name: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-4 w-4">
        <Image
          src={`/logos/${logo}.png`}
          alt={`${logo} tech stack tag`}
          height={40}
          width={40}
        />
      </div>
      <p className="text-body-sm">{name}</p>
    </div>
  );
}
