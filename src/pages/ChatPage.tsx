import React from "react";

import { Dialogs, Messages, CreateGroupModal } from "../components";

export const ChatPage: React.FC = () => {
    return (
        <div className="content">
            <Dialogs />
            <Messages />

            <CreateGroupModal />
        </div>
    );
};
