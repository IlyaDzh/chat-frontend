import { axiosInstance } from "./axios-instance";
import { TLoginForm } from "../stores/interfaces/ILoginStore";
import { TSearchUserData } from "../stores/interfaces/IUserStore";

export class UserApi {
    static login(postData: TLoginForm) {
        return axiosInstance.post("/api/auth/login", postData);
    }

    static getUser() {
        return axiosInstance.get("api/user/info");
    }

    static searchUser(postData: TSearchUserData) {
        return axiosInstance.post("api/user/search", postData);
    }
}
