'use client'
import { Button } from '_/components/ui/button'
import React, { use, useContext } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { clearCartAction } from './cart.actions';
import { CartContext } from '../_Contexts/CartContext/CartContextProvider';

export default  function ClearCartBtn() {

    const {updateCartCount} = useContext(CartContext);

    async function handleClearCart(){
        await clearCartAction(); // will return true or false
        // any message for user

        updateCartCount(0);
    }

  return (
    <Button onClick={handleClearCart} variant={'ghost'} className='cursor-pointer  border-1 border-[#DADCE3]  ' ><FaRegTrashAlt /> Remove all</Button>
  )
}
