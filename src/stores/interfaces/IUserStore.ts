export interface IUserStore {
    currentUser: TUser | undefined;
    pending: boolean;
    fetchUser: () => void;
    doLogout: () => void;
}

export type TUser = {
    id: number;
    avatar: string;
    name: string;
};

export type TSearchUserData = {
    search_query: string;
};
