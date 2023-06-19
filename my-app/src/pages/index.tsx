import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Tab } from "@/components/Tab";
import { HeadLine } from "@/components/HeadLine";
import { Search } from "@/components/Search";
import { Result } from "@/components/Result";
import { useEffect, useState } from "react";
import { Anime } from "@/types/animes";
import React from "react";
import { atom, useAtom, useSetAtom } from "jotai";
import { animeAtom } from "@/atoms";
import { favoriteIdAtom , favoriteListAtom } from "./atoms";

const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
function Home() {
  //検索した内容を’Search’から’Result’へ受け渡す
  const [result, setResult] = useState<Anime[]>([]);

  const [favoriteIds, setFavoriteIds] = useAtom<number[]>(favoriteIdAtom);

  // //お気に入り情報をStateに設定
  const [favoriteList, setFavoriteList] = useAtom<Anime[]>(favoriteListAtom);



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

  //loadCookieは入れない（ループが発生するため）
  //favoriteIdsが変わるたびに新たにお気に入りリストを更新する。お気に入り画面からの削除も可能
  useEffect(() => {
    getFavoriteList();
  }, [favoriteIds]);

  return (
    <>
      <HeadLine />
      <main className={`${styles.main} ${inter.className}`}>
        <h1>アニメ検索サイト</h1>
        <div className={styles.description}></div>
        <Search setResult={setResult} />
        <Result 
        result={result} 
        onClickFavorites={onClickFavorites} 
        getFavoriteList={getFavoriteList} />
        <Tab />
      </main>
    </>
  );
}
export default React.memo(Home);
