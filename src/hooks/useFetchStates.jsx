import { create } from "zustand";

const useFetchStates = create((set) => ({
  // EMPLOYEE DASHBOARD REFETCH STATES
  employeeDashboardScheduleChartFetched: Math.random(),
  employeeDashboardScheduleChartRefetch: () =>
    set(() => ({ employeeDashboardScheduleChartFetched: Math.random() })),

  // EMPLOYEE VIEW REFETCH STATES
  employeeViewAttendanceDataFetched: Math.random(),
  employeeViewAttendanceDataRefetch: () =>
    set(() => ({ employeeViewAttendanceDataFetched: Math.random() }))
}));

export default useFetchStates;
