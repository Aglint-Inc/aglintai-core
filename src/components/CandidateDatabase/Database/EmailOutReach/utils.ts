import { get, isArray } from 'lodash';

export const templateToEmailBody = async (
  content,
  recruiterName,
  candidateName,
  genAiResp,
) => {
  if (!isArray(content)) return null;

  content = await Promise.all(
    content.map(async (c) => {
      // console.log(c.type);
      if (c.type === 'AiPrompt') {
        return {
          type: 'paragraph',
          content: [
            {
              text: await genAiResp(c.attrs.aiPrompt),
              type: 'text',
            },
          ],
        };
      }
      return c;
    }),
  );

  const candNameIdx = content.findIndex((c) => c.type === 'cand-name');
  if (candNameIdx !== -1) {
    let textSchIdx = content.findIndex((c) => c.type === 'text');
    if (textSchIdx >= 0) {
      content[Number(textSchIdx)].text += ' ' + candidateName;
    } else {
      content = [
        ...content.slice(0, candNameIdx),
        { type: 'text', text: candidateName },
        ...content.slice(candNameIdx),
      ];
    }
    content = content.filter((c) => c.type !== 'cand-name');
  }

  const recNameIdx = content.findIndex((c) => c.type === 'rec-name');
  if (recNameIdx !== -1) {
    let textSchIdx = content.findIndex((c) => c.type === 'text');
    // console.log(textSchIdx);
    if (textSchIdx >= 0) {
      content[Number(textSchIdx)].text += ' ' + recruiterName;
    } else {
      content = [
        ...content.slice(0, recNameIdx),
        { type: 'text', text: recruiterName },
        ...content.slice(recNameIdx),
      ];
    }
    content = content.filter((c) => c.type !== 'rec-name');
  }

  for (let idx = 0; idx < content.length; idx++) {
    if (get(content[Number(idx)], 'content', null) === null) continue;
    content[Number(idx)].content = await templateToEmailBody(
      content[Number(idx)].content,
      recruiterName,
      candidateName,
      genAiResp,
    );
  }

  return content;
};
