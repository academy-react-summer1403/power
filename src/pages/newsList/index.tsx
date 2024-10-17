import React, { useEffect, useState } from "react";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import Breadcrumb from "@/components/path";
import { NewsWrapper } from "@/components/News/NewsWrapper";
import { NewsPagination } from "@/components/News/newsPagination";
import { getNews, getPaperCat } from "@/core/services/api/news";
import { NewsFilterSection } from "@/components/News/newsFilterSection";

type Filter = {
  search: string;
  sort: string;
  category: string;
};

export const NewsListPage: React.FC = () => {
  const path = ["در رویدادهای خبری"];
  const title = "همه ی اخبار";

  const [news, setNews] = useState<Array<any>>([]);
  const [categoriesState, setCategories] = useState<Array<any>>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<Filter>({
    search: "",
    sort: "",
    category: [],
  });

  const fetchNews = async () => {
    const fetchedNewsData = await getNews(
      currentPage,
      filter.sort,
      filter.search,
      filter.category.join(",")
    );
    if (fetchedNewsData) {
      setNews(fetchedNewsData.news);
      setTotalCount(fetchedNewsData.totalCount);
    }
  };

  const fetchCategories = async () => {
    const catResults = await getPaperCat();
    if (catResults) {
      setCategories(catResults);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchNews();
  }, [filter, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({ ...prev, search: e.target.value }));
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({ ...prev, sort: e.target.value }));
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId: string) => {
    setFilter((prev) => {
      if (prev.category.includes(categoryId)) {
        return {
          ...prev,
          category: prev.category.filter((cat) => cat !== categoryId),
        };
      } else {
        return { ...prev, category: [...prev.category, categoryId] };
      }
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header />
      <div className="w-full h-auto flex flex-wrap justify-center">
        <Breadcrumb path={path} title={title} />
        <div className="w-[1115px] h-auto mt-32 mb-32 flex flex-wrap">
          <NewsFilterSection
            filter={filter}
            categories={categoriesState}
            handleFilterChange={handleSearchChange}
            handleCategoryChange={handleCategoryChange}
            handleSortChange={handleSortChange}
          />
          <div className="h-auto mb-20 w-[80%] flex flex-wrap gap-4">
            <div className="w-full h-[50px] flex justify-between">
              <div className="flex items-center justify-center">
                {`${totalCount} خبر در دسترس است`}
              </div>
              <div className="flex items-center gap-3">
                <p>مرتب سازی بر اساس:</p>
                <select
                  onChange={handleSortChange}
                  className="p-2 border rounded mt-2"
                >
                  <option value="">انتخاب کنید</option>
                  <option value="Popularity">محبوبیت</option>
                  <option value="Date">تاریخ</option>
                </select>
              </div>
            </div>
            <div className="flex h-auto lg:h-[1475px] items-start flex-wrap justify-center gap-4">
              <NewsWrapper newsList={news} />
            </div>
              <NewsPagination
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
