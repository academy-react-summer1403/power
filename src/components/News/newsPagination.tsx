import React from "react";

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const NewsPagination: React.FC<PaginationProps> = ({ totalCount, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / 12);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex mt-10 justify-center w-full gap-2 items-center">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`p-2 w-8 h-8 border flex justify-center items-center rounded-full 
          ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-black'}`}
      >
        &lt;
      </button>

      {[...Array(totalPages).keys()].map(page => (
        <button 
          key={page + 1} 
          onClick={() => onPageChange(page + 1)} 
          className={`p-2 w-6 h-6 border flex justify-center items-center rounded-full ${currentPage === page + 1 ? 'bg-blue-500 scale-125 text-white' : ''}`}
        >
          {page + 1}
        </button>
      ))}

      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`p-2 w-8 h-8 border flex justify-center items-center rounded-full 
          ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-black'}`}
      >
        &gt;
      </button>
    </div>
  );
};

