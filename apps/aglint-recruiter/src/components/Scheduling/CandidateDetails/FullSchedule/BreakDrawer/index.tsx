import { Drawer, Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { SideDrawerBlock } from '@/devlink2/SideDrawerBlock';
import { DropDown } from '@/src/components/Jobs/Job/Interview-Plan/sessionForms';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiBodyParamsSessionCache } from '@/src/pages/api/scheduling/application/candidatesessioncache';
import { breakDurations } from '@/src/utils/scheduling/const';
import { createCloneSession } from '@/src/utils/scheduling/createCloneSession';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { useGetScheduleApplication } from '../../hooks';
import { setIsEditBreakOpen, useSchedulingApplicationStore } from '../../store';
import { useEditSessionDrawerStore } from '../EditDrawer/store';

function BreakDrawerEdit() {
  const { recruiter, recruiterUser } = useAuthDetails();
  const {
    allSessions,
    selectedApplication,
    selectedSchedule,
    isEditBreakOpen,
  } = useSchedulingApplicationStore((state) => ({
    selectedSchedule: state.selectedSchedule,
    allSessions: state.initialSessions,
    selectedApplication: state.selectedApplication,
    isEditBreakOpen: state.isEditBreakOpen,
  }));
  const { fetchInterviewDataByApplication } = useGetScheduleApplication();
  const [value, setValue] = useState<number>(30);
  const [saving, setSaving] = useState(false);

  const editSession = useEditSessionDrawerStore((state) => state.editSession);

  useEffect(() => {
    if (editSession) {
      setValue(editSession.interview_session.break_duration);
    }
  }, [editSession?.interview_session.id]);

  const handleClose = () => {
    if (!saving) setIsEditBreakOpen(false);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      if (!selectedSchedule && !saving) {
        const res = await axios.post(
          '/api/scheduling/application/candidatesessioncache',
          {
            allSessions: allSessions,
            application_id: selectedApplication.id,
            is_get_more_option: false,
            scheduleName: `Interview for ${selectedApplication.public_jobs.job_title} - ${selectedApplication.candidates.first_name}`,
            session_ids: [],
            recruiter_id: recruiter.id,
            rec_user_id: recruiterUser.user_id,
          } as ApiBodyParamsSessionCache,
        );

        let createCloneRes: Awaited<ReturnType<typeof createCloneSession>>;

        if (res.status === 200 && res.data) {
          createCloneRes = res.data;
        }

        if (createCloneRes) {
          await supabase
            .from('interview_session')
            .update({
              break_duration: value,
            })
            .eq(
              'id',
              createCloneRes.refSessions.find(
                (s) =>
                  s.interview_session.id === editSession.interview_session.id,
              ).newId,
            );
        } else {
          toast.error('Error caching session.');
        }
      } else {
        await supabase
          .from('interview_session')
          .update({
            break_duration: value,
          })
          .eq('id', editSession.interview_session.id);
      }
      await fetchInterviewDataByApplication();
      handleClose();
    } catch (e) {
      toast.error('Error saving break duration.');
    } finally {
      setSaving(false);
    }
  };

  const options = breakDurations.reduce(
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
            textTitle='Edit break duration'
            slotSidedrawerBody={
              <Stack p={'var(--space-4)'}>
                <DropDown
                  placeholder='Select break duration'
                  showIcons={false}
                  options={options}
                  value={value}
                  onChange={onChange}
                />
              </Stack>
            }
            onClickClose={{ onClick: () => handleClose() }}
            slotButton={
              <>
                <ButtonSoft
                  textButton='Cancel'
                  color={'neutral'}
                  size={2}
                  onClickButton={{ onClick: () => handleClose() }}
                />
                <ButtonSolid
                  isLoading={saving}
                  textButton='Save'
                  size={2}
                  onClickButton={{
                    onClick: () => {
                      if (!saving) {
                        handleSave();
                      }
                    },
                  }}
                />
              </>
            }
          />
        )}
      </Stack>
    </Drawer>
  );
}

export default BreakDrawerEdit;
