import Link from "next/link";
import Image from "next/image";
import classes from 'src/components/Tab/Tab.module.css'
import classNames from 'classnames';

export const Tab = () => {
  const favoriteClasses = classNames(classes.favorite , classes.navItem)
  const searchClasses = classNames(classes.search , classes.navItem)

  return (
    
      <div className={classes.nav}>
        <Link href="/favorite" className={favoriteClasses}>
          <Image
            src="/img/icon_favorite-active.png"
            alt=""
            width={36}
            height={36}
          />
          <p></p>
        </Link>

        <Link href="/" className={searchClasses}>
          <Image src="/img/search.png" alt="" width={36} height={36} />
          <p></p>
        </Link>
      </div>
    
  );
};
