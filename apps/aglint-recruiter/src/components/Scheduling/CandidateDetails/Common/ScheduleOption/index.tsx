import { PlanCombinationRespType } from '@aglint/shared-types';
import { Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import { AvailableOptionCardDate } from '@/devlink2/AvailableOptionCardDate';
import { OptionAvailable } from '@/devlink2/OptionAvailable';
import { OptionAvailableCard } from '@/devlink2/OptionAvailableCard';
import { AvatarWithName } from '@/devlink3/AvatarWithName';
import Loader from '@/src/components/Common/Loader';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';
import { getFullName } from '@/src/utils/jsonResume';

interface SchedulingOptionCompProps {
  isBadgeVisible?: boolean;
  schedulingOptions: PlanCombinationRespType[];
  isInterviewVisible?: boolean;
  loading?: boolean;
  total?: number;
  isDebrief?: boolean;
  selectedId?: string;
  setSelectedId?: React.Dispatch<React.SetStateAction<string>>;
}

function SchedulingOptionComp({
  schedulingOptions,
  isInterviewVisible = true,
  loading = false,
  total = 0,
  isDebrief = false,
  selectedId,
  setSelectedId,
}: SchedulingOptionCompProps) {
  return (
    <Stack spacing={2}>
      {!loading && schedulingOptions.length === 0 && <div>Unable to fetch</div>}
      {loading && schedulingOptions.length === 0 && (
        <Stack width={'100%'} height={'100%'}>
          <Loader />
        </Stack>
      )}
      {schedulingOptions?.map((option, ind) => {
        return (
          <Stack
            key={ind}
            sx={{
              cursor: isDebrief ? 'pointer' : 'auto',
            }}
            onClick={() => {
              if (isDebrief) {
                if (option.plan_comb_id !== selectedId) {
                  setSelectedId(option.plan_comb_id);
                } else {
                  setSelectedId(null);
                }
              }
            }}
          >
            <OptionAvailableCard
              isActive={selectedId === option.plan_comb_id}
              slotCardDate={option.sessions?.map((ses, indOpt) => {
                return (
                  <AvailableOptionCardDate
                    isDateWrapVisible={
                      indOpt == 0 ||
                      !dayjs(option.sessions[indOpt - 1]?.start_time).isSame(
                        ses.start_time,
                        'day',
                      ) // temp fix for hiding date.
                    }
                    textDate={dayjs(ses.start_time).format('DD')}
                    textDay={dayjs(ses.start_time).format('dddd')}
                    textMonth={dayjs(ses.start_time).format('MMM')}
                    key={ind}
                    slotOptionAvailable={
                      <>
                        <OptionAvailable
                          textTime={`${dayjs(ses.start_time).format(
                            'hh:mm A',
                          )} - ${dayjs(ses.end_time).format('hh:mm A')}`}
                          textTitle={ses.module_name}
                          key={ind}
                          isTitleVisible={true}
                          isBreakVisible={false}
                          slotMember={
                            isInterviewVisible && (
                              <Stack
                                direction={'row'}
                                sx={{
                                  flexWrap: 'wrap',
                                  gap: 2.5,
                                }}
                              >
                                {ses.qualifiedIntervs?.map((int) => {
                                  return (
                                    <AvatarWithName
                                      key={int.email}
                                      textName={getFullName(
                                        int.first_name,
                                        int.last_name,
                                      )}
                                      slotAvatar={
                                        <MuiAvatar
                                          level={getFullName(
                                            int.first_name,
                                            int.last_name,
                                          )}
                                          src={int?.profile_image}
                                          variant={'rounded-small'}
                                        />
                                      }
                                    />
                                  );
                                })}
                                {ses.trainingIntervs?.map((int) => {
                                  return (
                                    <AvatarWithName
                                      key={int.email}
                                      isShadowVisible={false}
                                      isReverseShadowVisible={false}
                                      textName={getFullName(
                                        int.first_name,
                                        int.last_name,
                                      )}
                                      slotAvatar={
                                        <MuiAvatar
                                          level={getFullName(
                                            int.first_name,
                                            int.last_name,
                                          )}
                                          src={int?.profile_image}
                                          variant={'rounded-small'}
                                        />
                                      }
                                    />
                                  );
                                })}
                              </Stack>
                            )
                          }
                        />
                        {indOpt !== option.sessions.length - 1 &&
                          ses.break_duration > 0 && (
                            <OptionAvailable
                              key={ind}
                              textTime={''}
                              textBreakTime={
                                getBreakLabel(ses.break_duration) || ''
                              }
                              isTitleVisible={false}
                              isBreakVisible={true}
                            />
                          )}
                      </>
                    }
                  />
                );
              })}
            />
          </Stack>
        );
      })}
      {total - schedulingOptions.length > 0 && (
        <Typography variant={'body2'} textAlign={'center'}>
          {total - schedulingOptions.length} more options available
        </Typography>
      )}
    </Stack>
  );
}

export default SchedulingOptionComp;
