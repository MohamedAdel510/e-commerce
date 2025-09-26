'use server'
import { MyGetUserToken } from "_/Utils/utils"
import { revalidatePath } from "next/cache";

export async function AddToCartAction(productId : string){
// export async function AddToCartAction(){

    
    // getToken => we can use it inside middleware or route handler only!!

    // getToken as utility function 

    const userToken = await MyGetUserToken();

    if(userToken){
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
            method: 'post',
            body: JSON.stringify({productId}),
            headers:  {
                "Content-Type" : "application/json" ,
                token: userToken as string
            }
      });

      const finalRes = await res.json();
      // console.log("finalRes", finalRes);
      

      if(finalRes.status == "success"){
        revalidatePath('/cart');
        return finalRes.numOfCartItems;
      }
      else{
        return false;
      }
    }
    else{
      // window.location.replace("/login");
      return false;
    }
    
}

export async function removeCartItemAction(id : string){

  const userToken = await MyGetUserToken();

  if(userToken){
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      method: 'DELETE',
      headers:{
        token: userToken as string
      }
    });

    const finalRes = await res.json();

    console.log("Removed", finalRes);

    if(finalRes.status == "success"){
      revalidatePath('/cart');
      return finalRes.numOfCartItems;
    }

    return null;
    
  }
  return null;

}

export async function clearCartAction(){

  const userToken = await MyGetUserToken();

  if(userToken){
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: 'Delete',
      headers: {
        token: userToken as string
      }
    });

    const finalRes = await res.json();

    // console.log("Clear2", finalRes);

    if(finalRes.message == "success"){
      revalidatePath('/cart');
      return true
    }
    return false;
  }
  return false;

}

export async function updateCartItemsCountAction(id : string, count : number){

  const userToken = await MyGetUserToken();

  if(userToken){
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      method: 'put',
      headers: {
        token : userToken as string,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ count })
    });

    const finalRes = await res.json();
    // console.log("Update Count", finalRes);
    if(finalRes.status == 'success'){
      revalidatePath('/cart');
      return true;
    }
    return false;
  }

  return false;
}