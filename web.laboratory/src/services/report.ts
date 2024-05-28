import http from "../axios.ts";

const version = "v1"
const entity = "report"

const endpoint = `${version}/${entity}`

export const ApiGetPendingReports = () => {
    return http.get(`${endpoint}/pending`)
}