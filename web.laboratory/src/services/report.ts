import http from "../axios.ts";
import {ReportQueue} from "../types/report";
import {PendingReportFormProps} from "../screens/ReportsScreen/PendingReportForm.tsx";

const version = "v1"
const entity = "report"

const endpoint = `${version}/${entity}`

export const ApiGetPendingReports = () => {
    return http.get<ReportQueue[]>(`${endpoint}/queue`)
}

export const ApiAddPendingReports = (data: PendingReportFormProps) => {
    return http.post(`${endpoint}/queue`, data)
}