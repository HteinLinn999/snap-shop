"use server";

import EmailConfirmationTemplate from "@/components/email-template";
import { getBaseURL } from "@/lib/get-baseURL";
import { Resend } from "resend";
const currentBaseURL = getBaseURL();
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  email: string,
  token: string,
  userFirstname: string
) => {
  const confirmLink = `${currentBaseURL}/confirm-email?token=${token}`;
  console.log("email :", email);
  console.log("currentBaseURL :", currentBaseURL);
  console.log("confirmLink", confirmLink);
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your account - welcome to Snapshop",
    react: EmailConfirmationTemplate({
      userFirstname,
      confirmEmailLink: confirmLink,
    }),
  });

  if (error) {
    console.log("error :", error);
  }
};
