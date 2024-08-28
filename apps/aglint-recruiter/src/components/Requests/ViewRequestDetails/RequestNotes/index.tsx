import { Stack, TextField } from '@mui/material';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

import { NotesRequestDetail } from '@/devlink2/NotesRequestDetail';
import { RequestCardSkeleton } from '@/devlink2/RequestCardSkeleton';
import { Text } from '@/devlink2/Text';
import { ShowCode } from '@/src/components/Common/ShowCode';
import dayjs from '@/src/utils/dayjs';

import { useRequestNotes } from './hooks';
import { upsertRequestNotes } from './utils';

function RequestNotes() {
  const { query } = useRouter();
  const {
    data: requestNotes,
    isFetched,
    refetch,
  } = useRequestNotes({
    request_id: String(query?.id),
  });
  const [note, setNote] = useState('');
  const [editorEnabled, setEditorEnabled] = useState(false);
  const [saving, setSaving] = useState(false);

  const inputRef = useRef(null);
  useEffect(() => {
    if (isFetched) {
      setNote(requestNotes?.[0]?.note || '');
    }
  }, [isFetched]);

  const debouncedUpsertRequestNotes = useCallback(
    debounce(async (noteValue, request_id) => {
      await upsertRequestNotes({
        id: request_id as string,
        note: noteValue,
        request_id: query?.id as string,
        updated_at: dayjs().toISOString(),
      });
      setSaving(false);
      refetch();
    }, 500),
    [],
  );

  return (
    <Stack>
      <NotesRequestDetail
        slotInput={
          <ShowCode>
            <ShowCode.When isTrue={!isFetched}>
              <RequestCardSkeleton />
            </ShowCode.When>
            <ShowCode.When isTrue={isFetched}>
              <ShowCode>
                <ShowCode.When isTrue={!!note || editorEnabled}>
                  <Stack
                    direction={'row'}
                    gap={1}
                    spacing={1}
                    onClick={() => {
                      setEditorEnabled(true);
                      setTimeout(() => inputRef.current?.focus(), 300);
                    }}
                  >
                    <TextField
                      value={note || ''}
                      onChange={async (e) => {
                        setNote(e.target.value);
                        setSaving(true);
                        debouncedUpsertRequestNotes(
                          e.target.value,
                          requestNotes?.[0]?.id,
                        );
                      }}
                      placeholder='Add note'
                      multiline // Enables textarea behavior
                      minRows={1} // Minimum number of rows
                      maxRows={2} // Maximum number of rows
                      variant='outlined' // Uses the outlined variant
                      fullWidth // Takes full width of the container
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          padding: 0, // Remove padding
                          borderRadius: '0.2rem', // Custom border-radius
                          backgroundColor: 'transparent', // Transparent background
                          '& fieldset': {
                            border: 'none', // Remove the default border
                          },
                          '&:hover fieldset': {
                            borderColor: 'transparent', // Ensure no border color change on hover
                          },
                          '&.Mui-focused': {
                            boxShadow: 'none', // Remove the box shadow on focus
                            '& fieldset': {
                              borderColor: 'transparent', // Ensure no border color change on focus
                            },
                          },
                        },
                        '& .MuiInputBase-input': {
                          whiteSpace: 'pre-wrap',
                          wordWrap: 'break-word',
                          wordBreak: 'break-all',
                          resize: 'none', // Disable resizing
                          outline: 'none', // Disable outline
                          padding: 0, // Remove padding
                        },
                      }}
                      onBlur={() => {
                        setEditorEnabled(false);
                      }}
                      inputRef={inputRef}
                    />
                  </Stack>
                </ShowCode.When>
                <ShowCode.Else>
                  <Stack
                    width={'100%'}
                    onClick={() => {
                      setEditorEnabled(true);
                      setTimeout(() => inputRef.current?.focus(), 300);
                    }}
                  >
                    <Text size={2} color={'neutral'} content='Add note' />
                  </Stack>
                </ShowCode.Else>
              </ShowCode>
            </ShowCode.When>
          </ShowCode>
        }
        styleInput={
          requestNotes?.[0]?.note && !editorEnabled ? 'warning' : 'white'
        }
        slotText={
          <Stack direction={'row'} alignItems={`center`} gap={1}>
            <Text
              color={'neutral'}
              size={1}
              content={
                !requestNotes?.[0]?.note
                  ? 'Notes will remain here until you clear it.'
                  : 'Last edited on ' +
                    dayjs(requestNotes?.[0]?.updated_at).format(
                      'hh:mm A, MMM DD',
                    )
              }
            />
            {saving && (
              <Text size={1} color={'neutral'} content={'Saving...'} />
            )}
          </Stack>
        }
      />
    </Stack>
  );
}

export default RequestNotes;
