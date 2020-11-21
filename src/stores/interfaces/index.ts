import { IUserStore } from "./IUserStore";
import { ILoginStore } from "./ILoginStore";
import { IDialogStore } from "./IDialogStore";
import { IMessageStore } from "./IMessageStore";
import { ICreateGroupStore } from "./ICreateGroupStore";
import { ISocketsStore } from "./ISocketsStore";

export default interface IStores {
    userStore: IUserStore;
    loginStore: ILoginStore;
    dialogStore: IDialogStore;
    messageStore: IMessageStore;
    createGroupStore: ICreateGroupStore;
    socketsStore: ISocketsStore;
}
