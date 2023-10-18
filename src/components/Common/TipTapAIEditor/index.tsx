import { Stack } from '@mui/system';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useState } from 'react';

import styles from './TipTapAIEditor.module.scss';

import { palette } from '@/src/context/Theme/Theme';

import { TipTapAIEditorCtxType, TipTapCtx } from './context';
import MenuBtns, { GenerateDescription } from './MenuBtns';
import Loader from '../Loader';

export type TipTapAIEditorParams = {
  placeholder: string;
  initialValue: string | undefined;
  enablAI?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleChange: (s: string) => void;
  showWarnOnEdit?: () => void;
};

const TipTapAIEditor = ({
  placeholder,
  handleChange,
  initialValue,
  enablAI = false,
}: TipTapAIEditorParams) => {
  const [selectionRange, setSelectionRange] = useState<
    TipTapAIEditorCtxType['selectionRange']
  >({ from: 0, to: 0 });

  const [selectedText, setSelectedText] =
    useState<TipTapAIEditorCtxType['selectedText']>('');

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder || '',
      }),
      Link.configure({
        openOnClick: false,
        validate: (href) => /^https?:\/\//.test(href),
      }),
      TextAlign.configure({
        alignments: ['left', 'right', 'center'],
        types: ['heading', 'paragraph'],
      }),
      Underline,
      TextStyle.configure({}),
    ],
    editable: true,
    content: initialValue || '',
    onBlur() {
      // editor.commands.unsetHighlight();
    },
    onFocus() {},
    onSelectionUpdate({ editor }) {
      const { view, state } = editor;
      const { from, to } = view.state.selection;
      const text = state.doc.textBetween(from, to, '');
      setSelectionRange({
        from: from,
        to: to,
      });
      setSelectedText(text);
      // editor.commands.setHighlight();
    },
    onUpdate({ editor }) {
      if (editor.isEmpty) {
        handleChange('');
      } else {
        handleChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        spellcheck: 'false',
      },
    },
  }) as Editor;

  return (
    <TipTapCtx.Provider
      value={{
        selectedText,
        selectionRange,
        editor,
        enablAI,
      }}
    >
      <div className={styles.tipTapEditorContainer}>
        {editor && (
          <>
            <MenuBtns />
          </>
        )}
        <Stack
          position={'relative'}
          sx={{
            '& .ProseMirror': {
              minHeight: '250px',
              width: '100%',
              wordBreak: 'break-word',
            },
            '& .ProseMirror *::selection': {
              background: '#b100af30',
            },
            '.tiptap p.is-editor-empty:first-child::before ': {
              color: '#adb5bd',
              content: 'attr(data-placeholder)',
              float: 'left',
              height: 0,
              'pointer-events': 'none',
            },
            '& .ProseMirror-focused': {
              outline: 0,
            },
          }}
        >
          {isAiGenerating && (
            <Stack
              zIndex={1}
              position={'absolute'}
              width={'100%'}
              height={'100%'}
              bgcolor={palette.grey[100]}
              direction={'row'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Loader />
            </Stack>
          )}

          <Stack p={2}>
            <EditorContent editor={editor} />
          </Stack>
        </Stack>

        {enablAI && (
          <GenerateDescription
            isAiGenerating={isAiGenerating}
            setIsAiGenerating={setIsAiGenerating}
          />
        )}
      </div>
    </TipTapCtx.Provider>
  );
};

export default TipTapAIEditor;
