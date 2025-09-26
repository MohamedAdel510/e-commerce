import { nextAuthConfig } from "_/Next-auth/nextAuth.config";
import NextAuth from "next-auth";


 const handler =  NextAuth(nextAuthConfig);

 export { handler as GET, handler as POST }