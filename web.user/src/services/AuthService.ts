import http from "../axios.ts";

const entity = "user"
const version = "v1"

const endpoint = `/${version}/${entity}`

type LoginUserData = {
    username: string;
    password: string;
}
export const ApiLoginUser = (data: LoginUserData) => {
    return http.post(`${endpoint}/login`, data)
}

type UserInfo = {
    gender: string;
    title: string;
    birthdate: string
}
export const ApiUpdateInfo = (data: UserInfo) => {
    return http.post(`${endpoint}/info`, data)
}

type RegisterUserData = {
    first_name: string;
    last_name: string;
    phone: string;
    password: string;
}
export const ApiRegisterUser = (data) => {
    return http.post(`${endpoint}/register`, data)
}