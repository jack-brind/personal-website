import { unstable_cache } from "next/cache";
import Image from "next/image";
import { RichLinkActions } from "./RichLinkActions";

async function fetchOG(url: string) {
  try {
    const res = await fetch(url);
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

const getCachedOG = unstable_cache(fetchOG, ["richlink-og"], {
  revalidate: 86400,
});

export async function RichLink({
  href,
  sourceUrl,
}: {
  href: string;
  sourceUrl?: string;
}) {
  const og = await getCachedOG(href);
  const hostname = new URL(href).hostname;

  return (
    <div className="not-prose group flex items-stretch border rounded-lg overflow-hidden bg-elevated transition-colors">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 min-w-0 items-center gap-4 no-underline"
      >
        {og.image && (
          <div className="relative w-38 h-full shrink-0">
            <Image
              src={og.image}
              alt={og.title ?? hostname}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        )}
        <div
          className={`flex flex-col gap-1 min-w-0 py-2.5 pr-5${og.image ? "" : " pl-5"}`}
        >
          <p className="text-body-sm font-semibold truncate">
            {og.title ?? hostname}
          </p>
          <div className="flex flex-col gap-0.5">
            {og.description && (
              <p className="text-body-xs text-secondary truncate">
                {og.description}
              </p>
            )}
            <p className="text-body-xs text-secondary font-medium">
              {hostname}
            </p>
          </div>
        </div>
      </a>
      <div className="flex items-center px-4">
        <RichLinkActions href={href} sourceUrl={sourceUrl} />
      </div>
    </div>
  );
}
