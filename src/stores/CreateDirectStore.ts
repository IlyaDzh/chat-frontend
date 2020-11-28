import { AxiosResponse } from "axios";
import { makeObservable, action, observable } from "mobx";

import { ChatApi } from "../api";
import IStores from "./interfaces";
import { ICreateDirectStore } from "./interfaces/ICreateDirectStore";
import { TCreateDialogResponse } from "./interfaces/IDialogStore";

export class CreateDirectStore implements ICreateDirectStore {
    pending: boolean = false;

    private rootStore: IStores;

    constructor(rootStore: IStores) {
        this.rootStore = rootStore;

        makeObservable(this, {
            pending: observable,
            createDirectDialog: action
        });
    }

    createDirectDialog = async (userId: number): Promise<TCreateDialogResponse> => {
        try {
            this.pending = true;
            const {
                data
            }: AxiosResponse<TCreateDialogResponse> = await ChatApi.createDirect({
                user_id: userId
            });
            this.rootStore.dialogStore.dialogs["direct"].push(data.chat);
            this.rootStore.socketsStore.subscribeToChannelById(data.chat.id);
            this.pending = false;
            return data;
        } catch (error) {
            this.pending = false;
            return await Promise.reject(error.response.data);
        }
    };
}
