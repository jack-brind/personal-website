import { getContentBySlug, getAllSlugs, getAdjacentContent, ArticleItem } from "@/lib/content";
import ContentFooter from "@/components/ContentFooter";
import { notFound } from "next/navigation";
import MDXContent from "@/components/MDXContent";
import { SetNavigationTitle } from "@/components/SetNavigationTitle";
import { format } from "date-fns";
import { TbCalendarWeekFilled, TbClockFilled } from "react-icons/tb";

export async function generateStaticParams() {
  const slugs = await getAllSlugs("articles");
  return slugs.map((slug) => ({ slug }));
}

async function ArticlesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [result, { prev, next }] = await Promise.all([
    getContentBySlug("articles", slug),
    getAdjacentContent("articles", slug),
  ]);
  if (!result) notFound();
  const { frontmatter: fm, content } = result;
  const frontmatter = fm as Omit<ArticleItem, "slug">;
  return (
    <article>
      <SetNavigationTitle title={frontmatter.title} />
      <h1 className="text-display-lg mb-4">{frontmatter.title}</h1>
      <div className="flex items-center gap-6 mb-12">
        {frontmatter.date && (
          <div className="flex items-center gap-1.5">
            <TbCalendarWeekFilled size={16} className="text-secondary" />{" "}
            <p className="text-body-sm">
              {format(new Date(frontmatter.date), "MMMM d, yyyy")}
            </p>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <TbClockFilled size={16} className="text-secondary" />
          <p className="text-body-sm">{frontmatter.readtime} min read</p>
        </div>
      </div>
      <MDXContent source={content} />
      <ContentFooter prev={prev} next={next} basePath="/articles" />
    </article>
  );
}

export default ArticlesPage;
