import { TUser } from "./IUserStore";

export interface IAddUsersToGroupModalStore {
    addUsersModalIsOpen: boolean;
    users: TAddUsersItem[];
    pending: boolean;
    searchText: string;
    searchUsers: TAddUsersItem[];
    setAddUsersToGroupModalIsOpen: (addUsersModalIsOpen: boolean) => void;
    addUserToGroup: (userId: number) => void;
    setSearchText: (searchText: string) => void;
}

export type TAddUserPostData = {
    chat_id: number;
    user_id: number;
};

export type TAddUsersItem = {
    user: TUser;
    disabled: boolean;
};
