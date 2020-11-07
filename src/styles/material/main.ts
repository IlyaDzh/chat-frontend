import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                textTransform: "unset"
            },
            containedPrimary: {},
            containedSecondary: {},
            outlinedPrimary: {},
            outlinedSecondary: {},
            outlined: {},
            outlinedSizeSmall: {},
            sizeLarge: {},
            sizeSmall: {},
            textPrimary: {}
        }
    },
    palette: {
        primary: {
            main: "#f45454"
        },
        secondary: {
            main: "#f8f8f8"
        },
        text: {
            primary: "#00c0cc",
            secondary: "#b5c3c6"
        },
        background: {
            dark: "#2a2f4d",
            light: "#f8f8f8"
        }
    },
    typography: {
        allVariants: {
            color: "#1b1b1b"
        },
        h1: {
            fontSize: "30px",
            fontWeight: "bold"
        },
        h2: {
            fontSize: "26px"
        },
        h3: {
            fontSize: "22px"
        },
        h4: {
            fontSize: "20px"
        },
        h5: {
            fontSize: "18px"
        },
        h6: {
            fontSize: "14px",
            fontWeight: "bold"
        },
        fontFamily: "Open Sans, sans-serif"
    }
});
