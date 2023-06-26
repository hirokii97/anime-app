//お気に入りに登録した情報を取得（API送信・受信の関数）
export const getFavoriteData = async (favoriteIdList: number[]) => {
  //APIリンク
  const endpoint = "https://api.annict.com/v1/works"

  //APIトークン
  const accessToken = "UVol8sjtyTLqvvAtJTRageHvztFssfsdPG3AYAoPXHY"

  //ソート:人気順
  const sort = "sort_watchers_count=desc"

  //fetch()→非同期通信を使ってリクエストとレスポンス取得を行う
  //パラメータ参照（https://developers.annict.com/docs/rest-api/v1/works）
  const res = await fetch(
    `${endpoint}/?filter_ids=${
      favoriteIdList.length === 0 ? 0 : favoriteIdList
    }&${sort}&access_token=${accessToken}`,
  )

  //json形式にする
  const data = await res.json()
  return data
}
