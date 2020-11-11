import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import {
  makeStyles,
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { SnackbarProvider, useSnackbar } from "notistack";
import { withSnackbar } from "notistack";
import { teal } from "@material-ui/core/colors";

import Dashboard from "../Pages/Dashboard";
import Router from "../Pages/Router";
import Login from "../components/Login";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#009688",
      light: "#33ab9f",
      dark: "#00695f",
    },
    secondary: {
      dark: "#27632a",
      main: "#388e3c",
      light: "#5fa463",
    },
    error: {
      dark: "#d32f2f",
      main: "#f44336",
      light: "#e57373",
    },
    background: {
      default: "#FFF", // teal[50]
    },
  },
  shape: {
    borderRadius: 3,
  },
  spacing: 8,
  overrides: {
    MuiButton: {
      root: {
        // borderRadius: 8,
        // padding: '13%',
        // border: '5px solid rebeccapurple'
      },
    },
    MuiIconButton: {
      root: {
        flex: 1,
        borderRadius: 0,
        backgroundColor: "#re4c474c",
        "&:hover": {
          backgroundColor: "rebeccapurple",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <Dashboard />
        <CssBaseline />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
