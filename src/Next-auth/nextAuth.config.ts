
import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GooglePrvider from "next-auth/providers/google"
import {jwtDecode} from 'jwt-decode'

export const nextAuthConfig : NextAuthOptions = {
    providers: [
        Credentials({
            name: "Meem",
            authorize: async function(credentials, req){

                const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
                    method: 'post',
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-type": "application/json",
                    }
                });

                const finalRes = await res.json();
                // console.log("Credintials-finalRes", finalRes);
                
                if(finalRes.message == 'success'){
                    // const {role, ...rest} = finalRes;
                    // return rest;
                    const decodedObject : { id: string } = jwtDecode(finalRes.token);
                    return { /// user
                        id: decodedObject.id,
                        name: finalRes.user.name,
                        email: finalRes.user.email,
                        backEndToken: finalRes.token, // from back-end 
                    }
                }

                return null; 

            },
            credentials: {
                
                email: {label: "Email", type: "text", placeholder: "User Name"},
                password: {label: "Password", type: "password", placeholder: "Password"}
            },
 

            
        }),
        GooglePrvider ({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
           
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks:{
        // will be executed after successful login and each navigation
        jwt(params){
            // params.token => mutable object that will be used to mutate structur that will be encrypted using the secrit key
            // params.user => returnd user from authrize function and will be exist after login only 
            if(params.user){ // becouse this will be exist after login only and jwt will executed after successfull login and navigation 
                params.token.backEndToken = params.user.backEndToken;
                params.token.userId = params.user.id
                // console.log("jwt-Params", params);
            }
            return params.token; 
        },

        // will executed every time you will require the user session,
        // is an object represent the authenticated user
        // 3 ways to get the user session 1-useSession 2-getServerSession 3-api/auth/session 
        session(params){

            // console.log("session2-params", params);
            // params.token  => creted by next to be encrypted
            // params.session 
            
            params.session.user.id = params.token.userId;
            return params.session;
        },
       
    },
    session: {
        maxAge: 60 * 60 * 24  // 1 day
    }
}