import { makeAutoObservable } from "mobx";

import { IUserInfoModalStore } from "./interfaces/IUserInfoModalStore";
import { TUser } from "./interfaces/IUserStore";

export class UserInfoModalStore implements IUserInfoModalStore {
    userInfoModalIsOpen: boolean = false;

    currentUserInfo: TUser | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setUserInfoModalIsOpen = (userInfoModalIsOpen: boolean, user?: TUser) => {
        this.userInfoModalIsOpen = userInfoModalIsOpen;
        if (user) {
            this.currentUserInfo = user;
        }
    };
}
