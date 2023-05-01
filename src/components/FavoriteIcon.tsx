import { useState } from "react";

export const FavoriteIcon = () => {
  //「いいね」ボタン（favorite）の設定
  const [favorite, setFavorite] = useState(false);

  const onClickFavorites = () => {
    setFavorite(!favorite);
  };

  return (
    <div>
      <button onClick={onClickFavorites} className="favorite_button">
        <img
          src={
            favorite
              ? "img/icon_favorite-active.png"
              : "img/icon_favorite-no-active.png"
          }
          alt=""
        />
      </button>

      <style jsx>
        {`
        .favorite_button{
          width:40px ;
          height:40px ;
          padding:0;
          background-color:transparent;
          border:none;
          padding-top:3px;
        }
        .favorite_button img{
          display:flex;
          align-items:center;
          width:20px ;
          height:20px ;
        }
        `}

      </style>
    </div>
  );
};
