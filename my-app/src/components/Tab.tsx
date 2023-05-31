import Link from "next/link"
import Image from 'next/image'

export const Tab = () => {
  return(
    <nav className="nav">
    <Link href="/favorite" className="favorite nav-item">
      <Image src="img/icon_favorite-active.png" alt="" />
      <p>お気に入り</p>
    </Link>

    <Link href="/Search" className="search nav-item">
      <Image src="img/search.png" alt="" />
      <p>検索</p>
    </Link>
  </nav>
  )
}