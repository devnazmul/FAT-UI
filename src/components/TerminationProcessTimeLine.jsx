import useCustomMutation from "@/hooks/API/useCustomMutation.jsx";
import useRecruitmentOptionalProcess from "@/hooks/useRecruitmentOptionalProcess.jsx";
import { generateMongoDBObjectID } from "@/utils/generateMongoDBObjectID.js";
import { PencilIcon } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CgDanger } from "react-icons/cg";
import { FiPlusCircle } from "react-icons/fi";
import { MdCancel, MdDone } from "react-icons/md";
import { createTerminationProcessOfEmployee } from "../apis/candidate/candidate.js";
import AddTerminationProcessInEmployee from "../pages/Employee/Employee/EmployeeView/Termination/AddTerminationProcessInEmployee.jsx";
import {
  getProcessIfExist,
  getProcessIfExistWithAllData,
  getProcessIfExistWithAnyData
} from "../pages/JobDesk/Candidate/components/utils/getProcessIfExist.js";
import CustomLoading from "./CustomLoading.jsx";
import CustomPopup from "./CustomPopup.jsx";
import Headings from "./Headings/Headings.jsx";
import CustomMultiSelectV2 from "./InputFields/CustomMultiSelectV2.jsx";
import ProcessStatus from "./ProcessStatus.jsx";

export default function TerminationProcessTimeLine({
  isEmployeeDetailsRefetching,
  refetchEmployeeDetails,
  processes,
  processesThatExistOnEmployee,
  employeeId,
  refetchProcesses,
  isProcessesLoading,
  processTitle = "Onboarding Process",
  isEditEnabled = false,
  terminationId
}) {
  // OPTIONAL ONBOARDING DATA
  const {
    data: processesThatNotExistOnCandidate,
    isPending,
    refetch
  } = useRecruitmentOptionalProcess({
    is_active: 1,
    use_in_termination: 1,
    not_required_in_termination_id: terminationId
  });

  const [popupOption, setPopupOption] = useState({
    open: false,
    type: "",
    title: "",
    id: null,
    onClose: () => {
      setPopupOption({ ...popupOption, open: false });
    },
    overlayStyle: { background: "red" },
    closeOnDocumentClick: false
  });
  const [selectedProcesses, setSelectedProcesses] = useState([]);
  const [isOnAddMode, setIsOnAddMode] = useState(false);

  useEffect(() => {
    setSelectedProcesses([]);
  }, [isOnAddMode]);

  const {
    isPending: isPendingSubmit,
    mutateAsync,
    isSuccess: isSubmitSuccess
  } = useCustomMutation({
    mutationFunc: async () => {
      await createTerminationProcessOfEmployee({
        termination_id: terminationId,
        user_id: employeeId,
        termination_processes: selectedProcesses?.map((pros) => ({
          recruitment_process_id: pros?.id,
          attachments: [],
          description: "",
          tasks: [
            {
              id: generateMongoDBObjectID(),
              task_owner_id: "",
              task_status: "not_started",
              assigned_date: "",
              due_date: "",
              completion_date: "",
              remarks: ""
            }
          ]
        }))
      });
    }
  });

  useEffect(() => {
    if (isSubmitSuccess) {
      setIsOnAddMode(false);
      refetchEmployeeDetails();
      refetch();
      refetchProcesses();
    }
  }, [isSubmitSuccess]);

  if (isProcessesLoading || isPending) {
    return <CustomLoading />;
  }

  return (
    <div className="flex flex-col justify-start w-full py-5 px-5">
      <CustomPopup
        popupOption={popupOption}
        setPopupOption={setPopupOption}
        Component={
          <>
            {popupOption?.type === "addProcess" && (
              <AddTerminationProcessInEmployee
                id={null}
                terminationId={terminationId}
                employee_id={employeeId}
                processId={popupOption?.data?.process_id}
                handleClosePopup={() => {
                  setPopupOption({
                    open: false,
                    type: "",
                    title: "",
                    id: null,
                    onClose: () => {
                      setPopupOption({ ...popupOption, open: false });
                      refetchEmployeeDetails();
                      refetch();
                      refetchProcesses();
                    },
                    overlayStyle: { background: "red" },
                    closeOnDocumentClick: false
                  });
                }}
              />
            )}
            {popupOption?.type === "editProcess" && (
              <AddTerminationProcessInEmployee
                terminationId={terminationId}
                id={popupOption?.data?.id}
                employee_id={employeeId}
                processId={popupOption?.data?.process_id}
                handleClosePopup={() => {
                  setPopupOption({
                    open: false,
                    type: "",
                    title: "",
                    id: null,
                    onClose: () => {
                      setPopupOption({ ...popupOption, open: false });
                      refetchEmployeeDetails();
                      refetch();
                      refetchProcesses();
                    },
                    overlayStyle: { background: "red" },
                    closeOnDocumentClick: false
                  });
                }}
              />
            )}
          </>
        }
      />

      <Headings
        level={3}
        className={` ${
          processes?.every((process) =>
            getProcessIfExistWithAllData(
              getProcessIfExist(
                processesThatExistOnEmployee,
                process?.id,
                "termination"
              )
            )
          )
            ? "text-green-500"
            : "text-red-500"
        } mb-5`}
      >
        {processTitle}
      </Headings>

      <div className="w-full px-0">
        <div className="relative w-full antialiased text-sm font-semibold">
          {/* <!-- Vertical bar running through middle --> */}
          <div className="block w-1 bg-base-100 absolute h-full transform -translate-x-1/2"></div>

          {/* <!-- Right section, set by justify-end and pl-8 --> */}
          {processes?.length > 0 ? (
            <>
              {processes?.map((process, index) => (
                <div key={index} className="mt-0 mb-12 ">
                  <div className="flex flex-row items-center">
                    <div className="flex w-full items-center ">
                      <div className="w-1/2 pl-8 flex-1">
                        <div className="relative p-4 bg-base-300 rounded-xl shadow border">
                          <div className={`h-full w-full`}>
                            {!getProcessIfExistWithAnyData(
                              getProcessIfExist(
                                processesThatExistOnEmployee,
                                process?.id,
                                "termination"
                              )
                            ) ? (
                              <button
                                onClick={() => {
                                  setPopupOption({
                                    open: true,
                                    type: "addProcess",
                                    title: process?.name,
                                    data: {
                                      id: null,
                                      process_id: process?.id
                                        ? process?.id
                                        : null
                                    },
                                    onClose: () => {
                                      setPopupOption({
                                        ...popupOption,
                                        open: false
                                      });
                                      refetchEmployeeDetails();
                                      refetch();
                                      refetchProcesses();
                                    },
                                    overlayStyle: { background: "red" },
                                    closeOnDocumentClick: false
                                  });
                                }}
                                className={`absolute right-2 top-2 btn btn-sm btn-primary`}
                              >
                                <FiPlusCircle size={16} />{" "}
                                <span className={`hidden sm:inline `}>
                                  Create
                                </span>
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setPopupOption({
                                    open: true,
                                    type: "editProcess",
                                    title: process?.name,
                                    data: {
                                      id:
                                        getProcessIfExist(
                                          processesThatExistOnEmployee,
                                          process?.id,
                                          "termination"
                                        )?.id || null,
                                      process_id: process?.id
                                        ? process?.id
                                        : null
                                    },
                                    onClose: () => {
                                      setPopupOption({
                                        ...popupOption,
                                        open: false
                                      });
                                      refetchEmployeeDetails();
                                      refetch();
                                      refetchProcesses();
                                    },
                                    overlayStyle: { background: "red" },
                                    closeOnDocumentClick: false
                                  });
                                }}
                                className={`absolute right-2 top-2 btn btn-sm btn-primary`}
                              >
                                <PencilIcon size={14} />{" "}
                                <span className={`hidden sm:inline`}>Edit</span>
                              </button>
                            )}
                            <span
                              className={`text-lg font-bold ${
                                getProcessIfExistWithAllData(
                                  getProcessIfExist(
                                    processesThatExistOnEmployee,
                                    process?.id,
                                    "termination"
                                  )
                                )
                                  ? "text-green-500"
                                  : "text-red-300"
                              }`}
                            >
                              {index + 1}. {process?.name}
                            </span>

                            <br />

                            {/* STATUS  */}
                            <ProcessStatus
                              status={
                                Object.keys(
                                  getProcessIfExist(
                                    processesThatExistOnEmployee,
                                    process?.id,
                                    "termination"
                                  )
                                )?.length > 0
                                  ? `${
                                      getProcessIfExist(
                                        processesThatExistOnEmployee,
                                        process?.id,
                                        "termination"
                                      )?.tasks?.length > 0
                                        ? getProcessIfExist(
                                            processesThatExistOnEmployee,
                                            process?.id,
                                            "termination"
                                          )?.tasks[0]?.task_status
                                        : ""
                                    }`
                                  : ""
                              }
                            />

                            {/* ASSIGNED DATE  */}
                            <span className={`block`}>
                              {Object.keys(
                                getProcessIfExist(
                                  processesThatExistOnEmployee,
                                  process?.id,
                                  "termination"
                                )
                              )?.length > 0
                                ? `${
                                    getProcessIfExist(
                                      processesThatExistOnEmployee,
                                      process?.id,
                                      "termination"
                                    )?.tasks?.length > 0 &&
                                    getProcessIfExist(
                                      processesThatExistOnEmployee,
                                      process?.id,
                                      "termination"
                                    )?.tasks[0]?.assigned_date
                                      ? `Assign Date: ${
                                          getProcessIfExist(
                                            processesThatExistOnEmployee,
                                            process?.id,
                                            "termination"
                                          )?.tasks[0]?.assigned_date
                                        }`
                                      : ""
                                  }`
                                : ""}
                            </span>

                            {/* DUE DATE  */}
                            <span className={`block`}>
                              {Object.keys(
                                getProcessIfExist(
                                  processesThatExistOnEmployee,
                                  process?.id,
                                  "termination"
                                )
                              )?.length > 0
                                ? `${
                                    getProcessIfExist(
                                      processesThatExistOnEmployee,
                                      process?.id,
                                      "termination"
                                    )?.tasks?.length > 0 &&
                                    getProcessIfExist(
                                      processesThatExistOnEmployee,
                                      process?.id,
                                      "termination"
                                    )?.tasks[0]?.due_date
                                      ? `Due Date: ${
                                          getProcessIfExist(
                                            processesThatExistOnEmployee,
                                            process?.id,
                                            "termination"
                                          )?.tasks[0]?.due_date
                                        }`
                                      : ""
                                  }`
                                : ""}
                            </span>

                            {/* COMPLETION DATE  */}
                            <span className={`block`}>
                              {Object.keys(
                                getProcessIfExist(
                                  processesThatExistOnEmployee,
                                  process?.id,
                                  "termination"
                                )
                              )?.length > 0
                                ? `${
                                    getProcessIfExist(
                                      processesThatExistOnEmployee,
                                      process?.id,
                                      "termination"
                                    )?.tasks?.length > 0 &&
                                    getProcessIfExist(
                                      processesThatExistOnEmployee,
                                      process?.id,
                                      "termination"
                                    )?.tasks[0]?.completion_date
                                      ? `Completed At: ${
                                          getProcessIfExist(
                                            processesThatExistOnEmployee,
                                            process?.id,
                                            "termination"
                                          )?.tasks[0]?.completion_date
                                        }`
                                      : ""
                                  }`
                                : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {getProcessIfExistWithAllData(
                      getProcessIfExist(
                        processesThatExistOnEmployee,
                        process?.id,
                        "termination"
                      )
                    ) ? (
                      <div className="rounded-full bg-green-500 border-base-300 border-4 w-8 h-8 absolute translate-y-0  transform -translate-x-1/2 flex items-center justify-center">
                        <MdDone className={`text-base-300`} />
                      </div>
                    ) : (
                      <div className="rounded-full bg-red-300 border-base-300 border-4 w-8 h-8 absolute translate-y-0  transform -translate-x-1/2 flex items-center justify-center">
                        <MdCancel className={`text-base-300`} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="mt-0 mb-12 ">
              <div className="flex flex-row items-center">
                <div className="flex w-full items-center ">
                  <div className="w-1/2 pl-8 flex-1">
                    <div className="relative p-4 bg-base-300 rounded-xl shadow border border-yellow-400">
                      <div className={`h-full w-full`}>
                        <span className={`text-lg font-bold text-yellow-400`}>
                          No Process Found!
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-full bg-yellow-400 border-base-300 border-4 w-10 h-10 absolute translate-y-0  transform -translate-x-1/2 flex items-center justify-center">
                  <CgDanger className={` text-2xl `} />
                </div>
              </div>
            </div>
          )}

          {isEmployeeDetailsRefetching && (
            <div className="animate-pulse flex ml-[2rem] space-x-4 w-[calc(100%-2rem)] p-10 bg-base-100 rounded-xl mb-5"></div>
          )}
        </div>
      </div>

      {isEditEnabled && processesThatNotExistOnCandidate?.length > 0 && (
        <div className={`flex justify-start items-center`}>
          {isOnAddMode ? (
            <div className={`flex flex-col sm:flex-row items-end gap-2 w-full`}>
              <CustomMultiSelectV2
                required
                options={processesThatNotExistOnCandidate?.map((process) => ({
                  id: process?.id,
                  label: process?.name
                }))}
                label={"Add More Processes"}
                loading={isPending}
                singleSelect={false}
                selectedValues={selectedProcesses}
                defaultSelectedValues={selectedProcesses}
                setSelectedValues={(e) => {
                  setSelectedProcesses(e);
                }}
                placeholder={"Select More Processes"}
                dataAuto=""
              />

              <button
                onClick={() => {
                  mutateAsync();
                }}
                disabled={selectedProcesses?.length === 0 || isPendingSubmit}
                className={`btn btn-primary w-full sm:w-20`}
              >
                Add
              </button>
              <button
                disabled={isPendingSubmit}
                onClick={() => setIsOnAddMode(false)}
                className={`btn btn-error w-full sm:w-20 text-base-300`}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsOnAddMode(true);
              }}
              className={`btn btn-primary`}
            >
              {processes?.length > 0 ? "Add More Processes" : "Add Process"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

TerminationProcessTimeLine.propTypes = {
  isEditEnabled: PropTypes.bool,
  processes: PropTypes.array,
  processesThatExistOnEmployee: PropTypes.array,
  employeeId: PropTypes.any,
  refetchProcesses: PropTypes.func,
  isProcessesLoading: PropTypes.bool,
  refetchEmployeeDetails: PropTypes.func,
  isEmployeeDetailsRefetching: PropTypes.bool,
  processTitle: PropTypes.string,
  terminationId: PropTypes.any
};
