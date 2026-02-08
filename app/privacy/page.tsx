import { getContentBySlug } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";

async function PrivacyPage() {
  const { frontmatter, content } = await getContentBySlug("pages", "privacy");
  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.description}</p>
      <MDXRemote source={content} />
    </article>
  );
}

export default PrivacyPage;
