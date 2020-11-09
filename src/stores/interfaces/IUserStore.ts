export interface IUserStore {
    user: undefined | object;
    fetchUser: () => void;
    doLogout: () => void;
}
