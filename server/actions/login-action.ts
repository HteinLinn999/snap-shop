"use server";

import { loginSchema } from "@/types/login-schema";
import { actionClient } from "./safe-action";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { db } from "..";
import { generateEmailVerificationToken } from "./tokens";
import { sendEmail } from "./emails";

import {authOptions} from '../auth';

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {

    const { signIn } = authOptions;
    
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
    } catch (err) {
      throw err;
    }
  });
