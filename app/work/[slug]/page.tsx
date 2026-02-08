import { getContentBySlug, getAllContent } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const caseStudies = await getAllContent("case-studies");
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter, content } = await getContentBySlug("case-studies", slug);
  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.description}</p>
      <MDXRemote source={content} />
    </article>
  );
}

export default CaseStudyPage;
