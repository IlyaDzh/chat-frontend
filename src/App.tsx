import React from "react";

import { AppBar, Chats, Messages } from "./components";

export const App: React.FC = () => {
    return (
        <div className="App">
            <AppBar />
            <Chats />
            <Messages />
        </div>
    );
};
