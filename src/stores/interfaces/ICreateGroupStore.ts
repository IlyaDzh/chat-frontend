import { TDialog } from "./IDialogStore";

export interface ICreateGroupStore {
    createGroupForm: TCreateGroupForm;
    createModalIsOpen: boolean;
    pending: boolean;
    createCroupError: boolean;
    createCroup: () => void;
    setCreateModalIsOpen: (createModalIsOpen: boolean) => void;
    setGroupName: (name: string) => void;
    setGroupAvatar: (avatar: File) => void;
    resetCreateGroupForm: () => void;
}

export type TCreateGroupForm = {
    name: string;
    avatar: File | null;
};

export type TCreateGroupResponse = {
    chat: TDialog;
    message: string;
};
