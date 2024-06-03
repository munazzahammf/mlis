import http from "../axios.ts";

const version = "v1"
const entity = "report"

const endpoint = `${version}/${entity}`

export const ApiGetReportRequestById = (requestId: string) => {
    return http.get(`${endpoint}/${requestId}`);
}