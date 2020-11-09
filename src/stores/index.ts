import { UserStore } from "./UserStore";
import { LoginStore } from "./LoginStore";
import IStores from "./interfaces";

const user = new UserStore();
const login = new LoginStore(user);

export const stores: IStores = {
    user,
    login
};
