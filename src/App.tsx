import { Search } from "./components/Search";
import { Result } from "./components/Result";
import { Favorite } from "./components/Favorite";
import { useState } from "react";
import type { Anime } from "./types/animes";
// react-router-domのインポートを追加
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";

declare module "react" {
  //ReactのHTML要素の属性を拡張してstyle属性にjsxとglobalを追加した。
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

export const App = () => {
  //検索した内容を’Search’から’Result’へ受け渡す
  const [result, setResult] = useState<Anime[]>([]);

  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
console.log(favoriteIds);



  //お気に入り情報をStateに設定
  const [favoriteList, setFavoriteList] = useState<Anime[]>([]);
  

  // //String配列を生成する

  //カンマ区切り文字列に変換する
  const arrIds = favoriteIds.join(",");


  //API送信・受信の関数
  const getFavoriteData = async () => {
    //APIリンク
    const endpoint = "https://api.annict.com/v1/works";

    //APIトークン
    const access_token = "UVol8sjtyTLqvvAtJTRageHvztFssfsdPG3AYAoPXHY";

    //ソート:人気順
    const sort = "sort_watchers_count=desc";

    //fetch()→非同期通信を使ってリクエストとレスポンス取得を行う
    //パラメータ参照（https://developers.annict.com/docs/rest-api/v1/works）
    const res = await fetch(
      `${endpoint}/?filter_ids=${arrIds}&${sort}&access_token=${access_token}`
    );

    //json形式にする
    const data = await res.json();
    return data;
  };
  
  //APIで取得したデータをもとにリストを作成
  const getFavoriteList = async () => {
    const data = await getFavoriteData();
    setFavoriteList(data.works);
  };

  return (
    <BrowserRouter>
      <main>
        <h1>アニメ検索サイト</h1>
        <Link to={`/favorite/`} onClick={() => getFavoriteList()}>お気に入り</Link>
        <Link to={`/search`}>検索</Link>

        <Routes>
          <Route
            path="/search"
            element={
              <>
                <Search setResult={setResult} />
                <Result result={result} favoriteIds={favoriteIds} setFavoriteIds={setFavoriteIds} />
              </>
            }
          />
          <Route
            path="/favorite"
            element={<Favorite favoriteList={favoriteList} />}
          />
        </Routes>

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
