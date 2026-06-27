import NextAuth from "next-auth";
import { nextAuthOptions } from "@/app/lib/next-auth/options";

const handler = NextAuth(nextAuthOptions);

// これと同じ意味
// export const GET = handler;
// export const POST = handler;
export { handler as GET, handler as POST };
