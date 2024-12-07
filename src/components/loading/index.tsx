import { ClipLoader } from "react-spinners";

export const Loading = () => {
  return (
    <div className="flex flex-wrap items-center justify-center h-screen bg-gray-100 dark:bg-gray-600 dark:text-white">
      <ClipLoader size={100} color="#00BFFF" />
      <h2 dir="ltr" className="ml-4 w-full mt-5 text-xl text-center font-semibold text-gray-700">Loading...</h2>
    </div>
  );
};