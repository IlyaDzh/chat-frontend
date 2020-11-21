import { AxiosResponse } from "axios";
import { action, makeAutoObservable } from "mobx";

import { ChatApi } from "../api";
import {
    IDialogStore,
    TDialogs,
    TDialogsType,
    TDialog
} from "./interfaces/IDialogStore";
import { TMessage } from "./interfaces/IMessageStore";

export class DialogStore implements IDialogStore {
    dialogs: TDialogs = {
        direct: undefined,
        groups: undefined
    };

    currentDialog: TDialog | undefined = undefined;

    currentTab: TDialogsType = "direct";

    pending: boolean = false;

    messagesPending: boolean = false;

    hasMore:boolean = true;

    constructor() {
        makeAutoObservable(this);
    }

    fetchDialogs = () => {
        if (
            (this.currentTab === "direct" && this.dialogs.direct) ||
            (this.currentTab === "groups" && this.dialogs.groups)
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
                        ?.filter(dialog => dialog.id === currentDialogId)[0]
                        .messages.push(...data);
                        this.hasMore = true;
                    } else {    
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
        this.currentDialog = this.dialogs[this.currentTab]?.filter(
            dialog => dialog.id === Number(id)
        )[0];
    };

    setCurrentTab = (dialogsType: TDialogsType) => {
        this.currentTab = dialogsType;
    };
}
