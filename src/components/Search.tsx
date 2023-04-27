import { FC, SetStateAction, useState } from "react";
import type { Anime } from "../types/animes";

interface SearchProps {
  // Dispatch は、useState フックの返り値である setState の型エイリアスであり、SetStateAction は setState に渡される値の型
  setValue: React.Dispatch<SetStateAction<Anime[]>>;
}

export const Search: FC<SearchProps> = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]); //アニメ情報をStateに設定
  const [year, setYear] = useState<string | undefined>("2023"); //リリース年をStateに設定
  const [season, setSeason] = useState<string | undefined>("spring"); //リリースシーズンをStateに設定
  const [title, setTitle] = useState<string | undefined>(""); //タイトルをStateに設定

  //API送信
  const getData = async (year?: string, season?: string) => {
    const endpoint = "https://api.annict.com/v1/works"; //APIリンク
    const access_token = "UVol8sjtyTLqvvAtJTRageHvztFssfsdPG3AYAoPXHY"; //APIトークン
    const sort = "sort_watchers_count=desc"; //ソート:人気順

    //fetch()→非同期通信を使ってリクエストとレスポンス取得を行う
    //パラメータ参照（https://developers.annict.com/docs/rest-api/v1/works）
    const res = await fetch(
      `${endpoint}/?filter_season=${year}-${season}&${sort}&filter_title=${title}&access_token=${access_token}`
    );
    const data = await res.json(); //json形式にする
    return data;
  };

  //APIで取得したデータをもとにリストを作成
  const onSearch = async (props: SearchProps) => {
    const data = await getData(year, season);
    setAnimeList(data.works);
    props.setValue(animeList);
  };

  return (
    <>
      <select
        name=""
        id=""
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="">全て</option>
        <option value="2020">2020年</option>
        <option value="2021">2021年</option>
        <option value="2022">2022年</option>
        <option value="2023">2023年</option>
      </select>
      <select
        name=""
        id=""
        value={season}
        onChange={(e) => setSeason(e.target.value)}
      >
        <option value="spring">春</option>
        <option value="summer">夏</option>
        <option value="autumn">秋</option>
        <option value="winter">冬</option>
      </select>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoComplete="on"
      />
      <button onClick={() => onSearch()}>検索</button>
    </>
  );
};
