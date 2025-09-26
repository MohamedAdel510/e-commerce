'use server'
import { json } from "zod";
import { RegisterType } from "./Rigester.type";
import { cookies } from "next/headers";

export async function handleRegister(data : RegisterType){
    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json"
            }   
        });
        const finalRes = await res.json();
        // console.log("Register-final-Result", finalRes);

        if(finalRes.message == 'success'){
            const cookie =  await  cookies();
            cookie.set("user-tokn", finalRes.tokn, {
                httpOnly:true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 7 
            });
        }

        return finalRes;
         
    } catch (error) {
        console.log(error);
        return false;
    }
}