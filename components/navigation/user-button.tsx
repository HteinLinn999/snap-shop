"use client";

import { User } from "@/app/types";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const UserButton = ({ user }: { user: User | null }) => {
  return (
    <div>
      {user?.email}
      <Button
        variant={"destructive"}
        //    onClick={() => signOut()}
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Log out
      </Button>
    </div>
  );
};
export default UserButton;
