"use client";

import React, { useEffect, useState } from "react";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import FlexListPic from "@/assets/CourseList/flex.png"
import GridListPic from "@/assets/CourseList/grid.svg"
import Image from "next/image";
import Breadcrumb from "@/components/path";
import {
  getallbypgCourseList,
  getCat,
  getCourseType,
  getCourseLevel,
} from "@/core/services/api/course";
import { CourseWrapper } from "@/components/Course/CourseWrapper";
import Pagination from "@/components/Course/Pagination";
import { FilterSection } from "@/components/Course/FilterSection";

type Filter = {
  search: string;
  sort: string;
  category: string[];
  courseType: string;
  courseLevel: string;
  costRange: [number, number];
  PageNumber: number;
};

export const CourseList: React.FC = () => {
  const path = ["درروه های اموزشی"];
  const title = "همه ی دوره ها";

  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [courseTypes, setCourseTypes] = useState<any[]>([]);
  const [courseLevels, setCourseLevels] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // State for filters
  const [filter, setFilter] = useState<Filter>({
    search: "",
    sort: "",
    category: [],
    courseType: "",
    courseLevel: "",
    costRange: [0, 1000000],
    PageNumber: 1,
  });

  const fetchCourses = async () => {
    const { courseFilterDtos, totalCount } = await getallbypgCourseList(
      filter.sort,
      filter.search,
      filter.category,
      filter.courseType,
      filter.courseLevel,
      filter.costRange[1],
      filter.costRange[0],
      currentPage,
    );
    setCourses(courseFilterDtos || []);
    setTotalCount(totalCount);
  };

  const fetchFilterOptions = async () => {
    try {
      const [catResults, typeResults, levelResults] = await Promise.all([
        getCat(),
        getCourseType(),
        getCourseLevel(),
      ]);
      setCategories(catResults || []);
      setCourseTypes(typeResults || []);
      setCourseLevels(levelResults || []);
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

useEffect(() => {
  fetchFilterOptions();
  fetchCourses(); 
}, [filter, currentPage]);

  // Handle Filter Change
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
    setCurrentPage(1); 
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value.split(",");
    setFilter({ ...filter, costRange: [parseInt(values[0]), parseInt(values[1])] });
  };

// Handle Sorting
const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const value = e.target.value;
  if (value) {
    setFilter({ ...filter, sort: value });
    setCurrentPage(1); 
  } else {
    setFilter(prev => ({ ...prev, sort: "" }));
  }
  setCurrentPage(1)
};

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

// Handle category change
const handleCategoryChange = (categoryId: string) => {
  setFilter((prev) => {
    const newCategories = prev.category.includes(categoryId)
      ? prev.category.filter((id) => id !== categoryId) 
      : [...prev.category, categoryId]; 
    return { ...prev, category: newCategories };
  });
  setCurrentPage(1);
};

  // Handle course type selection
  const handleCourseTypeChange = (typeId: string) => {
    setFilter({ ...filter, courseType: filter.courseType === typeId ? "" : typeId });
    setCurrentPage(1); 
  };

  // Handle course level selection
  const handleCourseLevelChange = (levelId: string) => {
    setFilter({ ...filter, courseLevel: filter.courseLevel === levelId ? "" : levelId });
    setCurrentPage(1); 
  };

  return (
    <>
      <Header />
      <div className="w-full h-auto flex flex-wrap justify-center">
        <Breadcrumb path={path} title={title} />
        <div className="w-[1115px] h-auto mt-32 mb-32 flex flex-wrap">
        <FilterSection
            filter={filter}
            categories={categories}
            courseTypes={courseTypes}
            courseLevels={courseLevels}
            handleFilterChange={handleFilterChange}
            handleRangeChange={handleRangeChange}
            handleCategoryChange={handleCategoryChange}
            handleCourseTypeChange={handleCourseTypeChange}
            handleCourseLevelChange={handleCourseLevelChange}
          />
          <div className="h-auto w-[80%] flex flex-wrap gap-4">
            <div className="w-full h-[50px] flex justify-between">
              <div className="flex items-center justify-center">
                {`${totalCount} کورس در دسترس است`}
              </div>
              <div className="flex items-center gap-3"> 
                <p> مرتب سازی بر اساس: </p>
                <select
                  name="sort"
                  onChange={handleSortChange}
                  className="p-2 border rounded mt-2"
                >
                  <option value="cost">قیمت (صعودی)</option>
                  <option value="cost">قیمت (نزولی)</option>
                </select>
                <select
                  name="sort"
                  onChange={handleSortChange}
                  className="p-2 border rounded mt-2 ml-2"
                >
                  <option value="likeCount">محبوبیت</option>
                  <option value="Active">دوره فعال</option>
                  <option value="courseRate">بروز ترین</option>
                </select>

                <button className="w-10 h-10 flex justify-center items-center bg-[#5751E1]  rounded">
                          <Image src={FlexListPic} alt=""/>
                </button>
                <button className="w-10 h-10 flex justify-center items-center border border-[#6196EA] rounded">
                          <Image src={GridListPic} alt=""/>
                </button>
              </div>
            </div>
            <CourseWrapper stateTopCourse={courses} />
            <Pagination
              totalCount={totalCount}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
