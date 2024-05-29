import http from "../axios.ts";
import {Patient, PatientSearchResponse} from "../types/patient";

const version = "v1"
const entity = "patient"

const endpoint = `${version}/${entity}`


export const ApiGetAllPatients = () => {
    return http.get<Patient[]>(`${endpoint}`)
}

export const ApiGetPatientById = (id: number) => {
    return http.get(`${endpoint}/${id}`)
}

export const ApiAddPatient = (patient: Patient) => {
    return http.post<Patient>(`${endpoint}`, patient)
}

export const ApiSearchPatients = (patient: string) => {
    return http.get<PatientSearchResponse[]>(`${endpoint}/search`, {
        params: {
            'q': patient
        }
    })
}