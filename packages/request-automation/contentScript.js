(function() {
  console.log("Content script loaded"); // Debugging log

  const createAppContainer = () => {
    let appContainer = document.getElementById('aglilntai-test-suite-app');

    if (!appContainer) {
      appContainer = document.createElement('div');
      appContainer.id = 'aglilntai-test-suite-app';
      document.body.appendChild(appContainer);
      console.log("App container created.");
    }
  };

  const loadReactApp = () => {
    createAppContainer(); // Ensure the app container exists

    if (!document.getElementById('aglilntai-test-suite-app-bundle')) {
      const scriptElement = document.createElement('script');
      scriptElement.src = chrome.runtime.getURL('dist/bundle.js'); // Ensure this path is correct
      scriptElement.id = 'aglilntai-test-suite-app-bundle';
      document.body.appendChild(scriptElement);

      scriptElement.onload = () => {
        console.log('React app bundle loaded and initialized');
      };
    } else {
      console.log('React app bundle is already loaded');
    }
  };

  // Start the process of creating the app container and loading the React app
  loadReactApp();

})();
