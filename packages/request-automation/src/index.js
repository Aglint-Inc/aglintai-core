import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './AppContext'; // Import the AppProvider
import DrawerComponent from './DrawerComponent';

const appContainer = document.getElementById('aglilntai-test-suite-app');

if (appContainer) {
  const root = ReactDOM.createRoot(appContainer);
  root.render(
    <AppProvider>
      <DrawerComponent />
    </AppProvider>
  );
} else {
  console.error('App container not found. Cannot initialize React app.');
}
