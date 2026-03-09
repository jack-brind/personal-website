"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, Fragment } from "react";
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
        <h2 className="text-body-lg">{title}</h2>
        {items.length > 2 && (
          <span
            onClick={() => setShowAll(!showAll)}
            className="text-body-sm font-medium text-secondary hover:text-primary select-none"
          >
            {showAll ? "[ - Less ]" : "[ + More ]"}
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-8 mb-16">
        {visibleItems.map((item) => (
          <Link
            key={item.slug}
            href={`/${"company" in item ? "work" : "side-projects"}/${item.slug}`}
          >
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
                <h3 className="text-body-sm font-semibold text-pretty w-4/5">
                  {item.title}
                </h3>
                {"company" in item && (
                  <span className="text-body-sm font-medium text-secondary flex items-center gap-2">
                    {item.company}{" "}
                    <div className="h-0.75 w-0.75 bg-secondary rounded-full"></div>{" "}
                    {item.date && new Date(item.date).getFullYear()}
                  </span>
                )}
                {"techStack" in item && item.techStack && (
                  <span className="flex items-center gap-2">
                    {item.techStack.map((stack, i) => (
                      <Fragment key={stack}>
                        {i > 0 && (
                          <div className="h-0.75 w-0.75 bg-secondary rounded-full"></div>
                        )}
                        <span className="text-body-sm font-medium text-secondary">
                          {stack}
                        </span>
                      </Fragment>
                    ))}
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
