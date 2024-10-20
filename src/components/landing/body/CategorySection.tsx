import Image from 'next/image';
import React from 'react';
import DefaultPic from "@/assets/landing/body/Untitled-1(3).png"

interface CategoryProp {
  catList: Category[];
}

export const CategorySection: React.FC<CategoryProp> = ({catList}) => {

  return (
    <div className="w-full mt-32 h-auto flex flex-wrap justify-center" >
      <div className="w-[90%] md:w-[80%] flex flex-wrap justify-center h-auto lg:w-[1440px]" data-aos="fade-up">
        <div className="w-full md:w-[187.5px] h-[30px] content-center bg-[#EFEEFE] dark:bg-[#3a3a3a] rounded-[30px] text-center text-[#5751E1] dark:text-[#fafafa] font-medium">
          دسته یندی های پر طرف دار
        </div>
        <h1 className="w-full mt-3 text-center h-auto font-semibold text-[24px] md:text-[36px] text-[#161439] dark:text-[#fafafa]">
          دسته بندی های پر طرف دار
        </h1>
        <p className="w-full md:w-[437px] text-[#6D6C80] dark:text-[#B0B0B0] h-auto">
          امروزه به دلیل آن که ارتباطات فضای مجازی رونق زیادی یافته است
        </p>
        <div className="w-[1410px] mt-3 h-auto flex-wrap  p-10 lg:p-0 overflow-hidden lg:flex-nowrap lg:h-[315px] rounded-[500px] flex justify-center items-center gap-11 bg-[#F7F7F9] dark:bg-[#282828] ">
                {catList.map((item , index) => {
                  return(
                    <div key={index}  className='w-[150px] h-[215px] flex flex-wrap '>
                            <div className='w-[150px] h-[150px] flex justify-center items-center rounded-full border border-[#C9C9DD] bg-gradient-to-r from-white to-[#F1F1FA]' > <Image width={150} height={150} src={DefaultPic || item.iconAddress} alt="" /> </div>
                            <h1 className='w-full mt-3 text-[#161439] dark:text-white text-[18px] text-center'> {item.techName} </h1>
                            <p className='text-[#6D6C80] w-full text-center mt-2'> {`(${item.parentId})`} </p>
                    </div>
                  )
                })}
        </div>
      </div>
    </div>
  )
}
