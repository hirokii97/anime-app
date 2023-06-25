import { getFavoriteData } from "@/lib/getFavoriteData"
import { favoriteListAtom } from "@/lib/atoms"
import { useAtom } from "jotai"
import { useCookieFunction } from "./useCookieFunction"

export const useFavorite = () => {
  const [favoriteList, setFavoriteList] = useAtom(favoriteListAtom)
  const { addCookie } = useCookieFunction()

  const handleClickFavorite = async (id: number) => {
    // favoriteListのIDとクリックしたidが一致した場合
    if (favoriteList.some((x) => x.id === id)) {
      const newFavoriteList = favoriteList.filter((x) => x.id !== id)
      setFavoriteList(newFavoriteList)
      addCookie(newFavoriteList.map((x) => x.id))
      return
    }
    const newFavoriteIdList = favoriteList.map((x) => x.id).concat(id)
    const favoriteData = await getFavoriteData(newFavoriteIdList)
    addCookie(newFavoriteIdList)

    setFavoriteList(favoriteData.works)
  }

  return {
    favoriteList,
    setFavoriteList,
    handleClickFavorite,
  }
}
