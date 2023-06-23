import { Anime } from "@/types/animes"
import { SetStateAction, useCallback, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import classes from "src/components/Result/Result.module.css"
import classNames from "classnames"
import Image from "next/image"
import { useAtom, useSetAtom } from "jotai"
import { useFavorite } from "@/hooks/useFavorite"

type Props = {
  animeList: Anime[]
  favoriteList: Anime[]
}

//既存のReactモジュールを開いて新しい型を追加する
declare module "react" {
  //画像エラー処理の型付け
  type EventTarget = {
    onError: null
    src: string
  }
}

export const Result = (props: Props) => {
  const { favoriteList, handleClickFavorite } = useFavorite()
  const { animeList } = props

  // result→favoriteの表示を完成させるその後にcookie

  return (
    <section>
      <div className={classes.result__wrapper}>
        {/* map()=>{} 配列を順番に処理 */}
        {animeList?.map((anime: Anime) => {
          const isFavorite = favoriteList.some(
            (x: { id: number }) => x.id === anime.id,
          )
          const favoriteIcon = isFavorite
            ? "../img/icon_favorite-active.png"
            : "../img/icon_favorite-no-active.png"

          return (
            <div className={classes.result__box} key={anime.id}>
              <div className={classes.result__menu}>
                <div
                  className={classes.result__media}
                >{`${anime.media_text}`}</div>
                <div
                  className={`${classes.cIcon} ${classes.result__watchers_count}`}
                >
                  <img
                    src="@/../img/icon__result-watchers-count.png"
                    alt="見てる ・ 見たい ・ 見た人の数"
                    width={30}
                    height={30}
                  />
                  <div
                    className={classes.cIcon_text}
                  >{`${anime.watchers_count}`}</div>
                </div>
                <div
                  className={`${classes.cIcon} ${classes.result__reviews_count}`}
                >
                  <img
                    src="../img/icon__result-reviews-count.png"
                    alt="レビュー数"
                    width={30}
                    height={30}
                  />
                  <div
                    className={classes.cIcon_text}
                  >{`${anime.reviews_count}`}</div>
                </div>
              </div>
              <div className={classes.result__image}>
                <img
                  src={
                    anime.images.recommended_url ||
                    anime.images.facebook.og_image_url ||
                    anime.images.twitter.image_url ||
                    "../img/no-image.jpg"
                  }
                  alt=""
                  //取得した画像がエラーの場合の処理
                  onError={(e) => {
                    // 無限ループさせないためのnull設定
                    e.target.onError = null
                    //　エラー時にno-img画像を指定
                    e.target.src = "../img/no-image.jpg"
                    return
                  }}
                />
              </div>
              <div className={classes.result__detail}>
                <p
                  className={classes.result__detail_title}
                >{`${anime.title}`}</p>
                <p>エピソード数: {`${anime.episodes_count}`}</p>
                <p>リリース時期: {`${anime.season_name_text}`}</p>
                <div className={classes.result__detail_link}>
                  <p>
                    <a
                      className={classes.result__detail_url}
                      href={`${anime.official_site_url}`}
                    >
                      公式URL
                    </a>
                  </p>
                  <p>
                    <a
                      className={classes.result__detail_twitter}
                      href={`https://twitter.com/${anime.twitter_username}`}
                    >
                      <img
                        src="../img/icon__result-detail_twitter.png"
                        alt=""
                        width={30}
                        height={30}
                      />
                    </a>
                  </p>

                  <div>
                    <button
                      onClick={() => {
                        handleClickFavorite(anime.id)
                      }}
                      className={classes.favorite_button}
                    >
                      <img src={favoriteIcon} alt="お気に入りボタン" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* CSS(styled JSXを採用) */}
      <style jsx>{``}</style>
    </section>
  )
}
