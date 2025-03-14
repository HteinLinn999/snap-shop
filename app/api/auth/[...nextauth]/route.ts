import { authOptions } from "@/server/auth";

export {authOptions as GET ,authOptions as POST}



// import  { getServerSession } from "next-auth";
// import { authOptions } from "@/server/auth";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const session = (await getServerSession(authOptions)) as {
//     user: { name: string; email: string };
//   };

// //   const { user } = session;
// //   if (user) {
// //     console.log("user :", user);
// //   }
//   if (!session) {
//     return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
//   }

//   return NextResponse.json({ user: session });
// }

//    export { authOptions as POST}