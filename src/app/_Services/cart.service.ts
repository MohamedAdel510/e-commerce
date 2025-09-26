import { MyGetUserToken } from "_/Utils/utils";
import { CartItemType } from "../cart/cart.type";

 export async function getUerCart(): Promise<CartItemType | null>{

    const userToken = await MyGetUserToken();
    if(userToken){
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart",{
          cache: "force-cache",
          headers:{
            token: userToken as string
          },
          
        });

        const finalRes = await res.json();

        // console.log("MyToken", userToken);
        
        

        // console.log("UserCart", finalRes);
        

        const {numOfCartItems, data: {products, totalCartPrice}, cartId} = finalRes; 

       return {numOfCartItems, products, totalCartPrice, cartId};
      
    }
    return null;
  }

