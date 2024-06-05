import http from "../axios.ts";

export const ApiGetReportsOfUser = () => {
    return http.get(`v1/user/reports`)
}

export const ApiGenerateReport = (id: string) => {
    return http.post(`v1/report/generate/pdf/${id}`, {}, {
        responseType: 'blob'
    })
}