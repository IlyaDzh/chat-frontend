import { UserStore } from "./UserStore";
import { LoginStore } from "./LoginStore";
import { DialogStore } from "./DialogStore";
import { MessageStore } from "./MessageStore";
import { CreateGroupStore } from "./CreateGroupStore";
import IStores from "./interfaces";
import { IUserStore } from "./interfaces/IUserStore";
import { ILoginStore } from "./interfaces/ILoginStore";
import { IDialogStore } from "./interfaces/IDialogStore";
import { IMessageStore } from "./interfaces/IMessageStore";
import { ICreateGroupStore } from "./interfaces/ICreateGroupStore";

class RootStore implements IStores {
    userStore: IUserStore;
    loginStore: ILoginStore;
    dialogStore: IDialogStore;
    messageStore: IMessageStore;
    createGroupStore: ICreateGroupStore;

    constructor() {
        this.userStore = new UserStore();
        this.loginStore = new LoginStore(this);
        this.dialogStore = new DialogStore();
        this.messageStore = new MessageStore();
        this.createGroupStore = new CreateGroupStore(this);
    }
}

export const rootStore = new RootStore();
