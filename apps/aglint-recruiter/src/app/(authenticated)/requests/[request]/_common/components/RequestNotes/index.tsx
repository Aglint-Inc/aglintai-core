import { dayjsLocal } from '@aglint/shared-utils';
import { Card } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { Textarea } from '@components/ui/textarea';
import { cn } from '@lib/utils';
import { useReadNotes, useUpdateRequestNote } from '@requests/hooks';
import debounce from 'lodash/debounce';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ShowCode } from '@/components/Common/ShowCode';
import { api } from '@/trpc/client';

function RequestNotes() {
  const params = useParams();
  const requestId = params?.request as string;
  api.requests.note.read;
  const { data: notes, isFetched } = useReadNotes(
    {
      request_id: requestId,
    },
    {
      enabled: !!requestId,
    },
  );
  const [note, setNote] = useState<string | null>('');
  const [editorEnabled, setEditorEnabled] = useState(false);
  const requestNotes = notes;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (requestNotes) {
      setNote(requestNotes.note);
    }
  }, [isFetched]);
  const { updateRequestNote, isPending } = useUpdateRequestNote();
  const debouncedUpsertRequestNotes = useCallback(
    debounce(async (noteValue: string, noteId?: string) => {
      const payload = {
        id: noteId,
        note: noteValue,
        request_id: requestId,
        updated_at: dayjsLocal().toISOString(),
      };
      if (!noteId) delete payload.id;
      updateRequestNote(payload);
    }, 500),
    [],
  );

  return (
    <Card
      className={cn(
        'p-4',
        requestNotes?.[0]?.note && !editorEnabled ? 'bg-yellow-50' : 'bg-white',
      )}
    >
      <ShowCode>
        <ShowCode.When isTrue={!isFetched}>
          <Skeleton className='h-20 w-full' />
        </ShowCode.When>
        <ShowCode.When isTrue={isFetched}>
          <ShowCode>
            <ShowCode.When isTrue={!!note || editorEnabled}>
              <div
                className='flex flex-row gap-1'
                onClick={() => {
                  setEditorEnabled(true);
                  setTimeout(() => inputRef.current?.focus(), 300);
                }}
              >
                <Textarea
                  value={note || ''}
                  onChange={async (e) => {
                    setNote(e.target.value);
                    debouncedUpsertRequestNotes(
                      e.target.value,
                      requestNotes?.[0]?.id,
                    );
                  }}
                  placeholder='Add note'
                  className='min-h-[40px] resize-none bg-transparent focus:border-transparent focus:outline-none focus:ring-0'
                  // style={{ background: 'transparent', outline: 'none' }}
                  onBlur={() => {
                    setEditorEnabled(false);
                  }}
                  ref={inputRef}
                />
              </div>
            </ShowCode.When>
            <ShowCode.Else>
              <div
                className='w-full cursor-pointer'
                onClick={() => {
                  setEditorEnabled(true);
                  setTimeout(() => inputRef.current?.focus(), 300);
                }}
              >
                <p className='text-sm text-neutral-500'>Add note</p>
              </div>
            </ShowCode.Else>
          </ShowCode>
        </ShowCode.When>
      </ShowCode>
      <div className='mt-2 flex flex-row items-center gap-1'>
        <p className='text-xs text-neutral-500'>
          {!requestNotes?.[0]?.note
            ? 'Notes will remain here until you clear it.'
            : 'Last edited on ' +
              dayjsLocal(requestNotes?.[0]?.updated_at).format(
                'hh:mm A, MMM DD',
              )}
        </p>
        {isPending && <p className='text-xs text-neutral-500'>Saving...</p>}
      </div>
    </Card>
  );
}

export default RequestNotes;
