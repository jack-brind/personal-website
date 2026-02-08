import { getContentBySlug } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";

async function ColophonPage() {
  const { frontmatter, content } = await getContentBySlug("pages", "colophon");
  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.description}</p>
      <MDXRemote source={content} />
    </article>
  );
}

export default ColophonPage;
