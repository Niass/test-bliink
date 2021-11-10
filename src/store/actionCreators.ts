import * as actionTypes from "./actionTypes";
import { client } from "../utils/api-client";

export function fetchDatas(category: string) {
  const action: ArticleAction = {
    type: actionTypes.FETCH_DATA,
    category,
  };

  return fetchActionData(action);
}

function fetchActionData(action: ArticleAction) {
  return async (dispatch: DispatchType) => {
    try {
      dispatch({ type: actionTypes.LOADING, articles:[] });
      const { articles } = await client({ category: action.category });
      dispatch({ type: action.type, articles });
    } catch (e) {
      console.log("error fetch");
    }
  };
}
