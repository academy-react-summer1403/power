import React from "react";

interface Category {
  id: string;
  name: string;
}

interface NewsFilter {
  query: string;
  categoryId?: string; // فقط یک id
}

interface NewsFilterSectionProps {
  filter: NewsFilter;
  categories: Category[];
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCategoryChange: (categoryId: string) => void;
  handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const NewsFilterSection: React.FC<NewsFilterSectionProps> = ({
  filter,
  categories,
  handleFilterChange,
  handleCategoryChange,
  handleSortChange,
}) => {
  return (
    <div className="w-full md:w-[20%] p-4 flex flex-col gap-4 ">
      <input
        type="text"
        name="query"
        placeholder="جستجوی اخبار"
        value={filter.query}
        onChange={handleFilterChange}
        className="p-2 border dark:bg-gray-700 outline-none dark:border-gray-600 rounded"
      />
      <div className="w-full bg-[#F7F7F9] dark:bg-gray-700 rounded-xl p-1">
        <p className="text-[#161439] dark:text-white text-[20px]">دسته بندی:</p>
        <ul className="flex flex-col mt-4 gap-2 max-h-[130px] overflow-y-auto">
          {categories.map((category) => (
            <li className="flex gap-1" key={category.id}>
              {" "}
              <label className="flex items-center p-1">
                {" "}
                <input
                  type="checkbox"
                  checked={filter.category.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="mr-2"
                />{" "}
                {category.categoryName}{" "}
              </label>{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
