import Head from "next/head"
import Image from "next/image"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import { Tab } from "@/components/Tab"
import { HeadLine } from "@/components/HeadLine"
import { Result } from "@/components/Result"
import { useCallback, useEffect, useState } from "react"
import { Anime } from "@/types/animes"
import React from "react"
import { Search } from "@/components/Search"
import { useCookies } from "react-cookie"
import { useAtom } from "jotai"
import { favoriteListAtom } from "./atoms"
import { useCookieFunction } from "@/hooks/useCookieFunction"

const inter = Inter({ subsets: ["latin"] })

// export default function Home() {
function Home() {
  //検索した内容を’Search’から’Result’へ受け渡す
  const [animeList, setAnimeList] = useState<Anime[]>([])
  const { loadCookie } = useCookieFunction()

  useEffect(() => {
    loadCookie()
  }, [])

  return (
    <>
      <HeadLine />
      <main className={`${styles.main} ${inter.className}`}>
        <h1>アニメ検索サイト</h1>
        <div className={styles.description}></div>
        <Search setAnimeList={setAnimeList} />
        <Result animeList={animeList} />
        <Tab />
      </main>
    </>
  )
}
export default React.memo(Home)
