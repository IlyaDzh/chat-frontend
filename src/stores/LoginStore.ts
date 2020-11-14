import { AxiosError, AxiosResponse } from "axios";
import { observable, action, makeObservable } from "mobx";

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
    loginForm = INITIAL_LOGIN_FORM;

    loginSubmissionError: string | undefined = undefined;

    pending: boolean = false;

    private rootStore: IStores;

    constructor(rootStore: IStores) {
        this.rootStore = rootStore;

        makeObservable(this, {
            loginForm: observable,
            loginSubmissionError: observable,
            pending: observable,
            doLogin: action,
            setLoginFormValue: action
        });
    }

    doLogin = () => {
        this.pending = true;
        this.loginSubmissionError = undefined;

        const authData: TLoginForm = {
            name: this.loginForm.name,
            password: this.loginForm.password
        };

        UserApi.login(authData)
            .then(
                action(({ data }: AxiosResponse<TSignInResponse>) => {
                    localStorage.setItem("accessToken", data.token);
                    this.rootStore.userStore.fetchUser();
                    this.resetLoginForm();
                    this.pending = false;
                })
            )
            .catch(
                action((error: AxiosError) => {
                    this.loginSubmissionError = error.response?.data.message;
                    this.pending = false;
                })
            );
    };

    setLoginFormValue = (key: TLoginFormFields, value: string) => {
        this.loginForm[key] = value;
    };

    resetLoginForm = () => {
        this.loginForm = INITIAL_LOGIN_FORM;
        this.loginSubmissionError = undefined;
    };
}
