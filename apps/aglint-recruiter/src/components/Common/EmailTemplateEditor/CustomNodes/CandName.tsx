/* eslint-disable no-unused-vars */
import { mergeAttributes, Node } from '@tiptap/core';
import { type DOMOutputSpec, type Node as ProseMirrorNode } from '@tiptap/pm/model';
import { PluginKey } from '@tiptap/pm/state';
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

export const CandName = Node.create<MentionOptions>({
  name: 'cand-name',
  group: 'inline',
  inline: true,
  selectable: false,
  atom: true,
  addAttributes() {
    return {
      label: {
        default: `Candidate Name`,
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: `cand-name`,
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['cand-name', mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer(Label);
  },
});

const Label = (props) => {
  return (
    <NodeViewWrapper className='cand-name' as={'span'}>
      <span
        style={{
          display: 'inline',
          backgroundColor: 'var(--neutral-3)',
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
