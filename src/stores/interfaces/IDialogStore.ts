import { TUser } from "./IUserStore";
import { TMessage } from "./IMessageStore";

export interface IDialogStore {
    dialogs: TDialogs;
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
    direct: TDialog[] | undefined;
    groups: TDialog[] | undefined;
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
