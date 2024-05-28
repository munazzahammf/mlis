import http from "../axios.ts";

const entity = "auth"
const version = "v1"

const endpoint = `${version}/${entity}`

interface LoginResponse {
    token: string;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
}

export const ApiLogin = (username: string, password: string) => {
    return http.post<LoginResponse>(`${endpoint}/login`, {
        username,
        password
    })
}