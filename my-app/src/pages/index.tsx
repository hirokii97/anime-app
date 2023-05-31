import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Tab } from "@/components/Tab";
import { HeadLine } from "@/components/HeadLine";
import { Search } from "@/components/Search";
import { Result } from "@/components/Result";
import { useState } from "react";
import { Anime } from "@/types/animes";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  //検索した内容を’Search’から’Result’へ受け渡す
  const [result, setResult] = useState<Anime[]>([]);
  
  return (
    <>
      <HeadLine />
      <main className={`${styles.main} ${inter.className}`}>
        <h1>アニメ検索サイト</h1>
        <div className={styles.description}></div>
        <Search setResult={setResult} />
        <Result result={result}/>
        <Tab />
      </main>
    </>
  );
}
