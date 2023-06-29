import { useAtom } from "jotai"
import React, { useEffect, memo } from "react"
import { Result } from "@/components/Result"
import { Tab } from "@/components/Tab"
import { useCookieFunction } from "@/hooks/useCookieFunction"
import classes from "@/pages/favorite/favorite.module.css"
import { favoriteListAtom } from "../../lib/atoms"

export const Favorite = memo(() => {
  const [favoriteList] = useAtom(favoriteListAtom)
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
        <div className={classes.favorite__wrapper}>
          お気に入りに登録してみよう！
        </div>
      )}
      <Tab />
    </section>
  )
})
export default (Favorite)
