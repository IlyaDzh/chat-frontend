import { AxiosResponse } from "axios";
import { action, makeAutoObservable, reaction } from "mobx";

import { ChatApi } from "../api";
import {
    IDialogStore,
    TDialogs,
    TLoadedDialogs,
    TDialogsType,
    TDialog
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

    constructor() {
        makeAutoObservable(this);

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
                })
            )
            .catch(() => {})
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
                    if (data.length < 15) {
                        this.hasMore = false;
                    }
                })
            )
            .catch(() => {})
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
}
