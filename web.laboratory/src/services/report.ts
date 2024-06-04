import http from "../axios.ts";
import {ReportQueue} from "../types/report";
import {PendingReportFormProps} from "../screens/ReportsScreen/PendingReportForm.tsx";

const version = "v1"
const entity = "report"

const endpoint = `${version}/${entity}`

export const ApiGetReports = (status?: string) => {
    return http.get<ReportQueue[]>(`${endpoint}/`, {
        params: {
            status
        }
    })
}

export const ApiAddPendingReports = (data: PendingReportFormProps) => {
    return http.post(`${endpoint}/queue`, data)
}

export const ApiUpdateReportStatus = (id, data) => {
    return http.put(`${endpoint}/status/${id}`, data)
}