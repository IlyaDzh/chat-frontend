import { axiosInstance } from "./axios-instance";
import { TLoginForm } from "../stores/interfaces/ILoginStore";

export class UserApi {
    static login(postData: TLoginForm) {
        return axiosInstance.post("/api/auth/login", postData);
    }

    static getUser() {
        return axiosInstance.get("api/user/info");
    }
}
