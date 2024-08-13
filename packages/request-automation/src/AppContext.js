import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [applicationIds, setApplicationIds] = useState([]);
  const [requestIds, setRequestIds] = useState([]);

  return (
    <AppContext.Provider value={{ applicationIds, setApplicationIds, requestIds, setRequestIds }}>
      {children}
    </AppContext.Provider>
  );
};
