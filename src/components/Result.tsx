import { Anime } from "../types/animes";

interface ResultProps {
  result: Anime[];
}

export const Result = ({ result }: ResultProps) => {

  
  return (
    <>
          {/* map()=>{} 配列を順番に処理 */}
          {result.map((list:Anime) => (
        <div key={list.id}>
          <p>
            画像：
            <img
              src={
                list.images.recommended_url ||
                list.images.facebook.og_image_url ||
                list.images.twitter.image_url ||
                "img/no-image.jpg"
              }
              alt=""
            />
          </p>
          <p>タイトル: {`${list.title}`}</p>
          <p>読み: {`${list.title_kana}`}</p>
          <p>媒体: {`${list.media_text}`}</p>
          <p>リリース時期: {`${list.season_name_text}`}</p>
          <p>
            公式URL:{" "}
            <a
              href={`${list.official_site_url}`}
            >{`${list.official_site_url}`}</a>
          </p>
          <p>公式Twitter: {`${list.twitter_username}`}</p>
          <p>Twitter ハッシュタグ: ＃{`${list.twitter_hashtag}`}</p>
          <p>エピソード数: {`${list.episodes_count}`}</p>
          <p>見てる ・ 見たい ・ 見た人の数: {`${list.watchers_count}`}</p>
          <p>レビュー数: {`${list.reviews_count}`}</p>
        </div>
      ))}
    </>
  );
};
