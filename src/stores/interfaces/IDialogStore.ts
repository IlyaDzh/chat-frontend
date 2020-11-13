import { TUserResponse } from "./IUserStore";

export interface IDialogStore {
    currentDialog: TDialog | undefined;
    messages: TMessage[] | undefined;
    messageText: string;
    pending: boolean;
    fetchMessages: () => void;
    setCurrentDialog: () => void;
    setMessageText: (text: string) => void;
    sendMessage: () => void;
}

export type TDialog = {
    user: TUserResponse;
    lastMessage: TMessage;
};

export type TMessage = {
    id: string;
    text: string;
};
