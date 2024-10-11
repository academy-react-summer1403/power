import React from 'react';
import BackPic from '@/assets/backPic.png'

interface BreadcrumbProps {
    path: string[];
    title?: string; 
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path, title }) => {
    const defaultPath = ['صفحه اصلی'];
    const fullPath = [...defaultPath, ...path];

    return (
        <div className='h-[150px] w-full flex flex-wrap justify-center items-center' style={{backgroundImage:`url(${BackPic.src})`}}>
                {title && <h2 className='w-full text-center text-[40px] font-semibold text-[#161439]'>{title}</h2>}
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {fullPath.map((segment, index) => (
                    <li className=' inline w-full text-[20px]' key={index}>
                        {segment}
                        {index < fullPath.length - 1 && ' > '}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Breadcrumb;
