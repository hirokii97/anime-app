import Link from "next/link";
import Image from "next/image";

export const Tab = () => {
  return (
    <>
      <div className="nav">
        <Link href="/favorite" className="favorite nav-item">
          <Image
            src="/img/icon_favorite-active.png"
            alt=""
            width={30}
            height={30}
          />
          <p>お気に入り</p>
        </Link>

        <Link href="/" className="search nav-item">
          <Image src="/img/search.png" alt="" width={30} height={30} />
          <p>検索</p>
        </Link>
      </div>
    </>
  );
};
