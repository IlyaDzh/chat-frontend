import React from "react";
import { observer } from "mobx-react";
import {
    Typography,
    TextField,
    InputAdornment,
    makeStyles,
    Theme
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

import { useStores } from "../../stores/useStore";

const useStyles = makeStyles((theme: Theme) => ({
    contactsHeader: {
        marginBottom: "20px"
    },
    contactsTitle: {
        marginBottom: "18px"
    },
    contactsSearchInput: {
        fontSize: "15px",
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

export const ContactsHeader: React.FC = observer(() => {
    const classes = useStyles();
    const { contactsStore } = useStores();
    const { searchText, setSearchText } = contactsStore;

    return (
        <div className={classes.contactsHeader}>
            <Typography className={classes.contactsTitle} variant="h1">
                Контакты
            </Typography>
            <TextField
                variant="filled"
                placeholder="Поиск контактов"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                InputProps={{
                    classes: { root: classes.contactsSearchInput },
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
