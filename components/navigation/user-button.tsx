"use client";

import { User } from "@/app/types";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { LogIn } from "lucide-react";

const UserButton = ({ user }: { user: User | null }) => {
  return (
    <div>
      {user?.email}
      {user?.email ? (
        <Button
          variant={"destructive"}
          //    onClick={() => signOut()}
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Log out
        </Button>
      ) : (
        <Button asChild>
          <Link href="/auth/login" className="sapce-x-4">
            <LogIn size={16}/> <span>Log in</span>
          </Link>
        </Button>
      )}
    </div>
  );
};
export default UserButton;
