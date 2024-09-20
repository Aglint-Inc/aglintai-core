import { type Editor } from '@tiptap/react';
import { createContext, useContext } from 'react';

// import { TipTapAIAutoGenActions } from '@/data/prompts/tiptap/autoGenSection';

export type TipTapAIEditorCtxType = {
  selectionRange: {
    from: number;
    to: number;
  };
  selectedText: string;
  editor: Editor | null;
  enablAI: boolean;
  // aiAutoGenActions?: TipTapAIAutoGenActions;
};
const initialValue: TipTapAIEditorCtxType = {
  selectedText: '',
  selectionRange: {
    from: 0,
    to: 0,
  },
  editor: null,
  enablAI: false,
};
export const TipTapCtx = createContext<TipTapAIEditorCtxType>(initialValue);
export const useTipTap = () => {
  return useContext(TipTapCtx);
};
