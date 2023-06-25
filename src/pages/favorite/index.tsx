import { useCallback, useEffect } from "react"
import type { Anime } from "../../types/animes"
import { useAtom } from "jotai"
import { favoriteListAtom } from "../../lib/atoms"
import { Tab } from "@/components/Tab"
import React from "react"
import { Result } from "@/components/Result"
import { useCookieFunction } from "@/hooks/useCookieFunction"
import { useCookies } from "react-cookie"
import classes from "src/pages/favorite/favorite.module.css"

function Favorite() {
  const [favoriteList, setFavoriteList] = useAtom(favoriteListAtom)
  const { loadCookie } = useCookieFunction()

  useEffect(() => {
    loadCookie()
  }, [])

  return (
    <section>
      <h1 className={classes.h1}>Favorite</h1>
      {favoriteList.length !== 0 ? (
        <div className={classes.favorite__wrapper}>
          <Result animeList={favoriteList} />
        </div>
      ) : (
        <div className={classes.favorite__wrapper}>お気に入りに登録してみよう！</div>
      )}
      <Tab />
    </section>
  )
}
export default React.memo(Favorite)
