import { makeAutoObservable } from "mobx";

import { IGroupInfoModalStore } from "./interfaces/IGroupInfoModalStore";
import { TDialog } from "./interfaces/IDialogStore";

export class GroupInfoModalStore implements IGroupInfoModalStore {
    groupInfoModalIsOpen: boolean = false;

    currentGroupInfo: TDialog | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    setGroupInfoModalIsOpen = (groupInfoModalIsOpen: boolean, group?: TDialog) => {
        this.groupInfoModalIsOpen = groupInfoModalIsOpen;
        if (group) {
            this.currentGroupInfo = group;
        }
    };
}
