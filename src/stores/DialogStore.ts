import { makeAutoObservable } from "mobx";

import { MAX_MESSAGE_COUNT } from "../utils/constants";
import { IDialogStore, TDialog, TMessage } from "./interfaces/IDialogStore";

export class DialogStore implements IDialogStore {
    currentDialog: TDialog | undefined = undefined;

    messages: TMessage[] | undefined = undefined;

    messageText: string = "";

    pending: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    fetchMessages = () => {
        this.pending = true;

        setTimeout(() => {
            this.messages?.push({
                id: "2",
                text: "Второе сообщение"
            });
        }, 1000);

        this.pending = false;
    };

    setCurrentDialog = () => {
        this.currentDialog = {
            user: {
                name: "Taya",
                avatar: "none"
            },
            lastMessage: {
                id: "1",
                text: "Первое сообщение"
            }
        };
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
