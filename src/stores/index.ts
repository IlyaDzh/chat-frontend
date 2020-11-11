import { UserStore } from "./UserStore";
import { LoginStore } from "./LoginStore";
import { DialogStore } from "./DialogStore";
import IStores from "./interfaces";
import { IUserStore } from "./interfaces/IUserStore";
import { ILoginStore } from "./interfaces/ILoginStore";
import { IDialogStore } from "./interfaces/IDialogStore";

class RootStore implements IStores {
    userStore: IUserStore;
    loginStore: ILoginStore;
    dialogStore: IDialogStore;

    constructor() {
        this.userStore = new UserStore();
        this.loginStore = new LoginStore(this);
        this.dialogStore = new DialogStore();
    }
}

export const rootStore = new RootStore();
