import Image from "next/image";
import { AppDownloadButton } from "./AppDownloadButton";
import YoutubIcon from "@/assets/footer/youtub.png";
import InstagramIcon from "@/assets/footer/instagram.png";
import WhatsApp from "@/assets/footer/whatsapp.png";
import TwiterIcon from "@/assets/footer/twiter.png";
import FaceBookIcon from "@/assets/footer/facebook.png";
import GooglePlaykIcon from "@/assets/footer/googlePlay.png";
import AppleIcon from "@/assets/footer/appleStore.png";

export const FooterContactUs: React.FC = () => (
  <div className="w-full lg:w-[20%] justify-center lg:justify-start h-[60%] text-[#B2BBCC] flex flex-col font-medium">
    <h1 className="text-white w-[170px] font-semibold text-2xl border-b-4 p-1 border-[#5751E1]">در تماس باشید</h1>
    <p className="mt-5">هنگامی که یک چاپگر ناشناس گرفت نوع گالی و درهم</p>
    <div className="flex gap-4 mt-5">
      <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
        <Image className=" hover:bg-white/20" src={YoutubIcon} alt="YouTube" />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <Image className=" hover:bg-white/20" src={InstagramIcon} alt="Instagram" />
      </a>
      <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
        <Image className=" hover:bg-white/20" src={WhatsApp} alt="WhatsApp" />
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
        <Image className=" hover:bg-white/20" src={TwiterIcon} alt="Twitter" />
      </a>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <Image className=" hover:bg-white/20" src={FaceBookIcon} alt="Facebook" />
      </a>
    </div>
    <div className="flex gap-2 w-full mt-10">
      <AppDownloadButton
        title="Apple Store"
        subtitle="Download On The"
        icon={AppleIcon}
      />
      <AppDownloadButton
        title="Google Play"
        subtitle="Get It On"
        icon={GooglePlaykIcon}
      />
    </div>
  </div>
);
