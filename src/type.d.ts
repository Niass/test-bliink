interface IArticle {
  id: number;
  title: string;
  body: string;
  author?: string;
  description: string;
  content?: string;
  publishedAt?: Date;
  source?: { id: null; name: string };
  title?: string;
  url?: string;
  urlToImage?: string;
}

type ArticleState = {
  status: string;
  articles: IArticle[];
};

type ArticleAction = {
  type: string;
  category: string;
};
type ArticleActionFetch = {
  type: string;
  category: string;
  articles: IArticle[];
};
type ArticlesAction = {
  type: string;
  articles: IArticle[];
  category: string;
};
type ArticlesActionDisp = {
  type: string;
  articles: IArticle[];
};

type DispatchType = (args: ArticlesActionDisp) => ArticlesActionDisp;
