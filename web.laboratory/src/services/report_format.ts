import http from "../axios.ts";

const entity = "report/format"
const version = "v1"

const endpoint = `${version}/${entity}`

export const ApiGetReportFormats = () => {
    return http.get(`${endpoint}`)
}