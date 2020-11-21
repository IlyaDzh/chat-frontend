import { action, observable, makeObservable } from "mobx";

import IStores from "./interfaces";
import { IMessageStore, TMessage } from "./interfaces/IMessageStore";
import { MAX_MESSAGE_COUNT } from "../utils/constants";

export class MessageStore implements IMessageStore {
    messageText: string = "";

    pending: boolean = false;

    private rootStore: IStores;

    constructor(rootStore: IStores) {
        this.rootStore = rootStore;

        makeObservable(this, {
            messageText: observable,
            pending: observable,
            setMessageText: action,
            sendMessage: action
        });
    }

    setMessageText = (text: string) => {
        if (text.length <= MAX_MESSAGE_COUNT) {
            this.messageText = text;
        }
    };

    sendMessage = () => {
        if (this.messageText) {
            const message: TMessage = {
                id: Math.floor(Math.random() * 999999),
                text: this.messageText,
                updated_at: "2020-11-19T23:00:00.000000Z",
                user: this.rootStore.userStore.currentUser!
            };
            this.rootStore.dialogStore.currentDialog!.messages = [
                message,
                ...this.rootStore.dialogStore.currentDialog!.messages
            ];
            this.messageText = "";
        }
    };
}
