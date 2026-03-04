import { getContentBySlug, getAllSlugs } from "@/lib/content";
import { notFound } from "next/navigation";
import MDXContent from "@/components/MDXContent";
import { SetNavigationTitle } from "@/components/SetNavigationTitle";

export async function generateStaticParams() {
  const slugs = await getAllSlugs("articles");
  return slugs.map((slug) => ({ slug }));
}

async function ArticlesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getContentBySlug("articles", slug);
  if (!result) notFound();
  const { frontmatter, content } = result;
  return (
    <article>
      <SetNavigationTitle title={frontmatter.title} />
      <h1 className="text-display-lg mb-8">{frontmatter.title}</h1>
      <MDXContent source={content} />
    </article>
  );
}

export default ArticlesPage;
