import { type DatabaseEnums } from '@aglint/shared-types';
import { Skeleton } from '@components/ui/skeleton';
import { cn } from '@lib/utils';
import { type Editor, EditorContent, useEditor } from '@tiptap/react';
import React, { useState } from 'react';

import { type TipTapAIEditorCtxType, TipTapCtx } from './context';
import {
  getEmailTemplateExtns,
  getEmailTemplateExtnsNoHeading,
} from './customExtns/extns/getEmailTemplateExtns';
import {
  getRegularEditorConfigs,
  getRegularEditorNoHeadingsConfigs,
} from './customExtns/extns/getRegularEditorConfigs';
import MenuBtns from './MenuBtns';

type TipTapAIEditorParams = {
  placeholder?: string;
  initialValue?: string | undefined;
  enablAI?: boolean;
  handleChange?: (_s: string) => void;
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
          ? getEmailTemplateExtns({
              placeholder,
              template_type,
            })
          : getEmailTemplateExtnsNoHeading({
              placeholder,
              template_type,
            }),
    editable: !disabled,
    content: initialValue || '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onBlur() {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
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
      if (!editor || !handleChange) return;
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
      handleKeyDown(_view, event) {
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
      <div className='overflow-hidden rounded-md border border-border'>
        <div>
          {editor && toolbar && (
            <div
              className={`${disabled ? 'pointer-events-none opacity-50' : ''}`}
            >
              <MenuBtns
                borderRadius={(border && borderRadius) || 'rounded-md'}
                isSize={isSize}
                isAlign={isAlign}
              />
            </div>
          )}
          <div
            className={`relative ${disabled ? 'pointer-events-none opacity-50' : ''} overflow-auto rounded-md bg-white`}
            style={{
              minHeight: minHeight,
              height: height,
            }}
          >
            <div
              className={cn(
                '[&_.ProseMirror]:w-full [&_.ProseMirror]:break-words',
                disabled
                  ? '[&_.ProseMirror]:cursor-not-allowed [&_.ProseMirror]:text-muted-foreground'
                  : '[&_.ProseMirror]:cursor-text [&_.ProseMirror]:text-foreground',
                '[&_.ProseMirror_*::selection]:bg-accent/20',
                '[&_.tiptap_p.is-editor-empty:first-child::before]:text-muted-foreground/60',
                '[&_.ProseMirror-focused]:outline-none',
                '[&_.ProseMirror_.temp-variable]:rounded-[2px] [&_.ProseMirror_.temp-variable]:bg-primary/10 [&_.ProseMirror_.temp-variable]:px-[3px] [&_.ProseMirror_.temp-variable]:pb-[3px] [&_.ProseMirror_.temp-variable]:text-primary',
                '[&_.tiptap_p.is-editor-empty:first-child::before]:pointer-events-none [&_.tiptap_p.is-editor-empty:first-child::before]:float-left [&_.tiptap_p.is-editor-empty:first-child::before]:h-0 [&_.tiptap_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]',
              )}
              style={{
                height: height !== 'auto' ? height : 'auto',
              }}
            >
              <div className={`${singleLine ? 'px-4 py-2' : 'p-4'}`}>
                {loader.isLoading ? (
                  <div className='flex flex-col gap-1'>
                    {[...Array(loader.count)].map((_e, i) => (
                      <Skeleton key={i} className='h-3 w-full' />
                    ))}
                  </div>
                ) : (
                  <EditorContent
                    onFocus={onfocus}
                    onBlur={onblur}
                    editor={editor}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TipTapCtx.Provider>
  );
};

export default TipTapAIEditor;
