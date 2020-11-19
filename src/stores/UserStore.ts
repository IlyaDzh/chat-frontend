import { AxiosResponse } from "axios";
import { action, makeAutoObservable } from "mobx";

import { UserApi } from "../api";
import { IUserStore, TUser } from "./interfaces/IUserStore";

export class UserStore implements IUserStore {
    currentUser: TUser | undefined = undefined;

    pending: boolean = !!localStorage.getItem("accessToken");

    constructor() {
        makeAutoObservable(this);
    }

    fetchUser = () => {
        this.pending = true;

        UserApi.getUser()
            .then(
                action(({ data }: AxiosResponse<TUser>) => {
                    this.currentUser = data;
                })
            )
            .catch(() => {
                localStorage.removeItem("accessToken");
            })
            .finally(
                action(() => {
                    this.pending = false;
                })
            );
    };

    doLogout = () => {
        this.currentUser = undefined;
        localStorage.removeItem("accessToken");
    };
}
