import { ReactNode } from "react";
import { SmartLink } from "@/components/SmartLink";

export type ChangelogType =
  | "Article"
  | "Update"
  | "Improvement"
  | "Feature"
  | "Fix"
  | "Side project"
  | "Launch";

export type ChangelogImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type ChangelogEntry = {
  date: Date;
  type: ChangelogType;
  title: string;
  description: ReactNode;
  image?: ChangelogImage;
};

const entries = [
  {
    date: new Date("2025-12-01"),
    type: "Article",
    title: "365 days of JavaScript",
    description: (
      <p>
        I spent a year learning to code and this is a candid reflection of that
        journey so far. See the article{" "}
        <SmartLink href="/articles/365-days-of-javascript">here</SmartLink>.
      </p>
    ),
  },
  {
    date: new Date("2025-07-14"),
    type: "Update",
    title: "New role at PandaDoc",
    description: (
      <p>
        After starting at PandaDoc, I updated my experience on the about page.
      </p>
    ),
  },
  {
    date: new Date("2025-05-13"),
    type: "Improvement",
    title: "Case Study toggle",
    description: (
      <p>
        I felt like my Giving recruiters a way to track their performance and
        KPIs case study was too long, but I also wanted to showcase the depth.
        Instead of cutting it down, I implemented a toggle to switch between
        Summary and Deep dive to give readers a choice.
      </p>
    ),
  },
  {
    date: new Date("2025-05-10"),
    type: "Article",
    title: "Salt features",
    description: (
      <p>
        My approach to feature bloat up-front and how to think differently about
        scope. See the article{" "}
        <SmartLink href="/articles/salt-features">here</SmartLink>.
      </p>
    ),
  },
  {
    date: new Date("2025-05-06"),
    type: "Side project",
    title: "Flashcards",
    description: (
      <p>
        A PWA that contains coding tips that help me to remember mental models
        and syntax. See the project{" "}
        <SmartLink href="https://flashcards.jackbrind.com">here</SmartLink>.
      </p>
    ),
  },
  {
    date: new Date("2025-04-28"),
    type: "Article",
    title: "Cutting unnecessary complexity",
    description: (
      <p>
        This article is about my experience with complexity in design and how I
        like to address it. See the article{" "}
        <SmartLink href="/articles/cutting-unnecessary-complexity">
          here
        </SmartLink>
        .
      </p>
    ),
  },
  {
    date: new Date("2025-04-21"),
    type: "Improvement",
    title: "IA re-structure",
    description: (
      <>
        <p>
          To better accommodate upcoming content, I re-worked the layout which
          includes:
        </p>
        <ul>
          <li>Added housing chrome and layout updates</li>
          <li>Persistent navigation and footer elements</li>
          <li>Moved the /about page into its own page</li>
          <li>Bento grid for featured work on landing page</li>
        </ul>
      </>
    ),
  },
  {
    date: new Date("2025-03-20"),
    type: "Launch",
    title: "v1 launched",
    description: (
      <p>
        I've been meaning to build a personal website for a long time and today
        it finally goes live. Built with Cursor, it is a simple HTML and CSS
        site with some JavaScript for interactivity.
      </p>
    ),
  },
] satisfies ChangelogEntry[];

export const changelog = [...entries].sort(
  (a, b) => b.date.getTime() - a.date.getTime(),
);
