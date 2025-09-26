"use client";
import { Button } from "_/components/ui/button";
import { Input } from "_/components/ui/input";
import { Label } from "_/components/ui/label";
import { FaRegCreditCard } from "react-icons/fa6";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paySchema } from "./paymentSchema";
import { PaymentFormType } from "./payment.types";
import { getUerCart } from "_/app/_Services/cart.service";
import { date } from "zod";
import { checkoutSession, CreatCashOrder } from "./payment.actions";
import { CartItemType } from "../cart.type";
import Link from "next/link";
import { CartContext } from "_/app/_Contexts/CartContext/CartContextProvider";
import { toast } from "sonner";

export default function Payment() {

  const [userCart, setUserCart] = useState<CartItemType | null>(null);
  const {updateCartCount} = useContext(CartContext);
  

  const {register, handleSubmit}  = useForm({
    defaultValues:{
      details: "",
      phone: "",
      city: ""
    },
    mode : 'onSubmit',
    resolver: zodResolver(paySchema)
  });

  async function handleGetUserCart(){
      const res = await getUerCart();
      console.log("userCartRes", res);
      
      
      setUserCart(res);
      // console.log("cartId State", cartId);
      
  }

  async function MyhandleSubmit(data : PaymentFormType){

      const shippingAddress = {
        details: data.details,
        phone: data.phone,
        city: data.city 
      }

      if(data.paymentWay == "cash"){
        const res = await CreatCashOrder(userCart?.cartId || '', shippingAddress);
        if(res){
          updateCartCount(0);

          toast.success("Order placed", {position: "top-right", duration: 2000,
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
      else if(data.paymentWay == "credit"){
        // creat credit order
        const res = await checkoutSession(userCart?.cartId || '', shippingAddress);
        if(res){
          
          toast.success("Order placed", {position: "top-right", duration: 2000,
            style: {
                '--normal-bg':
                'color-mix(in oklab, light-dark(var(--color-green-600), var(--color-green-400)) 10%, var(--background))',
                '--normal-text': 'light-dark(var(--color-green-600), var(--color-green-400))',
                '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
            } as React.CSSProperties});
          window.open(res, "_self"); 
        }else{
          toast.error("Error happened", {position: "top-right", duration: 2000, 
              style: {
                  '--normal-bg': 'color-mix(in oklab, var(--destructive) 10%, var(--background))',
                  '--normal-text': 'var(--destructive)',
                  '--normal-border': 'var(--destructive)'
          } as React.CSSProperties});
        }
    
      }

  }

  useEffect(() => {
    
    handleGetUserCart();

  }, [])
  



  return (
    <>
      <div className="w-full sm:w-10/12 md:w-2/3 lg:w-1/2 mx-auto text-center  py-14 ">

                
        <div className=" bg-[#F7F7FA] p-4 rounded-lg flex flex-col gap-5 sticky left-12 top-12 mb-5">
          
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

        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit( MyhandleSubmit )}  >
          <div className="flex flex-col gap-2.5">
            <Label>Details</Label>
            <Input {...register("details")}/>
          </div>

          <div className="flex flex-col gap-2.5">
            <Label>Phone</Label>
            <Input {...register("phone")} />
          </div>

          <div className="flex flex-col gap-2.5">
            <Label>City</Label>
            <Input {...register("city")} />
          </div>

          <div className="self-start flex gap-3 ps-3">
              <input {...register("paymentWay")} type="radio" name="paymentWay" value={'cash'} id = "cash"  />
              <label htmlFor="cash">Cash On Delivary</label>
          </div>
          <div className="self-start flex gap-3 ps-3">
              <input {...register("paymentWay")} type="radio" name="paymentWay" value={'credit'} id = "credit"  />
              <label htmlFor="credit">Debit/Credit Card</label>
          </div>

          <Button className="cursor-pointer bg-[#634C9F] " type="submit">
            PLACE ORDER
          </Button>
        </form>
      </div>
    </>
  );
}
