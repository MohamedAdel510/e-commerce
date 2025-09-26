'use client'
import { Button } from '_/components/ui/button'
import React, { useState, CSSProperties, useContext  } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { AddToCartAction } from './cart.actions';
import { toast } from 'sonner';
import { BounceLoader } from 'react-spinners';
import { CartContext } from '../_Contexts/CartContext/CartContextProvider';

export default function AddToCartBtn({productId} : {productId : string} ) {

    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const { updateCartCount } = useContext(CartContext);

    async function handleAddToCart(){
        // call Api => post api from the client should be in server action to secure rour api
        
        
        /// to be edited
        setIsAddingToCart(true);

        const numberOfCart = await AddToCartAction(productId); // return numberOfCart or false
        if(numberOfCart){
            updateCartCount(numberOfCart);
        }
        
        setIsAddingToCart(false);
    }

  return (
    
    <Button onClick={handleAddToCart} disabled={isAddingToCart}  className='bg-[#634C9F] overflow-hidden  w-fit text-white  p-2 text-xl  font-bold rounded-lg cursor-pointer '>{isAddingToCart ? <BounceLoader color="white" size={25} /> : <FiShoppingCart />}   </Button>
  )
}
