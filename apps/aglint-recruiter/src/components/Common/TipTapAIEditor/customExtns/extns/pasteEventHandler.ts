import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Extension } from '@tiptap/react';
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
              const newState = state.tr.insert(
                state.doc.content.size - 2,
                content,
              );

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
      if (!isInBulletList) {
        isInBulletList = true;
        json.content.push({ type: 'bulletList', content: [] });
      }

      currentListItem = { type: 'listItem', content: [] };
      json.content[json.content.length - 1].content.push(currentListItem);

      const listItemContent = trimmedLine.slice(1).trim();
      if (listItemContent.length > 0) {
        currentListItem.content.push({
          type: 'paragraph',
          content: [{ type: 'text', text: listItemContent }],
        });
      }
    } else {
      isInBulletList = false;

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
