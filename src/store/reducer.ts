import * as actionTypes from "./actionTypes";

const initialState: ArticleState = {
  articles: [],
  status: "idle",
};

const reducer = (state: ArticleState = initialState, action: ArticleActionFetch): ArticleState => {
  switch (action.type) {
    case actionTypes.FETCH_DATA:
      return {
        articles: action.articles,
        status: "idle",
      };
    case actionTypes.LOADING:
      return {
        ...state,
        status: "loading",
      };
  }
  return state;
};

export default reducer;
