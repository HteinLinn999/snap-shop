"use server";

import { registerSchema } from "@/types/register-schema";
import { actionClient } from "./safe-action";
import bcrypt from "bcrypt";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sendEmail } from "./emails";
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
        //generate verification token for email expires  in 30 minutes
        const verificationToken = await generateEmailVerificationToken(email);
        //send verification email
        await sendEmail(
          verificationToken[0].email,
          verificationToken[0].token,
          name.slice(0, 5) //for firstName
        );

        return { success: "Email verification resent" };
      }
      return { error: "email  already exists ." };
    }

    //record user
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    //generate verification token for email expires  in 30 minutes
    const verificationToken = await generateEmailVerificationToken(email);
    await sendEmail(
      verificationToken[0].email,
      verificationToken[0].token,
      name.slice(0, 5) //for firstName
    );

    //send verification email
    return { success: "Email verification sent" };
  });
