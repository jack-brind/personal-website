"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CaseStudyItem, SideProjectItem } from "../lib/content";

type ProjectItem = CaseStudyItem | SideProjectItem;

function ProjectItems({
  items,
  title,
}: {
  items: ProjectItem[];
  title: string;
}) {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, 2);

  return (
    <>
      <div className="flex justify-between mb-6">
        <h2 className="text-display-sm">{title}</h2>
        {items.length > 2 && (
          <span
            onClick={() => setShowAll(!showAll)}
            className="text-body-sm font-medium text-secondary hover:text-primary select-none"
          >
            {showAll ? "[ - Less ]" : "[ + More ]"}
          </span>
        )}
      </div>
      <div
        className={`grid grid-cols-2 gap-8 ${title === "Work" ? " mb-16" : "mb-8"}`}
      >
        {visibleItems.map((item) => (
          <Link key={item.slug} href={`/work/${item.slug}`}>
            <div className="flex flex-col gap-3.5">
              <div className="relative w-full h-48 border rounded-2xl bg-sunken">
                {item.image && (
                  <Image
                    src={`/${item.image}.png`}
                    alt="image"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-body-sm font-semibold text-pretty">
                  {item.title}
                </h3>
                {"company" in item && (
                  <span className="text-body-sm font-medium text-secondary">
                    {item.company} ∙{" "}
                    {item.date && new Date(item.date).getFullYear()}
                  </span>
                )}
                {"techStack" in item && item.techStack && (
                  <span className="text-body-sm font-medium text-secondary">
                    {item.techStack.join(" ∙ ")}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default ProjectItems;
