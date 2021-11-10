import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, Store } from "redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import App from "../../App";
import reducer from "../../store/reducer";

const store: Store<ArticleState, ArticleAction> & {
  dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));

test("renders list of articles", async () => {
  render(<App />, {
    wrapper: () => {
      return (
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      );
    },
  });
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
  const listItems = screen.getAllByRole("article");
  expect(listItems.length).toBeGreaterThan(0);
});
