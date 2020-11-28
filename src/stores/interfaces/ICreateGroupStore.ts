export interface ICreateGroupStore {
    createGroupForm: TCreateGroupForm;
    avatarObjectUrl: string;
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
