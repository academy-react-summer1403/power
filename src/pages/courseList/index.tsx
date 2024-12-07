"use client";

import React, { useEffect, useState } from "react";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import FlexListPic from "@/assets/CourseList/flex.png";
import GridListPic from "@/assets/CourseList/grid.svg";
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
import { useLocation } from "react-router-dom";
import CountUp from "react-countup";
import { GetTeacher } from "@/core/services/api/landing";
import { useDebounce } from "@/hook/useDebounce";

type Filter = {
  search: string;
  sort: string;
  SortType: string;
  category: string[];
  courseType: string;
  courseLevel: string;
  costRange: [number, number];
  PageNumber: number;
  teacherId?: number;
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
  const [teachers, setTeachers] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "flex">("grid");
  
  const location = useLocation();
  
  // State for filters
  const [filter, setFilter] = useState<Filter>({
    search: new URLSearchParams(location.search).get("search") || "",
    sort: "",
    SortType: "",
    category: [],
    courseType: "",
    courseLevel: "",
    costRange: [0, 1000000],
    PageNumber: 1,
    teacherId: null,
  });
  
  const fetchCourses = async () => {
    const { courseFilterDtos, totalCount } = await getallbypgCourseList(
      filter.sort,
      filter.SortType,
      filter.search,
      filter.category,
      filter.courseType,
      filter.courseLevel,
      filter.costRange[1],
      filter.costRange[0],
      currentPage,
      filter.teacherId
    );
    setCourses(courseFilterDtos || []);
    setTotalCount(totalCount);
  };
  const debouncedSearch = useDebounce(filter.search , 800);

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
    fetchTeachers();
  }, [debouncedSearch , filter, currentPage ]);

  // Handle Filter Change
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilter((prev) => ({ ...prev, search: e.target.value }));
      setCurrentPage(1);
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const values = e.target.value.split(",");
    setFilter({
      ...filter,
      costRange: [parseInt(values[0]), parseInt(values[1])],
    });
  };

  const resetFilters = () => {
    setFilter({
      search: "",
      sort: "",
      SortType: "",
      category: [],
      courseType: "",
      courseLevel: "",
      costRange: [0, 1000000],
      teacherId: [],
    });
    setCurrentPage(1);
  };

  // Handle Sorting
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      setFilter({ ...filter, sort: value });
      setCurrentPage(1);
    } else {
      setFilter((prev) => ({ ...prev, sort: "" }));
    }
    setCurrentPage(1);
  };

  // Handle SortingType
  const handleSortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setFilter((prev) => ({
      ...prev,
      SortType: value || "",
    }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
    setFilter({
      ...filter,
      courseType: filter.courseType === typeId ? "" : typeId,
    });
    setCurrentPage(1);
  };

  // Handle course level selection
  const handleCourseLevelChange = (levelId: string) => {
    setFilter({
      ...filter,
      courseLevel: filter.courseLevel === levelId ? "" : levelId,
    });
    setCurrentPage(1);
  };

  const handleTeacherChange = (teacherId: number) => {
    setFilter((prev) => {
      const currentTeacherIds = prev.teacherId || [];
      const updatedTeacherIds = currentTeacherIds.includes(teacherId)
        ? currentTeacherIds.filter((id) => id !== teacherId)
        : [...currentTeacherIds, teacherId];

      return { ...prev, teacherId: updatedTeacherIds };
    });
  };

  const fetchTeachers = async () => {
    try {
      const teacherResults = await GetTeacher();
      setTeachers(teacherResults || []);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleViewChange = (mode: "flex" | "grid") => {
    setViewMode(mode);
  };

  return (
    <>
      <Header />
      <div className="w-full h-auto flex flex-wrap justify-center">
        <Breadcrumb path={path} title={title} />
        <div className="w-[90%] h-auto mt-32 mb-32 flex flex-wrap lg:flex-nowrap">
          <FilterSection
            filter={filter}
            teachers={teachers}
            categories={categories}
            courseTypes={courseTypes}
            courseLevels={courseLevels}
            handleTeacherChange={handleTeacherChange}
            handleFilterChange={handleFilterChange}
            handleRangeChange={handleRangeChange}
            handleCategoryChange={handleCategoryChange}
            handleCourseTypeChange={handleCourseTypeChange}
            handleCourseLevelChange={handleCourseLevelChange}
            resetFilters={resetFilters}
          />
          <div className="h-auto w-[100%] flex flex-wrap gap-4">
            <div className="w-full h-[50px] flex justify-between">
              <div className=" hidden lg:flex items-center gap-2 justify-center">
                <CountUp end={totalCount} duration={15} />
                دوره در دسترس است
              </div>
              <div className="flex items-center gap-3">
                <p> مرتب سازی بر اساس: </p>
                <select
                  name="SortType"
                  onChange={handleSortTypeChange}
                  className="p-2 border rounded mt-2"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="ASC">قیمت (صعودی)</option>
                  <option value="DESC">قیمت (نزولی)</option>
                </select>
                <select
                  name="sort"
                  onChange={handleSortChange}
                  className="p-2 border rounded mt-2 ml-2"
                >
                  <option value="courseRate">محبوبیت</option>
                  <option value="cost">قیمت</option>
                  <option value="lastUpdate">بروز ترین</option>
                </select>

                <button
                  className={`w-10 h-10 flex justify-center items-center ${
                    viewMode === "grid"
                      ? "bg-[#5751E1] "
                      : "border border-[#6196EA]"
                  } rounded`}
                  onClick={() => handleViewChange("grid")}
                >
                  <Image
                    className={`                    ${
                      viewMode === "grid" ? " " : " brightness-0"
                    } `}
                    src={FlexListPic}
                    alt=""
                  />
                </button>
                <button
                  className={`w-10 h-10 flex justify-center items-center ${
                    viewMode === "flex"
                      ? "bg-[#5751E1] "
                      : "border border-[#6196EA]"
                  } rounded`}
                  onClick={() => handleViewChange("flex")}
                >
                  <Image
                    className={`                    ${
                      viewMode === "grid" ? "  " : "brightness-200"
                    } `}
                    src={GridListPic}
                    alt=""
                  />
                </button>
              </div>
            </div>
            <CourseWrapper viewMode={viewMode} stateTopCourse={courses} />
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
