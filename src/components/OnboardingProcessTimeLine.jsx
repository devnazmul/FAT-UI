import useCustomMutation from "@/hooks/API/useCustomMutation.jsx";
import useRecruitmentOptionalProcess from "@/hooks/useRecruitmentOptionalProcess.jsx";
import { generateMongoDBObjectID } from "@/utils/generateMongoDBObjectID.js";
import { PencilIcon } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FiPlusCircle } from "react-icons/fi";
import { MdCancel, MdDone } from "react-icons/md";
import { createOnboardingProcessOfEmployee } from "../apis/candidate/candidate.js";
import AddOnboardingProcessInEmployee from "../pages/Employee/Employee/EmployeeView/Recruitment/AddOnboardingProcessInEmployee.jsx";
import {
  getProcessIfExist,
  getProcessIfExistWithAllData,
  getProcessIfExistWithAnyData
} from "../pages/JobDesk/Candidate/components/utils/getProcessIfExist.js";
import CustomHeadingButton from "./CustomHeadingButton.jsx";
import CustomLoading from "./CustomLoading.jsx";
import CustomPopup from "./CustomPopup.jsx";
import Headings from "./Headings/Headings.jsx";
import CustomMultiSelectV2 from "./InputFields/CustomMultiSelectV2.jsx";
import ProcessStatus from "./ProcessStatus.jsx";

export default function OnboardingProcessTimeLine({
  isEmployeeDetailsRefetching,
  refetchEmployeeDetails,
  processes,
  processesThatExistOnEmployee,
  employeeId,
  refetchProcesses,
  isProcessesLoading,
  processTitle = "Onboarding Process"
}) {
  // OPTIONAL ONBOARDING DATA
  const {
    data: processesThatNotExistOnCandidate,
    isPending,
    refetch
  } = useRecruitmentOptionalProcess({
    is_active: 1,
    use_in_on_boarding: 1,
    not_required_in_employee_id: employeeId
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
      await createOnboardingProcessOfEmployee({
        user_id: employeeId,
        recruitment_processes: selectedProcesses?.map((pros) => ({
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
    <div className="flex flex-col justify-start w-full py-5 px-5 ">
      <CustomPopup
        popupOption={popupOption}
        setPopupOption={setPopupOption}
        Component={
          <>
            {popupOption?.type === "addProcess" && (
              <AddOnboardingProcessInEmployee
                id={null}
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
              <AddOnboardingProcessInEmployee
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
                "onboarding"
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
                            "onboarding"
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
                                  process_id: process?.id ? process?.id : null
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
                            <span className={`hidden sm:inline `}>Create</span>
                          </button>
                        ) : (
                          <button
                            data-auto={`employee_view-onboarding_process-edit-${process?.id}`}
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
                                      "onboarding"
                                    )?.id || null,
                                  process_id: process?.id ? process?.id : null
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
                                "onboarding"
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
                                "onboarding"
                              )
                            )?.length > 0
                              ? `${
                                  getProcessIfExist(
                                    processesThatExistOnEmployee,
                                    process?.id,
                                    "onboarding"
                                  )?.tasks?.length > 0
                                    ? getProcessIfExist(
                                        processesThatExistOnEmployee,
                                        process?.id,
                                        "onboarding"
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
                              "onboarding"
                            )
                          )?.length > 0
                            ? `${
                                getProcessIfExist(
                                  processesThatExistOnEmployee,
                                  process?.id,
                                  "onboarding"
                                )?.tasks?.length > 0 &&
                                getProcessIfExist(
                                  processesThatExistOnEmployee,
                                  process?.id,
                                  "onboarding"
                                )?.tasks[0]?.assigned_date
                                  ? `Assign Date: ${getProcessIfExist(processesThatExistOnEmployee, process?.id, "onboarding")?.tasks[0]?.assigned_date}`
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
                              "onboarding"
                            )
                          )?.length > 0
                            ? `${
                                getProcessIfExist(
                                  processesThatExistOnEmployee,
                                  process?.id,
                                  "onboarding"
                                )?.tasks?.length > 0 &&
                                getProcessIfExist(
                                  processesThatExistOnEmployee,
                                  process?.id,
                                  "onboarding"
                                )?.tasks[0]?.due_date
                                  ? `Due Date: ${getProcessIfExist(processesThatExistOnEmployee, process?.id, "onboarding")?.tasks[0]?.due_date}`
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
                              "onboarding"
                            )
                          )?.length > 0
                            ? `${
                                getProcessIfExist(
                                  processesThatExistOnEmployee,
                                  process?.id,
                                  "onboarding"
                                )?.tasks?.length > 0 &&
                                getProcessIfExist(
                                  processesThatExistOnEmployee,
                                  process?.id,
                                  "onboarding"
                                )?.tasks[0]?.completion_date
                                  ? `Completed At: ${getProcessIfExist(processesThatExistOnEmployee, process?.id, "onboarding")?.tasks[0]?.completion_date}`
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
                    "onboarding"
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

          {isEmployeeDetailsRefetching && (
            <div className="animate-pulse flex ml-[2rem] space-x-4 w-[calc(100%-2rem)] p-10 bg-base-100 rounded-xl mb-5"></div>
          )}
        </div>
      </div>

      {processesThatNotExistOnCandidate?.length > 0 && (
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
            <CustomHeadingButton
              text={
                processes?.length > 0 ? "Add More Processes" : "Add Process"
              }
              handler={() => {
                setIsOnAddMode(true);
              }}
              dataAuto={"add_process"}
              Icon={FaPlus}
            />
          )}
        </div>
      )}
    </div>
  );
}

OnboardingProcessTimeLine.propTypes = {
  processes: PropTypes.array,
  processesThatExistOnEmployee: PropTypes.array,
  employeeId: PropTypes.any,
  refetchProcesses: PropTypes.func,
  isProcessesLoading: PropTypes.bool,
  refetchEmployeeDetails: PropTypes.func,
  isEmployeeDetailsRefetching: PropTypes.bool,
  processTitle: PropTypes.string
};
