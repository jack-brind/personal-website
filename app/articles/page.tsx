import Link from "next/link";
import { getAllContent } from "@/lib/content";

async function ArticlePage() {
  const articles = await getAllContent("articles");

  return (
    <div>
      <h1>Writing</h1>
      <nav className="flex flex-col gap-5">
        {articles.map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}`}>
            {article.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default ArticlePage;
