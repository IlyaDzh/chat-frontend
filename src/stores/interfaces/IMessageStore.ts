import { TUser } from "./IUserStore";

export interface IMessageStore {
    messageText: string;
    pending: boolean;
    setMessageText: (text: string) => void;
    sendMessage: () => void;
}

export type TMessage = {
    id: number;
    user: TUser;
    text: string;
    updated_at: string;
};
