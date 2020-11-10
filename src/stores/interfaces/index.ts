import { IUserStore } from "./IUserStore";
import { ILoginStore } from "./ILoginStore";

export default interface IStores {
    userStore: IUserStore;
    loginStore: ILoginStore;
}
