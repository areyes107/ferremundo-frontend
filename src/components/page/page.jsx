import React from "react";
import PageLayoutContextController from "../../context/pageLayoutContextController";
import Navbar from "../navbar/navbar.component";
import { CssBaseline } from "@mui/material";
import MainContent from "./mainContent";

export default function PageLayout({ children }) {
  return (
    <>
      <PageLayoutContextController>
        <Navbar />
        <MainContent>{children}</MainContent>
      </PageLayoutContextController>
    </>
  );
}
