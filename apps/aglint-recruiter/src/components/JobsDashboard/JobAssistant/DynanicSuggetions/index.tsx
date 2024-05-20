import { Stack } from '@mui/material';

import { JobAssistCards } from '@/devlink/JobAssistCards';
import { useJobAssistantContext } from '@/src/context/JobAssistant';
import { suggestions } from '@/src/context/JobAssistant/utils';

function DynamicSuggestion({ skills, getEditorRef }) {
  const { companyDetails, setTextMessage, setBackEndText } =
    useJobAssistantContext();
  return (
    <>
      {suggestions(companyDetails.location, skills)
        .common.slice(0, 4)
        .map((ele, i) => {
          return (
            <Stack
              onClick={() => {
                setTextMessage({
                  text: ele,
                  html: `<p>${ele}</p>`,
                  wordCount: ele.length,
                });
                setBackEndText(`<p>${ele}</p>`);
                getEditorRef().commands.setContent(ele);
                getEditorRef().commands.focus(ele.length + 1);
                const firstBacktickPos = ele.indexOf('`');
                const secondBacktickPos = ele.indexOf(
                  '`',
                  firstBacktickPos + 1,
                );

                if (firstBacktickPos > 0 && secondBacktickPos > 0)
                  getEditorRef().commands.setTextSelection({
                    from: firstBacktickPos + 2,
                    to: secondBacktickPos + 1,
                  });
              }}
              key={i}
            >
              <JobAssistCards textDesc={ele} />
            </Stack>
          );
        })}
    </>
  );
}

export default DynamicSuggestion;
