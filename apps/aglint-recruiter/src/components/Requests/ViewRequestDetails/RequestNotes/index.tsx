import { Card } from '@components/ui/card';
import { Skeleton } from '@components/ui/skeleton';
import { Textarea } from '@components/ui/textarea';
import { cn } from '@lib/utils';

import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ShowCode } from '@/components/Common/ShowCode';
import dayjs from '@/utils/dayjs';

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
    <div className='space-y-4'>
      <Card
        className={cn(
          'p-4',
          requestNotes?.[0]?.note && !editorEnabled
            ? 'bg-yellow-50'
            : 'bg-white',
        )}
      >
        <ShowCode>
          <ShowCode.When isTrue={!isFetched}>
            <Skeleton className='w-full h-20' />
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
                      setSaving(true);
                      debouncedUpsertRequestNotes(
                        e.target.value,
                        requestNotes?.[0]?.id,
                      );
                    }}
                    placeholder='Add note'
                    className='min-h-[40px] resize-none focus:ring-0 focus:border-transparent'
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
        <div className='flex flex-row items-center gap-1 mt-2'>
          <p className='text-xs text-neutral-500'>
            {!requestNotes?.[0]?.note
              ? 'Notes will remain here until you clear it.'
              : 'Last edited on ' +
                dayjs(requestNotes?.[0]?.updated_at).format('hh:mm A, MMM DD')}
          </p>
          {saving && <p className='text-xs text-neutral-500'>Saving...</p>}
        </div>
      </Card>
    </div>
  );
}

export default RequestNotes;
