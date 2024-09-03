/* eslint-disable no-unused-vars */
import { mergeAttributes, Node } from '@tiptap/core';
import { type DOMOutputSpec, type Node as ProseMirrorNode } from '@tiptap/pm/model';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { type SuggestionOptions } from '@tiptap/suggestion';
import Image from 'next/image';

export type MentionOptions = {
  HTMLAttributes: Record<string, any>;
  /** @deprecated use renderText and renderHTML instead  */
  renderLabel?: (props: {
    options: MentionOptions;
    node: ProseMirrorNode;
  }) => string;
  renderText: (props: {
    options: MentionOptions;
    node: ProseMirrorNode;
  }) => string;
  renderHTML: (props: {
    options: MentionOptions;
    node: ProseMirrorNode;
  }) => DOMOutputSpec;
  suggestion: Omit<SuggestionOptions, 'editor'>;
};

export const RecruiterFirstName = Node.create<MentionOptions>({
  name: 'rec-name',
  group: 'inline',
  inline: true,
  selectable: false,
  atom: true,
  addAttributes() {
    return {
      label: {
        default: `Recruiter Firstname`,
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: `rec-name`,
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['rec-name', mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer(Label);
  },
});

const Label = (props) => {
  return (
    <NodeViewWrapper className='rec-name' as={'span'}>
      <span
        style={{
          display: 'inline',
          backgroundColor: 'var(--neutral-4)',
          color: 'var(--white)',
          padding: '4px 10px',
          margin: '2px',
          borderRadius: 'var(--radius-2)',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <Image
          style={{ marginBottom: '2px', marginRight: '5px' }}
          src={'/images/svg/text.svg'}
          width={15}
          height={15}
          alt=''
          unoptimized
        />
        <span>{props.node.attrs.label}</span>
      </span>
    </NodeViewWrapper>
  );
};
