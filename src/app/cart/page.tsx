import React from 'react'
import CartItem from './CartItem';
import { Button } from '_/components/ui/button';
import emptyCartImgae from '../../assets/images/emptyCart.png'
import { getUerCart } from '../_Services/cart.service';
import ClearCartBtn from './ClearCartBtn';
import Link from 'next/link';

export default async function page() {

  const userCart  = await getUerCart();

  // console.log("userCart", userCart);
  
  if(userCart?.numOfCartItems == 0){
    return (
      <div className='flex items-center justify-center'>
        <img  className='w-full'  src={ emptyCartImgae.src} alt='Empty cart'/>
      </div>
    )
  }


  return (
    <>
      <div className="grid grid-cols-12 gap-5 items-start">

        
        <div className="col-span-12 lg:col-span-4  xl:col-span-3 lg:order-2 bg-[#F7F7FA] p-4 rounded-lg flex flex-col gap-5 sticky left-12 top-12">
          
          <h2 className='text-xl font-bold text-[#404553]'>Order Summary</h2>
         
          <div className="border-b-1 p-2 ">
            <div className=" flex items-center justify-between">
              <p className='text-[#AFB3C1]'>Subtotal <span>({userCart?.numOfCartItems } items)</span></p>
              <p>EGP {userCart?.totalCartPrice}</p>
            </div>
          
            <div className="flex items-center justify-between">
              <p className='text-[#AFB3C1]'>Shipping Fee</p>
              <p className='text-lg font-bold text-green-500'>FREE</p>
            </div>
          </div>

          <div className="flex justify-between ">
            <h2 className='text-xl font-bold text-[#404553]'>Total</h2>
            <h2 className='text-xl font-bold text-[#404553]'>EGP {userCart?.totalCartPrice}</h2>
          </div>

          <Link href='/cart/payment'>
            <Button className='w-full text-xl font-bold bg-[#634C9F] hover:bg-[#634C9F] cursor-pointer'>CHECKOUT</Button>
          </Link>

        </div>

        <div className="col-span-12 lg:col-span-8  xl:col-span-9 lg:order-1  flex flex-col gap-4">
          <div className="flex justify-between">
                        <h1 className='text-2xl font-bold '>
              Cart
              <span className='ml-2 text-[14px] text-[#85899B]'>({userCart?.numOfCartItems} items)</span>
            </h1> 

            
            <ClearCartBtn/>
          </div>
           
         {userCart?.products.map((product) => <CartItem key={product._id}  prod = { product} /> )}

        </div>

        
      </div>
    </>
  )
}
