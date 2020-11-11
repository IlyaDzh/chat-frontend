import { TUserResponse } from "./IUserStore";

export interface IDialogStore {
    currentDialog: TDialog | undefined;
    messages: TMessage[] | undefined;
    pending: boolean;
    fetchMessages: () => void;
}

export type TDialog = {
    user: TUserResponse;
    lastMessage: TMessage;
};

export type TMessage = {
    id: string;
    text: string;
};
