import { getContentBySlug } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";

async function NowPage() {
  const { frontmatter, content } = await getContentBySlug("pages", "now");
  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.description}</p>
      <MDXRemote source={content} />
    </article>
  );
}

export default NowPage;
