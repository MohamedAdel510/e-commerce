'use server'
import { cookies } from "next/headers";
import { decode, JWT } from "next-auth/jwt";

export async function MyGetUserToken()  {
    
    //getting token from cookies
    const cookie = await cookies();
    const userToken = cookie.get("next-auth.session-token")?.value;

    // decode the token becouse this token is jwt token 

    const decodedToken  = await decode({token: userToken, secret: process.env.NEXTAUTH_SECRET || ""});

    return decodedToken?.backEndToken // retun token or null
}