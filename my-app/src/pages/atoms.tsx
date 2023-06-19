import { Anime } from "@/types/animes";
import { atom , useAtom  } from "jotai";
import { useEffect, useState } from "react";

export const favoriteIdAtom = atom([]);
export const favoriteListAtom = atom([]);

  //ボタン押下時に「お気に入り」に登録
  export const onClickFavorites = atom((id: number, ids: number[]) => {
    //お気に入り削除用の配列を再定義（stateの更新は関数実行後のため、再定義　＋　filterでidを除いた配列を再生成）
    const delateId = ids.filter(
      (favoriteId: number) => favoriteId !== id
    );
    const cleanDelateIds = delateId.filter((v) => v);

    //お気に入り追加用の配列を再定義（stateの更新は関数実行後のため、再定義）
    const addId = [...ids, id];
    const cleanAddIds = addId.filter((v) => v);

    //お気に入り(favorite)にidが入っている場合
    if (ids.includes(id)) {
      return cleanDelateIds;

      //デバック用
      console.log("cleanDelateId", cleanDelateIds);
      console.log("filterFavoriteIds", ids);

      //お気に入りに追加（スプレット構文で配列に追加）
    } else {
      return cleanAddIds;

      //デバック用
      console.log("cleanAddId", cleanAddIds);
      console.log("setFavoriteIds", ids);
    }
  });