import { getContentBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

async function NowPage() {
  const result = await getContentBySlug("pages", "now");
  if (!result) notFound();
  const { frontmatter, content } = result;
  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.description}</p>
      <MDXRemote source={content} />
    </article>
  );
}

export default NowPage;
