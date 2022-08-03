import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  const { data: session } = useSession();

  return (
    <div className="layout">
      {session && (
        <div className="flex justify-end items-center">
          <Image src={session.user.image} width={40} height={40} />
          <button
            className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 m-5 rounded"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Kirjaudu ulos
          </button>
        </div>
      )}

      <Header />

      <div>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
