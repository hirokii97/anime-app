import { Anime } from "@/types/animes";
import { atom , useAtom  } from "jotai";
import { useEffect, useState } from "react";

export const favoriteIdAtom = atom([]);
export const favoriteListAtom = atom([]);
export const onClickFavoritesAtom = atom(() => {});
