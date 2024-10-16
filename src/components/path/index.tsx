import React from 'react';
import BackPic from '@/assets/backPic.png';
import { TypeAnimation } from 'react-type-animation';

interface BreadcrumbProps {
    path: string[];
    title?: string; 
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, title }) => {
    const defaultPath = ['صفحه اصلی'];
    const fullPath = [...defaultPath, ...path];

    return (
        <div className='h-[150px] w-full flex flex-wrap justify-center items-center relative' 
             style={{backgroundImage: `url(${BackPic.src})`, backgroundSize: 'cover'}}>
            <div className='absolute inset-0 dark:bg-black opacity-40 dark:opacity-70'></div>

            {title && (
                <TypeAnimation
                    sequence={[
                        title, 
                        5000, 
                        '', 
                        500, 
                    ]}
                    repeat={Infinity}
                    speed={20} 
                    className='relative w-full text-center text-[40px] font-semibold dark:text-gray-200'
                />
            )}
            <ul className='relative list-none p-0 mt-2'>
                {fullPath.map((segment, index) => (
                    <li className='inline w-full text-[20px] text-gray-800 dark:text-gray-300' key={index}>
                        {segment}
                        {index < fullPath.length - 1 && ' > '}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Breadcrumb;
