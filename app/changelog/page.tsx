import { ChangelogEntry } from "@/components/ChangelogEntry";
import { changelog } from "@/data/changelog";

function ChangelogPage() {
  return (
    <article>
      <div className="prose">
        <h1 className="mb-8">Changelog</h1>
        <p>
          This changelog is a running log of note-worthy updates to this site
          including improvements, new articles, side projects, or major changes.
          It's mostly personal record so that I can track my updates for
          posterity.
        </p>
      </div>
      <div className="flex flex-col gap-14 mt-30">
        {changelog.map((entry) => (
          <ChangelogEntry key={`${entry.date}-${entry.title}`} {...entry} />
        ))}
      </div>
    </article>
  );
}

export default ChangelogPage;
