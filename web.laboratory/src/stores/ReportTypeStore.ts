import {create} from "zustand";

type ReportFormatStore = {
    reports: object[];
    setReports: (reports: object[]) => void;
}
const useReportFormatStore = create<ReportFormatStore>() ((setState) => ({
    reports: [],
    setReports: (reports: object[]) => {
        setState({reports: reports});
    }
}))

export default useReportFormatStore;