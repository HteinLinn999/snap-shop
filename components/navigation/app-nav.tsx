import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import NavLogo from "./nav-logo";
import UserButton from "./user-button";

export default async function AppNav() {
  const session = (await getServerSession(authOptions)) as {
    user: { name: string; email: string };
  };
 const {user} = session;
 
  return (
    <div className="flex items-center justify-between">
      <NavLogo />
      <UserButton user={user} />
    </div>
  );
}