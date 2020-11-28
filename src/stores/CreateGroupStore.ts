import { AxiosResponse } from "axios";
import { observable, action, makeObservable } from "mobx";

import { ChatApi } from "../api";
import IStores from "./interfaces";
import { ICreateGroupStore, TCreateGroupForm } from "./interfaces/ICreateGroupStore";
import { TCreateDialogResponse } from "./interfaces/IDialogStore";

const INITIAL_CREATE_GROUP_FORM: TCreateGroupForm = {
    name: "",
    avatar: null
};

export class CreateGroupStore implements ICreateGroupStore {
    createGroupForm = INITIAL_CREATE_GROUP_FORM;

    avatarObjectUrl: string = "";

    createModalIsOpen: boolean = false;

    pending: boolean = false;

    createCroupError: boolean = false;

    private rootStore: IStores;

    constructor(rootStore: IStores) {
        this.rootStore = rootStore;

        makeObservable(this, {
            createGroupForm: observable,
            createModalIsOpen: observable,
            pending: observable,
            createCroupError: observable,
            createCroup: action,
            setCreateModalIsOpen: action,
            setGroupName: action,
            setGroupAvatar: action,
            resetCreateGroupForm: action
        });
    }

    createCroup = () => {
        this.pending = true;

        const formData = new FormData();
        formData.append("name", this.createGroupForm.name);
        formData.append("avatar", this.createGroupForm.avatar as any);

        ChatApi.createGroup(formData)
            .then(
                action(({ data }: AxiosResponse<TCreateDialogResponse>) => {
                    this.rootStore.dialogStore.dialogs.groups.unshift(data.chat);
                    this.pending = false;
                    this.createModalIsOpen = false;
                    this.resetCreateGroupForm();
                })
            )
            .catch(
                action(() => {
                    this.createCroupError = true;
                    this.pending = false;
                })
            );
    };

    setCreateModalIsOpen = (createModalIsOpen: boolean) => {
        this.createModalIsOpen = createModalIsOpen;
    };

    setGroupName = (name: string) => {
        this.createGroupForm.name = name;
    };

    setGroupAvatar = (avatar: File) => {
        this.createGroupForm.avatar = avatar;
        this.avatarObjectUrl = URL.createObjectURL(avatar);
    };

    resetCreateGroupForm = () => {
        this.createGroupForm = INITIAL_CREATE_GROUP_FORM;
        this.createCroupError = false;
    };
}
