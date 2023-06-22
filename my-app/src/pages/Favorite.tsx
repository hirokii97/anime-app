import { useCallback, useEffect } from "react";
import type { Anime } from "../types/animes";
import { useAtom } from "jotai";
import { favoriteIdAtom, favoriteListAtom } from "./atoms";
import { Tab } from "@/components/Tab";
import { useCookies } from "react-cookie";

export default function Favorite() {
  const [favoriteIds, setFavoriteIds] = useAtom(favoriteIdAtom);
  const [favoriteList, setFavoriteList] = useAtom(favoriteListAtom);

 /*///////////
cookie  
*/

  //react-cookieの設定
  const [cookie, setCookie] = useCookies(["CookiesOfFavoriteIds"]);

  //react-cookiesに登録
  const addCookie = useCallback(
    (ids: number[]) => {
      const newFavoriteIds = [...ids];

      setCookie("CookiesOfFavoriteIds", newFavoriteIds, {
        path: "/",
        maxAge: 2592000,
      });
    },
    [favoriteIds]
  );

  //画面遷移時にcookie情報を取得
  const loadCookie = () => {
    //お気に入りがゼロの場合はcookieを取得してfavoriteIdsに反映
    let CookiesOfFavoriteIds = cookie.CookiesOfFavoriteIds;

    if (CookiesOfFavoriteIds === undefined) {
      CookiesOfFavoriteIds = [];
      setFavoriteIds(CookiesOfFavoriteIds);
    } else {
      setFavoriteIds(CookiesOfFavoriteIds);
    }
  };

  // ロード実行
  // cookieは空配列（[]、数値では「%5B%5D」）で正常
  // 空配列（[]、数値では「%5B%5D」）まで削除するとエラー
  useEffect(() => {
    loadCookie();
  }, []);

  /*/
cookie  
*/ ///////////

  const onClickFavorites: React.Dispatch<number> = (id: number) => {
    //お気に入り削除用の配列を再定義（stateの更新は関数実行後のため、再定義　＋　filterでidを除いた配列を再生成）
    const delateId = favoriteIds.filter(
      (favoriteId: number) => favoriteId !== id
    );
    const cleanDelateId = delateId.filter((v) => v);

    //お気に入り追加用の配列を再定義（stateの更新は関数実行後のため、再定義）
    const addId = [...favoriteIds, id];
    const cleanAddId = addId.filter((v) => v);

    //お気に入り(favorite)にidが入っている場合
    if (favoriteIds.includes(id)) {
      setFavoriteIds(cleanDelateId);
      addCookie(cleanDelateId)


      //お気に入りに追加（スプレット構文で配列に追加）
    } else {
      setFavoriteIds(cleanAddId);
      addCookie(cleanAddId)
    }
  };

  //お気に入りに登録した情報を取得（API送信・受信の関数）
  const getFavoriteData = async () => {
    const arrIds = favoriteIds.join(",");

    //APIリンク
    const endpoint = "https://api.annict.com/v1/works";

    //APIトークン
    const access_token = "UVol8sjtyTLqvvAtJTRageHvztFssfsdPG3AYAoPXHY";

    //ソート:人気順
    const sort = "sort_watchers_count=desc";

    //fetch()→非同期通信を使ってリクエストとレスポンス取得を行う
    //パラメータ参照（https://developers.annict.com/docs/rest-api/v1/works）
    const res = await fetch(
      `${endpoint}/?filter_ids=${arrIds}&${sort}&access_token=${access_token}`
    );

    //json形式にする
    const data = await res.json();
    return data;
  };

  //お気に入りのリストを作成
  const getFavoriteList = async () => {
    const data = await getFavoriteData();
    const newFavoriteList = data;
    setFavoriteList(newFavoriteList.works);
  };

  //loadCookieは入れない（ループが発生するため）
  //favoriteIdsが変わるたびに新たにお気に入りリストを更新する。お気に入り画面からの削除も可能
  useEffect(() => {
    getFavoriteList();
  }, [favoriteIds]);

  return (
    <section>
      <h1>お気に入り</h1>
      {favoriteIds.length !== 0 ? (
        <div className="result__wrapper">
          {/* map()=>{} 配列を順番に処理 */}
          {favoriteList.map((list: Anime) => (
            <div className="result__box" key={list.id}>
              <div className="result__menu">
                <div className="result__media">{`${list.media_text}`}</div>
                <div className="result__watchers_count c-icon">
                  <img
                    src="../img/icon__result-watchers-count.png"
                    alt="見てる ・ 見たい ・ 見た人の数"
                  />
                  <div className="c-icon-text">{`${list.watchers_count}`}</div>
                </div>
                <div className="result__reviews_count c-icon">
                  <img
                    src="../img/icon__result-reviews-count.png"
                    alt="レビュー数"
                  />
                  <div className="c-icon-text">{`${list.reviews_count}`}</div>
                </div>
              </div>
              <div className="result__image">
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
                  }}
                />
              </div>
              <div className="result__detail">
                <p className="result__detail-title"> {`${list.title}`} </p>
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
                      <img
                        src="../img/icon__result-detail_twitter.png"
                        alt=""
                      />
                    </a>
                  </p>
                  <div>
                    <button
                      onClick={(e) => {
                        onClickFavorites(list.id);
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
                  </div>
                </div>
              </div>
            </div>
          ))}
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
}
