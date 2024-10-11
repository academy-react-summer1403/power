import Image from "next/image";

interface AppDownloadButtonProps {
  title: string;
  subtitle: string;
  icon: string;
}

export const AppDownloadButton: React.FC<AppDownloadButtonProps> = ({
  title,
  subtitle,
  icon,
}) => (
  <div className="w-[155px] h-[50px] bg-[#1C1B3C] flex rounded-md">
    <div className="w-[70%] h-full text-end content-center">
      <h2 className="text-[#B2BBCC] text-[10px]">{subtitle}</h2>
      <h2 className="text-white">{title}</h2>
    </div>
    <div className="w-[30%] h-full flex justify-center items-center">
      <Image className="w-5 h-6" src={icon} alt={title} />
    </div>
  </div>
);
