import { TUser } from "./IUserStore";

export interface IUserInfoModalStore {
    userInfoModalIsOpen: boolean;
    currentUserInfo: TUser | undefined;
    setUserInfoModalIsOpen: (userInfoModalIsOpen: boolean, user?: TUser) => void;
}
