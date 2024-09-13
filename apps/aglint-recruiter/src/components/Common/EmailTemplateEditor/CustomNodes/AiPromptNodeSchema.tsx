import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { NodeViewWrapper } from '@tiptap/react';
import React, { useState } from 'react';

export const AiPromptNodeSchema = Node.create({
  name: 'AiPrompt',
  group: 'block',
  atom: true,
  selectable: true,
  addAttributes() {
    return {
      aiPrompt: {
        default:
          'Add one sentence on why the candidate is a good fit for this company and also mention candidates strength',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'ai-prompt',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['ai-prompt', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component);
  },
});

import { AddCommandInput } from './_common/AddCommandInput';

const Component = (props) => {
  const [open, setOpen] = useState(false);
  const [aiCmd, setAiCmd] = useState('');

  return (
    <NodeViewWrapper className='ai-prompt'>
      <div className='content'>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div>
              <div className='bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 rounded-r'>
                <p className='font-bold'>{props.node.attrs.aiPrompt}</p>
                <button
                  onClick={() => {
                    setOpen(true);
                    setAiCmd(props.node.attrs.aiPrompt);
                  }}
                  className='mt-2 text-sm text-blue-600 hover:text-blue-800 underline'
                >
                  Edit
                </button>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className='w-[470px] p-0'>
            <AddCommandInput
              isDeleteVisible={false}
              onClickCancel={{
                onClick: () => {
                  setOpen(false);
                },
              }}
              onClickDone={{
                onClick: () => {
                  props.node.attrs.aiPrompt = aiCmd;
                  setOpen(false);
                },
              }}
              onClickDelete={{
                onClick: () => {
                  //
                },
              }}
              slotInputCommand={
                <textarea
                  placeholder='AI Command'
                  className='w-full h-20 resize-none border-none outline-none p-2'
                  value={aiCmd}
                  onChange={(e) => {
                    setAiCmd(e.target.value);
                  }}
                />
              }
            />
          </PopoverContent>
        </Popover>
      </div>
    </NodeViewWrapper>
  );
};
