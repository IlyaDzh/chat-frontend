import { TDialog } from "./IDialogStore";

export interface IGroupInfoModalStore {
    groupInfoModalIsOpen: boolean;
    currentGroupInfo: TDialog | undefined;
    setGroupInfoModalIsOpen: (
        groupInfoModalIsOpen: boolean,
        group?: TDialog
    ) => void;
}
