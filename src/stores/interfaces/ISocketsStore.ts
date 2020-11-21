import Pusher, { Channel } from "pusher-js";

export interface ISocketsStore {
    pusher: Pusher | undefined;
    chatChannel: Channel;
}
