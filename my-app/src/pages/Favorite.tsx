import { memo, useEffect } from "react";
import type { Anime } from "src/types/animes";
import Image from "next/image";

type Props = {
  favoriteIds: number[];
  favoriteList: Anime[];
  // onClickFavorites: React.Dispatch<number>;
  onClickFavorites: any;
};

// eslint-disable-next-line react/display-name
export const Favorite = memo((props: Props) => {
  console.log("props", props);

  useEffect(() => {
    props.onClickFavorites();
  }, []);

  return (
    <section>
      <h1>お気に入り</h1>
      {props.favoriteIds.length !== 0 ? (
        <div className="result__wrapper">
          {/* map()=>{} 配列を順番に処理 */}
          {props.favoriteList.map((list: Anime) => (
            <div className="result__box" key={list.id}>
              <div className="result__menu">
                <div className="result__media">{`${list.media_text}`}</div>
                <div className="result__watchers_count c-icon">
                  <Image
                    src="public/img/icon__result-watchers-count.png"
                    alt="見てる ・ 見たい ・ 見た人の数"
                    width={10}
                  />
                  <div className="c-icon-text">{`${list.watchers_count}`}</div>
                </div>
                <div className="result__reviews_count c-icon">
                  <Image
                    src="public/img/icon__result-reviews-count.png"
                    alt="レビュー数"
                    width={10}
                  />
                  <div className="c-icon-text">{`${list.reviews_count}`}</div>
                </div>
              </div>
              <div className="result__image">
                <Image
                  src={
                    list.images.recommended_url ||
                    list.images.facebook.og_image_url ||
                    list.images.twitter.image_url ||
                    "public/img/no-image.jpg"
                    
                  }
                  alt=""
                  width={100}
                  //取得した画像がエラーの場合の処理
                  onError={(e) => {
                    // 無限ループさせないためのnull設定
                    e.target.onError = null;
                    //　エラー時にno-img画像を指定
                    e.target.src = "public/img/no-image.jpg";
                  }}
                />
              </div>
              <div className="result__detail">
                <p className="result__detail-title">【 {`${list.title}`} 】</p>
                <p>エピソード数: {`${list.episodes_count}`}</p>
                <p>リリース時期: {`${list.season_name_text}`}</p>
                <div className="result__detail-link">
                  <p>
                    <a
                      className="result__detail-url"
                      href={`${list.official_site_url}`}
                    >
                      公式URL
                    </a>
                  </p>
                  <p>
                    <a
                      className="result__detail-twitter"
                      href={`https://twitter.com/${list.twitter_username}`}
                    >
                      <Image
                        src="public/img/icon__result-detail_twitter.png"
                        alt=""
                        width={100}
                      />
                    </a>
                  </p>
                  <div>
                    <button
                      onClick={() => {
                        props.onClickFavorites(list.id);
                      }}
                      className="favorite_button"
                    >
                      <Image
                        src={
                          props.favoriteIds.includes(list.id)
                            ? "public/img/icon_favorite-active.png"
                            : "public/img/icon_favorite-no-active.png"
                        }
                        alt=""
                        width={100}
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-favorite">お気に入りに登録してみよう！</div>
      )}

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

          .result__box {
            max-width: 300px;
            width: 100%;
            border: black 1px solid;
             {
              /* max-width: 400px; */
            }
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
             {
              /* margin-left: 220px; */
            }
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
             {
              /* max-width: 400px;
            max-height: 210px; */
            }
          }

           {
            /* @media screen and (max-width: 500px) {
            .result__image {
              max-width: 350px;
              max-height: 184px;
            }
          } */
          }

          .result__image img {
            max-width: 300px;
            max-height: 157px;
             {
              /* max-width: 400px;
            max-height: 210px; */
            }
          }

           {
            /* @media screen and (max-width: 500px) {
            .result__image img {
              max-width: 350px;
              max-height: 184px;
            }
          } */
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
  );
});
