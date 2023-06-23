import { getFavoriteData } from "@/lib/getFavoriteData"
import { favoriteListAtom } from "@/pages/atoms"
import { useAtom } from "jotai"

export const useFavorite = () => {
  const [favoriteList, setFavoriteList] = useAtom(favoriteListAtom)

  const handleClickFavorite = async (id: number) => {
    // favoriteListのIDとクリックしたidが一致した場合
    if (favoriteList.some((x) => x.id === id)) {
      const newFavoriteList = favoriteList.filter((x) => x.id !== id)
      setFavoriteList(newFavoriteList)
      return
    }
    const newFavoriteIdList = favoriteList.map((x) => x.id).concat(id)
    const favoriteData = await getFavoriteData(newFavoriteIdList)

    setFavoriteList(favoriteData.works)
  }

  return { favoriteList, setFavoriteList, handleClickFavorite }
}
