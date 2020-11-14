import { AxiosResponse } from "axios";
import { action, makeAutoObservable } from "mobx";

import { ChatApi } from "../api";
import {
    IDialogStore,
    TDialogs,
    TDialogsType,
    TDialog
} from "./interfaces/IDialogStore";

export class DialogStore implements IDialogStore {
    dialogs: TDialogs = {
        direct: undefined,
        groups: undefined
    };

    currentDialog: TDialog | undefined = undefined;

    currentTab: TDialogsType = "direct";

    pending: boolean = false;

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
                    this.pending = false;
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
