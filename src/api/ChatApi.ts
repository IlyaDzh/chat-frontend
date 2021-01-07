import { axiosInstance } from "./axios-instance";
import { TMessagePostData } from "../stores/interfaces/IMessageStore";
import { TAddUserPostData } from "../stores/interfaces/IAddUsersToGroupModalStore";

export class ChatApi {
    static getDialogsByType(type: 0 | 1) {
        return axiosInstance.get(`api/chat/type=${type}`);
    }

    static createGroup(postData: FormData) {
        return axiosInstance.post("api/chat/create/group", postData);
    }

    static createDirect(postData: { user_id: number }) {
        return axiosInstance.post("api/chat/create/direct", postData);
    }

    static getMessagesByLastMessageId(chatId: number, messageId: number) {
        return axiosInstance.get(
            `api/chat/messages/chat-id=${chatId}&msg-id=${messageId}`
        );
    }

    static sendMessage(postData: TMessagePostData) {
        return axiosInstance.post("api/chat/messages/send", postData);
    }

    static sendFile(postData: FormData) {
        return axiosInstance.post("api/chat/messages/send", postData);
    }

    static addUserToGroup(postData: TAddUserPostData) {
        return axiosInstance.post("api/chat/append-user", postData);
    }

    static getUsersNotIncludedInTheGroup(chatId: number) {
        return axiosInstance.get(`api/user/outside-chat/chat-id=${chatId}`);
    }
}
