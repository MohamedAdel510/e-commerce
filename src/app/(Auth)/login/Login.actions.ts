"use server"

import { LoginType } from "./login.type";

export async function handleLogin(data : LoginType){

    try {
        const res  = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            "Content-Type" : "application/json"
        }
    });

    const finalRes = await res.json();
    // console.log("Login-finalRes", finalRes);
    return finalRes;
    

    } catch (error) {
        console.log(error);
        return  false;
    }

}