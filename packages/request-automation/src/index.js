import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./styles/tailwind.css";
import { AppProvider } from "./AppContext";
import DrawerComponent from "./DrawerComponent";

const appContainer = document.getElementById("aglilntai-test-suite-app");

if (appContainer) {
  const root = ReactDOM.createRoot(appContainer);
  root.render(
    <AppProvider>
      <ThemeProvider theme={theme}>
        <DrawerComponent />
      </ThemeProvider>
    </AppProvider>
  );
} else {
  console.error("App container not found. Cannot initialize React app.");
}
