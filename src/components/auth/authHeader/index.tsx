"use client"

import Image from "next/image"
import React from "react"
import { Link } from "react-router-dom"
import HomePic from "@/assets/auth/Frame.png";
import AdimPic from "@/assets/auth/icons8-admin-48 1.png";

export const AuthHeader = () => {
    return(
        <div className="w-[90%] flex h-auto items-center justify-end gap-6 ">
        <Link to="/SignUp">
          <Image src={AdimPic} alt="Admin Icon" />
        </Link>
        <Link to="/">
          <Image src={HomePic} alt="Home Icon" />
        </Link>
      </div>
    )
}