import { getContentBySlug, getAllSlugs } from "@/lib/content";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

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
  const result = await getContentBySlug("case-studies", slug);
  if (!result) notFound();
  const { frontmatter, content } = result;
  return (
    <article>
      <h1 className="text-display-xl">{frontmatter.title}</h1>
      <p className="mb-12">{frontmatter.description}</p>
      <MDXRemote source={content} />
    </article>
  );
}

export default CaseStudyPage;
