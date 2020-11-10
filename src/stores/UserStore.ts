import { AxiosResponse } from "axios";
import { observable, action } from "mobx";

import { UserApi } from "../api";
import { IUserStore, TUserResponse } from "./interfaces/IUserStore";

export class UserStore implements IUserStore {
    @observable
    currentUser: TUserResponse | undefined = undefined;

    @observable
    pending: boolean = !!localStorage.getItem("accessToken");

    @action
    fetchUser = (): void => {
        this.pending = true;

        UserApi.getUser()
            .then(({ data }: AxiosResponse<TUserResponse>) => {
                this.currentUser = data;
            })
            .catch(() => {
                localStorage.removeItem("accessToken");
            })
            .finally(() => {
                this.pending = false;
            });
    };

    @action
    doLogout = (): void => {
        this.currentUser = undefined;
        localStorage.removeItem("accessToken");
    };
}
