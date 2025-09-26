
import React from 'react';
import { ProductCardProps } from './ProductCard.type';
import { FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import Link from 'next/link';
import { Button } from '_/components/ui/button';
import AddToCartBtn from '../../cart/AddToCartBtn';

export default function ProductCard({ product } : ProductCardProps) {


  const dicount = Math.floor((product.price - product.priceAfterDiscount ) / product.price * 100);
  const stars: number[] = [1, 2, 3, 4, 5]; 



  return (
    <>
          <div className = "shadow-lg rounded-lg flex flex-col gap-2 p-3 relative " >
            <Link href = {`/productDetails/${product.id}`}> 
              <img src={product.imageCover} alt={product.title.split(' ', 3).join(' ')} className='w-full' />
              <h5 className=' font-bold '> {product.title.split(' ', 3).join(' ')} </h5>
              <div className = "flex items-center">
                {stars.map( (num) =>  (num <= Math.floor(product.ratingsAverage)) ? <FaStar key={num} className = " text-yellow-500  " /> : <FaStar key = {num} className = " text-[#d1d5db]  " />  )}
                <span className = "ml-2  text-[#747a88]"> {product.ratingsAverage} </span> 
              </div>
              
              { product.priceAfterDiscount ? <h3 className=' text-2xl font-bold text-[#dc2626] '>  <span className = " text-lg font-medium">EGP</span> {product.priceAfterDiscount} <span className = "line-through text-lg font-medium text-[#7E859B]">{product.price} </span> </h3> : <h3 className = " text-2xl font-bold"> <span className = " text-lg font-medium">EGP</span> {product.price}</h3>}
            </Link>
            <div className="flex justify-between items-center">
              <div className = " flex gap-3 items-center "> 
                <AddToCartBtn productId = {product.id} />
                {product.quantity > 0 && <span className = "text-[#634C9F] font-bold text-sm"> IN STOCK </span> }
              </div>

              <div className = " text-xl  font bold  cursor-pointer" >
                <FaRegHeart/>
              </div>
            </div>    
            {product.priceAfterDiscount && <p className = " bg-[#dc2626] w-fit p-2 rounded-xl text-white text-[12px] absolute top-2.5 left-2.5">{dicount}%</p> }
          </div>
      
    </>
  )
}
