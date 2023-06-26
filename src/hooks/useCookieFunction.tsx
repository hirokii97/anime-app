import { useAtom } from "jotai"
import { useCookies } from "react-cookie"
import { favoriteListAtom } from "@/lib/atoms"
import { getFavoriteData } from "@/lib/getFavoriteData"

export const useCookieFunction = () => {
  const [favoriteList, setFavoriteList] = useAtom(favoriteListAtom)
  const [cookie, setCookie] = useCookies(["CookiesFavoriteId"]) //react-cookieの設定

  const addCookie = (newFavoriteIdList: number[]) => {
    setCookie("CookiesFavoriteId", newFavoriteIdList, {
      maxAge: 2592000,
      path: "/",
    })
  }
  const loadCookie = async () => {
    let CookieFavoriteId = cookie.CookiesFavoriteId

    if (CookieFavoriteId === undefined) {
      CookieFavoriteId = []
    }
    const CookieFavoriteList = await getFavoriteData(CookieFavoriteId)
    setFavoriteList(CookieFavoriteList.works)
  }
  return { addCookie, favoriteList, loadCookie }
}
