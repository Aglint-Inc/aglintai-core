import { type SchedulingSettingType } from '@aglint/shared-types';
import { toast } from '@components/hooks/use-toast';
import cloneDeep from 'lodash/cloneDeep';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';

import { useTenantMembers } from '@/company/hooks';
import { UIButton } from '@/components/Common/UIButton';
import { useRouterPro } from '@/hooks/useRouterPro';

import { EditKeywordsForm } from './ui/EditKeywordsUI';

export const EditKeywords = ({
  setIsEditOpen,
  handleUpdate,
}: {
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  // eslint-disable-next-line no-unused-vars
  handleUpdate: (updatedData: Partial<SchedulingSettingType>) => Promise<void>;
}) => {
  const { allMembers } = useTenantMembers();
  const router = useRouterPro();
  const user_id = router?.params?.user as string;
  const member = allMembers.find((mem) => mem.user_id === user_id);
  const [isSaving, setIsSaving] = useState(false);

  // State variables for keywords
  const [freeKeyWords, setFreeKeywords] = useState<string[]>([]);
  const [softConflictsKeyWords, setSoftConflictsKeyWords] = useState<string[]>(
    [],
  );
  const [outOfOffice, setOutOfOffice] = useState<string[]>([]);
  const [recruitingBlocks, setRecruitingBlocks] = useState<string[]>([]);

  const schedulingSettings = member?.scheduling_settings;
  function initialLoad() {
    if (schedulingSettings) {
      const schedulingSettingData = cloneDeep(
        schedulingSettings,
      ) as SchedulingSettingType;

      setFreeKeywords(schedulingSettingData?.schedulingKeyWords?.free);
      setSoftConflictsKeyWords(
        schedulingSettingData?.schedulingKeyWords?.SoftConflicts || [],
      );
      setOutOfOffice(
        schedulingSettingData?.schedulingKeyWords?.outOfOffice || [],
      );
      setRecruitingBlocks(
        schedulingSettingData?.schedulingKeyWords?.recruitingBlocks || [],
      );
    }
  }

  useEffect(() => {
    if (allMembers) initialLoad();
  }, [allMembers]);

  const keywords = [
    {
      title: 'Free',
      description:
        'When these keywords appear in a calendar event title, overlapping interviews will not be considered scheduling conflicts.',
      value: freeKeyWords,
      changeHandler: setFreeKeywords,
    },
    {
      title: 'Soft Conflicts',
      description:
        'When these keywords are found in a calendar event title, overlapping interviews will be marked as soft conflicts and will require your confirmation to schedule.',
      value: softConflictsKeyWords,
      changeHandler: setSoftConflictsKeyWords,
    },
    {
      title: 'Out of Office',
      description:
        'When any of these specified keywords appear in a calendar event title, the day will be considered an Out of Office day, and interviews will not be scheduled.',
      value: outOfOffice,
      changeHandler: setOutOfOffice,
    },
    {
      title: 'Recruiting Blocks',
      description:
        ' If these keywords are found in a calendar event title, these blocks will be first preference for scheduling interviews.',
      value: recruitingBlocks,
      changeHandler: setRecruitingBlocks,
    },
  ];

  if (!member) return null;

  const updateHandle = async () => {
    try {
      setIsSaving(true);

      const schedulingKeyWords = {
        free: freeKeyWords,
        SoftConflicts: softConflictsKeyWords,
        outOfOffice: outOfOffice,
        recruitingBlocks: recruitingBlocks,
      };

      await handleUpdate({ schedulingKeyWords });
      toast({ title: 'Availability update Successfully' });
      setIsEditOpen(false);
    } catch (e) {
      toast({ title: 'Availability update failed', variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className='flex w-full'>
        <div className='ml-auto flex gap-4'>
          <UIButton
            variant='secondary'
            disabled={isSaving}
            onClick={() => {
              if (!isSaving) setIsEditOpen(false);
            }}
          >
            Cancel
          </UIButton>
          <UIButton
            isLoading={isSaving}
            disabled={isSaving}
            onClick={updateHandle}
          >
            Update
          </UIButton>
        </div>
      </div>
      <EditKeywordsForm keywords={keywords} />
    </>
  );
};
