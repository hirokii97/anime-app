import { Search } from "./components/Search";
import { Result } from "./components/Result";
import { Favorite } from "./components/Favorite";
import { useState } from "react";
import type { Anime } from "./types/animes";
// react-router-domのインポートを追加
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

declare module "react" {
  //ReactのHTML要素の属性を拡張してstyle属性にjsxとglobalを追加した。
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

export const App = () => {
  const [value, setValue] = useState<Anime[]>([]);
  console.log(value);

  return (
    <BrowserRouter>
      <main>
        <h1>アニメ検索サイト</h1>
        <Link to="/favorite">お気に入り</Link>
        <Link to="/search">検索</Link>

        <Switch>
          <Route exact path='/search'>
            <Search setValue={setValue} />
            <Result result={value} />
          </Route>
          <Route exact path="/favorite">
            <Favorite />
          </Route>
        </Switch>

        <style jsx>
          {`
            h1 {
              text-align: center;
            }
          `}
        </style>
      </main>
    </BrowserRouter>
  );
};
