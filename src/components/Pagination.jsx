// ===========================================
// #00119
// ===========================================

import PropTypes from "prop-types";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import ReactPaginate from "react-paginate";
export default function Pagination({
  itemsPerPage,
  totalItems,
  onChangePage,
  forcePage = null,
  dataAuto
}) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const handlePageClick = (event) => {
    onChangePage?.(event.selected + 1);
  };
  return (
    <>
      {totalItems > itemsPerPage && (
        <ReactPaginate
          className={`flex items-center w-full justify-center px-5`}
          pageLinkClassName={`btn btn-sm border border-primary mr-2 h-8 w-8 rounded-full hover:bg-transparent hover:text-primary hover:border-primary hover:border`}
          disabledClassName={`btn btn-sm h-8 w-8 rounded-full`}
          breakClassName={`btn btn-sm h-8 w-8 rounded-full text-primary hover:bg-transparent font-bold`}
          activeLinkClassName={`btn btn-sm h-8 w-8 hover:btn-primary-content rounded-full bg-primary hover:border hover:border-primary hover:text-primary text-xm text-base-300`}
          previousClassName={`btn btn-sm h-8 w-8 hover:btn-primary-content rounded-full bg-transparent`}
          nextClassName={`btn btn-sm h-8 w-8 hover:btn-primary-content rounded-full bg-transparent`}
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          previousLabel={
            <div
              data-auto={`pagination-previous-${dataAuto}`}
              className={`capitalize text-sm text-gray-500 duration-200 hover:text-primary-focus`}
            >
              <BsArrowLeftShort className="text-2xl text-primary" />
              {/* Previous */}
            </div>
          }
          nextLabel={
            <div
              data-auto={`pagination-next-${dataAuto}`}
              className={`capitalize text-sm text-gray-500 duration-200 hover:text-primary-focus`}
            >
              <BsArrowRightShort className="text-2xl text-primary" />
              {/* Next */}
            </div>
          }
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          forcePage={forcePage - 1}
        />
      )}
    </>
  );
}

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  forcePage: PropTypes.number,
  dataAuto: PropTypes.string.isRequired
};
