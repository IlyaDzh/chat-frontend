import { TUser } from "./IUserStore";
import { TMessage } from "./IMessageStore";

export interface IDialogStore {
    dialogs: TDialogs;
    currentDialog: TDialog | undefined;
    currentTab: TDialogsType;
    pending: boolean;
    fetchDialogs: () => void;
    setCurrentTab: (dialogsType: TDialogsType) => void;
    setCurrentDialogById: (id: string) => void;
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
