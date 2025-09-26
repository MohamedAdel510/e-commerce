'use client'
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
// import logo from '@images/logo.png';
import logo from '../../../assets/images/meem logo.png';
import Link from 'next/link';
import { CiSearch, CiUser } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { signOut, useSession } from 'next-auth/react';
import { CartContext } from '_/app/_Contexts/CartContext/CartContextProvider';
import { getUerCart } from '_/app/_Services/cart.service';


export default function Navbar() {

  const [accountMenu, setAccountMenu] = useState(false); 
  const [days, setdays] = useState(0);
  const [hours, sethours] = useState(0);
  const [minutes, setminutes] = useState(0);
  const [seconds, setseconds] = useState(0);

  const [scrolled, setScrolled] = useState(false);


  const { cartCount, updateCartCount }  = useContext(CartContext);

  
  function handleToggleMenue(){
    if(accountMenu){
      setAccountMenu(false);
    }
    else{
      setAccountMenu(true);
    }
  }
  
  const endDate = new Date("2025-11-01T23:59:59").getTime();
  const now = new Date().getTime();
  const diff = endDate - now;
  
  function updateCountdown() {
    setdays(Math.floor(diff / (1000 * 60 * 60 * 24)));
    sethours(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setminutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
    setseconds(Math.floor((diff % (1000 * 60)) / 1000));
  }

  function handleScroll(){
    setScrolled( window.scrollY > 50 );
  }
  
  useEffect(() => {
    
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);  

  useEffect(() => {
    getUerCart().then(res => {
      // console.log("res",res);
      if(res){
        updateCartCount(res?.numOfCartItems);
      }
      
    }); 
  }, []);

  
      // console.log("inti cart cout: " , intialCartCount, "cart count state: ", cartCount);
  

  const {data} = useSession();
    
  function handleLogOut(){
    signOut({redirect: false});
  }

      // console.log("intialCartCount", intialCartCount, "cartCount", cartCount);
      

    //  setTimeout(updateCountdown, 1000);

  return (

      <nav className="bg-white  w-full fixed w-full z-40  ">

        <div className={` transition duration-500 w-full ${ scrolled && " -translate-y-full  absolute  " } `}>
          <div className="py-1 text-center bg-[#634C9F] lg:flex  items-center justify-around ">
          <p className = "text-white text-mid">FREE delivery & 40% Discount for next 3 orders! Place your 1st sorder in.</p>
          {diff <= 0 ? <p className = " text-[#c3b9da]">The sale has ended!</p>  : <p className = " text-[#c3b9da] flex justify-center flex-wrap items-center gap-2"> Until the end of the sale:
             <span className = "text-white  text-2xl font-bold" > {String(days).padStart(2, '0')} </span> days  
             <span className = "text-white  text-2xl font-bold" > {String(hours).padStart(2, '0')} </span> hours 
             <span className = "text-white  text-2xl font-bold" > {String(minutes).padStart(2, '0')} </span>  minutes 
             <span className = "text-white  text-2xl font-bold" > {String(seconds).padStart(2, '0')} </span> sec 
            
          </p>}
          <span></span>
        </div>

        <div className="flex flex-wrap w-11/12 mx-auto gap-5 max-sm:gap-3 py-1">
            <p className = " text-[#6b7280] cursor-pointer">About Us</p>  
            {data && <p className = " text-[#6b7280] cursor-pointer">My account</p>}  
            {data && <p className = " text-[#6b7280] cursor-pointer">Wishlist</p>}  
            <p className = " text-[#6b7280] border-l-1 pl-5 max-sm:border-l-0 max-sm:pl-0 border-[#ebedf0]">We deliver to you every dat from <span className = "text-[#ea580c] font-bold"> 7:00 to 23:00 </span> </p>  
        </div>
        </div>

        <div className=" border-y-1 border-[#e5e7eb]">
          <div className=" flex items-center justify-between mx-auto p-4 w-11/12 ">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src = {logo} alt = "Meem Store" className = "w-10" />
            <span className="self-center text-3xl bg-linear-to-bl from-[#d949ee] to-[#684ca2] bg-clip-text text-transparent font-semibold whitespace-nowrap ">meem</span>
          </Link>

          <label  className='relative w-1/2 max-sm:hidden '>
            <CiSearch className='absolute right-2.5 top-1/2 -translate-y-1/2 text-2xl' />
            <input type="text" className="w-full bg-[#f3f4f6] p-2.5 rounded-xl outline-0  " placeholder='Searche for products...'  />
          </label>

          <div className="flex items-center  justify-between gap-5">
            
            <span onClick = { () => { handleToggleMenue() } } className='relative'>
              <div className="flex items-center gap-3 bg-[#F3F4F6] p-2.5 rounded-lg cursor-pointer">
                <FaRegUser  className = 'text-2xl'/>
                {data && <span className='font-bold text-[14]'>{data?.user?.name?.split(' ', 1).join()}</span>}
              </div>
              <div className ={`z-10 flex flex-col gap-2 bg-[#f3f4f6] absolute top-full left-1/2 -translate-x-1/2 mt-2 p-2.5  ${ !accountMenu && "hidden" }  ` } > 
                {data && <>
                  <Link className = ' hover:bg-white font-bold p-1 ' href="/login">Profile</Link>
                  <span onClick={handleLogOut} className = ' hover:bg-white font-bold p-1  cursor-pointer'>Logout</span>
                </>}
                {!data && 
                    <>
                      <Link className = ' hover:bg-white font-bold p-1 ' href="/login">Login</Link>
                      <Link className = ' hover:bg-white font-bold p-1 ' href = "/register">Register</Link>
                    </>}
              </div>
            </span>
            
            <span className='relative'>
              <Link href = {data ? "/wishlist" : "/login"}> <FaRegHeart className="text-2xl cursor-pointer  "/> </Link>
              <span className='absolute w-4 h-4 bg-[#634C9F] rounded-full text-white flex items-center justify-center text-[10px] top-0 end-0 -translate-y-1/2 translate-x-1/2'></span>
            </span>
           
            <span className='relative'>
              <Link href={data? "/cart" : "/login"}><FiShoppingCart className='text-2xl cursor-pointer ' /></Link>
              {
                cartCount != 0 && <span className='absolute w-4 h-4 bg-[#634C9F] rounded-full text-white flex items-center justify-center text-[10px] top-0 end-0 -translate-y-1/2 translate-x-1/2'>{cartCount}</span>
              }
            </span>
          
          </div>

          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

        </div>
        </div>

        <div className="w-11/12 mx-auto ">
          <label  className='relative  min-sm:hidden '>
            <CiSearch className='absolute right-2.5 top-1/2 -translate-y-1/2 text-2xl' />
            <input type="text" className="mx-auto mt-5  w-full bg-[#f3f4f6] p-2.5 rounded-xl outline-0  " placeholder='Searche for products...'  />
          </label>
        </div>

        <div className="hidden py-2 border-y-1 border-[#e5e7eb]  md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex justify-center flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
            <li>
              <Link href="/" className="block py-2 px-3 text-white bg-[#634c9f] rounded-sm md:bg-transparent md:text-[#634c9f] md:p-0 " aria-current="page">Home</Link>
            </li>

            <li>
              <Link href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#634c9f] md:p-0">Products</Link>
            </li>

            <li>
              <Link href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#634c9f] md:p-0">Categories</Link>
            </li>

            <li>
              <Link href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#634c9f] md:p-0">Brands</Link>
            </li>

            <li>
              {data && <Link href="/cart" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#634c9f] md:p-0">Cart</Link>}
            </li>

            <li>
              {data && <Link href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#634c9f] md:p-0">Wish list</Link>}
            </li>
          </ul>
        </div>


      </nav>

   
  )
}
