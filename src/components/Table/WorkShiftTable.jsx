import { generateWeekDays } from "@/constant/calendar.js";
import { useAuth } from "@/context/AuthContext.jsx";
import useWorkSites from "@/hooks/useWorkSites.jsx";
import { convertFloatHoursToTime } from "@/utils/convertFloatHoursToTime.js";
import { convertTo12HourFormat } from "@/utils/convertTo12HourFormat.js";
import { formatText } from "@/utils/formatText.js";
import PropTypes from "prop-types";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const WorkShiftTable = ({ timingData, errors = {}, workShift }) => {
  const { user } = useAuth();
  const dayArray = generateWeekDays({
    startOfDay: 0,
  });
  const workSiteQuery = useWorkSites({ is_active: 1 });

  return (
    <div className={`space-y-5`}>
      <div className="hidden md:flex items-center py-5 text-[0.8rem] font-semibold bg-base-200 md:px-5 shadow-md px-2 ">
        <div className={`block w-[10%] md:w-[15%] break-words`}>Days</div>

        <div className={`w-[10%] flex justify-center break-words`}>
          Work Day
        </div>

        <div className={`block w-[15%] break-words text-left `}>Start at</div>

        <div className={`block w-[15%] break-words text-left `}>End at</div>

        <div className={`w-[20%] break-words flex justify-center`}>
          Work Location
        </div>

        <div className={`flex justify-center w-[15%]  break-words text-left `}>
          Break (min)
        </div>

        <div
          className={`w-[15%] md:w-[10%] break-words text-left flex justify-center `}
        >
          Break Type
        </div>
      </div>

      {/* TB */}
      {timingData
        ?.slice(
          timingData?.findIndex(
            (d) => d.day === user?.business?.business_start_day
          )
        )
        ?.concat(
          timingData?.slice(
            0,
            timingData?.findIndex(
              (d) => d.day === user?.business?.business_start_day
            )
          )
        )
        ?.map((day, value) => {
          const isWeekend = day?.is_weekend;
          const dayDetails = timingData?.[day?.day] || {};
          const dayErrors = errors?.times?.find((e) => e?.id === day?.day);

          return (
            <>
              <div
                key={value}
                className="hidden md:flex items-center md:px-5 px-2 pt-2  pb-2 bg-base-300 duration-200 hover:bg-base-100"
              >
                {/* DAY TITLE */}
                <div className="w-[10%] md:w-[15%]">
                  <span className="md:hidden inline-block">
                    {dayArray[day?.day]?.shortName}
                  </span>
                  <span
                    data-auto={`employee_view-workShiftView-details-day-${
                      dayArray[day?.day]?.name
                    }`}
                    className="hidden md:inline-block"
                  >
                    {dayArray[day?.day]?.name}
                  </span>
                </div>

                {/* WEEKEND STATUS */}
                <div className="w-[10%] flex justify-center">
                  {isWeekend ? (
                    <MdCancel className="text-2xl text-red-500" />
                  ) : (
                    <IoIosCheckmarkCircle className="text-2xl text-green-500" />
                  )}
                </div>

                {/* START TIME */}
                {day?.shifts?.length > 0 ? (
                  <div className="grid grid-cols-1 w-[15%]">
                    {isWeekend ? (
                      <MdCancel className="text-2xl text-red-500" />
                    ) : (
                      day?.shifts.map((item, idx) => (
                        <div
                          key={`shift-${value}-${idx}`}
                          data-auto={`employee_view-workShiftView-details-start_time-${
                            dayArray[day?.day]?.name
                          }`}
                          className={`text-left block ${
                            dayErrors?.start_at && !isWeekend ? "h-[80px]" : ""
                          }`}
                        >
                          {convertTo12HourFormat(item?.start_at)}
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div
                    data-auto={`employee_view-workShiftView-details-start_time-${
                      dayArray[day?.day]?.name
                    }`}
                    className={`w-[15%]  text-left block ${
                      dayErrors?.start_at && !isWeekend ? "h-[80px]" : ""
                    }`}
                  >
                    {isWeekend ? (
                      <MdCancel className="text-2xl text-red-500" />
                    ) : (
                      convertTo12HourFormat(dayDetails?.start_at)
                    )}
                  </div>
                )}

                {/* END TIME */}
                {day?.shifts?.length > 0 ? (
                  <div className="grid grid-cols-1 gap-1 w-[15%]">
                    {isWeekend ? (
                      <MdCancel className="text-2xl text-red-500" />
                    ) : (
                      day?.shifts.map((item, idx) => (
                        <div
                          key={`shift-${value}-${idx}`}
                          data-auto={`employee_view-workShiftView-details-end_time-${
                            dayArray[day?.day]?.name
                          }`}
                          className={`text-left block ${
                            dayErrors?.start_at && !isWeekend ? "h-[80px]" : ""
                          }`}
                        >
                          {convertTo12HourFormat(item?.end_at)}
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div
                    data-auto={`employee_view-workShiftView-details-end_time-${
                      dayArray[day?.day]?.name
                    }`}
                    className={`w-[15%] text-left block ${
                      dayErrors?.start_at && !isWeekend ? "h-[80px]" : ""
                    }`}
                  >
                    {isWeekend ? (
                      <MdCancel className="text-2xl text-red-500" />
                    ) : (
                      convertTo12HourFormat(dayDetails?.end_at)
                    )}
                  </div>
                )}

                {/* WORK LOCATION */}
                <div
                  data-auto={`employee_view-workShiftView-details-work_location-${
                    dayArray[day?.day]?.name
                  }`}
                  className="w-[20%] flex flex-col justify-center items-center"
                >
                  {isWeekend ? (
                    <MdCancel className="text-2xl text-red-500" />
                  ) : (
                    day?.shifts?.map((shift) => (
                      <p key={shift?.id}>
                        {workSiteQuery?.data?.find(
                          (d) => d?.id === shift?.work_location_id
                        )?.name || "N/A"}
                      </p>
                    ))
                  )}
                </div>

                {/* BREAK TIME */}
                <div
                  data-auto={`employee_view-workShiftView-details-break_time-${
                    dayArray[day?.day]?.name
                  }`}
                  className="w-[15%] flex justify-center items-center"
                >
                  {isWeekend ? (
                    <MdCancel className="text-2xl text-red-500" />
                  ) : (
                    convertFloatHoursToTime(workShift?.break_hours || 0)
                  )}
                </div>
                {/* BREAK TYPE */}
                <div
                  data-auto={`employee_view-workShiftView-details-break_type-${
                    dayArray[day?.day]?.name
                  }`}
                  className="w-[15%] md:w-[10%] flex justify-center items-center"
                >
                  {isWeekend ? (
                    <MdCancel className="text-2xl text-red-500" />
                  ) : (
                    formatText(workShift?.break_type)
                  )}
                </div>
              </div>

              {/* MOBILE VIEW */}
              <div
                className={`md:hidden rounded-lg border p-5 shadow-md border-primary-content relative overflow-hidden bg-base-200`}
              >
                <div
                  className={`absolute top-0 left-0 bg-primary w-6 h-6 flex items-center justify-center rounded-br-lg   text-base-100`}
                >
                  {isWeekend ? (
                    <MdCancel className="text-2xl text-base-300 bg-red-500" />
                  ) : (
                    <IoIosCheckmarkCircle className="text-2xl text-base-300 bg-green-500" />
                  )}
                </div>

                {/* START AT - END AT */}
                <span className={`my-2 block`}>
                  <span className={`font-bold`}>
                    {dayArray[day?.day]?.name}{" "}
                  </span>
                </span>

                {isWeekend ? (
                  "No Shift"
                ) : (
                  <>
                    <div className="flex items-center py-5 text-[0.8rem] font-semibold bg-base-200 md:px-5 shadow-md px-2 ">
                      <div className={`block w-[33%] break-words text-left `}>
                        Start at
                      </div>

                      <div className={`block w-[33%] break-words text-left `}>
                        End at
                      </div>

                      <div
                        className={`w-[35%] break-words flex justify-center`}
                      >
                        Work Location
                      </div>
                    </div>
                    <div className="flex items-center md:px-5 px-2 pt-2  pb-2 bg-base-300 duration-200 hover:bg-base-100">
                      {/* START TIME */}
                      {day?.shifts?.length > 0 ? (
                        <div className="grid grid-cols-1 w-[33%]">
                          {isWeekend ? (
                            <MdCancel className="text-2xl text-red-500" />
                          ) : (
                            day?.shifts.map((item, idx) => (
                              <div
                                key={`shift-${value}-${idx}`}
                                data-auto={`employee_view-workShiftView-details-start_time-${
                                  dayArray[day?.day]?.name
                                }`}
                                className={`text-left block ${
                                  dayErrors?.start_at && !isWeekend
                                    ? "h-[80px]"
                                    : ""
                                }`}
                              >
                                {convertTo12HourFormat(item?.start_at)}
                              </div>
                            ))
                          )}
                        </div>
                      ) : (
                        <div
                          data-auto={`employee_view-workShiftView-details-start_time-${
                            dayArray[day?.day]?.name
                          }`}
                          className={`w-[33%]  text-left block ${
                            dayErrors?.start_at && !isWeekend ? "h-[80px]" : ""
                          }`}
                        >
                          {isWeekend ? (
                            <MdCancel className="text-2xl text-red-500" />
                          ) : (
                            convertTo12HourFormat(dayDetails?.start_at)
                          )}
                        </div>
                      )}

                      {/* END TIME */}
                      {day?.shifts?.length > 0 ? (
                        <div className="grid grid-cols-1 gap-1 w-[33%]">
                          {isWeekend ? (
                            <MdCancel className="text-2xl text-red-500" />
                          ) : (
                            day?.shifts.map((item, idx) => (
                              <div
                                key={`shift-${value}-${idx}`}
                                data-auto={`employee_view-workShiftView-details-end_time-${
                                  dayArray[day?.day]?.name
                                }`}
                                className={`text-left block ${
                                  dayErrors?.start_at && !isWeekend
                                    ? "h-[80px]"
                                    : ""
                                }`}
                              >
                                {convertTo12HourFormat(item?.end_at)}
                              </div>
                            ))
                          )}
                        </div>
                      ) : (
                        <div
                          data-auto={`employee_view-workShiftView-details-end_time-${
                            dayArray[day?.day]?.name
                          }`}
                          className={`w-[33%] text-left block ${
                            dayErrors?.start_at && !isWeekend ? "h-[80px]" : ""
                          }`}
                        >
                          {isWeekend ? (
                            <MdCancel className="text-2xl text-red-500" />
                          ) : (
                            convertTo12HourFormat(dayDetails?.end_at)
                          )}
                        </div>
                      )}

                      {/* WORK LOCATION */}
                      <div
                        data-auto={`employee_view-workShiftView-details-work_location-${
                          dayArray[day?.day]?.name
                        }`}
                        className="w-[34%] flex flex-col justify-center items-center "
                      >
                        {isWeekend ? (
                          <MdCancel className="text-2xl text-red-500" />
                        ) : (
                          day?.shifts?.map((shift) => (
                            <p key={shift?.id}>
                              {workSiteQuery?.data?.find(
                                (d) => d?.id === shift?.work_location_id
                              )?.name || "N/A"}
                            </p>
                          ))
                        )}
                      </div>
                    </div>

                    <div className={`flex items-center gap-x-2`}>
                      <span className={`font-bold`}>Break (min):</span>{" "}
                      {isWeekend ? (
                        <MdCancel className="text-2xl text-red-500" />
                      ) : (
                        convertFloatHoursToTime(workShift?.break_hours || 0)
                      )}
                    </div>

                    <div className={`flex items-center gap-x-2`}>
                      <span className={`font-bold`}>Break Type:</span>{" "}
                      {isWeekend ? (
                        <MdCancel className="text-2xl text-red-500" />
                      ) : (
                        formatText(workShift?.break_type)
                      )}
                    </div>
                  </>
                )}
              </div>
            </>
          );
        })}
    </div>
  );
};
WorkShiftTable.propTypes = {
  timingData: PropTypes.array,
  errors: PropTypes.shape({
    times: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        start_at: PropTypes.any,
      })
    ),
  }),
  workShift: PropTypes.object,
};

export default WorkShiftTable;
