import Image from "next/image";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { DateConvert } from "@/core/services/utils/date";
import StudentPic from "@/assets/CourseDetail/student.png";
import CalenderPic from "@/assets/CourseDetail/date.png";
import ScorePic from "@/assets/CourseDetail/star.svg";
import { useState } from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import toast from "react-hot-toast";
import { AddCourseRate, liked, disLiked } from "@/core/services/api/course";
import { AddCourseFavoriteApi } from "@/core/services/api/landing";
import { formatDescription } from "@/core/services/utils/formatDescription";
import { getItem } from "@/core/services/common/storage.services";

interface CourseInfoProps {
  detail: any;
  score: number;
}

export const CourseTopInfo: React.FC<CourseInfoProps> = ({
  detail,
  score,
}) => {
  const [localIsUserFavorite, setLocalIsUserFavorite] = useState(detail?.isUserFavorite);
  const [localUserDissLike, setLocalUserDissLike] = useState(detail?.currentUserDissLike);
  const [localUserLike, setLocalUserLike] = useState(detail?.currentUserLike);
  const [localRate, setLocalRate] = useState(detail?.currentUserRateNumber);
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setLoading(true);
    try {
      const element = document.body; 
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true, 
      });

      const pdf = new jsPDF("p", "mm", "a4"); 
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // عرض A4
      const imgHeight = (canvas.height * imgWidth) / canvas.width; 
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${detail.title}.pdf`); 
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if(getItem("token")){
      if (loading) return;
      setLoading(true);
      try {
        const res = await liked(detail.courseId);
        if (res.success) {
          setLocalUserLike(localUserLike + 1);
          setLocalUserDissLike(0);
          toast.success(res.message);
        } else {
          toast.error(res.errorMessage);
        }
      } catch (error) {
        toast.error("Failed to like the course.");
      } finally {
        setLoading(false);
      }
    }
    else{
      toast.error("برای لایک ابتدا وارد شوید")
    }
  };

  const handleDislike = async () => {
    if(getItem("token")){
      
          if (loading) return;
          setLoading(true);
          try {
            const res = await disLiked(detail.courseId);
            if (res.success) {
              setLocalUserDissLike(localUserDissLike + 1);
              setLocalUserLike(0);
              toast.success(res.message);
            } else {
              toast.error(res.errorMessage);
            }
          } catch (error) {
            toast.error("Failed to dislike the course.");
          } finally {
            setLoading(false);
          }
    }
    else{
      toast.error("برای دیسلایک ابتدا وارد شوید")
    }
  };

  const handleRate = async (rate: number) => {
    if(getItem("token")){
      if (loading) return;
      setLoading(true);
      try {
        const res = await AddCourseRate(detail.courseId, rate);
        if (res.success) {
          setLocalRate(rate);
          toast.success("Rating submitted!");
        } else {
          toast.error(res.errorMessage);
        }
      } catch (error) {
        toast.error("Failed to submit rating.");
      } finally {
        setLoading(false);
      }
    }
    else{
      toast.error("برای نمره دادن ابتدا وارد شودید")
    }
  };

  const handleAddToFavorites = async () => {
    if(getItem("token")){
      if (loading) return;
      setLoading(true);
      try {
        const data = { courseId: detail.courseId };
        const res = await AddCourseFavoriteApi(data);
        if (res.success) {
          setLocalIsUserFavorite(true);
          toast.success(res.message);
        } else {
          toast.error(res.errorMessage);
        }
      } catch (error) {
        setLocalIsUserFavorite(false);
        toast.error("Failed to add to favorites.");
      } finally {
        setLoading(false);
      }
    }
    else{
      toast.error("برای ثبت نام ابتدا وارد شودید")
    }
  };

  return (
    <>
      <div className="w-full lg:w-[90%] justify-center md:justify-normal mt-8 flex gap-5 items-center">
        <div className="w-auto h-7 bg-[#EFEFF2] dark:bg-[#5751E1] text-center p-1 rounded-full content-center">
          {detail.courseLevelName}
        </div>
        <p className="flex gap-3">
          <Image src={ScorePic} alt="Score" /> امتیاز {`(${score})`}
        </p>
      </div>
      <h1 className="w-[90%] text-center md:text-right mt-3 text-[28px] lg:text-[30px] text-[#161439] dark:text-white font-semibold">
        {formatDescription(detail.title)}
      </h1>
      <div className="w-[90%] justify-center md:justify-normal mt-8 flex gap-8 items-center text-[#7F7E97] dark:text-white flex-wrap">
        <div>
          توسط{" "}
          <span className="text-[#161439] dark:text-gray-600 ">
            {detail.teacherName}
          </span>
        </div>
        <div className="flex gap-2">
          <Image className="w-5 h-5" src={CalenderPic} alt="Date" />
          {DateConvert(detail.insertDate)}
        </div>
        <div className="flex gap-2">
          <Image className="w-5 h-5" src={StudentPic} alt="Students" />
          {detail.capacity} دانش آموز
        </div>
      </div>
      <div className="border-b p-10 border-t mt-5 mb-10 items-center justify-between w-[90%] flex flex-wrap gap-4 border-[#E8E8E8]">
        <div className="flex gap-5 items-center">
          <p className="text-black dark:text-white text-[16px] lg:text-[18px] font-semibold">
            آیا از این مقاله راضی بودید؟
          </p>
          <div className="flex gap-4">
            <div
              className="w-9 h-9 rounded-full bg-[#EFEFF1] dark:bg-[#5751E1] flex justify-center items-center cursor-pointer"
              onClick={handleDislike}
            >
              <FaThumbsDown
                className={`w-5 h-5 ${localUserDissLike > 0 ? 'text-red-500' : 'text-gray-600'}`}
              />
            </div>
            <div
              className="w-9 h-9 rounded-full bg-[#EFEFF1] dark:bg-[#5751E1] flex justify-center items-center cursor-pointer"
              onClick={handleLike}
            >
              <FaThumbsUp
                className={`w-5 h-5 ${localUserLike > 0 ? 'text-blue-500' : 'text-gray-600'}`}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center">
          نمره شما به این دوره:
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={`flex items-center cursor-pointer ${star <= localRate ? 'text-yellow-500' : 'text-gray-400'}`}
              onClick={() => handleRate(star)}
            >
              ★
            </div>
          ))}
        </div>
        <button
        onClick={handleDownloadPDF}
        className="bg-[#5751E1] text-white rounded-xl shadow-[2px_3px_0_0] shadow-[#050071] p-2 h-auto"
      >
        {loading ? "در حال آماده‌سازی..." : "دانلود PDF"}
      </button>
        <button
          onClick={handleAddToFavorites}
          className="bg-[#5751E1] text-white rounded-xl shadow-[2px_3px_0_0] shadow-[#050071] p-2 h-auto"
        >
          اضفه کردن به لیسته علاقه مندی ها
        </button>
      </div>
    </>
  );
};

export default CourseTopInfo;
