import { Drawer, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

import { SideDrawerBlock } from '@/devlink2';
import { DropDown } from '@/src/components/JobNewInterviewPlan/sessionForms';
import { getBreakLabel } from '@/src/components/JobNewInterviewPlan/utils';
import { supabase } from '@/src/utils/supabase/client';

import { createCloneSession, useGetScheduleApplication } from '../../hooks';
import { setIsEditBreakOpen, useSchedulingApplicationStore } from '../../store';

function BreakDrawerEdit() {
  const {
    editSession,
    allSessions,
    selCoordinator,
    selectedApplication,
    selectedSchedule,
    isEditBreakOpen,
  } = useSchedulingApplicationStore((state) => ({
    editSession: state.editSession,
    selectedSchedule: state.selectedSchedule,
    selCoordinator: state.selCoordinator,
    allSessions: state.initialSessions,
    selectedApplication: state.selectedApplication,
    isEditBreakOpen: state.isEditBreakOpen,
  }));
  const { fetchInterviewDataByApplication } = useGetScheduleApplication();
  const [value, setValue] = useState<number>(30);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editSession) {
      setValue(editSession.break_duration);
    }
  }, [editSession?.id]);

  const handleClose = () => {
    setIsEditBreakOpen(false);
  };

  const handleSave = async () => {
    if (!selectedSchedule && !saving) {
      const createCloneRes = await createCloneSession({
        allSessions: allSessions,
        application_id: selectedApplication.id,
        coordinator_id: selCoordinator,
        is_get_more_option: false,
        scheduleName: `Interview for ${selectedApplication.public_jobs.job_title} - ${selectedApplication.candidates.first_name}`,
        session_ids: [],
      });

      await supabase
        .from('interview_session')
        .update({
          break_duration: value,
        })
        .eq(
          'id',
          createCloneRes.refSessions.find((s) => s.id === editSession.id).newId,
        );

      await fetchInterviewDataByApplication();
      handleClose();
    } else {
      await supabase
        .from('interview_session')
        .update({
          break_duration: value,
        })
        .eq('id', editSession.id);
      await fetchInterviewDataByApplication();
      handleClose();
    }
    setSaving(false);
  };

  const options = [30, 45, 60, 120, 1440, 2880, 4320].reduce(
    (acc, curr) => {
      acc.push({ name: getBreakLabel(curr), value: curr });
      return acc;
    },
    [] as { name: string; value: number }[],
  );

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <Drawer open={isEditBreakOpen} onClose={() => handleClose()} anchor='right'>
      <Stack overflow={'hidden'}>
        {editSession && (
          <SideDrawerBlock
            onClickClose={{ onClick: () => handleClose() }}
            textPrimaryButton='Save'
            textTitle='Edit Session'
            slotSidedrawerBody={
              <Stack p={'4px'}>
                <DropDown
                  placeholder='Select break duration'
                  showIcons={false}
                  options={options}
                  value={value}
                  onChange={onChange}
                />
              </Stack>
            }
            onClickPrimaryButton={{
              onClick: () => {
                if (!saving) {
                  setSaving(true);
                  handleSave();
                }
              },
            }}
          />
        )}
      </Stack>
    </Drawer>
  );
}

export default BreakDrawerEdit;
