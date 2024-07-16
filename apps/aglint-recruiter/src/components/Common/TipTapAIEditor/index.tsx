import { DatabaseEnums } from '@aglint/shared-types';
import { Stack } from '@mui/system';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import React, { useState } from 'react';

import { SkeletonParagraph } from '@/devlink2/SkeletonParagraph';

import { TipTapAIEditorCtxType, TipTapCtx } from './context';
import {
  getEmailTemplateExtns,
  getEmailTemplateExtnsNoHeading,
} from './customExtns/extns/getEmailTemplateExtns';
import {
  getRegularEditorConfigs,
  getRegularEditorNoHeadingsConfigs,
} from './customExtns/extns/getRegularEditorConfigs';
import MenuBtns from './MenuBtns';

export type TipTapAIEditorParams = {
  placeholder: string;
  initialValue: string | undefined;
  enablAI?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleChange: (s: string) => void;
  showWarnOnEdit?: () => void;
  toolbar?: boolean;
  defaultJson?: any;
  padding?: number | string;
  loader?: {
    isLoading: boolean;
    count: number;
  };
  disabled?: boolean;
  onfocus?: () => void;
  onblur?: () => void;
  singleLine?: boolean;
  height?: string;
  minHeight?: string;
  border?: boolean;
  borderRadius?: React.CSSProperties['borderRadius'];
  editor_type?: 'email' | 'regular';
  template_type?: DatabaseEnums['email_slack_types'];
  isSize?: boolean;
  isAlign?: boolean;
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
  singleLine = false,
  height = 'auto',
  minHeight = 'auto',
  disabled = false,
  border = false,
  borderRadius,
  editor_type = 'regular',
  template_type,
  toolbar = true,
  padding = 2,
  onfocus,
  onblur,
  isSize = true,
  isAlign = true,
}: TipTapAIEditorParams) => {
  const [selectionRange, setSelectionRange] = useState<
    TipTapAIEditorCtxType['selectionRange']
  >({ from: 0, to: 0 });

  const [selectedText, setSelectedText] =
    useState<TipTapAIEditorCtxType['selectedText']>('');

  const editor = useEditor({
    extensions:
      editor_type === 'regular'
        ? isSize
          ? getRegularEditorConfigs({ placeholder })
          : getRegularEditorNoHeadingsConfigs({ placeholder })
        : isSize
          ? getEmailTemplateExtns({ placeholder, template_type })
          : getEmailTemplateExtnsNoHeading({ placeholder, template_type }),
    editable: !disabled,
    content: initialValue || '',
    onBlur() {},
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
      handleKeyDown(view, event) {
        // if singleLine and dropdown open enter key will work otherwise enter not work.if multiline enterkey will work on all situation
        if (!singleLine || event.key !== 'Enter') {
          return false;
        }
        if (document.querySelector('.tippy-box')) {
          return false;
        }
        return true;
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
      <Stack
        sx={{
          ...(border && {
            border: '1px solid',
            borderColor: 'var(--neutral-6)',
            borderRadius: borderRadius || 'var(--radius-2)',
          }),
        }}
      >
        <div>
          {editor && toolbar && (
            <>
              <Stack
                sx={{
                  pointerEvents: disabled ? 'none' : 'auto',
                  opacity: disabled ? 0.5 : 1,
                }}
              >
                <MenuBtns
                  borderRadius={(border && borderRadius) || 'var(--radius-2)'}
                  isSize={isSize}
                  isAlign={isAlign}
                />
              </Stack>
            </>
          )}
          <Stack
            position={'relative'}
            sx={{
              pointerEvents: disabled ? 'none' : 'auto',
              opacity: disabled ? 0.5 : 1,
              backgroundColor: 'var(--white)',
              borderRadius: borderRadius || 'var(--radius-2)',
              minHeight: minHeight,
              height: height,
              overflow: 'auto',
              '& .ProseMirror': {
                width: '100%',

                wordBreak: 'break-word',
                color: disabled ? 'var(--neutral-3)' : 'var(--neutral-12)',
                cursor: disabled ? 'default' : 'auto',
              },
              '& .ProseMirror *::selection': {
                background: 'var(--accent-4)',
              },
              '.tiptap p.is-editor-empty:first-child::before ': {
                color: 'var(--neutral-9)',
                content: 'attr(data-placeholder)',
                float: 'left',
                height: 0,
                'pointer-events': 'none',
              },
              '& .ProseMirror-focused': {
                outline: 0,
              },
              '& .ProseMirror .temp-variable': {
                backgroundColor: '#f7ebfc',
                paddingLeft: '3px',
                paddingRight: '3px',
                paddingBottom: '3px',
                color: '#B552E2',
                borderRadius: '2px',
              },
            }}
          >
            <Stack p={singleLine ? '9px 6px 6px 12px' : padding}>
              {loader.isLoading ? (
                <Stack gap={1}>
                  {[...Array(loader.count)].map((e, i) => (
                    <SkeletonParagraph key={i} />
                  ))}
                </Stack>
              ) : (
                <EditorContent
                  onFocus={onfocus}
                  onBlur={onblur}
                  editor={editor}
                  className={singleLine && 'single-line-editor'}
                  style={
                    singleLine
                      ? {
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }
                      : {}
                  }
                />
              )}
            </Stack>
          </Stack>
        </div>
      </Stack>
    </TipTapCtx.Provider>
  );
};

export default TipTapAIEditor;
