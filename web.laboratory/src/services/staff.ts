import http from "../axios.ts";

const version = "v1"
const entity = "staff"

const endpoint = `${version}/${entity}`

export const ApiGetAllStaff = () => {
    return http.get(`${endpoint}/`)
}

export const ApiRegisterNewStaff = (data) => {
    return http.post(`${endpoint}/`, data)
}

export const ApiDeleteStaffById = (id: number, disable: string) => {
    return http.delete(`${endpoint}/${id}` ,{
        params: {
            disable
        }
    })
}