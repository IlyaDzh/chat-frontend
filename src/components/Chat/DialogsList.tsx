import React from "react";
import { observer } from "mobx-react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { Dialog } from "./Dialog";
import { DialogsEmpty } from "./DialogsEmpty";
import { Loader } from "../Loader";
import { useStores } from "../../stores/useStore";
import { TDialog, TDialogsType } from "../../stores/interfaces/IDialogStore";

const useStyles = makeStyles(() => ({
    dialogsList: {
        height: "calc(100vh - 197px)",
        overflowY: "auto",
        paddingRight: "7px"
    }
}));

interface IDialogsList {
    type: TDialogsType;
}

export const DialogsList: React.FC<IDialogsList> = observer(({ type }) => {
    const classes = useStyles();
    const query = new URLSearchParams(useLocation().search);
    const { dialogStore } = useStores();
    const { dialogs, pending, searchText, searchDialogs } = dialogStore;

    const renderList = (list: TDialog[]) => {
        return list?.map(dialog => (
            <Dialog
                key={dialog.id}
                dialog={dialog}
                type={type}
                isSelected={query.get("p") === dialog.id.toString()}
            />
        ));
    };

    return (
        <div className={classes.dialogsList}>
            {pending ? (
                <Loader size={30} isCenter />
            ) : searchText ? (
                searchDialogs.length > 0 ? (
                    renderList(searchDialogs)
                ) : (
                    <DialogsEmpty text="Ничего не найдено" disableImage />
                )
            ) : dialogs[type].length > 0 ? (
                renderList(dialogs[type])
            ) : (
                <DialogsEmpty text="Чатов нет" />
            )}
        </div>
    );
});
