import { action, observable, makeObservable } from "mobx";

import { ChatApi } from "../api";
import IStores from "./interfaces";
import { IMessageStore, TMessage } from "./interfaces/IMessageStore";
import { MAX_MESSAGE_COUNT } from "../utils/constants";
import { TDialog } from "./interfaces/IDialogStore";

export class MessageStore implements IMessageStore {
    messageText: string = "";

    private rootStore: IStores;

    constructor(rootStore: IStores) {
        this.rootStore = rootStore;

        makeObservable(this, {
            messageText: observable,
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
            const currentDialog: TDialog = this.rootStore.dialogStore.currentDialog!;

            const randomMessageId: number = Math.random() * 99999;
            const message: TMessage = {
                id: randomMessageId,
                text: this.messageText,
                updated_at: new Date().toString(),
                user: this.rootStore.userStore.currentUser!,
                pending: true
            };
            currentDialog.messages.unshift(message);

            const formData = new FormData();
            formData.append("chat_id", currentDialog.id.toString());
            formData.append("text", this.messageText);

            ChatApi.sendMessage(formData).then(
                action(({ data }: any) => {
                    const message: TMessage = currentDialog.messages.find(
                        message => message.id === randomMessageId
                    )!;
                    message.pending = false;
                    message.id = data.data.message.id;
                })
            );

            this.messageText = "";
        }
    };
}
