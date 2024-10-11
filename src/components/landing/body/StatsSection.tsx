export const StatsSection = ({ landingApi }) => {
    return (
      <div className="h-[1105px] w-full flex justify-center items-center">
        <div className="w-[1410px] flex items-center h-[270px] rounded-[40px] bg-[#282568] shadow-[0_25px_70px_0] shadow-[#28256866] ">
          <StatItem label="وبلاگ ها" count={landingApi?.newsCount ?? 0} />
          <StatItem label="بهترین اساتید" count={landingApi?.teacherCount ?? 0} />
          <StatItem label="دروس دانشکده" count={landingApi?.courseCount ?? 0} />
          <StatItem label="دانشجویان فعال" count={landingApi?.studentCount ?? 0} />
        </div>
      </div>
    );
  };
  
  const StatItem = ({ label, count }) => (
    <div className="border-l-2 border-white/50 h-[90%] w-1/4 flex flex-col items-center justify-center">
      <div className="text-white text-[56px] font-bold">
        {count}
      </div>
      <div className="text-white text-[18px]">{label}</div>
    </div>
  );
  