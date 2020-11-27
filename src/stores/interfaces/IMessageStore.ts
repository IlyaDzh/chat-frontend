import { TUser } from "./IUserStore";

export interface IMessageStore {
    messageText: string;
    setMessageText: (text: string) => void;
    sendMessage: () => void;
}

export type TMessage = {
    id: number;
    user: TUser;
    text: string;
    updated_at: string;
    pending?: boolean;
};

export type TMessagePostData = {
    chat_id: number;
    text: string;
};
