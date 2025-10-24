import React from 'react';
import BackPic from '@/assets/backPic.png';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import Image from 'next/image';

interface BreadcrumbProps {
  path?: string[];
  title?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path = [], title }) => {
  const defaultPath = ['صفحه اصلی'];
  const fullPath = [...defaultPath, ...path];

  return (
    <div
      className="h-[150px] w-full flex flex-wrap justify-center items-center relative"
      style={{ backgroundImage: `url(${BackPic.src})`, backgroundSize: 'cover' }}
    >
      <div className="absolute inset-0 dark:bg-black opacity-40 dark:opacity-70" />

      {title && (
        <TypeAnimation
          sequence={[title, 5000, '', 500]}
          repeat={Infinity}
          speed={20}
          className="relative w-full text-center text-[40px] font-semibold dark:text-gray-200"
        />
      )}

      <nav className="relative z-10 mt-4">
        {fullPath.map((p, idx) => (
          <span key={idx} className="mx-2 text-sm text-gray-700 dark:text-gray-300">
            {idx < fullPath.length - 1 ? (
              <Link href={idx === 0 ? '/' : '#'}>{p}</Link>
            ) : (
              <span>{p}</span>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumb;