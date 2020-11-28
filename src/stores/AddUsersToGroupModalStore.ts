import { AxiosResponse } from "axios";
import { makeObservable, observable, action, reaction } from "mobx";

import { ChatApi } from "../api";
import IStores from "./interfaces";
import {
    IAddUsersToGroupModalStore,
    TAddUserPostData,
    TAddUsersItem
} from "./interfaces/IAddUsersToGroupModalStore";
import { TUser } from "./interfaces/IUserStore";

export class AddUsersToGroupModalStore implements IAddUsersToGroupModalStore {
    addUsersModalIsOpen: boolean = false;

    users: TAddUsersItem[] = [];

    pending: boolean = false;

    searchText: string = "";

    searchUsers: TAddUsersItem[] = [];

    private rootStore: IStores;

    constructor(rootStore: IStores) {
        this.rootStore = rootStore;

        makeObservable(this, {
            addUsersModalIsOpen: observable,
            users: observable,
            pending: observable,
            searchText: observable,
            searchUsers: observable,
            setAddUsersToGroupModalIsOpen: action,
            addUserToGroup: action,
            setSearchText: action
        });

        reaction(
            () => this.searchText,
            searchText =>
                (this.searchUsers =
                    this.users.filter(
                        user =>
                            user.user.name
                                ?.toLowerCase()
                                .indexOf(searchText.toLowerCase()) === 0
                    ) || [])
        );
    }

    setAddUsersToGroupModalIsOpen = (addUsersModalIsOpen: boolean) => {
        this.addUsersModalIsOpen = addUsersModalIsOpen;
        if (addUsersModalIsOpen) {
            this.getUsersNotIncludedInTheGroup();
        }
    };

    addUserToGroup = (userId: number) => {
        const addUserPostData: TAddUserPostData = {
            chat_id: this.rootStore.dialogStore.currentDialog!.id,
            user_id: userId
        };

        const selectedUser = this.users.find(user => user.user.id === userId);
        if (selectedUser) {
            selectedUser.disabled = true;
        }

        ChatApi.addUserToGroup(addUserPostData).catch(() => {
            if (selectedUser) {
                selectedUser.disabled = false;
            }
        });
    };

    setSearchText = (searchText: string) => {
        this.searchText = searchText;
    };

    private getUsersNotIncludedInTheGroup = () => {
        this.pending = true;
        ChatApi.getUsersNotIncludedInTheGroup(
            this.rootStore.dialogStore.currentDialog!.id
        )
            .then(
                action(({ data }: AxiosResponse<TUser[]>) => {
                    this.users = data.map(user => ({ user: user, disabled: false }));
                })
            )
            .finally(action(() => (this.pending = false)));
    };
}
