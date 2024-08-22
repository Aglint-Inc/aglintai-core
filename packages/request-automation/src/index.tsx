import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.scss";
import { AppProvider } from "./context/AppContext";
import { Extension } from "./Extension";

const appContainer = document.getElementById("aglilntai-test-suite-app");

if (appContainer) {
  const root = ReactDOM.createRoot(appContainer);
  root.render(
    <AppProvider>
      <Extension />
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
