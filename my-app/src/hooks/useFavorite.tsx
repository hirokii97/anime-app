import { favoriteListAtom } from "@/atoms"
import { getFavoriteData } from "@/lib/getFavoriteList"
import { useAtom } from "jotai"

export const useFavorite = () => {
  // //お気に入り情報をStateに設定
  const [favoriteList, setFavoriteList] = useAtom(favoriteListAtom)

  const handleClickFavorite = async (id: number) => {
    //お気に入りリストに存在する場合は削除
    if (favoriteList.some((x) => x.id === id)) {
      const newFavoriteList = favoriteList.filter((x) => x.id !== id)
      setFavoriteList(newFavoriteList)
      return
    }

    //お気に入りリストに存在しない場合は追加
    const newFavoriteIdList = favoriteList.map((x) => x.id).concat(id)
    const favoriteData = await getFavoriteData(newFavoriteIdList)

    setFavoriteList(favoriteData.works)
  }

  return { favoriteList, setFavoriteList, handleClickFavorite }
}
