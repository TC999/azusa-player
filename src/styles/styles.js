import { makeStyles } from "@mui/styles";

export const ScrollBar = makeStyles((theme) => ({
    root: {
        "&::-webkit-scrollbar": {
            width: "14px",
            height: "18px",
            background: "transparent"
        },

        "&::-webkit-scrollbar-thumb": {
            height: "29px",
            border: "5px solid rgba(0, 0, 0, 0)",
            backgroundClip: "padding-box",
            borderRadius: "7px",
            "-webkit-border-radius": "7px",
            backgroundColor: "var(--theme-primary)"
        },
    },
}));

export const btnActiveStyle = makeStyles((theme) => ({
    button: {
        "&.active": {
            background: '#e6e6e694',
        },
    },
}));

export const ThemeAwareBox = makeStyles((theme) => ({
    root: {
        backgroundColor: 'var(--theme-background)',
        color: 'var(--theme-text)',
        transition: 'background-color 0.3s, color 0.3s',
    },
}));

export const ThemeAwareCard = makeStyles((theme) => ({
    root: {
        backgroundColor: 'var(--theme-card)',
        color: 'var(--theme-text)',
        transition: 'background-color 0.3s, color 0.3s',
    },
}));