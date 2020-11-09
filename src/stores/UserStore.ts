import { observable, action } from "mobx";
import { IUserStore } from "./interfaces/IUserStore";

export class UserStore implements IUserStore {
    @observable
    user: object | undefined = undefined;

    @action
    fetchUser = () => {
        console.log("fetch user");
    };

    @action
    doLogout = () => {
        console.log("logout");
    };
}
