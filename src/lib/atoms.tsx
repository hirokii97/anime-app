import { atom } from "jotai"
import { Anime } from "@/types/animes"

export const favoriteListAtom = atom<Anime[]>([])
