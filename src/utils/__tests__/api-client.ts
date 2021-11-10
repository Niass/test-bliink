import { rest } from "msw";
import { setupServer } from "msw/node";
import { client } from "../api-client";

const apiURL = "https://newsapi.org/v2/top-headlines";

const mockResult = { articles: [] };
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

test("makes GET requests to the given endpoint", async () => {
  server.use(
    rest.get(`${apiURL}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult));
    })
  );

  const result = await client({});

  expect(result).toEqual(mockResult);
});
