import React from 'react';

export const CategorySection = () => {
  return (
    <div className="w-full mt-32 h-auto flex flex-wrap justify-center" >
      <div className="w-[90%] md:w-[80%] flex flex-wrap justify-center h-auto lg:w-[1440px]" data-aos="fade-up">
        <div className="w-full md:w-[187.5px] h-[30px] bg-[#EFEEFE] rounded-[30px] text-center text-[#5751E1] font-medium">
          دسته یندی های پر طرف دار
        </div>
        <h1 className="w-full text-center h-auto font-semibold text-[24px] md:text-[36px] text-[#161439]">
          دسته بندی های پر طرف دار
        </h1>
        <p className="w-full md:w-[437px] text-[#6D6C80] h-auto">
          امروزه به دلیل آن که ارتباطات فضای مجازی رونق زیادی یافته است
        </p>
        <div className="w-[1410px] h-[315px] rounded-[500px] bg-[#F7F7F9] "></div>
      </div>
    </div>
  )
}