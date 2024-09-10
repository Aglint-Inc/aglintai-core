import { createContext, useContext, useState } from 'react';

const DragCtx = createContext({
  iscategDragging: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setIsCategDragging: (_p) => {},
});

export const useDragCtx = () => {
  return useContext(DragCtx);
};

const DragCtxProvider = ({ children }) => {
  const [iscategDragging, setIsCategDragging] = useState(false);

  return (
    <DragCtx.Provider
      value={{
        iscategDragging: iscategDragging,
        setIsCategDragging: setIsCategDragging,
      }}
    >
      {children}
    </DragCtx.Provider>
  );
};

export default DragCtxProvider;
