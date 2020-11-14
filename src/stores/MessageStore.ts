import { makeAutoObservable } from "mobx";

import { MAX_MESSAGE_COUNT } from "../utils/constants";
import { IMessageStore } from "./interfaces/IMessageStore";

export class MessageStore implements IMessageStore {
    messageText: string = "";

    pending: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    fetchMessages = () => {};

    setMessageText = (text: string) => {
        if (text.length <= MAX_MESSAGE_COUNT) {
            this.messageText = text;
        }
    };

    sendMessage = () => {
        this.messageText = "";
    };
}
