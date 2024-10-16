import React from "react";

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

interface FilterSectionProps {
  filter: Filter;
  categories: Category[];
  courseTypes: CourseType[];
  courseLevels: CourseLevel[];
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRangeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (categoryId: string) => void;
  handleCourseTypeChange: (courseTypeId: string) => void;
  handleCourseLevelChange: (courseLevelId: string) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  filter, 
  categories, 
  courseTypes, 
  courseLevels, 
  handleFilterChange,
  handleRangeChange,
  handleCategoryChange,
  handleCourseTypeChange,
  handleCourseLevelChange 
}) => {
  return (
    <div className="w-full md:w-[20%] h-auto p-4 flex flex-col gap-4">
      <input
        type="text"
        name="search"
        placeholder="جستجوی دوره"
        value={filter.search}
        onChange={handleFilterChange}
        className="p-2 border rounded"
      />
      <div className="bg-[#F7F7F9] h-auto w-full p-4 rounded-xl">
        <p className="text-[20px] font-semibold">دسته بندی</p>
        <ul className="flex flex-col gap-2">
          {categories.map((category) => (
            <li key={category.id} className="flex items-center gap-2">
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  checked={filter.category === category.id}
                  onChange={() => handleCategoryChange(category.id)}
                  className="mr-2"
                />
                {category.techName}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-[#F7F7F9] h-auto w-full p-4 rounded-xl">
        <p className="text-[20px] font-semibold">نوع دوره</p>
        <ul className="flex flex-col gap-2">
          {courseTypes.map((type) => (
            <li key={type.id} className="flex items-center gap-2">
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  checked={filter.courseType === type.id}
                  onChange={() => handleCourseTypeChange(type.id)}
                  className="mr-2"
                />
                {type.typeName}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-[#F7F7F9] h-auto w-full p-4 rounded-xl">
        <p className="text-[20px] font-semibold">سطح دوره</p>
        <ul className="flex flex-col gap-2">
          {courseLevels.map((level) => (
            <li key={level.id} className="flex items-center gap-2">
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  checked={filter.courseLevel === level.id}
                  onChange={() => handleCourseLevelChange(level.id)}
                  className="mr-2"
                />
                {level.levelName}
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
          max="1000000"
          value={filter.costRange.join(",")}
          onChange={handleRangeChange}
          className="p-2 border rounded"
        />
        <p>{`مقدار کل: ${filter.costRange[1]}، مقدار حال: ${filter.costRange[0]}`}</p>
      </div>
    </div>
  );
};

