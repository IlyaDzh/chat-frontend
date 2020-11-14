import { TUserResponse } from "./IUserStore";

export interface IMessageStore {
    messageText: string;
    pending: boolean;
    fetchMessages: () => void;
    setMessageText: (text: string) => void;
    sendMessage: () => void;
}

export type TMessage = {
    id: string;
    user: TUserResponse;
    text: string;
    date: string;
};
