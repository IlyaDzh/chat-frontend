import { action, observable, makeObservable } from "mobx";

import { ChatApi } from "../api";
import IStores from "./interfaces";
import { IFilesStore } from "./interfaces/IFilesStore";
import { TDialog } from "./interfaces/IDialogStore";
import { TMessage } from "./interfaces/IMessageStore";

export class FilesStore implements IFilesStore {
    files: File[] | undefined;

    private rootStore: IStores;

    constructor(rootStore: IStores) {
        this.rootStore = rootStore;

        makeObservable(this, {
            files: observable,
            setFiles: action,
            sendFiles: action
        });
    }

    setFiles = (files: File[]) => {
        this.files = files;
    };

    sendFiles = () => {
        if (this.files) {
            const currentDialog: TDialog = this.rootStore.dialogStore.currentDialog!;

            Array.from(this.files).forEach(file => {
                const randomMessageId: number = Math.random() * 99999;
                const message: TMessage = {
                    id: randomMessageId,
                    mediaTemp: file,
                    updated_at: new Date().toString(),
                    user: this.rootStore.userStore.currentUser!,
                    pending: true
                };
                currentDialog.messages.unshift(message);

                const formData = new FormData();
                formData.append("chat_id", currentDialog.id.toString());
                formData.append("media", file as any);

                ChatApi.sendMessage(formData).then(
                    action(({ data }: any) => {
                        const message: TMessage = currentDialog.messages.find(
                            message => message.id === randomMessageId
                        )!;
                        message.pending = false;
                        message.id = data.data.message.id;
                        message.mediaName = data.data.message.media.mediaName;
                        message.media = data.data.message.media;
                    })
                );
            });

            this.files = undefined;
        }
    };
}
