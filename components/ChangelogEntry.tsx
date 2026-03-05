import { format } from "date-fns";
import type { ChangelogEntry } from "@/data/changelog";
import { Figure } from "@/components/Figure";

export function ChangelogEntry({
  date,
  type,
  title,
  description,
  image,
}: ChangelogEntry) {
  return (
    <div className="grid grid-cols-[12rem_1fr] items-start">
      <span className="text-secondary text-body-sm font-medium sticky top-4">
        {format(date, "MMMM d, yyyy")}
      </span>
      <div>
        <span className="font-medium text-secondary text-body-sm">{type}</span>
        <h2 className="text-body-lg mt-3 mb-3">{title}</h2>
        <div className="prose text-secondary">{description}</div>
        {image && (
          <div className="mt-4">
            <Figure
              id={`changelog-${title}`}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              caption={image.caption}
            />
          </div>
        )}
      </div>
    </div>
  );
}
