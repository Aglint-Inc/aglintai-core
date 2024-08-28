import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

import { NotesRequestDetail } from '@/devlink2/NotesRequestDetail';
import { RequestCardSkeleton } from '@/devlink2/RequestCardSkeleton';
import { Text } from '@/devlink2/Text';
import { ShowCode } from '@/src/components/Common/ShowCode';

import Loader from '@/src/components/Common/Loader';
import dayjs from '@/src/utils/dayjs';
import { debounce } from 'lodash';
import { useRequestNotes } from './hooks';
import { upsertRequestNotes } from './utils';
import { LoaderSvg } from '@/devlink/LoaderSvg';

function RequestNotes() {
  const { query } = useRouter();
  const {
    data: requestNotes,
    isFetched,
    refetch,
    isFetching,
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
      console.log('id', request_id);
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

  console.log(requestNotes?.[0]?.id);
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
                    <textarea
                      value={note || ''}
                      onChange={async (e) => {
                        console.log(e.target.value);
                        setNote(e.target.value);
                        setSaving(true);
                        debouncedUpsertRequestNotes(
                          e.target.value,
                          requestNotes?.[0]?.id,
                        );
                      }}
                      placeholder='Add a note and press `Enter` to save'
                      style={{
                        border: 'none',
                        width: '100%',
                        borderRadius: '0.2rem',
                        outline: 'none',
                        backgroundColor: 'transparent',
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word',
                        wordBreak: 'break-all',
                        resize: 'none',
                      }}
                      rows={1}
                      // multiple={true}
                      ref={inputRef}
                      onBlur={() => {
                        setEditorEnabled(false);
                      }}
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
