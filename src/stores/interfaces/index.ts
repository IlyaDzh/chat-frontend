import { IUserStore } from "./IUserStore";
import { ILoginStore } from "./ILoginStore";
import { IDialogStore } from "./IDialogStore";
import { IMessageStore } from "./IMessageStore";
import { IContactsStore } from "./IContactsStore";
import { ICreateGroupStore } from "./ICreateGroupStore";
import { IUserInfoModalStore } from "./IUserInfoModalStore";
import { ISocketsStore } from "./ISocketsStore";

export default interface IStores {
    userStore: IUserStore;
    loginStore: ILoginStore;
    dialogStore: IDialogStore;
    messageStore: IMessageStore;
    contactsStore: IContactsStore;
    createGroupStore: ICreateGroupStore;
    userInfoModalStore: IUserInfoModalStore;
    socketsStore: ISocketsStore;
}
