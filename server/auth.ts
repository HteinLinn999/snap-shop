import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/server";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
//
// import { ZodError } from "zod";
import { loginSchema } from "@/types/login-schema";
import { eq } from "drizzle-orm";
import { users } from "./schema";
import bcrypt from "bcrypt";

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
    Credentials({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "*********", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const validatedData = loginSchema.safeParse(credentials);
          if (!validatedData.success) return null;
    
          const { email, password } = validatedData.data;
          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });
    
          if (!user || !user.password) return null;
    
          const isMatch = await bcrypt.compare(password, user.password);
          return isMatch ? user : null;
        } catch (error) {
          console.error("Authorization error:", error);
          //if (error instanceof ZodError) 
          return null;
        }
      },
    })
  ],
  secret: process.env.AUTH_SECRET,
});
//export default NextAuth(authOptions);
