import { getContentBySlug, getAllSlugs, getAdjacentContent, CaseStudyItem } from "@/lib/content";
import ContentFooter from "@/components/ContentFooter";
import { notFound } from "next/navigation";
import MDXContent from "@/components/MDXContent";
import { SetNavigationTitle } from "@/components/SetNavigationTitle";

export async function generateStaticParams() {
  const slugs = await getAllSlugs("case-studies");
  return slugs.map((slug) => ({ slug }));
}

async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [result, { prev, next }] = await Promise.all([
    getContentBySlug("case-studies", slug),
    getAdjacentContent("case-studies", slug),
  ]);
  if (!result) notFound();
  const { frontmatter: fm, content } = result;
  const frontmatter = fm as CaseStudyItem;
  return (
    <article className="flex flex-col gap-6">
      <SetNavigationTitle title={frontmatter.title} />
      <h1 className="text-display-lg text-balance">{frontmatter.title}</h1>
      <p className="font-medium">
        {frontmatter.company}, {new Date(frontmatter.date).getFullYear()}
      </p>
      <p className="mb-12 text-secondary font-medium">
        {frontmatter.description}
      </p>
      <MDXContent source={content} />
      <ContentFooter prev={prev} next={next} basePath="/work" />
    </article>
  );
}

export default CaseStudyPage;
