import React from "react";

import {
    CreateGroupModal,
    UserInfoModal,
    GroupInfoModal,
    AddUsersToGroupModal
} from "./Modals";

export const InitModals: React.FC = () => (
    <>
        <CreateGroupModal />
        <UserInfoModal />
        <GroupInfoModal />
        <AddUsersToGroupModal />
    </>
);
