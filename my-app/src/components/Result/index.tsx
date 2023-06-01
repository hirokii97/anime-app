import { Anime } from "@/types/animes";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import classes from "src/components/Result/Result.module.css";
import classNames from "classnames";
import Image from "next/image";

type Props = {
  result: Anime[];
  setFavoriteIds: React.Dispatch<SetStateAction<number[]>>;
  onClickFavorites: React.Dispatch<number>;
  getFavoriteList: React.Dispatch<number>;
  favoriteIds: number[];
};

//既存のReactモジュールを開いて新しい型を追加する
declare module "react" {
  //画像エラー処理の型付け
  type EventTarget = {
    onError: null;
    src: string;
  };
}

export const Result = (props: any) => {
  const { result } = props;

  const reviewClasses = classNames(
    classes.result__reviews_count,
    classes.cIcon
  );

  // 画面遷移（最初の一回）に実行する関数
  // const firstLoadFunction = () => {
  //   moveToSearch();
  //   loadCookie();
  // };

  // window.addEventListener("load", firstLoadFunction, { once: true });

  return (
    <section>
      <div className={classes.result__wrapper}>
        {/* map()=>{} 配列を順番に処理 */}
        {result.map((list: Anime) => (
          <div className={classes.result__box} key={list.id}>
            <div className={classes.result__menu}>
              <div
                className={classes.result__media}
              >{`${list.media_text}`}</div>
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
                >{`${list.watchers_count}`}</div>
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
                >{`${list.reviews_count}`}</div>
              </div>
            </div>
            <div className={classes.result__image}>
              <img
                src={
                  list.images.recommended_url ||
                  list.images.facebook.og_image_url ||
                  list.images.twitter.image_url ||
                  "../img/no-image.jpg"
                }
                alt=""
                //取得した画像がエラーの場合の処理
                onError={(e) => {
                  // 無限ループさせないためのnull設定
                  e.target.onError = null;
                  //　エラー時にno-img画像を指定
                  e.target.src = "../img/no-image.jpg";
                  return;
                }}
              />
            </div>
            <div className={classes.result__detail}>
              <p className={classes.result__detail_title}>
                【 {`${list.title}`} 】
              </p>
              <p>エピソード数: {`${list.episodes_count}`}</p>
              <p>リリース時期: {`${list.season_name_text}`}</p>
              <div className={classes.result__detail_link}>
                <p>
                  <a
                    className={classes.result__detail_url}
                    href={`${list.official_site_url}`}
                  >
                    公式URL
                  </a>
                </p>
                <p>
                  <a
                    className={classes.result__detail_twitter}
                    href={`https://twitter.com/${list.twitter_username}`}
                  >
                    <img
                      src="../img/icon__result-detail_twitter.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                  </a>
                </p>

                {/* <div>
                  <button
                    onClick={() => {
                      onClickFavorites(list.id);
                      getFavoriteList(list.id);
                    }}
                    className="favorite_button"
                  >
                    <img
                      src={
                        favoriteIds.includes(list.id)
                          ? "../img/icon_favorite-active.png"
                          : "../img/icon_favorite-no-active.png"
                      }
                      alt=""
                    />
                  </button>

                  <style jsx>
                    {`
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
                    `}
                  </style>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CSS(styled JSXを採用) */}
      <style jsx>{``}</style>
    </section>
  );
};
