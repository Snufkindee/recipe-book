import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { AuthStatusTypes } from "../types/Auth";
import Footer from "./Footer";
import Header from "./Header";

const enum TITLES {
  SIGNIN = "Kirjaudu sisään",
  CONTINUE = "Jatka sivulle",
}

interface LayoutProps {
  children: React.ReactNode | any; // For children.props that comes from Contentful
}

const Layout = ({ children }: LayoutProps) => {
  const { data: session, status } = useSession();

  const setTitle = () => {
    if (children && children.props.recipe?.fields.title)
      return children.props.recipe?.fields.title;

    return status === AuthStatusTypes.AUTHENTICATED
      ? TITLES.CONTINUE
      : TITLES.SIGNIN;
  };

  return (
    <div className="layout">
      {session && (
        <div className="flex justify-end items-center">
          <Image src={session.user!.image!} width={40} height={40} />
          <button
            className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 m-5 rounded"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Kirjaudu ulos
          </button>
        </div>
      )}

      <Header title={setTitle()} />

      <div>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
