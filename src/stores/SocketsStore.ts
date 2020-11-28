import Pusher from "pusher-js";
import { makeObservable, action } from "mobx";

import IStores from "./interfaces";
import { ISocketsStore, TNewMessageResponse } from "./interfaces/ISocketsStore";

export class SocketsStore implements ISocketsStore {
    pusher: Pusher | undefined;

    private rootStore: IStores;

    constructor(rootStore: IStores) {
        this.rootStore = rootStore;

        makeObservable(this, {
            addNewMessage: action
        });

        this.pusher = new Pusher("657da11b3b498151a232", {
            cluster: "eu",
            authEndpoint: "http://fcdad143cf88.ngrok.io/socket/auth"
        });

        this.pusher.subscribe("private-channel");

        this.pusher.bind("NewMessage", (data: TNewMessageResponse) => {
            if (
                data.message.message &&
                this.rootStore.userStore.currentUser?.id !==
                    data.message.message.user.id
            ) {
                this.addNewMessage(data);
            }
        });
    }

    addNewMessage = (data: TNewMessageResponse) => {
        const dialogType = data.message.dialogType === 0 ? "direct" : "groups";
        const currentDialog = this.rootStore.dialogStore.dialogs[dialogType].filter(
            dialog => dialog.id === data.message.dialogId
        )[0];
        if (currentDialog) {
            currentDialog.messages.unshift(data.message.message);
        }
    };
}
