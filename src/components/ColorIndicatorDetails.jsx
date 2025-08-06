import PropTypes from "prop-types";
export default function ColorIndicatorDetails() {
  return (
    <div className={`w-full grid grid-cols-2 gap-2`}>
      <div className={`flex gap-3 justify-start items-center`}>
        <div
          className={`border-[2px] border-primary bg-primary text-base-300  w-10 h-10 text-lg rounded-lg shadow-xl flex justify-center items-center`}
        >
          1
        </div>
        <p className={`text-lg font-medium text-primary`}>Selected</p>
      </div>

      <div className={`flex gap-3 justify-start items-center`}>
        <div
          className={`border-[2px] border-green-500 text-green-500  w-10 h-10 text-lg rounded-lg shadow-xl flex justify-center items-center`}
        >
          2
        </div>
        <p className={`text-lg font-medium text-green-500`}>Weekend</p>
      </div>

      <div className={`flex gap-3 justify-start items-center`}>
        <div
          className={`border-[2px] border-cyan-500 text-cyan-500  w-10 h-10 text-lg rounded-lg shadow-xl flex justify-center items-center`}
        >
          2
        </div>
        <p className={`text-lg font-medium text-cyan-500`}>Holidays</p>
      </div>

      <div className={`flex gap-3 justify-start items-center`}>
        <div
          className={`border-[2px] border-purple-500 text-purple-500 w-10 h-10 text-lg shadow-xl rounded-lg flex justify-center items-center`}
        >
          3
        </div>
        <p className={`text-lg font-medium text-purple-500`}>Full Attendance</p>
      </div>

      <div className={`flex gap-3 justify-start items-center`}>
        <div
          className={`border-[2px] border-orange-800 text-orange-800 w-10 h-10 text-lg shadow-xl rounded-lg flex justify-center items-center`}
        >
          4
        </div>
        <p className={`text-lg font-medium text-orange-800`}>
          Partial Attendance
        </p>
      </div>

      <div className={`flex gap-3 justify-start items-center`}>
        <div
          className={`border-[2px] border-rose-500 text-rose-500 w-10 h-10 text-lg shadow-xl rounded-lg flex justify-center items-center`}
        >
          5
        </div>
        <p className={`text-lg font-medium text-rose-500`}>Leave</p>
      </div>

      <div className={`flex gap-3 justify-start items-center`}>
        <div
          className={`border-[2px] bg-gray-500  bg-opacity-40 border-gray-500 w-10 h-10 text-lg  rounded-lg flex shadow-xl justify-center items-center`}
        >
          6
        </div>
        <p className={`text-lg font-medium text-gray-500`}>Enabled</p>
      </div>

      <div className={`flex gap-3 justify-start items-center`}>
        <div
          className={`border-[2px] border-base-100 text-gray-500  border-opacity-40 text-opacity-40 bg-base-100 shadow-xl  w-10 h-10 text-lg  rounded-lg flex justify-center items-center`}
        >
          7
        </div>
        <p className={`text-lg font-medium text-gray-500`}>Disabled</p>
      </div>
    </div>
  );
}

ColorIndicatorDetails.propTypes = {
  // Add your prop types here
};
