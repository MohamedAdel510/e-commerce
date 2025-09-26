import { getSpasificProduct } from '_/app/_Services/products.service'
import React from 'react'
import { FaRegHeart, FaStar } from 'react-icons/fa6';
import { FiShoppingCart } from 'react-icons/fi';
import { GoCreditCard } from "react-icons/go";
import { AiOutlineSafety } from "react-icons/ai";
import AddToCartBtn from '_/app/cart/AddToCartBtn';


type ProductDetailsProps = {
    params : {id: string}
}

export default async function page( props : ProductDetailsProps) {

  const stars = [ 1, 2, 3, 4, 5];
  const product = await getSpasificProduct(props.params.id);
  const dicount = Math.floor((product.price - product.priceAfterDiscount) / product.price * 100);
  // console.log("ProductDetails", product);

  if(!product){
    return;
  }

  return (
    <div className='grid grid-cols-12 py-10'>

        <div className=" col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 ">
            <div className="main-Image relative">
              <img src={product?.imageCover} alt={product?.title} className = " w-full" />
              {product.priceAfterDiscount && <p className = " bg-[#dc2626] w-fit p-2 rounded-xl text-white text-[12px] absolute top-2.5 left-2.5">{dicount}%</p> }
            </div>

        </div>

        <div className=" col-span-12 md:col-span-6 lg:col-span-8 xl:col-span-9 flex flex-col justify-center gap-3 p-5">
  
          <h2 className= "text-3xl font-bold">{product?.title}</h2>
          
          <div className = "flex items-center border-b-1 py-3 border-[#D1D5DB]">
            {stars.map( (num) =>  (num <= Math.floor(product?.ratingsAverage)) ? <FaStar key={num} className = " text-yellow-500  " /> : <FaStar key = {num} className = " text-[#d1d5db]  " />  )}
            <span className = "ml-2  text-black text-[14px] font-bold border-1 px-1 rounded-lg border-[#D1D5DB]"> {product?.ratingsAverage} </span> 
          </div>
  
          <p className='text-[#4B5563]  '>{product?.description}</p>
  
  
          { product.priceAfterDiscount ? <h3 className=' text-2xl font-bold text-[#dc2626] '>  <span className = " text-lg font-medium">EGP</span> {product?.priceAfterDiscount} <span className = "line-through text-lg font-medium text-[#7E859B]">{product.price} </span> </h3> : <h3 className = " text-2xl font-bold"> <span className = " text-lg font-medium">EGP</span> {product.price}</h3>}
    
          {/* <button className='bg-[#634C9F]  w-fit text-white  px-6 py-3  rounded-lg cursor-pointer flex gap-2 items-center '> <FiShoppingCart /> Add to cart </button> */}

            <AddToCartBtn productId={product?.id} />

          <div className=" border-1 border-[#E5E7EB] rounded-lg  p-4 my-3" >
            <div className="p-2 cridt flex i0tems-center gap-6 text-[#6B7280] border-b-1 border-[#E5E7EB] ">
              <GoCreditCard size = {30} />
              <p className = " text-[13px]">
                <span className = " font-bold"> Payment </span>. Payment upon receipt of goods, Payment by card in the department, Google Pay,
                Online card, -5% discount in case of payment
              </p>
            </div>

            <div className="p-2  flex items-center gap-6 text-[#6B7280] ">
              <AiOutlineSafety size = {30}  />
              <p className = " text-[13px]">
                <span className = " font-bold" > Warrantly </span>. The Consumer Protection Act does not provide for the return of this product of proper
                  quality.
              </p>
            </div>

          </div>

          <div className = " flex items-center gap-2">
            
            <div className = " text-xl  font-bold  cursor-pointer border-1 w-fit p-2 rounded-lg border-[#6B7280]" >
             <FaRegHeart/>  
            </div>

            <span>Add to wish list</span>

          </div>
        </div>
        
    </div>
  )
}
