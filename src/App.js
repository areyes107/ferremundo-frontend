import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { CssBaseline } from "@mui/material";
import theme from "./styles/theme";
import { Home } from "./components/home/home.component";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Home />,
      errorElement: <ErrorBoundary />,
    },
    { path: "home", element: <div>Home</div>, errorElement: <ErrorBoundary /> },
    {
      path: "login",
      element: <div>Login</div>,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "*",
      element: (
        <Fragment>
          <div style={{ padding: "10vh" }}>
            <h1>NOT FOUND</h1>
          </div>
        </Fragment>
      ),
    },
  ]);

  function ErrorBoundary() {
    let error = useRouteError();
    console.log(error);

    return <div> Error</div>;
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
