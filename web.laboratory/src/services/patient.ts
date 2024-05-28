import http from "../axios.ts";
import {Patient} from "../types/patient";

const version = "v1"
const entity = "patient"

const endpoint = `${version}/${entity}`


export const ApiGetAllPatients = () => {
    return http.get<Patient[]>(`${endpoint}`)
}

export const ApiAddPatient = (patient: Patient) => {
    return http.post<Patient>(`${endpoint}`, patient)
}