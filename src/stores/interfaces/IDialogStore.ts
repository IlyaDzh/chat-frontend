import { TUserResponse } from "./IUserStore";

export interface IDialogStore {
    dialogs: TDialogs;
    // currentDialog: TDialog | undefined;
    currentTab: TDialogsType;
    // messages: TMessage[];
    messageText: string;
    pending: TPendingDialogs;
    fetchDialogs: () => void;
    // fetchMessages: () => void;
    // setCurrentDialog: () => void;
    setCurrentTab: (dialogsType: TDialogsType) => void;
    setMessageText: (text: string) => void;
    sendMessage: () => void;
}

export type TDialogsType = "direct" | "groups";

export type TPendingDialogs = {
    direct: boolean;
    groups: boolean;
};

export type TDialogs = {
    direct: TDialog[] | undefined;
    groups: TDialog[] | undefined;
};

export type TDialog = {
    id: number;
    messages: TMessage[];
    type: TDialogsType;
    user?: TUserResponse;
    users?: TUserResponse[];
    avatar?: string;
    name?: string;
};

export type TMessage = {
    id: string;
    user: TUserResponse;
    text: string;
    date: string;
};
