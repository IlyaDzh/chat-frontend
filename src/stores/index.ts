import { UserStore } from "./UserStore";
import { LoginStore } from "./LoginStore";
import { DialogStore } from "./DialogStore";
import { MessageStore } from "./MessageStore";
import { ContactsStore } from "./ContactsStore";
import { CreateGroupStore } from "./CreateGroupStore";
import { CreateDirectStore } from "./CreateDirectStore";
import { UserInfoModalStore } from "./UserInfoModalStore";
import { GroupInfoModalStore } from "./GroupInfoModalStore";
import { AddUsersToGroupModalStore } from "./AddUsersToGroupModalStore";
import { SocketsStore } from "./SocketsStore";

import IStores from "./interfaces";
import { IUserStore } from "./interfaces/IUserStore";
import { ILoginStore } from "./interfaces/ILoginStore";
import { IDialogStore } from "./interfaces/IDialogStore";
import { IMessageStore } from "./interfaces/IMessageStore";
import { IContactsStore } from "./interfaces/IContactsStore";
import { ICreateGroupStore } from "./interfaces/ICreateGroupStore";
import { ICreateDirectStore } from "./interfaces/ICreateDirectStore";
import { IUserInfoModalStore } from "./interfaces/IUserInfoModalStore";
import { IGroupInfoModalStore } from "./interfaces/IGroupInfoModalStore";
import { IAddUsersToGroupModalStore } from "./interfaces/IAddUsersToGroupModalStore";
import { ISocketsStore } from "./interfaces/ISocketsStore";

class RootStore implements IStores {
    userStore: IUserStore;
    loginStore: ILoginStore;
    dialogStore: IDialogStore;
    messageStore: IMessageStore;
    contactsStore: IContactsStore;
    createGroupStore: ICreateGroupStore;
    createDirectStore: ICreateDirectStore;
    userInfoModalStore: IUserInfoModalStore;
    groupInfoModalStore: IGroupInfoModalStore;
    addUsersToGroupModalStore: IAddUsersToGroupModalStore;
    socketsStore: ISocketsStore;

    constructor() {
        this.userStore = new UserStore();
        this.loginStore = new LoginStore(this);
        this.dialogStore = new DialogStore(this);
        this.messageStore = new MessageStore(this);
        this.contactsStore = new ContactsStore();
        this.createGroupStore = new CreateGroupStore(this);
        this.createDirectStore = new CreateDirectStore(this);
        this.userInfoModalStore = new UserInfoModalStore();
        this.groupInfoModalStore = new GroupInfoModalStore();
        this.addUsersToGroupModalStore = new AddUsersToGroupModalStore(this);
        this.socketsStore = new SocketsStore(this);
    }
}

export const rootStore = new RootStore();
