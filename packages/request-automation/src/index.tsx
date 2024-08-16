import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.scss";
import { DrawerComponent } from "./DrawerComponent";
import { AppProvider } from "./AppContext";

const appContainer = document.getElementById("aglilntai-test-suite-app");

if (appContainer) {
  const root = ReactDOM.createRoot(appContainer);
  root.render(
    <AppProvider>
      <DrawerComponent />
    </AppProvider>
  );
} else {
  console.error("App container not found. Cannot initialize React app.");
}

{
  /* <AppProvider>
  <ThemeProvider theme={theme}>
    <DrawerComponent />
     </ThemeProvider>
  </AppProvider>  */
}
