import React from "react";
import { TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    dialogsSearch: {
        marginBottom: "20px"
    },
    dialogsSearchInput: {}
}));

export const DialogsSearch: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.dialogsSearch}>
            <TextField
                className={classes.dialogsSearchInput}
                variant="filled"
                placeholder="Поиск"
                fullWidth
            />
        </div>
    );
};
