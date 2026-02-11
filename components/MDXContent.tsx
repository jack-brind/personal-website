import { MDXRemote } from "next-mdx-remote/rsc";
import { ComponentPropsWithoutRef } from "react";

// Map MDX headings to ensure only one semantic h1 per page
// Nicer Markdown authoring experience where `#` maps to h2
const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} />,
  h2: (props: ComponentPropsWithoutRef<"h3">) => <h3 {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h4">) => <h4 {...props} />,
};

export default function MDXContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={mdxComponents} />;
}
