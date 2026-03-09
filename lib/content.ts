import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

interface BaseFrontmatter {
  title: string;
  description: string;
  date?: string;
  image?: string;
  readtime?: number;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}

interface CaseStudyFrontmatter extends BaseFrontmatter {
  date: string;
  company: string;
  keyImpact: string;
  role: string;
  team: string;
  timeline: string;
  longReadtime?: number;
  featured?: boolean;
}

export interface SideProjectFrontmatter extends BaseFrontmatter {
  techStack?: string[];
  prodUrl?: string;
  repoUrl?: string;
  sourceUrl?: string;
}

interface ArticleFrontmatter extends BaseFrontmatter {
  category?: string[];
}

export type CaseStudyItem = CaseStudyFrontmatter & { slug: string };
export type SideProjectItem = SideProjectFrontmatter & { slug: string };
export type ArticleItem = ArticleFrontmatter & { slug: string };

export type ContentItem = CaseStudyItem | SideProjectItem | ArticleItem;

// Average adult reading time in Words Per Minute
const WORDS_PER_MINUTE = 225;

function calculateReadingTime(
  content: string,
  wordsPerMinute = WORDS_PER_MINUTE,
): number {
  const stripped = content
    .replace(/<[^>]+>/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/[#*_\[\]()>!]/g, "")
    .replace(/https?:\/\/\S+/g, "");
  const wordCount = stripped.trim().split(/\s+/).filter(Boolean).length;
  return Math.round(wordCount / wordsPerMinute);
}

function readFile(localPath: string): Promise<string> {
  return fs.readFile(path.join(process.cwd(), localPath), "utf-8");
}

function readDirectory(localPath: string): Promise<string[]> {
  return fs.readdir(path.join(process.cwd(), localPath));
}

export async function getAllContent(type: string): Promise<ContentItem[]> {
  const fileNames: string[] = await readDirectory(`/content/${type}`);
  const items: ContentItem[] = [];

  for (const fileName of fileNames) {
    const rawContent: string = await readFile(`/content/${type}/${fileName}`);
    const { data: frontmatter } = matter(rawContent) as unknown as {
      data: Omit<ContentItem, "slug">;
    };

    items.push({
      ...frontmatter,
      slug: fileName.replace(".mdx", ""),
    });
  }

  return items.sort((a: ContentItem, b: ContentItem) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return a.date < b.date ? 1 : -1;
  });
}

export async function getAllSlugs(type: string): Promise<string[]> {
  const fileNames = await readDirectory(`/content/${type}`);
  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(".mdx", ""));
}

export async function getAdjacentContent(
  type: string,
  slug: string,
): Promise<{
  prev: { title: string; slug: string } | null;
  next: { title: string; slug: string } | null;
}> {
  const allItems = await getAllContent(type);
  const index = allItems.findIndex((item) => item.slug === slug);
  const prev =
    index > 0
      ? { title: allItems[index - 1].title, slug: allItems[index - 1].slug }
      : null;
  const next =
    index < allItems.length - 1
      ? { title: allItems[index + 1].title, slug: allItems[index + 1].slug }
      : null;
  return { prev, next };
}

export async function getContentBySlug(
  type: string,
  slug: string,
): Promise<{ frontmatter: Omit<ContentItem, "slug">; content: string } | null> {
  try {
    const rawContent: string = await readFile(`/content/${type}/${slug}.mdx`);
    const { data: frontmatter, content } = matter(rawContent) as unknown as {
      data: Omit<ContentItem, "slug">;
      content: string;
    };

    if (!frontmatter.readtime) {
      frontmatter.readtime = calculateReadingTime(content);
    }

    return { frontmatter, content };
  } catch {
    return null;
  }
}
