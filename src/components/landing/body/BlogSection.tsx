import { NewsWrapper } from "./News/NewsWrapper";

interface NewsWrapperProps {
    newsList: News[];
  }

export const BlogSection: React.FC<NewsWrapperProps> = ({ newsList }) => {
  return (
    <div className="h-[840px] w-full bg-[#F7F7F9] flex flex-wrap justify-center items-center">
      <h2 className="w-[135px] h-[30px] bg-[#EFEEFE] rounded-[30px] text-[#5751E1] text-center content-center font-medium">
        اخبار و وبلاگ ها
      </h2>
      <h1 className="text-[#161439] text-[36px] font-semibold w-full h-11 text-center content-center">
        آخرین اخبار ما
      </h1>
      <div className="">
        <NewsWrapper newsList={newsList} />
      </div>
    </div>
  );
};
