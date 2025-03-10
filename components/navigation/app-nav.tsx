
  import { getServerSession } from "next-auth";
  import { authOptions } from "@/server/auth";
  import NavLogo from "./nav-logo";
  import UserButton from "./user-button";

  const AppNav =async() => {
      const session = await getServerSession(authOptions);
      //const session = await authOptions();
      console.log("session:",session);
      
    return (
      <nav>
        <NavLogo />
        <UserButton />
      </nav>
    );
  };

  export default AppNav;
