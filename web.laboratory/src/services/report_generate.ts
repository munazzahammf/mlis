import http from "../axios.ts";

export const ApiGenerateReport = (id: string, data: object) => {
    return http.post(`v1/report/generate/pdf/${id}`, data, {
        responseType: 'blob'
    })
}

export const ApiSaveReportData = (id: string, data: object) => {
    return http.post(`v1/report/${id}`, data)
}

export const ApiMarkReportAsDelivered = (id: string) => {
    return http.post(`v1/report/mark-as-delivered/${id}`)
}