import { IUserStore } from "./IUserStore";
import { ILoginStore } from "./ILoginStore";
import { IDialogStore } from "./IDialogStore";
import { IMessageStore } from "./IMessageStore";
import { IFilesStore } from "./IFilesStore";
import { IContactsStore } from "./IContactsStore";
import { ICreateGroupStore } from "./ICreateGroupStore";
import { ICreateDirectStore } from "./ICreateDirectStore";
import { IUserInfoModalStore } from "./IUserInfoModalStore";
import { IGroupInfoModalStore } from "./IGroupInfoModalStore";
import { IAddUsersToGroupModalStore } from "./IAddUsersToGroupModalStore";
import { ISocketsStore } from "./ISocketsStore";

export default interface IStores {
    userStore: IUserStore;
    loginStore: ILoginStore;
    dialogStore: IDialogStore;
    messageStore: IMessageStore;
    filesStore: IFilesStore;
    contactsStore: IContactsStore;
    createGroupStore: ICreateGroupStore;
    createDirectStore: ICreateDirectStore;
    userInfoModalStore: IUserInfoModalStore;
    groupInfoModalStore: IGroupInfoModalStore;
    addUsersToGroupModalStore: IAddUsersToGroupModalStore;
    socketsStore: ISocketsStore;
}
