// import styles from "@/styles/Home.module.css";
import { Search } from "src/components/Search";
// import { Favorite } from "src/components/Favorite";
import { Result } from "src/components/Result";
import { memo, useCallback, useEffect, useState } from "react";
import type { Anime } from "src/types/animes";
import { useCookies } from "react-cookie";
import Link from "next/link";
import Image from 'next/image'
import { Tab } from "src/components/Tab";

declare module "react" {
  //ReactのHTML要素の属性を拡張してstyle属性にjsxとglobalを追加した。
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

export default function Home() {
  //検索した内容を’Search’から’Result’へ受け渡す
  const [result, setResult] = useState<Anime[]>([]);

  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  //お気に入り情報をStateに設定
  const [favoriteList, setFavoriteList] = useState<Anime[]>([]);

  //react-cookieの設定
  const [cookie, setCookie] = useCookies(["CookiesOfFavoriteIds"]);

  //ボタン押下時に「お気に入り」に登録
  const onClickFavorites: React.Dispatch<number> = (id: number) => {
    //お気に入り削除用の配列を再定義（stateの更新は関数実行後のため、再定義　＋　filterでidを除いた配列を再生成）
    const delateId = favoriteIds.filter(
      (favoriteId: number) => favoriteId !== id
    );
    const cleanDelateId = delateId.filter((v) => v);

    //お気に入り追加用の配列を再定義（stateの更新は関数実行後のため、再定義）
    const addId = [...favoriteIds, id];
    const cleanAddId = addId.filter((v) => v);

    //お気に入り(favorite)にidが入っている場合
    if (favoriteIds.includes(id)) {
      setFavoriteIds(cleanDelateId);

      //デバック用
      console.log("cleanDelateId", cleanDelateId);
      console.log("filterFavoriteIds", favoriteIds);

      addCookie(cleanDelateId);

      //お気に入りに追加（スプレット構文で配列に追加）
    } else {
      setFavoriteIds(cleanAddId);

      //デバック用
      console.log("cleanAddId", cleanAddId);
      console.log("setFavoriteIds", favoriteIds);

      addCookie(cleanAddId);
    }
    //デバック用
    console.log("onClickFavorites", favoriteIds);
  };

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
  const addCookie = useCallback(
    (ids: number[]) => {
      const newFavoriteIds = [...ids];
      console.log("newFavoriteIds", newFavoriteIds);
      console.log("ids", ids);

      setCookie("CookiesOfFavoriteIds", newFavoriteIds, {
        path: "/",
        maxAge: 2592000,
      });
      const cookieTest = cookie.CookiesOfFavoriteIds;
      console.log("addCookie", cookieTest);
      return;
    },
    [favoriteIds]
  );

  //loadCookieは入れない（ループが発生するため）
  //favoriteIdsが変わるたびに新たにお気に入りリストを更新する。お気に入り画面からの削除も可能
  useEffect(() => {
    getFavoriteList();
  }, [favoriteIds]);

  //画面遷移時にcookie情報を取得
  const loadCookie = () => {
    //お気に入りがゼロの場合はcookieを取得してfavoriteIdsに反映
    let CookiesOfFavoriteIds = cookie.CookiesOfFavoriteIds;
    console.log("loadCookie", CookiesOfFavoriteIds);

    if (CookiesOfFavoriteIds === undefined) {
      CookiesOfFavoriteIds = [];
      setFavoriteIds(CookiesOfFavoriteIds);
      // デバック用
      console.log("loadCookie", CookiesOfFavoriteIds);
      return;
    } else {
      setFavoriteIds(CookiesOfFavoriteIds);
    }
  };

  //画面遷移（最初の一回）だけSearchページへ遷移する
  const moveToSearch = () => {
    let autoButtom = document.getElementsByClassName(
      "search"
    )[0] as HTMLElement;
    autoButtom.click();
  };

  //画面遷移（最初の一回）に実行する関数
  const firstLoadFunction = () => {
    moveToSearch();
    loadCookie();
  };

  // window.addEventListener("load", firstLoadFunction, { once: true });
  return (
    <main>
      <h1>アニメ検索サイト</h1>

      {/* <nav className="nav">
        <Link href="/favorite" className="favorite nav-item">
          <Image src="img/icon_favorite-active.png" alt="" />
          <p>お気に入り</p>
        </Link>

        <Link href="/Search" className="search nav-item">
          <Image src="img/search.png" alt="" />
          <p>検索</p>
        </Link>
      </nav> */}

      <Tab />

      <div>
        <Search setResult={setResult} />
        {/* <Result
          result={result}
          favoriteIds={favoriteIds}
          setFavoriteIds={setFavoriteIds}
          getFavoriteList={getFavoriteList}
          onClickFavorites={onClickFavorites}
        /> */}
      </div>
      {/* <div>
        <Favorite
          favoriteList={favoriteList}
          favoriteIds={favoriteIds}
          onClickFavorites={onClickFavorites}
        />
      </div> */}
    </main>
  );
}
