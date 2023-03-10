import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import React from "react";
import { ThemeProvider } from "styled-components";
import { CssBaseline } from "@mui/material";
import theme from "./styles/theme";
import { Home } from "./components/home/home.component";
import Products from "./components/products/products.component";
import ProductsList from "./components/products-list/products-list.component";
import PageLayout from "./components/page/page";
import ProductDetails from "./components/product-details/product-details.component";
import Checkout from "./components/checkout/checkout.component";
import FinalCheckout from "./components/final-checkout/final-checkout.component";

function App() {
  const router = createBrowserRouter([
    {
      path: "",

      element: (
        <PageLayout>
          <Home />
        </PageLayout>
      ),
      errorElement: <ErrorBoundary />,
    },
    {
      path: "home",
      element: (
        <PageLayout>
          <Home />
        </PageLayout>
      ),
      errorElement: <ErrorBoundary />,
    },
    {
      path: "login",
      element: (
        <PageLayout>
          <div>Login</div>
        </PageLayout>
      ),
      errorElement: <ErrorBoundary />,
    },
    {
      path: "products",
      element: (
        <PageLayout>
          <Products />
        </PageLayout>
      ),
      errorElement: <ErrorBoundary />,
    },
    {
      path: "productos",
      element: (
        <PageLayout>
          <ProductsList />
        </PageLayout>
      ),
      errorElement: <ErrorBoundary />,
    },

    {
      path: "producto",
      element: (
        <PageLayout>
          <ProductDetails />
        </PageLayout>
      ),
      errorElement: <ErrorBoundary />,
    },
    {
      path: "checkout",
      element: (
        <PageLayout>
          <Checkout />
        </PageLayout>
      ),
      errorElement: <ErrorBoundary />,
    },
    {
      path: "finalCheckout",
      element: (
        <PageLayout>
          <FinalCheckout />
        </PageLayout>
      ),
      errorElement: <ErrorBoundary />,
    },
    {
      path: "*",
      element: (
        <PageLayout>
          <div style={{ padding: "10vh" }}>
            <h1>NOT FOUND</h1>
          </div>
        </PageLayout>
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
