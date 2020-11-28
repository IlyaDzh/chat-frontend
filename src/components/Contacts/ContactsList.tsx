import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core";

import { Contact } from "./Contact";
import { Loader } from "../Loader";
import { Empty } from "../Empty";
import { Backdrop } from "../Backdrop";
import { useStores } from "../../stores/useStore";
import { TUser } from "../../stores/interfaces/IUserStore";

const useStyles = makeStyles(() => ({
    contactsList: {
        overflowY: "auto",
        height: "calc(100% - 112px)",
        padding: "0 8px 0 2px"
    },
    contactsEmpty: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    }
}));

export const ContactsList: React.FC = observer(() => {
    const classes = useStyles();
    const { contactsStore, userInfoModalStore, createDirectStore } = useStores();
    const { users, searchUsers, searchText, pending, fetchUsers } = contactsStore;
    const { setUserInfoModalIsOpen } = userInfoModalStore;
    const { pending: createPending, createDirectDialog } = createDirectStore;

    const history = useHistory();

    useEffect(() => {
        if (users.length === 0) {
            fetchUsers();
        }
    }, [users, fetchUsers]);

    const renderList = (list: TUser[]) => {
        return list?.map(user => (
            <Contact
                key={user.id}
                contact={user}
                handleAvatarClick={() => setUserInfoModalIsOpen(true, user)}
                handleCreateDirectClick={() =>
                    createDirectDialog(user.id)
                        .then(data => {
                            history.push(`/chat/direct?p=${data.chat.id}`);
                        })
                        .catch(data => {
                            history.push(`/chat/direct?p=${data.chatId}`);
                        })
                }
            />
        ));
    };

    if (createPending) {
        return <Backdrop loaderSize={55} isTransparent />;
    }

    return (
        <div className={classes.contactsList}>
            {pending ? (
                <Loader size={50} isCenter />
            ) : searchText ? (
                searchUsers.length > 0 ? (
                    renderList(searchUsers)
                ) : (
                    <div className={classes.contactsEmpty}>
                        <Empty text="Пользователей не найдено" />
                    </div>
                )
            ) : users.length > 0 ? (
                renderList(users)
            ) : (
                <div className={classes.contactsEmpty}>
                    <Empty text="Пользователи отсутствуют" />
                </div>
            )}
        </div>
    );
});
