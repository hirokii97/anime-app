import type { Anime } from "./types/animes";
import { useState } from "react";

export const App = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]); //アニメ情報をStateに設定
  const [year, setYear] = useState<string | undefined>("2023"); //リリース年をStateに設定
  const [season, setSeason] = useState<string | undefined>("spring"); //リリースシーズンをStateに設定
  const [title, setTitle] = useState<string | undefined>(""); //タイトルをStateに設定

  const getData = async (year?: string  , season?:string) => {
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

  const onSearch = async () => {
    const data = await getData(year,season);
    setAnimeList(data.works); //'works'の中にデータがあるため指定する
    console.log(animeList);
  };

  return (
    <>
      <h1>アニメ検索サイト</h1>
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
      <button onClick={onSearch}>検索</button>

      {/* map()=>{} 配列を順番に処理 */}
      {animeList.map((list) => (
        <div key={list.id}>
          <p>
            画像：
            <img
              src={
                list.images.recommended_url ||
                list.images.facebook.og_image_url ||
                list.images.twitter.image_url ||
                "img/no-image.jpg"
              }
              alt=""
            />
          </p>
          <p>タイトル: {`${list.title}`}</p>
          <p>読み: {`${list.title_kana}`}</p>
          <p>媒体: {`${list.media_text}`}</p>
          <p>リリース時期: {`${list.season_name_text}`}</p>
          <p>
            公式URL:{" "}
            <a
              href={`${list.official_site_url}`}
            >{`${list.official_site_url}`}</a>
          </p>
          <p>公式Twitter: {`${list.twitter_username}`}</p>
          <p>Twitter ハッシュタグ: ＃{`${list.twitter_hashtag}`}</p>
          <p>エピソード数: {`${list.episodes_count}`}</p>
          <p>見てる ・ 見たい ・ 見た人の数: {`${list.watchers_count}`}</p>
          <p>レビュー数: {`${list.reviews_count}`}</p>
        </div>
      ))}
    </>
  );
};
