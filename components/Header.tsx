import Link from "next/link";

const Header = ({ title }: { title: string }) => {
  return (
    <header className="py-16 text-center">
      <Link href="/">
        <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </h1>
      </Link>
    </header>
  );
};

export default Header;
