import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00A891",
    },
    text: {
      primary: "#0F2F49",
      secondary: "#55615F",
    },
    info: {
      main: "#1ED4D8",
      light: "#EBFAF9",
    },
    warning: {
      main: "#FFA10F",
      light: "#FFF7EC",
    },
    background: {
      sideBar: "#E5F6F4",
      sideContent: "#F6F8FC",
    },
  },
  typography: {
    fontFamily: '"Noto Sans",sans-serif',
  },
});

export default theme;
