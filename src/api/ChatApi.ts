import { axiosInstance } from "./axios-instance";
import { TMessagePostData } from "../stores/interfaces/IMessageStore";

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

    static sendMessage(postData: TMessagePostData) {
        return axiosInstance.post("api/chat/messages/send", postData);
    }
}
