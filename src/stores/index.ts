import { UserStore } from "./UserStore";
import { LoginStore } from "./LoginStore";
import IStores from "./interfaces";
import { IUserStore } from "./interfaces/IUserStore";
import { ILoginStore } from "./interfaces/ILoginStore";

class RootStore implements IStores {
    userStore: IUserStore;
    loginStore: ILoginStore;

    constructor() {
        this.userStore = new UserStore();
        this.loginStore = new LoginStore(this);
    }
}

export const rootStore = new RootStore();
