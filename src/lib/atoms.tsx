import { Anime } from "@/types/animes";
import { atom , useAtom  } from "jotai";
import { useEffect, useState } from "react";

export const favoriteListAtom = atom<Anime[]>([]);
