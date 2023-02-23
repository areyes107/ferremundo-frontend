import { useContext } from "react";
import { PageLayoutContext } from "./pageLayoutContext";

export default function usePageLayoutContext() {
  const context = useContext(PageLayoutContext);

  if (!context) {
    throw new Error(
      "usePageLayoutContext cannot be used outside a Dashboard Layout Context"
    );
  }

  return context;
}
