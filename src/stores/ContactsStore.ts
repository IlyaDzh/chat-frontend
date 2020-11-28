import { AxiosResponse } from "axios";
import { makeAutoObservable, action, reaction } from "mobx";

import { ContactsApi } from "../api";
import { IContactsStore } from "./interfaces/IContactsStore";
import { TUser } from "./interfaces/IUserStore";

export class ContactsStore implements IContactsStore {
    users: TUser[] = [];

    pending: boolean = false;

    searchText: string = "";

    searchUsers: TUser[] = [];

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.searchText,
            searchText =>
                (this.searchUsers =
                    this.users.filter(
                        user =>
                            user.name
                                ?.toLowerCase()
                                .indexOf(searchText.toLowerCase()) === 0
                    ) || [])
        );
    }

    fetchUsers = () => {
        this.pending = true;

        ContactsApi.getUsers()
            .then(
                action(({ data }: AxiosResponse<TUser[]>) => {
                    this.users = data;
                })
            )
            .finally(
                action(() => {
                    this.pending = false;
                })
            );
    };

    setSearchText = (searchText: string) => {
        this.searchText = searchText;
    };
}
