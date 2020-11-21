import React from "react";
import { observer } from "mobx-react";
import { TextField, InputAdornment, makeStyles, Theme } from "@material-ui/core";
import { Search } from "@material-ui/icons";

import { useStores } from "../../stores/useStore";

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

export const DialogsSearch: React.FC = observer(() => {
    const classes = useStyles();
    const { dialogStore } = useStores();
    const { searchText, setSearchText } = dialogStore;

    return (
        <div className={classes.dialogsSearch}>
            <TextField
                variant="filled"
                placeholder="Поиск"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
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
});
