import { getAllContent } from "@/lib/content";
import { SmartLink } from "./SmartLink";

async function ArticleList() {
  const articles = await getAllContent("articles");

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-body-lg mb-3">Articles</h2>
      {articles.map((article) => (
        <SmartLink
          variant="article"
          key={article.slug}
          href={`/articles/${article.slug}`}
        >
          <p>{article.title}</p>
        </SmartLink>
      ))}
    </div>
  );
}

export default ArticleList;
