import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 mx-auto my-5 flex max-w-6xl items-center space-x-4 px-5 text-lg">
      <Link href="/" className="font-semibold text-slate-600">
        Home
      </Link>

      <Link href="/posts" className="font-semibold text-slate-600">
        Posts
      </Link>
    </header>
  );
};

export default Header;
