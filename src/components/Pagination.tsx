import React from 'react';

interface PaginationProps {
  pages: number;
  page: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pages,
  page,
  onPageChange,
}) => {
  const displayPages =
    pages > 5
      ? [...Array(5).keys()]
          .map(x => x + page - 2)
          .filter(x => x > 0 && x <= pages)
      : [...Array(pages).keys()].map(x => x + 1);

  return (
    pages > 1 && (
      <div className="flex justify-center mt-6">
        <ul className="inline-flex items-center -space-x-px">
          {page > 1 && (
            <li>
              <button
                onClick={() => onPageChange(page - 1)}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                Previous
              </button>
            </li>
          )}
          {displayPages.map(x => (
            <li key={x}>
              <button
                onClick={() => onPageChange(x)}
                className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${x === page ? 'bg-gray-200' : ''}`}
              >
                {x}
              </button>
            </li>
          ))}
          {page < pages && (
            <li>
              <button
                onClick={() => onPageChange(page + 1)}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </div>
    )
  );
};

export default Pagination;
