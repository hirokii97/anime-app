import { Search } from "./components/Search";
import { Result } from "./components/Result";
import { useState } from "react";
import type { Anime } from "./types/animes";

export const App = () => {

  const [value, setValue] = useState(false)


  return (
    <>
      <h1>アニメ検索サイト</h1>
      <Search  setValue = {setValue} />
      <Result result = {value}/>
    </>
  );
};
