import { Anime } from "@/types/animes";
import { atom, useAtom } from "jotai";

export const favoriteListAtom = atom<Anime[]>([]);
