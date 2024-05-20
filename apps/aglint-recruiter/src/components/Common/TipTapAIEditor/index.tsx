import { Stack } from '@mui/system';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
// import FontFamily from '@tiptap/extension-font-family'
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { EditorContent, Extension, useEditor } from '@tiptap/react';
import { Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useState } from 'react';

import { SkeletonParagraph } from '@/devlink2/SkeletonParagraph';
import { palette } from '@/src/context/Theme/Theme';

import { TipTapAIEditorCtxType, TipTapCtx } from './context';
import MenuBtns from './MenuBtns';
import styles from './TipTapAIEditor.module.scss';

export type TipTapAIEditorParams = {
  placeholder: string;
  initialValue: string | undefined;
  enablAI?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleChange: (s: string) => void;
  showWarnOnEdit?: () => void;
  defaultJson?: any;
  loader?: {
    isLoading: boolean;
    count: number;
  };
  disabled?: boolean;
  border?: boolean;
  borderRadius?: React.CSSProperties['borderRadius'];
};

const TipTapAIEditor = ({
  placeholder,
  handleChange,
  initialValue,
  enablAI = false,
  loader = {
    isLoading: false,
    count: 1,
  },
  defaultJson,
  disabled = false,
  border = false,
  borderRadius,
}: TipTapAIEditorParams) => {
  const [selectionRange, setSelectionRange] = useState<
    TipTapAIEditorCtxType['selectionRange']
  >({ from: 0, to: 0 });

  const [selectedText, setSelectedText] =
    useState<TipTapAIEditorCtxType['selectedText']>('');

  // const [isAiGenerating, setIsAiGenerating] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      EventHandler,
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
    editable: !disabled,
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

  useEffect(() => {
    if (editor && defaultJson) editor.commands.setContent(defaultJson, true);
  }, [defaultJson, editor]);
  return (
    <TipTapCtx.Provider
      value={{
        selectedText,
        selectionRange,
        editor,
        enablAI,
      }}
    >
      <Stack
        sx={{
          ...(border && {
            mt: '8px',
            border: '1px solid',
            borderColor: palette.grey[300],
            borderRadius: borderRadius || '4px',
          }),
        }}
      >
        <div className={styles.tipTapEditorContainer}>
          {editor && (
            <>
              <MenuBtns borderRadius={(border && borderRadius) || '4px'} />
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
                background: '#EDF8F4',
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
            {/* {isAiGenerating && (
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
          )} */}

            <Stack p={2}>
              {loader.isLoading ? (
                <Stack gap={1}>
                  {[...Array(loader.count)].map((e, i) => (
                    <SkeletonParagraph key={i} />
                  ))}
                </Stack>
              ) : (
                <EditorContent editor={editor} />
              )}
            </Stack>
          </Stack>

          {/* {enablAI && (
          <GenerateDescription
            isAiGenerating={isAiGenerating}
            setIsAiGenerating={setIsAiGenerating}
          />
        )} */}
        </div>
      </Stack>
    </TipTapCtx.Provider>
  );
};

export default TipTapAIEditor;

export const EventHandler = Extension.create({
  name: 'eventHandler',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('tiptapPaste'),
        props: {
          handlePaste(view, event) {
            const pastedHTML = event.clipboardData.getData('text/html');

            if (pastedHTML.includes('•')) {
              const { state, dispatch } = view;
              const json = convertTextToProseMirrorJSON(
                event.clipboardData.getData('text/plain'),
              );
              const content = state.schema.nodeFromJSON(json);
              // Create a new state with modifications
              const newState = state.tr.insert(
                state.doc.content.size - 2,
                content,
              );

              // Dispatch the transaction to update the state
              event.preventDefault();
              dispatch(newState);
              return true;
            }
          },
        },
      }),
    ];
  },
});

function convertTextToProseMirrorJSON(text) {
  const lines = text.split('\n');
  let isInBulletList = false;
  let json = { type: 'doc', content: [] };
  let currentListItem = null;

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('•') || trimmedLine.startsWith('●')) {
      // Start or continue a bullet list
      if (!isInBulletList) {
        isInBulletList = true;
        json.content.push({ type: 'bulletList', content: [] });
      }

      // Create a new list item
      currentListItem = { type: 'listItem', content: [] };
      json.content[json.content.length - 1].content.push(currentListItem);

      // Add the content of the list item if not empty
      const listItemContent = trimmedLine.slice(1).trim();
      if (listItemContent.length > 0) {
        currentListItem.content.push({
          type: 'paragraph',
          content: [{ type: 'text', text: listItemContent }],
        });
      }
    } else {
      // Not a bullet point, treat as a regular paragraph
      isInBulletList = false;

      // Add the content of the paragraph if not empty
      if (trimmedLine.length > 0) {
        json.content.push({
          type: 'paragraph',
          content: [{ type: 'text', text: trimmedLine }],
        });
      }
    }
  });

  return json;
}
