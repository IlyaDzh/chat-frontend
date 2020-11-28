import { axiosInstance } from "./axios-instance";

export class ContactsApi {
    static getUsers() {
        return axiosInstance.get("api/user");
    }
}
