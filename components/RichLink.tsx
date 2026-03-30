import Image from "next/image";
import { RichLinkActions } from "./RichLinkActions";

async function fetchOG(url: string) {
  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    const html = await res.text();
    const get = (prop: string) =>
      html.match(
        new RegExp(
          `<meta[^>]*property=["']${prop}["'][^>]*content=["']([^"']+)["']`,
          "i",
        ),
      )?.[1] ??
      html.match(
        new RegExp(
          `<meta[^>]*content=["']([^"']+)["'][^>]*property=["']${prop}["']`,
          "i",
        ),
      )?.[1];

    const rawImage = get("og:image");
    const image = rawImage ? new URL(rawImage, url).href : undefined;

    return {
      image,
      title: get("og:title"),
      description: get("og:description"),
    };
  } catch {
    return { image: undefined, title: undefined, description: undefined };
  }
}

export async function RichLink({
  href,
  sourceUrl,
}: {
  href: string;
  sourceUrl?: string;
}) {
  const og = await fetchOG(href);
  const hostname = new URL(href).hostname;

  return (
    <div className="flex items-stretch border rounded-2xl overflow-hidden hover:border-muted transition-colors">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center gap-4 no-underline"
      >
        {og.image && (
          <div className="relative w-32 h-full shrink-0">
            <Image
              src={og.image}
              alt={og.title ?? hostname}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-col gap-1 min-w-0 py-3">
          <p className="text-body-sm font-semibold truncate">
            {og.title ?? hostname}
          </p>
          {og.description && (
            <p className="text-body-sm text-secondary line-clamp-2">
              {og.description}
            </p>
          )}
          <p className="text-body-sm text-secondary font-medium">{hostname}</p>
        </div>
      </a>
      <div className="flex items-center px-4">
        <RichLinkActions href={href} sourceUrl={sourceUrl} />
      </div>
    </div>
  );
}
