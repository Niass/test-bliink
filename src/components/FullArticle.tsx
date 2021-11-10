import { useSelector, shallowEqual } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { formatDate } from "../utils/dateFormat";

export const FullArticle = () => {
  const { articleId } = useParams();
  const articles: readonly IArticle[] = useSelector(
    (state: ArticleState) => state.articles,
    shallowEqual
  );
  const article = articles[articleId ? +articleId : 0];

  if (!article) {
    return <Link to="/">Home</Link>;
  }

  return (
    <div className="Article">
      <div>
        {article.publishedAt ? <p className="publishDate" >{formatDate(new Date(article.publishedAt))}</p> : null}
        <h1>{article.title}</h1>
        <div>
          <img
            style={{ width: "100%", borderRadius: 15, marginTop: 10, height: "15rem" }}
            src={article.urlToImage}
            alt="article"
          />
        </div>
        <div>
          <p>description : {article.description}</p>
        </div>
        <div style={{ marginTop: "15px" }}>
          <p>{article.content}</p>
        </div>
      </div>
    </div>
  );
};
