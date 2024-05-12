import { Popover } from '@mui/material';
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

import { AddCommandInput, TemplateAddSentence } from '@/devlink';

const Component = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [aiCmd, setAiCmd] = useState('');

  return (
    <NodeViewWrapper className='ai-prompt'>
      <div className='content'>
        {
          <>
            <TemplateAddSentence
              textSentence={props.node.attrs.aiPrompt}
              onClickEdit={{
                onClick: (e) => {
                  setAnchorEl(e.currentTarget);
                  setAiCmd(props.node.attrs.aiPrompt);
                },
              }}
            />
          </>
        }
      </div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        sx={{
          top: 30,
          border: 'none',
          '&.MuiPaper-root': {
            border: 'none',
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <AddCommandInput
          isDeleteVisible={false}
          onClickCancel={{
            onClick: () => {
              setAnchorEl(null);
            },
          }}
          onClickDone={{
            onClick: () => {
              props.node.attrs.aiPrompt = aiCmd;
              setAnchorEl(null);
            },
          }}
          onClickDelete={{
            onClick: () => {
              //
            },
          }}
          slotInputCommand={
            <>
              <textarea
                placeholder='AI Command'
                style={{
                  border: 'none',
                  outline: 'none',
                  width: '470px',
                  resize: 'none',
                  height: '80px',
                }}
                value={aiCmd}
                onChange={(e) => {
                  setAiCmd(e.target.value);
                }}
              />
            </>
          }
        />
      </Popover>
    </NodeViewWrapper>
  );
};
