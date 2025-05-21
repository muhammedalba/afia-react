import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Pagination>
      <PaginationContent>
        {/* زر السابق */}
        <PaginationItem>
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="bg-white text-bgColor hover:bg-gray-200 rounded px-3 py-1 disabled:opacity-50"
          >
            &lt; السابق
          </button>
        </PaginationItem>

        {/* أرقام الصفحات */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => !currentPage === page && onPageChange(page)}
              isActive={currentPage === page}
            
              className={`${
                !currentPage === page
                  ? "bg-bgColor text-white"
                  : "bg-white text-gray-800 hover:bg-gray-200"
              } rounded px-3 py-1`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* زر التالي */}
        <PaginationItem>
          <button
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage == totalPages}
            className="bg-white text-bgColor hover:bg-gray-200 rounded px-3 py-1 disabled:opacity-50"
          >
            التالي &gt;
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
