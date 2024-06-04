import {create} from "zustand";

type AuthStore = {
    userInfo: object,
    token: string,
    isAuthenticated: boolean,
    setAuthenticated: (data: object) => void,
}
const useAuthStore = create<AuthStore>() ((setState) => ({
    userInfo: {},
    token: '',
    isAuthenticated: false,
    setAuthenticated: (data) => {
        setState({ userInfo: data, token: data.token, isAuthenticated: true });
    }
}))

export default useAuthStore;