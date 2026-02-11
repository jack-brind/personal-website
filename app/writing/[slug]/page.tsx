import { getContentBySlug, getAllSlugs } from "@/lib/content";
import { notFound } from "next/navigation";
import MDXContent from "@/components/MDXContent";

export async function generateStaticParams() {
  const slugs = await getAllSlugs("writing");
  return slugs.map((slug) => ({ slug }));
}

async function WritingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getContentBySlug("writing", slug);
  if (!result) notFound();
  const { frontmatter, content } = result;
  return (
    <article>
      <h1 className="text-display-xl">{frontmatter.title}</h1>
      <p>{frontmatter.description}</p>
      <MDXContent source={content} />
    </article>
  );
}

export default WritingPage;
