import { observable, action } from "mobx";
import { UserApi } from "../api";
import { ILoginStore, TLoginForm, TLoginFormFields } from "./interfaces/ILoginStore";
import { IUserStore } from "./interfaces/IUserStore";

const INITIAL_LOGIN_FORM: TLoginForm = {
    name: "",
    password: ""
};

export class LoginStore implements ILoginStore {
    @observable
    loginForm = INITIAL_LOGIN_FORM;

    @observable
    loginSubmissionError: any = undefined;

    @observable
    pending = false;

    userStore: IUserStore | undefined = undefined;

    constructor(userStore: IUserStore) {
        this.userStore = userStore;
    }

    @action
    doLogin = () => {
        this.pending = true;
        this.loginSubmissionError = undefined;

        const authData: TLoginForm = {
            name: this.loginForm.name,
            password: this.loginForm.password
        };

        UserApi.login(authData)
            .then(({ data }: any) => {
                localStorage.setItem("accessToken", data.token);
                // this.userStore.fetchUser();
                this.resetLoginForm();
                this.pending = false;
            })
            .catch((error: any) => {
                this.loginSubmissionError = error;
                this.pending = false;
            });
    };

    @action
    setLoginFormValue = (key: TLoginFormFields, value: string) => {
        this.loginForm[key] = value;
    };

    @action
    resetLoginForm = () => {
        this.loginForm = INITIAL_LOGIN_FORM;
        this.loginSubmissionError = undefined;
    };
}
