import { AxiosError, AxiosResponse } from "axios";
import { observable, action } from "mobx";

import { UserApi } from "../api";
import {
    ILoginStore,
    TLoginForm,
    TLoginFormFields,
    TSignInResponse
} from "./interfaces/ILoginStore";
import IStores from "./interfaces";

const INITIAL_LOGIN_FORM: TLoginForm = {
    name: "",
    password: ""
};

export class LoginStore implements ILoginStore {
    @observable
    loginForm = INITIAL_LOGIN_FORM;

    @observable
    loginSubmissionError: string | undefined = undefined;

    @observable
    pending: boolean = false;

    rootStore: IStores;

    constructor(rootStore: IStores) {
        this.rootStore = rootStore;
    }

    @action
    doLogin = (): void => {
        this.pending = true;
        this.loginSubmissionError = undefined;

        const authData: TLoginForm = {
            name: this.loginForm.name,
            password: this.loginForm.password
        };

        UserApi.login(authData)
            .then(({ data }: AxiosResponse<TSignInResponse>) => {
                localStorage.setItem("accessToken", data.token);
                this.rootStore.userStore.fetchUser();
                this.resetLoginForm();
                this.pending = false;
            })
            .catch((error: AxiosError) => {
                this.loginSubmissionError = error.response?.data.message;
                this.pending = false;
            });
    };

    @action
    setLoginFormValue = (key: TLoginFormFields, value: string): void => {
        this.loginForm[key] = value;
    };

    @action
    resetLoginForm = (): void => {
        this.loginForm = INITIAL_LOGIN_FORM;
        this.loginSubmissionError = undefined;
    };
}
