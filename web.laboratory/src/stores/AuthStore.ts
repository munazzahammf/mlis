import {create} from "zustand";

type AuthStore = {
    userInfo: object,
    token: string,
    isAuthenticated: boolean,
    setAuthenticated: (token: string) => void,
}
const useAuthStore = create<AuthStore>() ((setState) => ({
    userInfo: {},
    token: '',
    isAuthenticated: false,
    setAuthenticated: (token: string) => {
        setState({ ...setState, isAuthenticated: true, token: token });
    }
}))

export default useAuthStore;