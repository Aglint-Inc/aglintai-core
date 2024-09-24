import {
  type DatabaseTable,
  type DatabaseTableUpdate,
} from '@aglint/shared-types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { supabase } from '@/utils/supabase/client';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';
import toast from '@/utils/toast';

import { ScheduleReasonCard } from './ScheduleReasonCard';

const initialReasons: DatabaseTable['recruiter']['scheduling_reason'] = {
  candidate: {
    rescheduling: ['other'],
    cancellation: ['other'],
  },
  internal: {
    rescheduling: ['other'],
    cancellation: ['other'],
    decline: ['other'],
  },
};

const SchedulingReasons = () => {
  const { recruiter, setRecruiter: updateRecruiter } = useAuthDetails();
  const [tab, setTab] =
    useState<keyof DatabaseTable['recruiter']['scheduling_reason']>(
      'candidate',
    );
  const reason = {
    ...initialReasons,
    ...(recruiter.scheduling_reason ?? {}),
  };

  const handleUpdateReasons = async <T extends typeof tab>(
    updatedReason: Partial<DatabaseTable['recruiter']['scheduling_reason'][T]>,
  ) => {
    const temp = {
      ...reason,
    };
    temp[tab] = { ...(temp[tab] || {}), ...updatedReason };
    return setRecruiter({
      id: recruiter.id,
      scheduling_reason: temp,
    }).then((data) => {
      updateRecruiter({ ...data, socials: recruiter.socials });
      return true;
    });
  };

  const handleAddReason = (sectionKey: string, newReason: string) => {
    const temp = { ...reason };
    temp[tab][sectionKey] = [...(temp[tab][sectionKey] || []), newReason];
    handleUpdateReasons(temp[tab]).then(() => {
      toast.success('Reason added successfully.');
    });
  };

  const handleEditReason = (
    sectionKey: string,
    index: number,
    newReason: string,
  ) => {
    const temp = { ...reason };
    temp[tab][sectionKey][index] = newReason;
    handleUpdateReasons(temp[tab]).then(() => {
      toast.success('Reason updated successfully.');
    });
  };

  const handleDeleteReason = (sectionKey: string, index: number) => {
    const temp = { ...reason };
    temp[tab][sectionKey] = temp[tab][sectionKey].filter((_, i) => i !== index);
    handleUpdateReasons(temp[tab]).then(() => {
      toast.success('Reason deleted successfully.');
    });
  };

  const getSections = (tabKey: typeof tab) => {
    return Object.keys(reason[tabKey]).map((item) => {
      const typedItem =
        item as keyof DatabaseTable['recruiter']['scheduling_reason'][typeof tabKey] &
          string;
      return {
        title: `${capitalizeFirstLetter(typedItem)} Reason`,
        description: `Add reasons for ${capitalizeFirstLetter(item)}. These options will be available when the ${capitalizeFirstLetter(
          tabKey === 'internal' ? 'Internal user' : tabKey,
        )} ${
          item === 'decline'
            ? 'decline the Session'
            : 'request for session ' + capitalizeFirstLetter(item)
        }.`,
        reasons: reason[tabKey][item] || [],
        onAdd: (newReason: string) => handleAddReason(typedItem, newReason),
        onEdit: (index: number, newReason: string) =>
          handleEditReason(typedItem, index, newReason),
        onDelete: (index: number) => handleDeleteReason(typedItem, index),
      };
    });
  };

  return (
    <div>
      <Tabs value={tab} onValueChange={(value) => setTab(value as typeof tab)}>
        <TabsList className=''>
          {(
            Object.keys(
              reason,
            ) as (keyof DatabaseTable['recruiter']['scheduling_reason'])[]
          ).map((key) => (
            <TabsTrigger key={key} value={key}>
              {capitalizeFirstLetter(key)}
            </TabsTrigger>
          ))}
        </TabsList>
        {(
          Object.keys(
            reason,
          ) as (keyof DatabaseTable['recruiter']['scheduling_reason'])[]
        ).map((tabKey) => (
          <TabsContent key={tabKey} value={tabKey} className='mt-0'>
            <ScheduleReasonCard
              isMainHeadingVisible={true}
              textMainHeading={
                <span className='font-semibold'>
                  {tabKey === 'candidate'
                    ? 'Set Rescheduling & Cancellation Reasons'
                    : 'Set Decline Rescheduling & Cancellation Reasons'}
                </span>
              }
              textMainHelperText={
                tabKey === 'candidate'
                  ? 'Configure default reasons for candidates to cancel or reschedule their interviews. These reasons will be available as options for candidates when they request to modify their scheduled interviews.'
                  : 'Set predefined reasons for interviewers to decline or request rescheduling, and for canceling interviews. These reasons will be available as options for interviewers when they need to modify their scheduled interviews.'
              }
              sections={getSections(tabKey)}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SchedulingReasons;

const setRecruiter = async (
  data: Omit<DatabaseTableUpdate['recruiter'], 'id'> & { id: string },
) => {
  return supabase
    .from('recruiter')
    .update(data)
    .eq('id', data.id)
    .select(
      '*,office_locations(*), departments(id,name), recruiter_preferences(*)',
    )
    .single()
    .then(({ data, error }) => {
      if (error) throw new Error(error.message);
      return data;
    });
};
