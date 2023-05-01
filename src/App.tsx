import { Search } from "./components/Search";
import { Result } from "./components/Result";
import { useState } from "react";
import type { Anime } from "./types/animes";


declare module 'react' {
  //ReactのHTML要素の属性を拡張してstyle属性にjsxとglobalを追加した。
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}


export const App = () => {
  const [value, setValue] = useState<Anime[]>([]);
  console.log(value);

  return (
    <main>
      <h1>アニメ検索サイト</h1>
      <Search setValue={setValue} />
      <Result result={value} />

      <style jsx>
        {`
        h1{
          text-align:center;
        }
        `}
      </style>
    </main>
  );
};
