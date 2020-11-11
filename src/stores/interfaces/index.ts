import { IUserStore } from "./IUserStore";
import { ILoginStore } from "./ILoginStore";
import { IDialogStore } from "./IDialogStore";

export default interface IStores {
    userStore: IUserStore;
    loginStore: ILoginStore;
    dialogStore: IDialogStore;
}
