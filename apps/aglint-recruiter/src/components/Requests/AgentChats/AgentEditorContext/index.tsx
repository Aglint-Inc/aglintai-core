import {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from 'react';

type AgentIEditorContextType = {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  isResponding: boolean;
  setIsResponding: Dispatch<SetStateAction<boolean>>;
  inputRef: RefObject<HTMLInputElement>;
};

const AgentEditorContext = createContext<AgentIEditorContextType>(undefined);

export const AgentIEditorProvider = ({ children }) => {
  const [text, setText] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const inputRef = useRef(null);
  return (
    <AgentEditorContext.Provider
      value={{ text, setText, inputRef, isResponding, setIsResponding }}
    >
      {children}
    </AgentEditorContext.Provider>
  );
};

export const useAgentIEditor = () => {
  const value = useContext(AgentEditorContext);
  if (!value) throw new Error('Request Provider not found');
  return value;
};
