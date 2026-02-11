import { getContentBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

async function PrivacyPage() {
  const result = await getContentBySlug("pages", "privacy");
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

export default PrivacyPage;
