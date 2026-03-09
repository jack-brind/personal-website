import {
  getContentBySlug,
  getAllSlugs,
  getAdjacentContent,
  type SideProjectFrontmatter,
} from "@/lib/content";
import ContentFooter from "@/components/ContentFooter";
import { notFound } from "next/navigation";
import MDXContent from "@/components/MDXContent";
import { SetNavigationTitle } from "@/components/SetNavigationTitle";
import { StackTag } from "@/components/StackTag";
import { RichLink } from "@/components/RichLink";

export async function generateStaticParams() {
  const slugs = await getAllSlugs("side-projects");
  return slugs.map((slug) => ({ slug }));
}

async function SideProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [result, { prev, next }] = await Promise.all([
    getContentBySlug("side-projects", slug),
    getAdjacentContent("side-projects", slug),
  ]);
  if (!result) notFound();
  const { frontmatter: fm, content } = result;
  const frontmatter = fm as SideProjectFrontmatter;
  return (
    <article className="flex flex-col gap-6">
      <SetNavigationTitle title={frontmatter.title} />
      <h1 className="text-display-lg text-balance">{frontmatter.title}</h1>
      <div className="flex items-center gap-6">
        {frontmatter.techStack?.map((item) => (
          <StackTag key={item} logo={item.toLowerCase()} name={item} />
        ))}
      </div>
      <p className="text-secondary font-medium">{frontmatter.description}</p>
      {frontmatter.prodUrl && (
        <RichLink href={frontmatter.prodUrl} sourceUrl={frontmatter.sourceUrl} />
      )}
      <MDXContent source={content} />
      <ContentFooter prev={prev} next={next} basePath="/side-projects" />
    </article>
  );
}

export default SideProjectPage;
