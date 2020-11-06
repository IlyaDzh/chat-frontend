import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
    overrides: {
        MuiButton: {
            root: {},
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
            main: "#00c0cc"
        },
        secondary: {
            main: "#dff6f9"
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
            fontSize: "50px",
            fontWeight: "bold"
        },
        h2: {
            fontSize: "42px",
            fontWeight: 400
        },
        h3: {
            fontSize: "32px"
        },
        h4: {
            fontSize: "24px"
        },
        h5: {
            fontSize: "20px"
        },
        h6: {
            fontSize: "18px",
            fontWeight: 600
        },
        caption: {
            fontSize: "13px"
        },
        fontFamily: "Open Sans, sans-serif"
    }
});
