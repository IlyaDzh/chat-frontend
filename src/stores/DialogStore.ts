import { AxiosResponse } from "axios";
import { action, makeAutoObservable } from "mobx";

import { ChatApi } from "../api";
import { MAX_MESSAGE_COUNT } from "../utils/constants";
import {
    IDialogStore,
    TDialogs,
    TDialogsType,
    TPendingDialogs,
    TDialog,
    TMessage
} from "./interfaces/IDialogStore";

export class DialogStore implements IDialogStore {
    dialogs: TDialogs = {
        direct: undefined,
        groups: undefined
    };

    // currentDialog: TDialog | undefined = undefined;

    currentTab: TDialogsType = "direct";

    // messages: TMessage[] = [];

    messageText: string = "";

    pending: TPendingDialogs = {
        direct: false,
        groups: false
    };

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

        this.pending[this.currentTab] = true;

        const type = this.currentTab === "direct" ? 0 : 1;

        ChatApi.getDialogsByType(type)
            .then(
                action(({ data }: AxiosResponse<TDialog[]>) => {
                    this.dialogs[this.currentTab] = data;
                })
            )
            .catch(() => {})
            .finally(
                action(() => {
                    this.pending[this.currentTab] = false;
                })
            );
    };

    // fetchMessages = () => {};

    // setCurrentDialog = () => {};

    setCurrentTab = (dialogsType: TDialogsType) => {
        this.currentTab = dialogsType;
    };

    setMessageText = (text: string) => {
        if (text.length <= MAX_MESSAGE_COUNT) {
            this.messageText = text;
        }
    };

    sendMessage = () => {
        this.messageText = "";
    };
}
