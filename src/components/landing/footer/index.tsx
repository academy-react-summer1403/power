"use client";

import React from "react";
import { FooterContactUs } from "./FooterContactUs";
import { CompanyInfo } from "./CompanyInfo";
import { UsefulLinks } from "./UsefulLinks";
import { FooterInfo } from "./FooterInfo";



export const Footer = () => {
  return (
    <div className="w-auto h-auto" data-aos="fade-down">
      <div className=" h-auto lg:h-[480px] w-full lg:flex-nowrap flex gap-4 sm:gap-8 md:gap-16 lg:gap-24 items-center justify-center flex-wrap bg-[#06042E] p-6 md:p-12">
        <FooterInfo />
        <UsefulLinks />
        <CompanyInfo />
        <FooterContactUs />
      </div>
      <div className="h-[100px] w-full bg-[#1C1A4A] text-center content-center text-[#8C9AB4]">
        © تمامی حقوق این سایت متعلق به تیم نامبر وان می باشد.
      </div>
    </div>
  );
};
