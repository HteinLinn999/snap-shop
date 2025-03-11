import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import NavLogo from "./nav-logo";
import UserButton from "./user-button";

export default async function AppNav() {
  const session = (await getServerSession(authOptions)) as {
    user: { name: string; email: string };
  };
 const {user} = session;
 console.log("user:",user);
  return (
    <div>
      {/* Pass the session as a prop to NavLogo */}
      <NavLogo />
      <UserButton />
    </div>
  );
}