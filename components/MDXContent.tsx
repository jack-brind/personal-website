import { MDXRemote } from "next-mdx-remote/rsc";
import { ComponentPropsWithoutRef } from "react";
import { Figure, InlineImage } from "@/components/Figure";
import CaseStudyFooter from "@/components/CaseStudyFooter";
import { SmartLink } from "@/components/SmartLink";

// Map MDX headings to ensure only one semantic h1 per page
// Nicer Markdown authoring experience where `#` maps to h2
const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} />,
  h2: (props: ComponentPropsWithoutRef<"h3">) => <h3 {...props} />,
  h3: (props: ComponentPropsWithoutRef<"h4">) => <h4 {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong style={{ fontWeight: 600 }} {...props} />
  ),
  a: ({ href, children }: ComponentPropsWithoutRef<"a">) => (
    <SmartLink href={href ?? "#"}>{children}</SmartLink>
  ),
  Figure,
  InlineImage,
  CaseStudyFooter,
  SmartLink,
};

export default function MDXContent({ source }: { source: string }) {
  return (
    <div className="prose">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}
