import { getContentBySlug, getAllContent } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const articles = await getAllContent("writing");
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

async function WritingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { frontmatter, content } = await getContentBySlug("writing", slug);
  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.description}</p>
      <MDXRemote source={content} />
    </article>
  );
}

export default WritingPage;
