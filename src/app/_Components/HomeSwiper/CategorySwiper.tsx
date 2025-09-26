'use client'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import Link from 'next/link';


type Slide = {
  imageSrc: string,
  categName : string
}

// export type ProductCardProps = {
//     product : ProductType
// } 

export default  function CategoriesSwiper({ listOfSlide } : { listOfSlide : Slide[]} ) { 

  
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      loop
      breakpoints={{
        640: {      
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {      
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {      
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1280:{
          slidesPerView: 7,
          spaceBetween: 15,
        }
      }}
      
    >

      {listOfSlide?.map((slide) => 
        <SwiperSlide key={ slide.imageSrc }>
        <Link href='#'>
          <div className="flex flex-col items-center gap-2">
          
          <img className='w-full h-72 sm:h-52 md:h-44  xl:h-32 rounded-full' src={ slide.imageSrc } alt ={slide.categName} />

          <h2 className='text-[13px] font-bold '>{slide.categName}</h2>
          
        </div>
        </Link>
      </SwiperSlide>
    )}

    </Swiper>
  );
};