import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Tab } from "@/components/Tab";
import { HeadLine } from "@/components/HeadLine";
import { Search } from "@/components/Search";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <HeadLine />
      <main className={`${styles.main} ${inter.className}`}>
        <h1>アニメ検索サイト</h1>
        <div className={styles.description}></div>
        <Search />
        <Tab />
      </main>
    </>
  );
}
