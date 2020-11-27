import Pusher from "pusher-js";

import { TMessage } from "./IMessageStore";

export interface ISocketsStore {
    pusher: Pusher | undefined;
}

export type TNewMessageResponse = {
    message: {
        dialogType: 0 | 1;
        dialogId: number;
        message: TMessage;
    };
};
