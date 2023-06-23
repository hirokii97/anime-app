import { favoriteListAtom } from "@/pages/atoms"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { useCookies } from "react-cookie"

export const useCookieFunction = () => {
  const [favoriteList, setFavoriteList] = useAtom(favoriteListAtom)
  const [cookie, setCookie] = useCookies(["CookiesOfFavoriteList"]) //react-cookieの設定

  const addCookie = (id: number) => {
    //react-cookiesに登録
    const yourCookies = cookie.CookiesOfFavoriteList
    const newCookies = yourCookies.concat(id)
    setCookie("CookiesOfFavoriteList", newCookies, {
      maxAge: 2592000,
      path: "/",
    })
  }
  const loadCookie = () => {
    //お気に入りがゼロの場合はcookieを取得してfavoriteListに反映
    const yourFavoriteList = cookie.CookiesOfFavoriteList
    setFavoriteList(yourFavoriteList)
  }
  return { addCookie, loadCookie, favoriteList }
}
