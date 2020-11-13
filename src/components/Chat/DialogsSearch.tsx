import React from "react";
import { TextField, InputAdornment, makeStyles, Theme } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
    dialogsSearch: {
        marginBottom: "20px"
    },
    dialogsSearchInput: {
        fontSize: "14px",
        fontWeight: 500,
        background: "#fff",
        boxShadow: "0px 1px 6px 2px rgba(0, 0, 0, 0.08)",
        "&:hover, &.Mui-focused": {
            background: "#fff"
        }
    },
    searchSvg: {
        color: theme.palette.text.secondary
    }
}));

export const DialogsSearch: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.dialogsSearch}>
            <TextField
                variant="filled"
                placeholder="Поиск"
                InputProps={{
                    classes: { root: classes.dialogsSearchInput },
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search classes={{ root: classes.searchSvg }} />
                        </InputAdornment>
                    )
                }}
                fullWidth
            />
        </div>
    );
};
