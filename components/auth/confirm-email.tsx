"use client";

import { confirmEmailWithToken } from "@/server/actions/tokens";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import AuthForm from "./auth-form";
import { cn } from "@/lib/utils";

const ConfirmEmail = () => {
  const token = useSearchParams().get("token");
  const router = useRouter();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleConfirmEmail = useCallback(() => {
    if (!token) {
      setError("Invalid token");
      return;
    }
    //token ရှိမှ အောက်က ကုဒ်ကို တွက်ချက်
    confirmEmailWithToken(token).then((res) => {
      if (res.success) {
        setSuccess(res.success); //Email verified
        router.push("/auth/login");
      }
      if (res.error) setError(res.error);
    });
  }, []);

  useEffect(() => {
    handleConfirmEmail();
  }, []);
  return (
    <AuthForm
      showProvider={false}
      formTitle="Confrim Email "
      footerLabel="Login to your account"
      footerHref="/auth/login"
    >
      <p
        className={cn(
          "text-center font-bold text-xl text-primary",
          error && "text-red-600"
        )}
      >
        {success && error ? "Confirming Email ...." : success ? success : error}
      </p>
    </AuthForm>
  );
};

export default ConfirmEmail;
