'use client'
import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6' 
import { updateCartItemsCountAction } from './cart.actions';
import { toast } from 'sonner';

export default function UpdateCartCount({isIncrement = false, id , count} : 
    {isIncrement?: boolean, id :string, count :number}) {

        
    
    async function handleUpdateCartCount(){
        // call Api
        
        const isUpdated =  await updateCartItemsCountAction(id, count);  // will return true or false
        if(isUpdated){
            toast.success("count updated", {position: "top-right", duration: 2000,
            style: {
                '--normal-bg':
                'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
            } as React.CSSProperties});
        }else{
            toast.error("Error happened", {position: "top-right", duration: 2000, 
                style: {
                    '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                    '--normal-text': 'var(--destructive)',
                    '--normal-border': 'var(--destructive)'
            } as React.CSSProperties});
        }
        
    }
    
    if(isIncrement){
        return <FaPlus onClick={handleUpdateCartCount} className='h-full cursor-pointer font-medium text-[12px]' size={15} />
    }
  
    return (
        <FaMinus onClick={handleUpdateCartCount} className='h-full cursor-pointer font-medium text-[12px]' size={15} />
  )
}
