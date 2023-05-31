// import { Anime } from "@/types/animes";
// import { useEffect, useState } from "react";
// // import { useLocation } from "react-router-dom";

// export const useSearch = () => {
//   //アニメ情報をStateに設定
//   const [animeList, setAnimeList] = useState<Anime[]>([]);

//   //リリース年をStateに設定
//   const [year, setYear] = useState<string | undefined>("2023");

//   //リリースシーズンをStateに設定
//   const [season, setSeason] = useState<string | undefined>("spring");

//   //タイトルをStateに設定
//   const [title, setTitle] = useState<string | undefined>("");

//   //API送信用の年、季節（filterSeason）をStateに設定
//   const [filterSeason, setFilterSeason] = useState<string | undefined>(
//     "2023-spring"
//   );

//   //API送信・受信の関数
//   const getData = async (year?: string, season?: string) => {
//     //APIリンク
//     const endpoint = "https://api.annict.com/v1/works";

//     //APIトークン
//     const access_token = "UVol8sjtyTLqvvAtJTRageHvztFssfsdPG3AYAoPXHY";

//     //ソート:人気順
//     const sort = "sort_watchers_count=desc";

//     //fetch()→非同期通信を使ってリクエストとレスポンス取得を行う
//     //パラメータ参照（https://developers.annict.com/docs/rest-api/v1/works）
//     const res = await fetch(
//       `${endpoint}/?filter_season=${filterSeason}&${sort}&filter_title=${title}&access_token=${access_token}`
//     );

//     //json形式にする
//     const data = await res.json();
//     return data;
//   };

//   //APIで取得したデータをもとにリストを作成
//   const onSearch = async () => {
//     const data = await getData(year, season);
//     setAnimeList(data.works);
//     console.log( 'onSearch' ,'a');
//   };

//   // const location = useLocation();

//   // useEffect(() => {
//   //   onSearch();
//   // }, [location]);

//   // useEffect(() => {
//   //   props.setResult(animeList);
//   // }, [animeList]);

//   const handleYear = (e: any) => {
//     setYear(e.target.value);
//     console.log( 'handleYear' ,'a');
//   };
//   const handleSeason = (e: any) => {
//     setSeason(e.target.value);
//   };
//   const handleTitle = (e: any) => {
//     setTitle(e.target.value);
//   };

//   useEffect(() => {
//     const getFilterSeason = () => {
//       let value = "";

//       if (year !== "all" && season !== "all") {
//         value = `${year}-${season}`;
//         return value;
//       }
//       if (year !== "all") {
//         value = `${year}-${season}`;
//         return value;
//       }
//       return value;
//     };
//     setFilterSeason(getFilterSeason());
//   }, [year, season]);
//   return {
//     year,
//     handleYear,
//     season,
//     handleSeason,
//     onSearch,
//     animeList,
//     title,
//     handleTitle,
//   };
// };
