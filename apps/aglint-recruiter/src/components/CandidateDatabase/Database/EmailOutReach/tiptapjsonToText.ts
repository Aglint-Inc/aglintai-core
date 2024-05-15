export const getTextFromMirrorDocument = (mirrorValue): string => {
  const { content } = mirrorValue;
  if (!content || content.length === 0) {
    return '';
  }

  let out = '';

  for (const node of content) {
    out += getTextFromMirrorNode(node) + '\n';
  }
  out = out.trim();
  return out;
};

const getTextFromMirrorNode = (mirrorNode): string => {
  if (!mirrorNode) {
    return '';
  }

  switch (mirrorNode.type) {
    case 'text':
      // TODO: if this is a link do we want to show the URL?
      return mirrorNode.text || '';
    case 'button':
      return mirrorNode?.attrs?.text || '';
    case 'hard_break':
      return '\n';
    case 'image':
      return '';
    case 'bullet_list':
    case 'ordered_list':
      if (!mirrorNode.content) {
        return '';
      }

      return mirrorNode.content
        .map((subNode) => getTextFromMirrorNode(subNode))
        .join('\n');
    case 'list_item':
    case 'paragraph':
    case 'code_block':
    case 'heading':
      if (!mirrorNode.content) {
        return '';
      }

      return mirrorNode.content
        .map((subNode) => getTextFromMirrorNode(subNode))
        .join(' ');
  }

  return '';
};
