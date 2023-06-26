//type

export type Anime = {
  id: number
  title: string
  episodes_count: number
  images: {
    facebook: {
      og_image_url: string
    }
    recommended_url: string
    twitter: {
      image_url: string
    }
  }
  media_text: string
  official_site_url: string
  reviews_count: number
  season_name_text: string

  title_kana: string

  twitter_hashtag: string
  twitter_username: string
  watchers_count: number
}
