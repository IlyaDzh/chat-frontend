import { IUserStore } from "./IUserStore";
import { ILoginStore } from "./ILoginStore";

export default interface IStores {
    user: IUserStore;
    login: ILoginStore;
}
