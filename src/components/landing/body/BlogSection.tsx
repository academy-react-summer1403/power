import { NewsWrapper } from "../../News/NewsWrapper";

interface NewsWrapperProps {
  newsList: News[];
}

export const BlogSection: React.FC<NewsWrapperProps> = ({ newsList }) => {
  return (
    <div className=" h-auto lg:h-[840px] w-full bg-[#F7F7F9] dark:bg-[#1F1F1F] flex flex-col justify-center items-center">
      <h2 className="w-[135px] h-[30px] bg-[#EFEEFE] dark:bg-[#2A2A2A] rounded-[30px] text-[#5751E1] content-center dark:text-[#A3A3A3] text-center font-medium">
        اخبار و وبلاگ ها
      </h2>
      <h1 className="text-[#161439] dark:text-[#F0F0F0] text-[36px] font-semibold w-full text-center">
        آخرین اخبار ما
      </h1>
      <div className="w-full max-w-[1440px] h-auto flex-wrap lg:flex-nowrap lg:h-[575px] flex items-center justify-center gap-3 ">
        <NewsWrapper newsList={newsList} />
      </div>
    </div>
  );
};
