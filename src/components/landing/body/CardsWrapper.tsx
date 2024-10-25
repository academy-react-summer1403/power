import {RequestCard} from './requestCard';
import MorabiShavid from "@/assets/landing/body/Untitled-1(1).png";
import DanshghoShavid from "@/assets/landing/body/Untitled-2.png";

export const CardsWrapper = () => {
  return (
    <div className="w-full h-auto lg:h-[450px] flex flex-wrap lg:flex-nowrap items-center justify-center gap-8">
      <RequestCard
        image={MorabiShavid}
        title="مربی شوید"
        description="برای مثال بی اهمیت، کدام یک از ما متعهد می شویم ورزش بدنی بله این اتفاق در اینجا می افتد."
      />
      <RequestCard
        image={DanshghoShavid}
        title="مربی شوید"
        description="به میلیون ها نفر از سراسر جهان بپیوندید با هم یاد می گیرند یادگیری آنلاین."
      />
    </div>
  );
};


