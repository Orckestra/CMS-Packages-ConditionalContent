import createThemes from "orc-shared/src/components/MaterialUI/muiThemes";

const applicationTheme = {
        primary: {
                lighter: "#E0E6EB",
                light: "#22b980",
                main: "#22b980",
                dark: "#1ea371",
                contrastText: "#fff",
        }
};

const themeDefinition = {
        palette: {
                primary: {
                        lighter: applicationTheme.primary.lighter,
                        light: applicationTheme.primary.light,
                        main: applicationTheme.primary.main,
                        dark: applicationTheme.primary.dark,
                        contrastText: applicationTheme.primary.contrastText,
                },
                secondary: {
                        light: "#CCC",
                        main: "#22b980",
                        dark: "#333",
                        contrastText: "#fff",
                },
                focus: "#22b980",
        }
};

const { muiTheme } = createThemes(applicationTheme, themeDefinition);
muiTheme.overrides.MuiInputBase.root.fontSize = 14;
muiTheme.overrides.MuiButtonBase.root["& + &"] = {};// clear sapve betwean buttons

export default muiTheme;
