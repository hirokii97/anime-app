import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import classes from "src/components/Tab/Tab.module.css"

export const Tab = () => {
  const favoriteClasses = classNames(classes.favorite, classes.navItem)
  const searchClasses = classNames(classes.search, classes.navItem)

  return (
    <div className={classes.nav}>
      <Link href="/favorite" className={favoriteClasses}>
        <Image
          src="/img/icon_favorite-active.png"
          alt=""
          width={36}
          height={36}
        />
        <p>お気に入り</p>
      </Link>

      <Link href="/" className={searchClasses}>
        <Image src="/img/search.png" alt="" width={36} height={36} />
        <p>検索</p>
      </Link>
    </div>
  )
}
