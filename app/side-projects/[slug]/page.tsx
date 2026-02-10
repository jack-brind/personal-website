import { getContentBySlug, getAllSlugs } from "@/lib/content";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

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
  const result = await getContentBySlug("side-projects", slug);
  if (!result) notFound();
  const { frontmatter, content } = result;
  return (
    <article>
      <h1 className="text-display-xl">{frontmatter.title}</h1>
      <p>{frontmatter.description}</p>
      <MDXRemote source={content} />
    </article>
  );
}

export default SideProjectPage;
