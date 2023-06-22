import { useAtom } from "jotai"
import { Inter } from "next/font/google"
import { memo, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { HeadLine } from "@/components/HeadLine"
import { Result } from "@/components/Result"
import { Search } from "@/components/Search"
import { Tab } from "@/components/Tab"
import styles from "@/styles/Home.module.css"
import { Anime } from "@/types/animes"
import { favoriteListAtom } from "../atoms"

const inter = Inter({ subsets: ["latin"] })

function Home() {
  const [animeList, setAnimeList] = useState<Anime[]>([]) //検索した内容を’Search’から’Result’へ受け渡す
  const [favoriteList, setFavoriteList] = useAtom(favoriteListAtom)
  const [cookie, setCookie] = useCookies(["CookiesOfFavoriteList"]) //react-cookieの設定

  const addCookie = () => {
    //react-cookiesに登録
    setCookie("CookiesOfFavoriteList", favoriteList, {
      maxAge: 2592000,
      path: "/",
    })
  }

  if (favoriteList.length === 0) {
    //お気に入りがゼロの場合はcookieを取得してfavoriteListに反映
    const yourFavoriteList = cookie.CookiesOfFavoriteList
    setFavoriteList(yourFavoriteList)
  }

  useEffect(() => {
    addCookie()
  }, [favoriteList])

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
export default memo(Home)
