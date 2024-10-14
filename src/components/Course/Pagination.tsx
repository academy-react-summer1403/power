import React from "react";

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalCount, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / 10);

  return (
    <div className="flex justify-center w-full">
      {[...Array(totalPages).keys()].map(page => (
        <button 
          key={page + 1} 
          onClick={() => onPageChange(page + 1)} 
          className={`p-2 w-6 h-6 border rounded-full ${currentPage === page + 1 ? 'bg-blue-500 text-white' : ''}`}>
          {page + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
