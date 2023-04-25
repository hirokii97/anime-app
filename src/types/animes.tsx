//type

export type Anime = {
  id: number;
  title: string;
  official_site_url: string;
  title_kana:string
  media_text:string
  season_name_text:string
  twitter_username:string
  twitter_hashtag:string
  
  images: {
    recommended_url: string;
    facebook: {
      og_image_url: string;
    };
    twitter: {
      image_url: string;
    };
  }

  
  episodes_count:number
  watchers_count:number
  reviews_count:number
};
