import Image from 'next/image';
import React from 'react';
import DefaultPic from "@/assets/landing/body/Untitled-1(3).png";
import { motion } from 'framer-motion';

interface Category {
  techName: string;
  parentId: string;
}

interface CategoryProp {
  catList: Category[];
}

const containerVariants = {
  hidden: { opacity: 0, transition: { duration: 0.5 } },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const CategorySection: React.FC<CategoryProp> = ({ catList }) => {
  return (
    <motion.div 
      className="w-full mt-32 mb-52 h-auto flex flex-wrap justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-[90%] md:w-[80%] flex flex-col items-center h-auto lg:w-[1440px]" data-aos="fade-up">
        <div className="w-full md:w-[187.5px] h-[30px] content-center bg-[#EFEEFE] dark:bg-[#3a3a3a] rounded-[30px] text-center text-[#5751E1] dark:text-[#fafafa] font-medium"> دسته یندی های پر طرف دار </div>
        <h1 className="w-full mt-5 text-center font-semibold text-[28px] md:text-[36px] text-[#161439] dark:text-[#fafafa]">
          دسته بندی های پر طرف دار
        </h1>
        <p className="w-full mt-3 md:w-[437px] text-[#6D6C80] dark:text-[#B0B0B0] text-center mb-8">
          امروزه به دلیل آن که ارتباطات فضای مجازی رونق زیادی یافته است
        </p>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full"
          variants={containerVariants}
        >
          {catList.map((item, index) => {
            const iconSrc = DefaultPic;

            return (
              <motion.div
                key={index}
                className={`flex flex-col items-center dark:bg-[#3a3a3a] dark:text-white rounded-xl shadow-gray-300 dark:shadow-gray-600 hover:shadow-gray-300 hover:shadow-[0_0_5px_2px] p-4 transition-transform transform relative ${index % 2 !== 0 ? 'top-0 bg-white shadow-[0_0_5px_0.5px]' : 'shadow-[0_0_5px_1px] top-48 bg-gray-100'}`}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className='w-24 h-24 flex justify-center items-center rounded-full border border-[#C9C9DD] bg-gradient-to-r from-white to-[#F1F1FA] mb-3'>
                  <Image width={150} height={150} src={iconSrc} alt={item.techName} className="rounded-full" />
                </div>
                <h1 className='text-[#161439] dark:text-white text-[18px] text-center'>{item.techName}</h1>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}
