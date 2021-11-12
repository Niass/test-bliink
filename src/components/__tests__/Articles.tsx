import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, Store } from "redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "../../App";
import reducer from "../../store/reducer";

const apiURL = "https://newsapi.org/v2/top-headlines";

const mockResult = {
  articles: [
    {
      publishedAt: "2021-11-12T09:16:00Z",
      title: "Welcome to Bliink",
      urlToImage:
        "https://images.midilibre.fr/api/v1/images/view/618e2f7bd286c256237045a9/large/image.jpg?v=1",
      content: "Fake content",
      description: "Fake description",
    },
    {
      publishedAt: "2021-10-12T09:16:00Z",
      title: "Welcome to Wild Code School",
      urlToImage:
        "https://images.midilibre.fr/api/v1/images/view/618e2f7bd286c256237045a9/large/image.jpg?v=1",
      content: "Become a great developer",
      description: "Hard work pays",
    },
  ],
};
const server = setupServer(
  rest.get(apiURL, (req, res, ctx) => {
    return res(ctx.json(mockResult));
  })
);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

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
  // No data before first loading
  expect(screen.queryByText(new RegExp(mockResult.articles[0].title, "i"))).not.toBeInTheDocument();
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

  // Data fetched and store in redux store and rendered
  const listItems = screen.getAllByRole("article");
  expect(screen.getByText(new RegExp(mockResult.articles[0].title, "i"))).toBeInTheDocument();
  expect(listItems.length).toEqual(2);
});
