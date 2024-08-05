import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type AgentIEditorContextType = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
};

const AgentEditorContext = createContext<AgentIEditorContextType>(undefined);

export const AgentIEditorProvider = ({ children }) => {
  const [text, setText] = useState('');
  return (
    <AgentEditorContext.Provider value={{ text, setText }}>
      {children}
    </AgentEditorContext.Provider>
  );
};

export const useAgentIEditor = () => {
  const value = useContext(AgentEditorContext);
  if (!value) throw new Error('Request Provider not found');
  return value;
};
