import Image from "next/image";
import DefaultPic from "@/assets/CourseDetail/courses_details.jpg.png";

interface CourseImageProps {
  imageAddress?: string; 
  title: string;
}

export const CourseImage: React.FC<CourseImageProps> = ({ imageAddress, title }) => {
  const isValidImageSrc = (src: string | undefined) => {
    return src && (src.startsWith('/') || src.startsWith('http'));
  };

  const imageSrc = isValidImageSrc(imageAddress) ? imageAddress : DefaultPic;

  return (
    <div className="w-[1050px] h-[470px] rounded-2xl overflow-hidden flex">
      <Image src={imageSrc} alt={title} height={235} width={1050} />
    </div>
  );
};
