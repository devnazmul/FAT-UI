// ===========================================
// #00119
// ===========================================

import PropTypes from "prop-types";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import ReactPaginate from "react-paginate";
export default function PaginationV2({
  itemsPerPage,
  totalItems,
  onChangePage,
  forcePage = null
}) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const handlePageClick = (event) => {
    onChangePage(event.selected + 1);
  };
  return (
    <>
      {totalItems > itemsPerPage && (
        <ReactPaginate
          className={`flex items-center text-[0.6rem] w-full justify-center `}
          pageLinkClassName={`btn btn-sm text-[0.6rem] border border-primary mr-[2px] h-5 w-8 rounded-full hover:bg-transparent hover:text-primary hover:border-primary hover:border`}
          disabledClassName={`btn btn-sm text-[0.6rem] h-5 w-8 rounded-full`}
          breakClassName={`btn btn-sm  w-[1px] h-[1px] text-[0.5rem]  rounded-full text-primary hover:bg-transparent font-bold`}
          activeLinkClassName={`btn btn-sm text-[0.6rem] h-5 w-8 hover:btn-primary-content rounded-full bg-primary hover:border hover:border-primary hover:text-primary  text-base-300`}
          previousClassName={`btn btn-sm text-[0.6rem] h-5 w-8 hover:btn-primary-content rounded-full bg-transparent`}
          nextClassName={`btn btn-sm h-5 text-[0.6rem] w-8 hover:btn-primary-content rounded-full bg-transparent`}
          breakLabel="..."
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          previousLabel={
            <div
              className={`capitalize  text-[0.6rem] text-gray-500 duration-200 hover:text-primary-focus`}
            >
              <BsArrowLeftShort className="text-lg text-primary" />
              {/* Previous */}
            </div>
          }
          nextLabel={
            <div
              className={`capitalize text-sm text-gray-500 duration-200 hover:text-primary-focus`}
            >
              <BsArrowRightShort className="text-lg text-primary" />
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

PaginationV2.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  forcePage: PropTypes.number
};
