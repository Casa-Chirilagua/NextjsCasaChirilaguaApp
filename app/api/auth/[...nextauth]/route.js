// import { handleAuth} from '@auth0/nextjs-auth0';
// export const GET = handleAuth();

import { authOptions } from "@/utils/auth0";
import NextAuth from "next-auth";


const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};