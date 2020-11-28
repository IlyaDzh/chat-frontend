import { AxiosResponse } from "axios";
import { makeObservable, observable, action, reaction } from "mobx";

import { ChatApi } from "../api";
import IStores from "./interfaces";
import {
    IDialogStore,
    TDialogs,
    TLoadedDialogs,
    TDialogsType,
    TDialog,
    TCreateDialogResponse
} from "./interfaces/IDialogStore";
import { TMessage } from "./interfaces/IMessageStore";

export class DialogStore implements IDialogStore {
    dialogs: TDialogs = {
        direct: [],
        groups: []
    };

    loaded: TLoadedDialogs = {
        direct: false,
        groups: false
    };

    currentDialog: TDialog | undefined = undefined;

    currentTab: TDialogsType = "direct";

    pending: boolean = false;

    messagesPending: boolean = false;

    hasMore: boolean = true;

    searchText: string = "";

    searchDialogs: TDialog[] = [];

    private rootStore: IStores;

    constructor(rootStore: IStores) {
        this.rootStore = rootStore;

        makeObservable(this, {
            dialogs: observable,
            loaded: observable,
            currentDialog: observable,
            currentTab: observable,
            pending: observable,
            messagesPending: observable,
            hasMore: observable,
            searchText: observable,
            searchDialogs: observable,
            fetchDialogs: action,
            fetchMessages: action,
            setCurrentDialogById: action,
            setCurrentTab: action,
            setSearchText: action,
            createDirectDialog: action
        });

        reaction(
            () => this.searchText,
            searchText =>
                (this.searchDialogs =
                    this.dialogs[this.currentTab].filter(
                        dialog =>
                            dialog.name
                                ?.toLowerCase()
                                .indexOf(searchText.toLowerCase()) === 0
                    ) || [])
        );

        reaction(
            () => this.currentTab,
            currentTab =>
                (this.searchDialogs =
                    this.dialogs[currentTab].filter(
                        dialog =>
                            dialog.name
                                ?.toLowerCase()
                                .indexOf(this.searchText.toLowerCase()) === 0
                    ) || [])
        );
    }

    fetchDialogs = () => {
        if (
            (this.currentTab === "direct" && this.loaded.direct) ||
            (this.currentTab === "groups" && this.loaded.groups)
        ) {
            return;
        }

        this.pending = true;

        const currentTab = this.currentTab;

        const type = currentTab === "direct" ? 0 : 1;

        ChatApi.getDialogsByType(type)
            .then(
                action(({ data }: AxiosResponse<TDialog[]>) => {
                    this.dialogs[currentTab] = data;
                    this.loaded[currentTab] = true;

                    this.dialogs[currentTab].forEach(dialog =>
                        this.rootStore.socketsStore.subscribeToChannelById(dialog.id)
                    );
                })
            )
            .finally(
                action(() => {
                    this.pending = false;
                })
            );
    };

    fetchMessages = () => {
        if (!this.currentDialog) {
            return;
        }

        this.messagesPending = true;

        const lastMessageId = this.currentDialog.messages[
            this.currentDialog.messages.length - 1
        ].id;
        const currentDialogId = this.currentDialog.id;
        const currentTab = this.currentTab;

        ChatApi.getMessagesByLastMessageId(currentDialogId, lastMessageId)
            .then(
                action(({ data }: AxiosResponse<TMessage[]>) => {
                    if (data.length > 0) {
                        this.dialogs[currentTab]
                            .filter(dialog => dialog.id === currentDialogId)[0]
                            .messages.push(...data);
                        this.hasMore = true;
                    }
                    if (data.length < 20) {
                        this.hasMore = false;
                    }
                })
            )
            .finally(
                action(() => {
                    this.messagesPending = false;
                })
            );
    };

    setCurrentDialogById = (id: string) => {
        this.currentDialog = this.dialogs[this.currentTab].filter(
            dialog => dialog.id === Number(id)
        )[0];
    };

    setCurrentTab = (dialogsType: TDialogsType) => {
        this.currentTab = dialogsType;
    };

    setSearchText = (searchText: string) => {
        this.searchText = searchText;
    };

    createDirectDialog = async (userId: number): Promise<TCreateDialogResponse> => {
        try {
            const {
                data
            }: AxiosResponse<TCreateDialogResponse> = await ChatApi.createDirect({
                user_id: userId
            });
            this.dialogs["direct"].push(data.chat);
            this.rootStore.socketsStore.subscribeToChannelById(data.chat.id);
            return data;
        } catch (error) {
            return await Promise.reject(error.response.data);
        }
    };
}
