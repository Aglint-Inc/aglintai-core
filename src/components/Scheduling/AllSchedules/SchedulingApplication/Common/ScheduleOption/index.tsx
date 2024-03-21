import { Stack } from '@mui/material';
import dayjs from 'dayjs';

import {
  AvailableOptionCardDate,
  OptionAvailable,
  OptionAvailableCard,
} from '@/devlink2';
import { AvatarWithName } from '@/devlink3';
import Loader from '@/src/components/Common/Loader';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { InterviewPlanScheduleDbType } from '@/src/components/JobInterviewPlan/types';
import { getFullName } from '@/src/utils/jsonResume';

interface SchedulingOptionCompProps {
  isBadgeVisible?: boolean;
  schedulingOptions: InterviewPlanScheduleDbType[];
  isInterviewVisible?: boolean;
  loading?: boolean;
}

function SchedulingOptionComp({
  isBadgeVisible = false,
  schedulingOptions,
  isInterviewVisible = true,
  loading = false,
}: SchedulingOptionCompProps) {
  return (
    <>
      {!loading && schedulingOptions.length === 0 && <div>Unable to fetch</div>}
      {loading && schedulingOptions.length === 0 && (
        <Stack width={'100%'} height={'100%'}>
          <Loader />
        </Stack>
      )}
      {schedulingOptions?.map((option, ind) => {
        return (
          <OptionAvailableCard
            isActive={false}
            key={ind}
            slotCardDate={option.plans?.map((pl, ind) => {
              return (
                <AvailableOptionCardDate
                  isDateWrapVisible={
                    !pl.isBreak // temp fix for hiding date.
                  }
                  textDate={dayjs(pl.start_time).format('DD')}
                  textDay={dayjs(pl.start_time).format('dddd')}
                  textMonth={dayjs(pl.start_time).format('MMM')}
                  key={ind}
                  slotOptionAvailable={
                    <OptionAvailable
                      textTime={`${dayjs(pl.start_time).format(
                        'hh:mm A',
                      )} - ${dayjs(pl.end_time).format('hh:mm A')}`}
                      textTitle={pl.module_name}
                      key={ind}
                      textBreakTime={pl.isBreak ? `${pl.duration} Minutes` : ''}
                      isTitleVisible={!pl.isBreak}
                      isBreakVisible={pl.isBreak}
                      slotMember={
                        isInterviewVisible && (
                          <Stack
                            direction={'row'}
                            sx={{
                              flexWrap: 'wrap',
                              gap: 2.5,
                            }}
                          >
                            {pl.selectedIntervs?.map((int) => {
                              return (
                                <AvatarWithName
                                  key={int.interv_id}
                                  textName={int.name}
                                  slotAvatar={
                                    <MuiAvatar
                                      level={getFullName(int.name, '')}
                                      src={int?.profile_img}
                                      variant={'circular'}
                                      width={'24px'}
                                      height={'24px'}
                                      fontSize={'12px'}
                                    />
                                  }
                                />
                              );
                            })}
                            {pl.shadowIntervs?.map((int) => {
                              return (
                                <AvatarWithName
                                  key={int.interv_id}
                                  isShadowVisible={isBadgeVisible && true}
                                  isReverseShadowVisible={
                                    isBadgeVisible && false
                                  }
                                  textName={int.name}
                                  slotAvatar={
                                    <MuiAvatar
                                      level={getFullName(int.name, '')}
                                      src={int?.profile_img}
                                      variant={'circular'}
                                      width={'24px'}
                                      height={'24px'}
                                      fontSize={'12px'}
                                    />
                                  }
                                />
                              );
                            })}
                            {pl.revShadowIntervs?.map((int) => {
                              return (
                                <AvatarWithName
                                  key={int.interv_id}
                                  isShadowVisible={isBadgeVisible && false}
                                  isReverseShadowVisible={
                                    isBadgeVisible && true
                                  }
                                  textName={int.name}
                                  slotAvatar={
                                    <MuiAvatar
                                      level={getFullName(int.name, '')}
                                      src={int?.profile_img}
                                      variant={'circular'}
                                      width={'24px'}
                                      height={'24px'}
                                      fontSize={'12px'}
                                    />
                                  }
                                />
                              );
                            })}
                          </Stack>
                        )
                      }
                    />
                  }
                />
              );
            })}
          />
        );
      })}
    </>
  );
}

export default SchedulingOptionComp;
