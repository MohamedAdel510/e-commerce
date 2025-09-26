'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import image1 from "../../../assets/images/slide1.png";
import image2 from "../../../assets/images/slide2.png";
import Image from 'next/image';


export default function HomeSwiper() {
 
  const imageSlider = [image1.src, image2.src];
  
  return (
  <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      loop
      // navigation
      // pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
    >

      {imageSlider.map( (image) => <SwiperSlide key={ image.src }>
        <div className="relataive h-[400px] md:h-[500px] ">
          
          <Image fill src={ image } alt ={"Home slide"} />
          
        </div>
      </SwiperSlide> )}
      
    </Swiper>
  );
};