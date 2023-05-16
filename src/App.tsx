import { Search } from "./components/Search";
import { Result } from "./components/Result";
import { Favorite } from "./components/Favorite";
import { memo, useCallback, useEffect, useState } from "react";
import type { Anime } from "./types/animes";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
// import Cookies from "js-cookie";
import { useCookies } from "react-cookie";

declare module "react" {
  //ReactのHTML要素の属性を拡張してstyle属性にjsxとglobalを追加した。
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

export const App = memo(() => {
  //検索した内容を’Search’から’Result’へ受け渡す
  const [result, setResult] = useState<Anime[]>([]);

  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  //お気に入り情報をStateに設定
  const [favoriteList, setFavoriteList] = useState<Anime[]>([]);

  //react-cookieの設定
  const [cookie, setCookie] = useCookies(["CookiesOfFavoriteIds"]);

  //お気に入りに登録
  const onClickFavorites = useCallback(
    (id: any) => {
      //再定義

      //お気に入り(favorite)にidが入っている場合
      if (favoriteIds.includes(id)) {
        //お気に入りから削除（filterでidを除いた配列を再生成）
        setFavoriteIds(
          favoriteIds.filter((favoriteId: number) => favoriteId !== id)
        );
        console.log("filterFavoriteIds", favoriteIds);

        //お気に入りに追加（スプレット構文で配列に追加）
      } else {
        setFavoriteIds([...favoriteIds, id]);
        console.log("setFavoriteIds", favoriteIds);
      }
      addCookie();

      console.log("onClickFavorites", favoriteIds);
    },
    [favoriteIds]
  );

  //お気に入りに登録した情報を取得（API送信・受信の関数）
  const getFavoriteData = async () => {
    const arrIds = favoriteIds.join(",");

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

  //お気に入りのリストを作成
  const getFavoriteList = async () => {
    const data = await getFavoriteData();
    const newFavoriteList = data;
    setFavoriteList(newFavoriteList.works);
  };

  //react-cookiesに登録
  const addCookie = () => {
    setCookie("CookiesOfFavoriteIds", favoriteIds, {
      path: "/",
      maxAge: 2592000,
    });
    const cookieTest = cookie.CookiesOfFavoriteIds;
    console.log("addCookie", cookieTest);
  };

  //loadCookieは入れない（ループが発生する）
  useEffect(() => {
    //favoriteIdsが変わるたびに新たにお気に入りリストを更新する（お気に入り画面からの削除も可能）
    getFavoriteList();
  }, [favoriteIds]);

  //修正候補
  const loadCookie = useCallback(() => {
    //お気に入りがゼロの場合はcookieを取得してfavoriteIdsに反映
    if (favoriteIds.length === 0) {
      const CookiesOfFavoriteIds = cookie.CookiesOfFavoriteIds;
      setFavoriteIds(CookiesOfFavoriteIds);
      console.log("loadCookie", CookiesOfFavoriteIds);
    }
    return;
  }, [favoriteIds]);

  //最初の一回だけSearchページへ遷移する
  const moveToSearch = () => {
    let autoButtom = document.getElementsByClassName(
      "search"
    )[0] as HTMLElement;
    autoButtom.click();
  };

  const firstLoadFunction = () => {
    moveToSearch();
    loadCookie();
  };

  window.addEventListener("load", firstLoadFunction, { once: true });

  //修正前
  // const moveToSearch = () => {
  //   let autoButtom = document.getElementsByClassName(
  //     "search"
  //   )[0] as HTMLElement;
  //   autoButtom.click();
  // };

  // const loadFunction = () => {
  //   moveToSearch();
  // };

  // window.addEventListener("load", loadFunction, { once: true });

  return (
    <BrowserRouter>
      <main>
        <h1>アニメ検索サイト</h1>

        <nav className="nav">
          <Link
            to={`/favorite/`}
            className="favorite nav-item"
            // onClick={() => getFavoriteList()}
          >
            <img src="../img/icon_favorite-active.png" alt="" />
            <p>お気に入り</p>
          </Link>

          <Link to={`/search`} className="search nav-item">
            <img src="../img/search.png" alt="" />
            <p>検索</p>
          </Link>
        </nav>

        <Routes>
          <Route
            path="/search"
            element={
              <>
                <Search setResult={setResult} />
                <Result
                  result={result}
                  favoriteIds={favoriteIds}
                  setFavoriteIds={setFavoriteIds}
                  getFavoriteList={getFavoriteList}
                  onClickFavorites={onClickFavorites}
                />
              </>
            }
          />
          <Route
            path="/favorite"
            element={
              <Favorite
                favoriteList={favoriteList}
                favoriteIds={favoriteIds}
                onClickFavorites={onClickFavorites}
              />
            }
          />
        </Routes>

        <style jsx>
          {`
            @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&display=swap");

            body {
              font-family: "Noto Sans JP", sans-serif;
            }
            main {
              padding-bottom: 98px;
            }

            h1 {
              text-align: center;
            }

            .nav {
              display: flex;
              position: fixed;
              bottom: 0;
              left: 0;
              width: 100%;
              border: 1px solid black;
              box-sizing: border-box;
              background-color: white;
            }

            .nav-item {
              width: 50%;
              height: 60px;
              text-align: center;
              text-decoration: none;
              border: 1px solid black;
              padding: 8px;
            }

            .nav-item img {
              width: 36px;
              height: 36px;
            }
            .nav-item p {
              margin: 0;
              color: black;
            }
          `}
        </style>
      </main>
    </BrowserRouter>
  );
});
