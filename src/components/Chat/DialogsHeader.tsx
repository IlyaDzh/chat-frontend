import React from "react";
import { Typography, Button, Tooltip, makeStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";

import { useStores } from "../../stores/useStore";

const useStyles = makeStyles(() => ({
    dialogsHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "16px"
    },
    addDialogBtn: {
        borderRadius: "50%",
        height: "42px",
        minWidth: "42px",
        padding: "0"
    }
}));

export const DialogsHeader: React.FC = () => {
    const classes = useStyles();
    const { createGroupStore } = useStores();
    const { setCreateModalIsOpen } = createGroupStore;

    return (
        <div className={classes.dialogsHeader}>
            <Typography variant="h1">Чаты</Typography>
            <Tooltip title="Создать группу" placement="left">
                <Button
                    className={classes.addDialogBtn}
                    variant="contained"
                    color="primary"
                    onClick={() => setCreateModalIsOpen(true)}
                    disableElevation
                >
                    <Add />
                </Button>
            </Tooltip>
        </div>
    );
};
