import PropTypes from "prop-types";
import { Pie, PieChart } from "recharts";

const Rechart = ({ data }) => (
  <div
    className={` w-full h-full shadow-md rounded-xl flex flex-col lg:flex-row gap-3 justify-center items-center py-3 sm:py-0`}
  >
    {/* <RadialBarChart
      width={200}
      height={200}
      cx="50%"
      cy="50%"
      innerRadius="20%"
      outerRadius="110%"
      barSize={12}
      label={{ position: "insideStart", fill: "#fff" }}
      data={data}
    >
      <RadialBar background clockWise dataKey="uv" />
    </RadialBarChart> */}
    <PieChart width={200} height={200}>
      <Pie
        data={
          data?.reduce((acc, curr) => acc + curr.value, 0) > 0
            ? data
            : [{ name: "No Data", value: 1, fill: "#ccc" }]
        }
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        fill="#8884d8"
      />
    </PieChart>
    {/* Legend */}
    <div className={`grid grid-cols-2 gap-3 lg:block`}>
      {data?.map((type, index) => (
        <div className="flex items-center" key={index}>
          <div
            style={{ backgroundColor: type.fill }}
            className={`h-4 w-4 mr-2`}
          ></div>
          <div style={{ color: type.fill }}>{type.name}</div>
        </div>
      ))}
    </div>
  </div>
);

Rechart.propTypes = {
  data: PropTypes.array.isRequired
};
export default Rechart;
