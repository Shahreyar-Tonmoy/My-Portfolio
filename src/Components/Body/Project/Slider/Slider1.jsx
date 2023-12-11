
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'

import sliderImg1 from '../../../../assets/Slider1/1.png';
import sliderImg2 from '../../../../assets/Slider1/2.png';
import sliderImg3 from '../../../../assets/Slider1/3.png';
import sliderImg4 from '../../../../assets/Slider1/4.png';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Slider1() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}

                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper "
            >

                {/* 1 */}

                <SwiperSlide>
                    <div>
                        <img className='h-52 rounded-xl w-full' src={sliderImg1} alt="" />
                    </div>
                </SwiperSlide>
                {/* 2 */}

                <SwiperSlide>
                    <div>
                        <img className='h-52 rounded-xl w-full' src={sliderImg2} alt="" />
                    </div>
                </SwiperSlide>
                {/* 3 */}

                <SwiperSlide>
                    <div>
                        <img className='h-52 rounded-xl w-full' src={sliderImg3} alt="" />
                    </div>
                </SwiperSlide>
                {/* 4 */}

                <SwiperSlide>
                    <div>
                        <img className='h-52 rounded-xl w-full' src={sliderImg4} alt="" />
                    </div>
                </SwiperSlide>



            </Swiper>
        </>
    );
}
