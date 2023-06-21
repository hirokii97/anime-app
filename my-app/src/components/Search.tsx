import { Anime } from "@/types/animes";
import { useEffect, useState } from "react";

export const Search = (props:any) => {
  //アニメ情報をStateに設定
  const [animeList, setAnimeList] = useState<Anime[]>([]);

  //リリース年をStateに設定
  const [year, setYear] = useState<string | undefined>("2023");

  //リリースシーズンをStateに設定
  const [season, setSeason] = useState<string | undefined>("spring");

  //タイトルをStateに設定
  const [title, setTitle] = useState<string | undefined>("");

  //API送信用の年、季節（filterSeason）をStateに設定
  const [filterSeason, setFilterSeason] = useState<string | undefined>(
    "2023-spring"
  );

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
    window.addEventListener("load", onSearch(), { once: true });
  },[])

  useEffect(() => {
    props.setResult(animeList);
  }, [animeList]);

  // const handleYear = (e: any) => {
  //   setYear(e.target.value);
  //   console.log("handleYear", "a");
  // };
  const handleSeason = (e: any) => {
    setSeason(e.target.value);
  };
  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

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
      <label className="selectbox-002">
        <select name="" id="" value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="all">全て</option>
          <option value="2020">2020年</option>
          <option value="2021">2021年</option>
          <option value="2022">2022年</option>
          <option value="2023">2023年</option>
        </select>
      </label>
      {year !== "all" && (
        <label className="selectbox-002">
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
        </label>
      )}

      <form action="" className="search-form-005">
        <label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="on"
            placeholder="キーワードを入力"
          />
        </label>
        <button onClick={onSearch} aria-label="検索" type="button">
          <img src="../img/search.png" alt="" />
        </button>
      </form>

      <style jsx>
        {`
          section {
            text-align: center;
          }

          .selectbox-002 {
            position: relative;
            display: block;
            position: relative;
            height: 50px;
            width: 251px;
            margin: 0 auto;
          }

          .selectbox-002::before,
          .selectbox-002::after {
            position: absolute;
            content: "";
            pointer-events: none;
          }

          .selectbox-002::before {
            right: 0;
            display: inline-block;
            width: 2.8em;
            height: 2.8em;
            border-radius: 0 3px 3px 0;
            background-color: #2589d0;
            content: "";
          }

          .selectbox-002::after {
            position: absolute;
            top: 50%;
            right: 1.4em;
            transform: translate(50%, -50%) rotate(45deg);
            width: 6px;
            height: 6px;
            border-bottom: 3px solid #fff;
            border-right: 3px solid #fff;
            content: "";
          }

          .selectbox-002 select {
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            min-width: 230px;
            height: 2.8em;
            padding: 0.4em 3.6em 0.4em 0.8em;
            border: 2px solid #2589d0;
            border-radius: 3px;
            color: #333333;
            font-size: 1em;
            cursor: pointer;
          }

          .selectbox-002 select:focus {
            outline: 1px solid #2589d0;
          }

          .search-form-005 {
            display: flex;
            align-items: center;
            overflow: hidden;
            border-radius: 3px;
            width: 300px;
            margin: 20px auto;
          }

          .search-form-005 input {
            width: 250px;
            height: 45px;
            padding: 5px 15px;
            border: none;
            border-radius: 3px 0 0 3px;
            box-sizing: border-box;
            background-color: #e6edf3;
            font-size: 1em;
            outline: none;
          }

          .search-form-005 input::placeholder {
            color: #767d83;
          }

          .search-form-005 button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 45px;
            border: none;
            border-radius: 0 3px 3px 0;
            background-color: #2589d0;
            cursor: pointer;
          }

          .search-form-005 button img {
            width: 25px;
            height: 25px;
          }
        `}
      </style>
    </section>
  );
};
