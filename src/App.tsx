import * as React from "react";
import { Routes, Route } from "react-router-dom";

import { Articles } from "./components/Articles";
import { FullArticle } from "./components/FullArticle";

const App: React.FC = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="article/:articleId" element={<FullArticle />} />
      </Routes>
    </main>
  );
};

export default App;
