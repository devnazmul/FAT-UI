import PropTypes from "prop-types";

export default function RecordsTable({ data, columns, MobileView }) {
  return (
    <div
      className={`min-h-[300px] overflow-x-auto scrollbar top-0 w-full mt-5`}
    >
      <table className="hidden md:table gap-2 rounded-xl min-w-[970px]">
        <thead className={`w-full`}>
          <tr className="h-16 text-neutral border-b border-primary-content w-full bg-base-100">
            {columns
              ?.filter((column) => column?.show)
              ?.map((column, i) => (
                <th key={i} className={``}>
                  <div className={``}>{column?.name}</div>
                </th>
              ))}
          </tr>
        </thead>

        <tbody>
          {data?.map((timing, index) => (
            <tr
              key={index}
              className={`border-b ${
                index % 2 === 1 ? "bg-base-100" : "bg-base-300"
              } border-primary-content  h-16 hover:bg-base-100 text-neutral group tableRowAdmin hover:overflow-hidden  ${
                timing?.note?.includes("Employee clock in at")
                  ? "bg-red-200  hover:bg-red-300"
                  : index % 2
                    ? "bg-base-100  hover:bg-base-200"
                    : "bg-base-300  hover:bg-base-200"
              }`}
            >
              {columns
                ?.filter((column) => column?.show)
                ?.map((column, j) => {
                  return (
                    <td key={j} className={`${column?.className} text-left`}>
                      {timing[column?.attribute]}
                    </td>
                  );
                })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="md:hidden grid grid-cols-1 gap-5">
        {data?.map((d, i) => (
          <MobileView key={i} data={d} index={i} />
        ))}
      </div>
    </div>
  );
}

RecordsTable.propTypes = {
  data: PropTypes.array.isRequired,
  MobileView: PropTypes.node.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.objectOf({
      name: PropTypes.string,
      attribute: PropTypes.string,
      className: PropTypes.string,
      show: PropTypes.bool
    })
  ).isRequired
};
