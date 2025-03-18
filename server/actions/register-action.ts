"use server";

import { registerSchema } from "@/types/register-schema";
import { actionClient } from "./safe-action";
import bcrypt from "bcrypt";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { name, email, password } }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("hashPassword :", hashedPassword);
    //check user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      if (!existingUser.emailVerified) {
        //email  က verify လုပ်မထားမှ လုပ်
        //send verification email

        return { success: "Email verification sent" };
      }
      return { error: "email  already exists ." };
    }

    //create user
    //send verification email
    return { success: "Email verification sent to your email" };
  });
