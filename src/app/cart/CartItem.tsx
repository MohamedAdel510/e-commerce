import React, { lazy , Suspense } from 'react'
import { cartProductType } from './cart.type'
import { Button } from '_/components/ui/button'
import { FaRegHeart } from 'react-icons/fa6';
import RemoveCartItemBtn from './RemoveCartItemBtn';
import UpdateCartCount from './UpdateCartCount';

const UpdateCount = lazy( () => import('./UpdateCartCount'));

export default function CartItem({prod} : {prod : cartProductType}) {
  return (
    <div className='flex  gap-4  p-4 rounded-lg bg-[#F7F7FA]'>
        <figure className='w-1/6'>
            <img src={prod.product.imageCover} alt={prod.product.title.split(' ', 1).join()} className='w-full' />
        </figure>
      
        <div className=" w-full flex flex-col justify-around  ">
          <div className="flex justify-between  w-full">
            <h5 className='font-bold '>{prod.product.title}</h5>
            <h2 className=''>EGP<span className='text-xl font-bold ml-1 '>{prod.price}</span>  </h2>
          </div>
          <div className="flex  justify-between ">
            <div className="flex gap-5">
              <RemoveCartItemBtn id = {prod._id} />
              <Button variant={'ghost'} className='cursor-pointer  border-1 border-[#DADCE3]  ' ><FaRegHeart />  Add to wishlist</Button>
            </div>
            
            <div className=" border-[#634C9F] flex items-center gap-3 rounded-full overflow-hidden border-1 relative  px-1">
                <UpdateCartCount isIncrement id = {prod.product.id} count = {prod.count + 1} />
                <span className=''>{prod.count}</span>
                { !(prod.count == 1) && <UpdateCartCount id = {prod.product.id} count = {prod.count - 1} /> }
                
            </div>
          
          </div>
        </div>

    </div>
  )
}
