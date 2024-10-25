import React from "react";
import Image from "next/image";

interface ProfileProps {
  profileSrc: string;
  name: string;
}

export const Profile: React.FC<ProfileProps> = ({ profileSrc, name }) => {
  return (
    <>
      <Image
        width={128}
        height={128}
        className="rounded-full w-32 h-32"
        src={profileSrc}
        alt="Profile Picture"
      />
      <h1 className="text-[20px] w-full text-center mt-4 text-white after:block after:w-full after:h-1 after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-[#FFC224] after:to-transparent">
        {name}
      </h1>
    </>
  );
};

