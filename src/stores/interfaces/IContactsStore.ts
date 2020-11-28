import { TUser } from "./IUserStore";

export interface IContactsStore {
    users: TUser[];
    pending: boolean;
    searchText: string;
    searchUsers: TUser[];
    fetchUsers: () => void;
    setSearchText: (searchText: string) => void;
}
