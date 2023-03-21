import React from "react";
import { PageLayoutContext } from "./pageLayoutContext";

export default function PageLayoutContextController({ children }) {
  return (
    <PageLayoutContext.Provider value="">{children}</PageLayoutContext.Provider>
  );
}
