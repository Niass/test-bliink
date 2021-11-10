import * as React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/dateFormat";

type Props = {
  article: IArticle;
  articleId: number;
};

export const Article: React.FC<Props> = ({ article, articleId }) => {
  return (
    <Link to={`/article/${articleId}`}>
      <div className="Article">
        <div>
          {article.publishedAt ? <p>{formatDate(new Date(article.publishedAt))}</p> : null}
          <h1>{article.title}</h1>
          <p>{article.body}</p>
          <div>
            <img
              style={{ width: "100%", borderRadius: 15, marginTop: 10, height: "15rem" }}
              src={article.urlToImage}
              alt="article"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
