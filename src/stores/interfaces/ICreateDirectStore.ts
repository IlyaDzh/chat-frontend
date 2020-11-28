import { TCreateDialogResponse } from "./IDialogStore";

export interface ICreateDirectStore {
    pending: boolean;
    createDirectDialog: (userId: number) => Promise<TCreateDialogResponse>;
}
