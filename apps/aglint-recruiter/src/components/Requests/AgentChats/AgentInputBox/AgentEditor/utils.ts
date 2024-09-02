import type React from 'react';



/* eslint-disable no-unused-vars */

export type MentionInputProps = {
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue: string,
    newPlainTextValue: string,
    mentions: MentionType[],
  ) => void;
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  singleLine?: boolean;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    clickedSuggestion: boolean,
  ) => void;
  onFocus?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  allowSpaceInQuery?: boolean;
  suggestionsPortalHost?: HTMLElement;
  inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
  allowSuggestionsAboveCursor?: boolean;
  forceSuggestionsAboveCursor?: boolean;
  a11ySuggestionsListLabel?: string;
  customSuggestionsContainer?: (children: React.ReactNode) => React.ReactNode;
  className?: string;
  placeholder?: string;
  style?: {
    control?: React.CSSProperties;
    highlighter?: React.CSSProperties;
    input?: React.CSSProperties;
    suggestions?: React.CSSProperties;
  };
};

export type MentionType = {
  id: string;
  display: string;
};

export interface MentionComponentProps {
  trigger: string | RegExp;
  data:
    | MentionType[]
    | ((search: string, callback: (data: MentionType[]) => void) => void);
  renderSuggestion?: (
    entry: MentionType,
    search: string,
    highlightedDisplay: React.ReactNode,
    index: number,
    focused: boolean,
  ) => React.ReactNode;
  markup?: string;
  displayTransform?: (id: string, display: string) => string;
  regex?: RegExp;
  onAdd?: (
    id: string,
    display: string,
    startPos: number,
    endPos: number,
  ) => void;
  appendSpaceOnAdd?: boolean;
  style?: React.CSSProperties;
}
