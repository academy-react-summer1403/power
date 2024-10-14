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

const FilterSection: React.FC<FilterSectionProps> = ({
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
    <div className="w-[20%] h-auto p-4 flex flex-col gap-2">
      <input
        type="text"
        name="search"
        placeholder="جستجوی دوره"
        value={filter.search}
        onChange={handleFilterChange}
        className="p-2 border rounded"
      />
      <div className="bg-[#F7F7F9] h-auto w-full p-1 rounded-xl">
        <p className="text-[20px]">دسته بندی</p>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <label>
                <input
                  type="checkbox"
                  checked={filter.category === category.id}
                  onChange={() => handleCategoryChange(category.id)}
                />
                {category.techName}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-[#F7F7F9] h-auto w-full p-1 rounded-xl">
        <p className="text-[20px]">نوع دوره</p>
        <ul>
          {courseTypes.map((type) => (
            <li key={type.id}>
              <label>
                <input
                  type="checkbox"
                  checked={filter.courseType === type.id}
                  onChange={() => handleCourseTypeChange(type.id)}
                />
                {type.typeName}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-[#F7F7F9] h-auto w-full p-1 rounded-xl">
        <p className="text-[20px]">سطح دوره</p>
        <ul>
          {courseLevels.map((level) => (
            <li key={level.id}>
              <label>
                <input
                  type="checkbox"
                  checked={filter.courseLevel === level.id}
                  onChange={() => handleCourseLevelChange(level.id)}
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
        <p>{`مقدار کل: ${filter.costRange[1]}, مقدار حال: ${filter.costRange[0]}`}</p>
      </div>
    </div>
  );
}

export default FilterSection;
