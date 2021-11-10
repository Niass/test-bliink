import * as React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Dispatch } from "redux";

import { Article } from "./Article";
import { fetchDatas } from "../store/actionCreators";
import "../styles.css";

export const Articles: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const articles: readonly IArticle[] = useSelector(
    (state: ArticleState) => state.articles,
    shallowEqual
  );
  const dispatch: Dispatch<any> = useDispatch();

  const postStatus = useSelector((state: ArticleState) => state.status);

  React.useEffect(() => {
    dispatch(fetchDatas(selectedCategory));
  }, [dispatch, selectedCategory]);

  return (
    <main>
      <h1>Accueil</h1>
      <div className="custom-select">
        <label htmlFor="category-select">Select a category:</label>

        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="pets"
          id="category-select"
        >
          <option value="">All categories</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
      </div>
      {postStatus === "loading" ? (
        <p>Loading...</p>
      ) : (
        <ul aria-labelledby="articles" className="no-bullets">
          {articles.map((article: IArticle, idx) => (
            <li className="btn" role="article" key={idx}>
              <Article articleId={idx} article={article} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};
