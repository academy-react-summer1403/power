import Image from "next/image";
import { DateConvert } from "@/core/services/utils/date";
import StudentPic from "@/assets/CourseDetail/student.png";
import CalenderPic from "@/assets/CourseDetail/date.png";
import ScorePic from "@/assets/CourseDetail/star.svg";

interface CourseInfoProps {
  detail : any;
  score: number;
}

export const CourseTopInfo: React.FC<CourseInfoProps> = ({
  detail,
  score,
}) => (
  <>
<div className="w-[90%] mt-8 flex gap-5 items-center">
            <div className="w-auto h-7 bg-[#EFEFF2] dark:text-gray-500 text-center p-1 rounded-[50px] content-center">
              {" "}
              {detail.courseLevelName}{" "}
            </div>
            <p className="flex gap-3">
              <Image src={ScorePic} alt="" /> امتیاز {`(${score})`}{" "}
            </p>
          </div>
          <h1 className="w-[90%] mt-3 text-[30px] text-[#161439] dark:text-white font-semibold">
            {" "}
            {detail.title}{" "}
          </h1>
          <div className="w-[90%] mt-8 flex gap-8 items-center text-[#7F7E97] dark:text-white">
            <div>
              توسط{" "}
              <span className="text-[#161439] dark:text-gray-600 ">
                {" "}
                {detail.teacherName}{" "}
              </span>
            </div>
            <div className="flex gap-2">
              <Image className="w-5 h-5" src={CalenderPic} alt="" />{" "}
              {DateConvert(detail.insertDate)}{" "}
            </div>
            <div className="flex gap-2">
              <Image className="w-5 h-5" src={StudentPic} alt="" />{" "}
              {detail.capacity} دانش اموز{" "}
            </div>
          </div>
  </>
);
