import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"
import classes from "@/components/Search/search.module.css"
import { Anime } from "@/types/animes"

type Props = {
  setAnimeList: React.Dispatch<React.SetStateAction<Anime[]>>
}

export const Search = (props: Props) => {
  const { setAnimeList } = props

  //リリース年をStateに設定
  const [year, setYear] = useState<string | undefined>("2023")

  //リリースシーズンをStateに設定
  const [season, setSeason] = useState<string | undefined>("spring")

  //タイトルをStateに設定
  const [title, setTitle] = useState<string | undefined>("")

  //API送信用の年、季節（filterSeason）をStateに設定
  const [filterSeason, setFilterSeason] = useState<string | undefined>(
    "2023-spring",
  )

  //API送信・受信の関数
  const getData = async () => {
    //APIリンク
    const endpoint = "https://api.annict.com/v1/works"

    //APIトークン
    const accessToken = "UVol8sjtyTLqvvAtJTRageHvztFssfsdPG3AYAoPXHY"

    //ソート:人気順
    const sort = "sort_watchers_count=desc"

    //fetch()→非同期通信を使ってリクエストとレスポンス取得を行う
    //パラメータ参照（https://developers.annict.com/docs/rest-api/v1/works）
    const res = await fetch(
      `${endpoint}/?filter_season=${filterSeason}&${sort}&filter_title=${title}&access_token=${accessToken}`,
    )

    //json形式にする
    const data = await res.json()
    return data
  }

  //APIで取得したデータをもとにリストを作成
  const onSearch = async () => {
    const data = await getData()
    setAnimeList(data.works)
  }

  useEffect(() => {
    const getFilterSeason = () => {
      let value = ""

      if (year !== "all" && season !== "all") {
        value = `${year}-${season}`
        return value
      }
      if (year !== "all") {
        value = `${year}-${season}`
        return value
      }
      return value
    }
    setFilterSeason(getFilterSeason())
  }, [year, season])

  // 画面遷移後、検索ボタンを押す
  const buttonRef = useRef<HTMLButtonElement>(null)

  const firstClick = () => {
    buttonRef.current?.click()
  }

  useEffect(() => {
    firstClick()
  }, [])

  return (
    <section className={classes.section}>
      <label className={classes.select_box}>
        <select
          name=""
          id=""
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="all">全て</option>
          <option value="2020">2020年</option>
          <option value="2021">2021年</option>
          <option value="2022">2022年</option>
          <option value="2023">2023年</option>
        </select>
      </label>
      {year !== "all" && (
        <label className={classes.select_box}>
          <select
            name=""
            id=""
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          >
            <option value="spring">春</option>
            <option value="summer">夏</option>
            <option value="autumn">秋</option>
            <option value="winter">冬</option>
          </select>
        </label>
      )}

      <form action="" className={classes.search_form}>
        <label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="on"
            placeholder="キーワードを入力"
          />
        </label>
        <button
          onClick={() => {
            onSearch()
            firstClick
          }}
          ref={buttonRef}
          aria-label="検索"
          type="button"
        >
          <Image src="/img/search.png" alt="" width={30} height={30} />
        </button>
      </form>
    </section>
  )
}
