import { TUserResponse } from "./IUserStore";

export interface IMessageStore {
    messageText: string;
    pending: boolean;
    setMessageText: (text: string) => void;
    sendMessage: () => void;
}

export type TMessage = {
    id: number;
    user: TUserResponse;
    text: string;
    date: string;
};
