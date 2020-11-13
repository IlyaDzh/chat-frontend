import { axiosInstance } from "./axios-instance";

export class ChatApi {
    static getDialogsByType(type: 0 | 1) {
        return axiosInstance.get(`api/chat/type=${type}`);
    }
}
