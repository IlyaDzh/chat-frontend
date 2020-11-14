export interface IUserStore {
    currentUser: TUserResponse | undefined;
    pending: boolean;
    fetchUser: () => void;
    doLogout: () => void;
}

export type TUserResponse = {
    id: number;
    avatar: string;
    name: string;
};

export type TSearchUserData = {
    search_query: string;
};
