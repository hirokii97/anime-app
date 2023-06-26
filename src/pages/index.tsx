import { Inter } from "next/font/google"
import React, { memo, useEffect, useState } from "react"
import { HeadLine } from "@/components/HeadLine"
import { Result } from "@/components/Result"
import { Search } from "@/components/Search"
import { Tab } from "@/components/Tab"
import { useCookieFunction } from "@/hooks/useCookieFunction"
import styles from "@/styles/Home.module.css"
import { Anime } from "@/types/animes"

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
        <h1 className="title">Watch Anime</h1>
        <div className={styles.description}></div>
        <Search setAnimeList={setAnimeList} />
        <Result animeList={animeList} />
        <Tab />
      </main>
    </>
  )
}
export default memo(Home)
