import { signIn, useSession } from "next-auth/react";
import { AuthStatusTypes } from "../types/Auth";

const PROVIDER = "google";

export default function Home() {
  const { status } = useSession();

  return (
    <div className="flex justify-center">
      <button
        className="bg-green-700 rounded hover:bg-green-800 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline mt-56"
        onClick={() => signIn(PROVIDER, { callbackUrl: "/recipes" })}
      >
        {status === AuthStatusTypes.AUTHENTICATED
          ? "Jatka sivulle"
          : "Sign in with Google"}
      </button>
    </div>
  );
}
