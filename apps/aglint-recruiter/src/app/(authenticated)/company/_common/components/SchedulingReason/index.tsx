import { type DatabaseTable } from '@aglint/shared-types';
import { useToast } from '@components/hooks/use-toast';
import {
  Page,
  PageActions,
  PageDescription,
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';
import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs';
import { useState } from 'react';

import { useTenant } from '@/company/hooks';
import { api } from '@/trpc/client';
import { capitalizeFirstLetter } from '@/utils/text/textUtils';

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
  const { recruiter } = useTenant();
  const { toast } = useToast();
  const [tab, setTab] =
    useState<keyof DatabaseTable['recruiter']['scheduling_reason']>(
      'candidate',
    );
  const reason = {
    ...initialReasons,
    ...(recruiter.scheduling_reason || {}),
  } as DatabaseTable['recruiter']['scheduling_reason'];

  const { mutate } = api.tenant.updateTenant.useMutation({
    onError: () => {
      toast({
        title: 'Unable to update scheduling reasons',
        variant: 'destructive',
      });
    },
  });

  const handleUpdateReasons = async <T extends typeof tab>(
    updatedReason: Partial<DatabaseTable['recruiter']['scheduling_reason'][T]>,
  ) => {
    const tabKey = tab as T;
    const temp = {
      ...reason,
    };
    temp[tabKey] = {
      ...(temp[tabKey] || {}),
      ...updatedReason,
    } as (typeof temp)[T];
    mutate({
      scheduling_reason: temp,
    });
  };

  const handleAddReason = (sectionKey: string, newReason: string) => {
    const temp = { ...reason };
    // @ts-ignore
    temp[tab][sectionKey] = [...(temp[tab][sectionKey] || []), newReason];
    handleUpdateReasons(temp[tab]);
  };

  const handleEditReason = (
    sectionKey: string,
    index: number,
    newReason: string,
  ) => {
    const temp = { ...reason };
    // @ts-ignore
    temp[tab][sectionKey][index] = newReason;
    handleUpdateReasons(temp[tab]);
  };

  const handleDeleteReason = (sectionKey: string, index: number) => {
    const temp = { ...reason };
    // @ts-ignore
    temp[tab][sectionKey] = temp[tab][sectionKey].filter((_, i) => i !== index);
    handleUpdateReasons(temp[tab]);
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
        // @ts-ignore
        reasons: reason[tabKey][item] || [],
        onAdd: (newReason: string) => handleAddReason(typedItem, newReason),
        onEdit: (index: number, newReason: string) =>
          handleEditReason(typedItem, index, newReason),
        onDelete: (index: number) => handleDeleteReason(typedItem, index),
      };
    });
  };

  return (
    <Page>
      <PageHeader>
        <PageHeaderText>
          <PageTitle>Scheduling Reasons</PageTitle>
          <PageDescription>
            {' '}
            Configure default reasons for candidates and interviewers to cancel
            or reschedule their interviews.
          </PageDescription>
        </PageHeaderText>
        <PageActions>
          <Tabs
            value={tab}
            onValueChange={(value) => setTab(value as typeof tab)}
          >
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
          </Tabs>
        </PageActions>
      </PageHeader>

      <div className='mt-0'>
        <ScheduleReasonCard
          isMainHeadingVisible={false}
          textMainHeading={
            <span className='font-semibold'>
              {tab === 'candidate'
                ? 'Set Rescheduling & Cancellation Reasons'
                : 'Set Decline Rescheduling & Cancellation Reasons'}
            </span>
          }
          textMainHelperText={
            tab === 'candidate'
              ? 'Configure default reasons for candidates to cancel or reschedule their interviews. These reasons will be available as options for candidates when they request to modify their scheduled interviews.'
              : 'Set predefined reasons for interviewers to decline or request rescheduling, and for canceling interviews. These reasons will be available as options for interviewers when they need to modify their scheduled interviews.'
          }
          sections={getSections(tab)}
        />
      </div>
    </Page>
  );
};

export default SchedulingReasons;
