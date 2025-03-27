"use server";

import { loginSchema } from "@/types/login-schema";
import { actionClient } from "./safe-action";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { db } from "..";
import { generateEmailVerificationToken } from "./tokens";
import { sendEmail } from "./emails";

import {authOptions} from '../auth';
import { AuthError } from "next-auth";
import { signIn } from 'next-auth/server';

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {

    const { signIn } = authOptions;
    console.log("authOptions.signOut :", authOptions.signOut);
    console.log("signIn :", signIn);
    
    try {
      //check email exists or not in the database
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser?.email !== email) {
        return { error: "Please provide valid credentials" };
      }
      if (!existingUser?.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(
          existingUser?.email
        );

        await sendEmail(
          verificationToken[0].email,
          verificationToken[0].token,
          existingUser?.name!.slice(0, 5)
        );

        return { success: "Email verification sent" };
      }

      await signIn("credentials", { email, password, redirrectTo: "/" });
      return { success: "Logged in successfully" };
    } catch (error) {
      /* if (error instanceof AuthError) {
        const authError = error as AuthError; // Explicitly assert the type
        switch (authError.type) {
          case "CredentialsSignin":
            return {error: "please provide valid credentials"};
          case "OAuthSigninError":
            return {error: (error as AuthError).message};
        }
      } */
     console.log("error :", error);
      throw { error : error.message };
    }
  });
