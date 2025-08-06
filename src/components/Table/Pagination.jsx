import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export const Pagination = ({
  filters,
  setFilters,
  total = 0,
  perPageAttributeName = "perPage",
  pageAttributeName = "page",
  dataAuto = "",
  containerClassName = ""
}) => {
  // const { page, per_page } = filters;
  const page = filters?.[pageAttributeName];
  const per_page = filters?.[perPageAttributeName];
  const totalPage = Math.ceil(total / per_page) || 1;
  const [array, setArray] = useState([]);

  useEffect(() => {
    const pages = [];

    if (totalPage <= 6) {
      // No dots needed
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 2 || page >= totalPage - 1) {
        pages.push(
          1,
          2,
          3,
          <HiDotsHorizontal />,
          totalPage - 2,
          totalPage - 1,
          totalPage
        );
      } else if (page === 3) {
        pages.push(
          1,
          2,
          3,
          4,
          <HiDotsHorizontal />,
          totalPage - 2,
          totalPage - 1,
          totalPage
        );
      } else if (page === 4) {
        pages.push(
          1,
          2,
          3,
          4,
          5,
          <HiDotsHorizontal />,
          totalPage - 2,
          totalPage - 1,
          totalPage
        );
      } else if (page === 5) {
        pages.push(
          1,
          2,
          3,
          4,
          5,
          6,
          <HiDotsHorizontal />,
          totalPage - 2,
          totalPage - 1,
          totalPage
        );
      } else if (page === totalPage - 2) {
        pages.push(
          1,
          2,
          3,
          <HiDotsHorizontal />,
          totalPage - 3,
          totalPage - 2,
          totalPage - 1,
          totalPage
        );
      } else if (page === totalPage - 3) {
        pages.push(
          1,
          2,
          3,
          <HiDotsHorizontal />,
          totalPage - 4,
          totalPage - 3,
          totalPage - 2,
          totalPage - 1,
          totalPage
        );
      } else if (page === totalPage - 4) {
        pages.push(
          1,
          2,
          3,
          <HiDotsHorizontal />,
          totalPage - 5,
          totalPage - 4,
          totalPage - 3,
          totalPage - 2,
          totalPage - 1,
          totalPage
        );
      } else {
        pages.push(
          1,
          2,
          3,
          <HiDotsHorizontal />,
          page - 1,
          page,
          page + 1,
          <HiDotsHorizontal />,
          totalPage - 2,
          totalPage - 1,
          totalPage
        );
      }
    }

    setArray(pages);
  }, [page, totalPage]);

  const handleRight = () => {
    if (page < totalPage) {
      setFilters({ ...filters, page: page + 1 });
    }
  };
  const handleLeft = () => {
    if (page === 1) {
      return;
    } else if (page <= totalPage) {
      setFilters({ ...filters, page: page - 1 });
    }
  };

  // if (total > per_page) {
  return (
    <div
      className={`md:bg-zinc-200 w-full flex flex-col md:flex-row gap-y-2 justify-between items-center py-2 px-4 ${containerClassName}`}
    >
      {/* MOBILE  */}
      <div className={`md:hidden flex w-full justify-between `}>
        <div className={`text-xs uppercase`}>
          Total: <span className={`font-bold`}>{total}</span>
        </div>
        <div className={`space-x-2 text-xs`}>
          <span className={`uppercase`}>Rows per page:</span>
          <select
            onChange={(e) =>
              setFilters({
                ...filters,
                [`${perPageAttributeName}`]: e.target.value
              })
            }
            value={per_page || 20}
            className="select select-xs outline-none active:outline-none focus:outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      {/* DESKTOP  */}
      <div className={`text-xs uppercase hidden md:block`}>
        Total: <span className={`font-bold`}>{total}</span>
      </div>
      <div className={`flex-col md:flex-row flex items-center gap-x-5 gap-y-5`}>
        <div className={`space-x-2 text-xs hidden md:block`}>
          <span className={`uppercase`}>Rows per page:</span>
          <select
            onChange={(e) =>
              setFilters({
                ...filters,
                [`${perPageAttributeName}`]: e.target.value
              })
            }
            value={per_page || 20}
            className="select select-xs outline-none active:outline-none focus:outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div
          className={`flex justify-center items-center gap-x-1 md:gap-x-2 text-sm`}
        >
          <div
            data-auto={`${dataAuto}_left`}
            onClick={handleLeft}
            data-tip="Previous Page"
            className={`cursor-pointer flex justify-center items-center h-6 md:h-8 w-auto rounded-full font-semibold bg-btn-secondary `}
          >
            <IoIosArrowBack />
          </div>
          {array?.map((a, i) => (
            <button
              data-auto={`${dataAuto}_page_no_${a}`}
              disabled={isNaN(parseInt(a))}
              key={i}
              onClick={() =>
                setFilters({ ...filters, [`${pageAttributeName}`]: a })
              }
              className={`flex justify-center text-xs md:text-sm items-center transition-all h-6 md:h-8 w-6 md:w-8 rounded-full ${!isNaN(parseInt(a)) && "hover:bg-primary-content hover:text-neutral"} font-semibold ${
                page === a ? "bg-primary text-base-300" : ""
              }`}
            >
              {isNaN(parseInt(a)) ? a : parseInt(a)}
            </button>
          ))}
          <div
            data-auto={`${dataAuto}_right`}
            onClick={handleRight}
            className={` cursor-pointer flex justify-center items-center h-6 md:h-8  w-auto rounded-full font-semibold bg-btn-secondary`}
          >
            <IoIosArrowForward />
          </div>
        </div>
      </div>
    </div>
  );
  // }
};

Pagination.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  perPageAttributeName: PropTypes.string.isRequired,
  pageAttributeName: PropTypes.string.isRequired,
  dataAuto: PropTypes.string,
  containerClassName: PropTypes.string
};
