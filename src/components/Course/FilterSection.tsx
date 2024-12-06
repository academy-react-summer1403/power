import React from "react";

interface Teacher {
  teacherId: number;
  fullName: string;
}

interface Category {
  id: string;
  techName: string;
}

interface CourseType {
  id: string;
  typeName: string;
}

interface CourseLevel {
  id: string;
  levelName: string;
}

interface Filter {
  search: string;
  category: string;
  courseType: string;
  courseLevel: string;
  costRange: [number, number];
}

const initialFilter: Filter = {
  search: "",
  category: [],
  courseType: "",
  courseLevel: "",
  costRange: [0, 1000000],
  teacherId: [], 
};

interface FilterSectionProps {
  filter: Filter;
  teachers: Teacher[];
  categories: Category[];
  courseTypes: CourseType[];
  courseLevels: CourseLevel[];
  handleTeacherChange: (teacherId: number) => void;
  handleCategoryChange: (categoryId: string) => void;
  handleCourseTypeChange: (courseTypeId: string) => void;
  handleCourseLevelChange: (courseLevelId: string) => void;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRangeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetFilters:() => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  filter,
  categories,
  courseTypes,
  courseLevels,
  teachers,
  handleFilterChange,
  handleRangeChange,
  handleCategoryChange,
  handleCourseTypeChange,
  handleCourseLevelChange,
  handleTeacherChange,
  resetFilters
}) => {

  

  const isFilterActive = (): boolean => {
    return (
      filter.search.trim() !== "" ||
      filter.category.length > 0 ||
      filter.courseType !== "" ||
      filter.courseLevel !== "" ||
      filter.costRange[0] !== 0 ||
      filter.costRange[1] !== 1000000 ||
      (Array.isArray(filter.teacherId) && filter.teacherId.length > 0) 
    );
  };

  return (
    <div className="w-full transition-all md:w-[20%] h-auto p-4 flex flex-col gap-4 ">
      <div className="flex transition-all flex-col gap-4">
        {isFilterActive() && (
          <button
            onClick={resetFilters}
            className="bg-red-500 transition-all text-white p-2 rounded"
          >
            حذف فیلترها
          </button>
        )}
      </div>
      <input
        type="text"
        name="search"
        placeholder="جستجوی دوره"
        value={filter.search}
        onChange={handleFilterChange}
        className="p-2 border w-full h-[50px] rounded bg-[#F7F7F9] dark:bg-gray-700 outline-none dark:border-gray-600 dark:text-white"
      />
      <div className="bg-[#F7F7F9] dark:bg-gray-700 h-auto w-full p-4 rounded-xl">
        <p className="text-[20px] font-semibold text-black dark:text-white">
          دسته بندی
        </p>
        <ul className="flex mt-5 max-h-[150px] overflow-auto flex-col gap-2">
          {categories.map((category) => (
            <li key={category.id} className="flex items-center hover:p-1 transition-all gap-2">
              <input
                type="checkbox"
                id={category.id}
                checked={filter.category === category.id}
                onChange={() => handleCategoryChange(category.id)}
                className="mr-2 accent-indigo-600 dark:accent-indigo-400"
              />
              <label
                htmlFor={category.id}
                className="cursor-pointer flex items-center"
              >
                <span className="text-black dark:text-white">
                  {category.techName}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-[#F7F7F9] dark:bg-gray-700 h-auto w-full p-4 rounded-xl">
        <p className="text-[20px] font-semibold text-black dark:text-white">
          نوع دوره
        </p>
        <ul className="flex mt-5 flex-col gap-2">
          {courseTypes.map((type) => (
            <li key={type.id} className="flex  hover:p-1 transition-all  items-center gap-2">
              <input
                type="checkbox"
                checked={filter.courseType === type.id}
                onChange={() => handleCourseTypeChange(type.id)}
                className="mr-2 accent-indigo-600 dark:accent-indigo-400"
              />
              <label className="cursor-pointer flex items-center">
                <span className="text-black dark:text-white">
                  {type.typeName}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-[#F7F7F9] dark:bg-gray-700 h-auto w-full p-4 rounded-xl">
        <p className="text-[20px] font-semibold text-black dark:text-white">
          سطح دوره
        </p>
        <ul className="flex mt-5 flex-col max-h-[150px] overflow-auto gap-2">
          {courseLevels.map((level) => (
            <li key={level.id} className="flex  hover:p-1 transition-all  items-center gap-2">
              <input
                type="checkbox"
                checked={filter.courseLevel === level.id}
                onChange={() => handleCourseLevelChange(level.id)}
                className="mr-2 accent-indigo-600 dark:accent-indigo-400"
              />
              <label className="cursor-pointer flex items-center">
                <span className="text-black dark:text-white">
                  {level.levelName}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-[#F7F7F9] dark:bg-gray-700 h-auto w-full p-4 rounded-xl">
        <p className="text-[20px] font-semibold text-black dark:text-white">
          مدرس
        </p>
        <ul className="flex mt-5 flex-col max-h-[150px] overflow-auto gap-2">
          {teachers.map((teacher, index) => (
            <li
              key={`${teacher.teacherId}-${index}`}
              className="flex  hover:p-1 transition-all  items-center gap-2"
            >
              <input
                type="checkbox"
                id={`teacher-${teacher.teacherId}`}
                checked={filter.teacherId?.includes(teacher.teacherId) || false}
                onChange={() => handleTeacherChange(teacher.teacherId)}
                className="mr-2 accent-indigo-600 dark:accent-indigo-400"
              />
              <label
                htmlFor={`teacher-${teacher.teacherId}`}
                className="cursor-pointer flex items-center"
              >
                <span className="text-black dark:text-white">
                  {teacher.fullName || "نامشخص"}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <input
          type="range"
          name="costRange"
          min="0"
          max="10000000000"
          value={filter.costRange.join(",")}
          onChange={handleRangeChange}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <p className="text-black dark:text-white">{`مقدار کل: ${filter.costRange[1]}، مقدار حال: ${filter.costRange[0]}`}</p>
      </div>
    </div>
  );
};
