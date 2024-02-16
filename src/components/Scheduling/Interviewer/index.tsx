import { Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { MyScheduleLanding } from '@/devlink';
import { Breadcrum, PageLayout } from '@/devlink2';
import { API_FAIL_MSG } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import Dashboard from './Dashboard';
import SelectedCandidateDetails from './SelectedCandidateDetails';
import {
  ScheduleType,
  setLoading,
  setMembers,
  setSchedules,
  setSelectedSchedule,
  useInterviewerStore,
} from './store';
import Loader from '../../Common/Loader';

const InterviewerComp = () => {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const loading = useInterviewerStore((state) => state.loading);
  const selectedSchedule = useInterviewerStore(
    (state) => state.selectedSchedule,
  );

  const getConsent = async () => {
    try {
      const { data } = await axios.get('/api/scheduling/google-consent');

      return router.push(data);
    } catch (error) {
      toast.error(API_FAIL_MSG);
    }
  };

  useEffect(() => {
    if (recruiterUser?.user_id) fetchSchedule();
  }, [recruiterUser?.user_id]);

  const fetchSchedule = async () => {
    try {
      const { data, error } = await supabase.rpc(
        'get_interview_schedule_by_user_id',
        {
          target_user_id: recruiterUser?.user_id,
        },
      );
      let user_ids = [];

      (data as unknown as ScheduleType[]).forEach((sch) => {
        sch.schedule.panel_users.forEach(
          (user: { user_id: string; must: string }) => {
            if (user_ids.indexOf(user.user_id) === -1)
              user_ids.push(user.user_id);
          },
        );
      });

      const { data: usersData, error: usersError } = await supabase
        .from('recruiter_user')
        .select('user_id, first_name, email, profile_image')
        .in('user_id', user_ids);

      if (usersError) throw usersError;

      setMembers(usersData);

      if (error) throw error;
      setSchedules(data as unknown as ScheduleType[]);
    } catch (error) {
      toast.error(API_FAIL_MSG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageLayout
        slotTopbarLeft={
          <>
            <Breadcrum
              isLink={selectedSchedule ? true : false}
              onClickLink={{
                onClick: () => {
                  setSelectedSchedule(null);
                },
              }}
            />
            {selectedSchedule && (
              <Breadcrum
                showArrow
                textName={selectedSchedule?.schedule.schedule_name}
              />
            )}
          </>
        }
        slotBody={
          !(recruiterUser.schedule_auth as any)?.access_token ? (
            <MyScheduleLanding
              onClickConnectCalender={{
                onClick: getConsent,
              }}
              textConnectedTo={`Connected to ${(recruiterUser.schedule_auth as any)?.email}`}
              isConnectedVisible={Boolean(
                (recruiterUser.schedule_auth as any)?.access_token,
              )}
              isConnectCalenderVisible={
                !(recruiterUser.schedule_auth as any)?.access_token
              }
            />
          ) : (
            <Stack height={'100vh'}>
              {loading ? (
                <Loader />
              ) : (
                <>
                  {!selectedSchedule ? (
                    <Dashboard />
                  ) : (
                    <SelectedCandidateDetails />
                  )}
                </>
              )}
            </Stack>
          )
        }
      />
    </>
  );
};

export default InterviewerComp;
