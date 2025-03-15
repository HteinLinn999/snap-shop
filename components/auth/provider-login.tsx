"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const ProviderLogin = () => {
  const handleGoogle = () => {
    signIn("google", {
      callbackUrl: "/", //ဘယ်  URL ကနေ ဒီကောင်ကို လှမ်းခေါ်ရမလဲ
      redirect: false, //home page
    });
  };
  const handleGithub = () => {
    signIn("github", {
      callbackUrl: "/",
      redirect: false,
    });
  };
  return (
    <div className="w-full flex  flex-col gap-4">
      <Button variant={"outline"} onClick={handleGoogle}>
        <p className="flex items-center gap-3">
          Login with Google <FcGoogle size={16} />
        </p>
      </Button>
      <Button variant={"outline"} onClick={handleGithub}>
        <p className="flex items-center gap-3">
          Login with Github <FaGithub size={16} />
        </p>
      </Button>
    </div>
  );
};

export default ProviderLogin;
