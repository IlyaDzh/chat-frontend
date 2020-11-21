import React from "react";
import { observer } from "mobx-react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import { Dialog } from "./Dialog";
import { DialogsEmpty } from "./DialogsEmpty";
import { Loader } from "../Loader";
import { useStores } from "../../stores/useStore";
import { TDialogsType } from "../../stores/interfaces/IDialogStore";

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
    const { dialogs, pending } = dialogStore;

    return (
        <div className={classes.dialogsList}>
            {pending ? (
                <Loader size={30} isCenter />
            ) : dialogs[type]?.length ? (
                dialogs[type]?.map(dialog => (
                    <Dialog
                        key={dialog.id}
                        dialog={dialog}
                        type={type}
                        isSelected={query.get("p") === dialog.id.toString()}
                    />
                ))
            ) : (
                <DialogsEmpty />
            )}
        </div>
    );
});
