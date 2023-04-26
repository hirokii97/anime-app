import { FC, useState } from "react";
import type { Anime } from "../types/animes";

type Props = {
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Search: FC = (props) => {
  const [animeList, setAnimeList] = useState<Anime[]>([]); //アニメ情報をStateに設定
  const [year, setYear] = useState<string | undefined>("2023"); //リリース年をStateに設定
  const [season, setSeason] = useState<string | undefined>("spring"); //リリースシーズンをStateに設定
  const [title, setTitle] = useState<string | undefined>(""); //タイトルをStateに設定
  // const { setValue } = props;

  const getData = async (year?: string  , season?: string) => {
    const endpoint = "https://api.annict.com/v1/works";//APIリンク
    const access_token = "UVol8sjtyTLqvvAtJTRageHvztFssfsdPG3AYAoPXHY";
    const sort = "sort_watchers_count=desc";

    //fetch()→非同期通信を使ってリクエストとレスポンス取得を行う
    //パラメータ参照（https://developers.annict.com/docs/rest-api/v1/works）
    const res = await fetch(
      `${endpoint}/?filter_season=${year}-${season}&${sort}&filter_title=${title}&access_token=${access_token}`
    );
    const data = await res.json(); //json形式にする
    return data;
  };

    const onSearch = async ( setValue: React.Dispatch<React.SetStateAction<boolean>>) => {
    const data = await getData(year,season);
    setAnimeList(data.works); //'works'の中にデータがあるため指定する
    console.log(animeList);
    props.setValue(false);
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
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} autoComplete="on"/>
      <button onClick={ () => onSearch(setValue)}>検索</button>

    </>
  );
};
