import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

interface BaseFrontmatter {
  title: string;
  description: string;
  date?: string;
  readtime?: number;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}

interface CaseStudyFrontmatter extends BaseFrontmatter {
  company: string;
  keyImpact: string;
  role: string;
  team: string;
  timeline: string;
  longReadtime?: number;
  featured?: boolean;
}

interface SideProjectFrontmatter extends BaseFrontmatter {
  techStack?: string[];
  prodUrl?: string;
  repoUrl?: string;
}

interface ArticleFrontmatter extends BaseFrontmatter {
  publication?: string;
  category?: string[];
}

type ContentFrontmatter =
  | CaseStudyFrontmatter
  | SideProjectFrontmatter
  | ArticleFrontmatter
  | BaseFrontmatter;

type ContentItem = ContentFrontmatter & {
  slug: string;
};

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
      data: ContentFrontmatter;
    };

    items.push({
      slug: fileName.replace(".mdx", ""),
      ...frontmatter,
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

export async function getContentBySlug(
  type: string,
  slug: string,
): Promise<{ frontmatter: ContentFrontmatter; content: string } | null> {
  try {
    const rawContent: string = await readFile(`/content/${type}/${slug}.mdx`);
    const { data: frontmatter, content } = matter(rawContent) as unknown as {
      data: ContentFrontmatter;
      content: string;
    };

    return { frontmatter, content };
  } catch {
    return null;
  }
}
