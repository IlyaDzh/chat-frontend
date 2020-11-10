import { IUserStore } from "./IUserStore";

export interface ILoginStore {
    loginForm: TLoginForm;
    loginSubmissionError: string | undefined;
    pending: boolean;
    userStore: IUserStore;
    doLogin: () => void;
    setLoginFormValue: (key: TLoginFormFields, value: string) => void;
    resetLoginForm: () => void;
}

export type TLoginForm = {
    name: string;
    password: string;
};

export type TLoginFormFields = "name" | "password";

export type TSignInResponse = {
    token: string;
};
