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
        <div className='h-[150px] w-full flex flex-wrap justify-center items-center' style={{backgroundImage:`url(${BackPic.src})`, backgroundSize: 'cover'}}>
            {title && (
                <TypeAnimation
                    sequence={[
                        title, 
                        5000, 
                        '', 
                        500, 
                    ]}
                    repeat={Infinity}
                    speed={30} 
                    className='w-full text-center text-[40px] font-semibold text-[#161439]'
                />
            )}
            <ul style={{ listStyleType: 'none', padding: 0, marginTop: '10px' }}>
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
