import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/server";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
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


// server/auth.ts
/* import { SessionStrategy } from "next-auth";
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

// Create the NextAuth configuration
const authOptions = {
  adapter: DrizzleAdapter(db),
  secret: process.env.AUTH_SECRET!,
  session: { strategy: "jwt" as SessionStrategy },
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

// Initialize NextAuth and export handlers
export const handlers = NextAuth(authOptions);

// Export the handlers for use in the route.ts file
export const { GET, POST } = handlers;

// Export auth, signIn, and signOut for use elsewhere
export const { auth, signIn, signOut } = handlers; */