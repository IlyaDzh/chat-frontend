import { AxiosResponse } from "axios";
import { TUser } from "./IUserStore";
import { TMessage } from "./IMessageStore";

export interface IDialogStore {
    dialogs: TDialogs;
    loaded: TLoadedDialogs;
    currentDialog: TDialog | undefined;
    currentTab: TDialogsType;
    pending: boolean;
    messagesPending: boolean;
    hasMore: boolean;
    searchText: string;
    searchDialogs: TDialog[];
    fetchDialogs: () => void;
    fetchMessages: () => void;
    setCurrentTab: (dialogsType: TDialogsType) => void;
    setCurrentDialogById: (id: string) => void;
    setSearchText: (searchText: string) => void;
}

export type TDialogsType = "direct" | "groups";

export type TDialogs = {
    direct: TDialog[];
    groups: TDialog[];
};

export type TLoadedDialogs = {
    direct: boolean;
    groups: boolean;
};

export type TDialog = {
    id: number;
    messages: TMessage[];
    type: 0 | 1;
    user?: TUser;
    users?: TUser[];
    avatar?: string;
    name?: string;
};

export type TCreateGroupData = {
    name: string;
    avatar?: any;
};

export type TCreateDialogResponse = {
    chat: TDialog;
    message: string;
};
