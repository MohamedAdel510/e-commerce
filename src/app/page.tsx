import React, { lazy, Suspense } from 'react';
import ProductCard from './_Components/ProductCard/ProductCard';
import { getAllProducts } from './_Services/products.service';
import HomeSwiper from './_Components/HomeSwiper/HomeSwiper';
import { getAllCategories } from './_Services/category.service';
import Loading from './_Components/Loading/Loading';

export default async function Home() {

  const allProducts = await getAllProducts(); 

  const allCategories = await getAllCategories();
  const CategrieSlider =  lazy( () => import('./_Components/HomeSwiper/CategorySwiper') );

  return (
    <>  
    <div className=" flex flex-col gap-16">

      <div className="">
        <HomeSwiper/>
      </div>

      <div className="relative">
       <Suspense fallback = { <Loading/> }>
         <CategrieSlider listOfSlide={ allCategories?.map( function(categ){ return { imageSrc: categ.image, categName: categ.name } } ) } />
       </Suspense>
      </div>

    </div>  

    <div className = " grid grid-cols-12 w-11/12 mx-auto gap-5 py-10 ">

        {allProducts?.map( ( product ) => <div key={product.id} className ="col-span-12  min-sm:col-span-6  min-md:col-span-4 min-lg:col-span-3"> 

              <ProductCard key = { product.id } product = { product} />

          </div>  )}
    </div>
    </>
  )
}
