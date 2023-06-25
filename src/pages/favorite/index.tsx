import { useCallback, useEffect } from "react"
import type { Anime } from "../../types/animes"
import { useAtom } from "jotai"
import { favoriteListAtom } from "../atoms"
import { Tab } from "@/components/Tab"
import React from "react"
import { Result } from "@/components/Result"
import { useCookieFunction } from "@/hooks/useCookieFunction"
import { useCookies } from "react-cookie"

function Favorite() {
  const [favoriteList, setFavoriteList] = useAtom(favoriteListAtom)
  const { loadCookie } = useCookieFunction()

  useEffect(() => {
    loadCookie()
  }, [])

  return (
    <section>
      <h1>お気に入り</h1>
      {favoriteList.length !== 0 ? (
        <div className="result__wrapper">
          <Result animeList={favoriteList} />
        </div>
      ) : (
        <div className="no-favorite">お気に入りに登録してみよう！</div>
      )}
      <Tab />

      {/* CSS(styled JSXを採用) */}
      <style jsx>
        {`
          h1 {
            line-height: 30px;
          }
          .result__wrapper {
            max-width: 1280px;
            margin: 10px auto;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 30px;
          }

          .favorite_button {
            width: 40px;
            height: 40px;
            padding: 0;
            background-color: transparent;
            border: none;
            padding-top: 3px;
          }
          .favorite_button img {
            display: flex;
            align-items: center;
            width: 20px;
            height: 20px;
          }

          .result__box {
            max-width: 300px;
            width: 100%;
            border: black 1px solid;
          }

          .result__menu {
            display: flex;
            align-items: center;
            height: 50px;
            padding: 5px 10px;
          }

           {
            /* タグ（TV・映画） */
          }
          .result__media {
            height: 20px;
            max-width: 35px;
            width: 100%;
            padding: 8px 10px;
            border-radius: 5px;
            background-color: #2589d0;
            color: white;
            margin-left: 5px;
            text-align: center;
            flex: 1;
          }

           {
            /* ウォッチ数、コメント数 */
          }
          .c-icon {
            text-align: center;
            height: 50px;
            width: 50px;
          }
          .c-icon img {
            width: 25px;
            height: 25px;
          }

          .c-icon-text {
            font-size: 14px;
          }

          .result__watchers_count.c-icon {
            max-width: 50px;
            margin-left: 120px;
          }

          .result__box {
            border-radius: 5px;
          }

          .result__box p {
            margin: 10px 0px 0px 0px;
          }

          .result__detail-title {
            text-align: center;
            font-size: 18px;
            font-weight: 600;
          }

          .result__image {
            text-align: center;
            max-width: 300px;
            max-height: 157px;
          }

          .result__image img {
            max-width: 300px;
            max-height: 157px;
          }

          .result__detail {
            padding: 0px 20px 5px;
          }

          .result__detail-link {
            display: flex;
            justify-content: space-between;
            height: 60px;
            align-items: center;
            width: 200px;
            margin: 0 auto;
          }

          .result__detail-url {
            display: inline-block;
            box-sizing: border-box;
            height: 40px;
            border-radius: 10px;
            padding: 7px 10px;
            background-color: orange;
            color: white;
            text-decoration: none;
          }

          .result__detail-twitter img {
            width: 40px;
            height: 40px;
          }

          .no-favorite {
            text-align: center;
            margin: 50px 0px 0px 0px;
          }
        `}
      </style>
    </section>
  )
}
export default React.memo(Favorite)
