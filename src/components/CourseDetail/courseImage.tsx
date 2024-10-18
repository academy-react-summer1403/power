import Image from "next/image";
import DefaultPic from "@/assets/CourseDetail/courses_details.jpg.png";

interface CourseImageProps {
  imageAddress: string;
  title: string;
}

export const CourseImage: React.FC<CourseImageProps> = ({ imageAddress, title }) => (
  <div className="w-[1050px] h-[470px] rounded-2xl overflow-hidden flex">
    <Image src={imageAddress || DefaultPic} alt={title} height={235} width={1050} />
  </div>
);
