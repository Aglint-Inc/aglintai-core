import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/tailwind.css";
import { DrawerComponent } from "./DrawerComponent";

const appContainer = document.getElementById("aglilntai-test-suite-app");

if (appContainer) {
  const root = ReactDOM.createRoot(appContainer);
  root.render(<DrawerComponent />);
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
