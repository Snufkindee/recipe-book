import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    signIn: async ({ user }) => {
      if (process.env.WHITELISTED_EMAILS!.includes(user.email!))
        return Promise.resolve(true);
      else return Promise.resolve(false);
    },
  },
});
