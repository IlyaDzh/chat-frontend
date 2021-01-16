import { TUser } from "./IUserStore";

export interface IMessageStore {
    messageText: string;
    setMessageText: (text: string) => void;
    sendMessage: () => void;
}

export type TMessage = {
    id: number;
    user: TUser;
    text?: string;
    media?: string;
    mediaTemp?: File;
    mediaExtention?: string;
    mediaName?: string;
    mediaSize?: number;
    updated_at: string;
    pending?: boolean;
};

// export type TMessage = {
//     id: number;
//     user: TUser;
//     text?: string;
//     media?: {
//         mediaTemp?: File;
//         mediaLink?: string;
//         mediaType: string;
//         mediaName?: string;
//         mediaSize?: string;
//     };
//     updated_at: string;
//     pending?: boolean;
// };
