import React from "react";

interface CourseButtonsProps {
  showDetail: boolean;
  showComment: boolean;
  toggleSection: (section: "detail" | "comment") => void;
}

export const CourseButtons: React.FC<CourseButtonsProps> = ({
  showDetail,
  showComment,
  toggleSection,
}) => (
  <div className="mt-14 w-[90%] flex gap-3">
  <button
    className={`w-[150px] h-[45px] rounded-[30px] ${
      showDetail
        ? "bg-[#5751E1] text-white shadow-[4px_6px_0_0] shadow-[#050071]"
        : "bg-[#E6E9EF] text-black dark:bg-gray-700 dark:text-white"
    }`}
    onClick={() => toggleSection("detail")}
  >
    برسی اجمالی
  </button>
  <button
    className={`w-[150px] h-[45px] rounded-[30px] ${
      showComment
        ? "bg-[#5751E1] text-white shadow-[4px_6px_0_0] shadow-[#050071]"
        : "bg-[#E6E9EF] text-black dark:bg-gray-700 dark:text-white"
    }`}
    onClick={() => toggleSection("comment")}
  >
    نظرات کاربران
  </button>
</div>
);
