import { getContentBySlug, getAllContent } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const sideProjects = await getAllContent("side-projects");
  return sideProjects.map((app) => ({
    slug: app.slug,
  }));
}

async function SideProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { frontmatter, content } = await getContentBySlug(
    "side-projects",
    slug,
  );
  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.description}</p>
      <MDXRemote source={content} />
    </article>
  );
}

export default SideProjectPage;
