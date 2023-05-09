import { SetStateAction, useEffect, useState } from "react";
import type { Anime } from "../types/animes";

type Props = {
  setResult: React.Dispatch<SetStateAction<Anime[]>>;
};

declare module "react" {
  //ReactのHTML要素の属性を拡張してstyle属性にjsxとglobalを追加した。
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

export const Search = (props: Props) => {
  //アニメ情報をStateに設定
  const [animeList, setAnimeList] = useState<Anime[]>([]);

  //リリース年をStateに設定
  const [year, setYear] = useState<string | undefined>("2023");

  //リリースシーズンをStateに設定
  const [season, setSeason] = useState<string | undefined>("spring");

  //タイトルをStateに設定
  const [title, setTitle] = useState<string | undefined>("");

  //API送信用の年、季節（filterSeason）をStateに設定
  const [filterSeason, setFilterSeason] = useState<string | undefined>("");

  //API送信・受信の関数
  const getData = async (year?: string, season?: string) => {
    //APIリンク
    const endpoint = "https://api.annict.com/v1/works";

    //APIトークン
    const access_token = "UVol8sjtyTLqvvAtJTRageHvztFssfsdPG3AYAoPXHY";

    //ソート:人気順
    const sort = "sort_watchers_count=desc";

    //fetch()→非同期通信を使ってリクエストとレスポンス取得を行う
    //パラメータ参照（https://developers.annict.com/docs/rest-api/v1/works）
    const res = await fetch(
      `${endpoint}/?filter_season=${filterSeason}&${sort}&filter_title=${title}&access_token=${access_token}`
    );

    //json形式にする
    const data = await res.json();
    return data;
  };

  //APIで取得したデータをもとにリストを作成
  const onSearch = async () => {
    const data = await getData(year, season);
    setAnimeList(data.works);
  };

  useEffect(() => {
    props.setResult(animeList);
  }, [animeList]);

  useEffect(() => {
    const getFilterSeason = () => {
      let value = "";

      if (year !== "all" && season !== "all") {
        value = `${year}-${season}`;
        return value;
      }
      if (year !== "all") {
        value = `${year}-${season}`;
        return value;
      }
      return value;
    };
    setFilterSeason(getFilterSeason());
  }, [year, season]);

  return (
    <section>
      <select
        name=""
        id=""
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="all">全て</option>
        <option value="2020">2020年</option>
        <option value="2021">2021年</option>
        <option value="2022">2022年</option>
        <option value="2023">2023年</option>
      </select>
      {year !== "all" && (
        <select
          name=""
          id=""
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          {/* <option value="all">全て</option> */}
          <option value="spring">春</option>
          <option value="summer">夏</option>
          <option value="autumn">秋</option>
          <option value="winter">冬</option>
        </select>
      )}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoComplete="on"
      />
      <button onClick={() => onSearch()}>検索</button>

      <style jsx>
        {`
          section {
            text-align: center;
          }
        `}
      </style>
    </section>
  );
};
