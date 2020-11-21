import { axiosInstance } from "./axios-instance";

export class ChatApi {
    static getDialogsByType(type: 0 | 1) {
        return axiosInstance.get(`api/chat/type=${type}`);
    }

    static createGroup(postData: FormData) {
        return axiosInstance.post("api/chat/create/group", postData);
    }

    static getMessagesByLastMessageId(chatId: number, messageId: number) {
        return axiosInstance.get(
            `api/chat/messages/chat-id=${chatId}&msg-id=${messageId}`
        );
    }
}
