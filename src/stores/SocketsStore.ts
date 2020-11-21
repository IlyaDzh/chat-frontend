import Pusher, { Channel } from "pusher-js";

import { ISocketsStore } from "./interfaces/ISocketsStore";

export class SocketsStore implements ISocketsStore {
    pusher: Pusher | undefined;

    chatChannel: Channel;

    constructor() {
        this.pusher = new Pusher("657da11b3b498151a232", {
            cluster: "eu",
            authEndpoint: "http://6abe4b75674a.ngrok.io/socket/auth"
        });

        this.chatChannel = this.pusher.subscribe("chat");

        this.chatChannel.bind("NewMessage", (data: any) => {
            console.log("NewMessage", data);
        });
    }
}
