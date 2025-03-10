/* import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/server";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
export const authOptions = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
});
 */
import NextAuth, { SessionStrategy } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

export const authOptions = {
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" as SessionStrategy },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debugging for NextAuth.js
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);