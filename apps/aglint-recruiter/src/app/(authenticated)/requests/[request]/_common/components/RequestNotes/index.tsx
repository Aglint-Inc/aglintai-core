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
      setNote(requestNotes?.note);
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
  if (!isFetched) {
    return <Skeleton className='h-20 w-full' />;
  }
  return (
    <div>
      <Card
        className={cn(
          'p-0 border-none shadow-none mt-2',
          requestNotes?.note && !editorEnabled ? '' : 'bg-white',
        )}
      >
        <ShowCode>
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
                        requestNotes?.id,
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
                  <p className='text-sm text-muted-foreground'>Add note</p>
                </div>
              </ShowCode.Else>
            </ShowCode>
          </ShowCode.When>
        </ShowCode>
        <div className='mt-2 flex flex-row items-center gap-1'>
          <p className='text-xs text-muted-foreground'>
            {!requestNotes?.note
              ? 'Notes will remain here until you clear it.'
              : 'Last edited on ' +
                dayjsLocal(requestNotes?.updated_at).format('hh:mm A, MMM DD')}
          </p>
          {isPending && (
            <p className='text-xs text-muted-foreground'>Saving...</p>
          )}
        </div>
      </Card>
    </div>
  );
}

export default RequestNotes;
