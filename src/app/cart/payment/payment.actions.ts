'use server'
import { MyGetUserToken } from "_/Utils/utils"
import {shippingAddressType } from "./payment.types";
import { revalidatePath } from "next/cache";



export async function CreatCashOrder(id : string , shippingAddress : shippingAddressType){

    const userToken = await MyGetUserToken();

    if(userToken){
       try{
            const res =  await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${id}`, {
                method: 'post',
                headers: {
                    token: userToken as string,
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({ shippingAddress })
            });
            const finalRes = await res.json();
            if(finalRes.status == 'success'){
                revalidatePath('/cart');
                return true; 
            }

            // console.log("Create cash order", finalRes);


       }catch(error){
            // console.log(error);
            return false;
       }
        
    }

    return false;

}
export async function checkoutSession(id : string , shippingAddress : shippingAddressType){

    const userToken = await MyGetUserToken();

    if(userToken){
       try{
            const res =  await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${id}`, {
                method: 'post',
                headers: {
                    token: userToken as string,
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({ shippingAddress })
            });
            const finalRes = await res.json();
            // console.log("Credit pay", finalRes);
            
            if(finalRes.status == 'success'){
                 return finalRes.session;
            }

       }catch(error){
            // console.log(error);
            return false;
       }
        
    }

    return false;

}
