import http from "../axios.ts";
import {PatientSearchResponse} from "../types/patient";

const entity = "report/format"
const version = "v1"

const endpoint = `${version}/${entity}`

export const ApiGetReportFormats = () => {
    return http.get(`${endpoint}`)
}

export const ApiUpdateReportFormatValuesById = (id: number, format) => {
    return http.put(`${endpoint}/${id}`, format)
}