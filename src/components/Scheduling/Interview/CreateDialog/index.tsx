/* eslint-disable security/detect-object-injection */
import { AvatarGroup, Drawer } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import {
  InterviewpanelPill,
  InvitedCandidate,
  LoadedSlotPill,
  LoadedSlots,
  ScheduleInterview,
  ScheduleInterviewFill,
  ScheduleInterviewLoadedSlots,
  ScheduleInterviewLoading,
} from '@/devlink';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { InterviewScheduleTypeDB } from '@/src/types/data.types';
import { Json } from '@/src/types/schema';
import { getFullName } from '@/src/utils/jsonResume';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import TeamAutoComplete from './TeamTextField';
import IconScheduleType from '../ListCard/Icon';
import {
  ApplicationList,
  setApplicationList,
  setIsCreateScheduleOpen,
  setSelectedPanel,
  setSelectedUsers,
  useInterviewStore,
} from '../store';
import { findIntersection, mailHandler, TimeSlot } from '../utils';

function CreateDialog() {
  const { members, recruiter } = useAuthDetails();
  const isCreateScheduleOpen = useInterviewStore(
    (state) => state.isCreateScheduleOpen,
  );
  const selectedApplication = useInterviewStore(
    (state) => state.selectedApplication,
  );
  const applicationList = useInterviewStore((state) => state.applicationList);
  const selectedUsers = useInterviewStore((state) => state.selectedUsers);
  const slelectedPanel = useInterviewStore((state) => state.selectedPanel);

  const [scheduleType, setScheduleType] =
    useState<InterviewScheduleTypeDB['schedule_type']>('google_meet');

  const [name, setName] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const [filteredSlots, setFilteredSlots] = useState<
    { date: string; slots: TimeSlot[] }[]
  >([]);

  useEffect(() => {
    if (selectedApplication)
      setName(
        `Interview for ${selectedApplication?.public_jobs?.job_title} - ${selectedApplication?.candidates?.first_name}`,
      );
  }, [selectedApplication]);

  const clickContinue = async () => {
    try {
      setStep(2);
      const { data, error } = await supabase
        .from('interview_availabilties')
        .select('*')
        .in(
          'user_id',
          selectedUsers
            .filter((u) => u.must !== 'not selected')
            .map((u) => u.user_id),
        );
      if (error) throw new Error('Error fetching data');

      const res = data.map((user) => {
        return {
          user_id: user.user_id,
          availibility_json: user?.slot_availability
            ? user?.slot_availability[0]
            : null,
        };
      });

      const intersectionArray = Object.entries(
        findIntersection(res as any),
      ).map((t) => ({
        date: t[0],
        slots: t[1],
      }));

      setFilteredSlots(intersectionArray);
    } catch (e) {
      //
    } finally {
      setTimeout(() => {
        setStep(3);
      }, 2000);
    }
  };

  const inviteCandidate = async () => {
    try {
      const { data, error } = await supabase
        .from('interview_schedule')
        .insert({
          application_id: selectedApplication.applications.id,
          schedule_name: name,
          schedule_type: scheduleType,
          panel_id: slelectedPanel.id,
          status: 'pending',
          duration: 1800,
          panel_users: selectedUsers,
          selected_slots: filteredSlots as unknown as Json[],
        })
        .select();
      if (error) throw new Error('Error inserting data');
      applicationList.filter(
        (app) => app.applications.id === selectedApplication.applications.id,
      )[0].schedule = data[0] as ApplicationList['schedule'];
      setApplicationList([...applicationList]);

      mailHandler({
        id: data[0].id,
        candidate_name: selectedApplication?.candidates.first_name,
        company_logo: recruiter.logo,
        company_name: recruiter.name,
        schedule_name: selectedApplication?.schedule?.schedule_name,
      });
      setStep(4);
    } catch (e) {
      toast.error('Error inviting candidate');
      setStep(1);
    }
  };

  const clickScheduler = async () => {
    //
  };

  const totalSlots = filteredSlots
    ?.map((sch) => sch.slots.filter((s) => s.isSelected).length)
    .reduce((acc, cur) => acc + cur, 0);

  return (
    <Drawer
      anchor={'right'}
      open={isCreateScheduleOpen}
      onClose={() => {
        setIsCreateScheduleOpen(false);
        setSelectedPanel(null);
        setFilteredSlots([]);
        setStep(1);
      }}
    >
      <ScheduleInterview
        onClickClose={{
          onClick: () => {
            setIsCreateScheduleOpen(false);
            setSelectedPanel(null);
            setFilteredSlots([]);
            setStep(1);
          },
        }}
        isContinueVisible={step === 1}
        slotScheduleInterviewFill={
          step === 1 ? (
            <ScheduleInterviewFill
              isPanelMembersVisible={Boolean(slelectedPanel)}
              onClickGoogleMeet={{
                onClick: () => {
                  setScheduleType('google_meet');
                },
              }}
              onClickPersonMeeting={{
                onClick: () => {
                  setScheduleType('in_person_meeting');
                },
              }}
              onClickPhoneCall={{
                onClick: () => {
                  setScheduleType('phone_call');
                },
              }}
              onClickZoom={{
                onClick: () => {
                  setScheduleType('zoom');
                },
              }}
              isGoogleMeetActive={scheduleType === 'google_meet'}
              isPersonMeetingActive={scheduleType === 'in_person_meeting'}
              isPhoneCallActive={scheduleType === 'phone_call'}
              isZoomActive={scheduleType == 'zoom'}
              textName={selectedApplication?.candidates.first_name}
              slotProfileAvatar={
                <MuiAvatar
                  level={getFullName(
                    selectedApplication?.candidates.first_name,
                    selectedApplication?.candidates.last_name,
                  )}
                  src={selectedApplication?.candidates.avatar}
                  variant={'circular'}
                  width={'100%'}
                  height={'100%'}
                  fontSize={'12px'}
                />
              }
              slotInputName={
                <UITextField
                  placeholder='Name your Schedule'
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              }
              slotInterviewPanel={<TeamAutoComplete />}
              slotInterviewpanelPills={selectedUsers?.map((user) => {
                return (
                  <>
                    <InterviewpanelPill
                      textName={
                        members.find((m) => m.user_id == user.user_id)
                          ?.first_name
                      }
                      isOptional={user.must === 'optional'}
                      isSelected={user.must === 'selected'}
                      isNotSelected={user.must === 'not selected'}
                      onClickPill={{
                        onClick: () => {
                          if (user.must === 'not selected') {
                            selectedUsers.filter(
                              (u) => u.user_id == user.user_id,
                            )[0].must = 'selected';
                          } else if (user.must === 'selected') {
                            selectedUsers.filter(
                              (u) => u.user_id == user.user_id,
                            )[0].must = 'optional';
                          } else {
                            selectedUsers.filter(
                              (u) => u.user_id == user.user_id,
                            )[0].must = 'not selected';
                          }

                          setSelectedUsers([...selectedUsers]);
                        },
                      }}
                      slotProfileImage={
                        <MuiAvatar
                          src={
                            members.find((m) => m.user_id == user.user_id)
                              ?.profile_image
                          }
                          level={
                            members.find((m) => m.user_id == user.user_id)
                              ?.first_name
                          }
                          variant='circular'
                          height='24px'
                          width='24px'
                          fontSize='12px'
                        />
                      }
                    />
                  </>
                );
              })}
              textSelectedCount={`${selectedUsers.filter((u) => u.must === 'selected' || u.must === 'optional').length} out of 7 Members Selected , ${selectedUsers.filter((u) => u.must === 'optional').length} optional`}
            />
          ) : step === 2 ? (
            <ScheduleInterviewLoading />
          ) : step === 3 ? (
            <ScheduleInterviewLoadedSlots
              slotLoadedSlots={
                filteredSlots.length > 0
                  ? filteredSlots.map((f, ind) => {
                      return (
                        <LoadedSlots
                          key={f.date}
                          slotLoadedSlotPill={f.slots.map((slot) => {
                            return (
                              <LoadedSlotPill
                                isNotSelected={!slot.isSelected}
                                isSelectedActive={slot.isSelected}
                                onClickPill={{
                                  onClick: () => {
                                    filteredSlots[ind].slots.filter(
                                      (s) => s === slot,
                                    )[0].isSelected = !slot.isSelected;
                                    setFilteredSlots([...filteredSlots]);
                                  },
                                }}
                                key={slot.startTime}
                                textTime={`${dayjs(slot.startTime).format('hh:mm')} - ${dayjs(slot.endTime).format('hh:mm A')}`}
                                slotImage={
                                  <AvatarGroup
                                    sx={{
                                      '& .MuiAvatar-root': {
                                        width: '24px',
                                        height: '24px',
                                        fontSize: '8px',
                                      },
                                    }}
                                    total={slot.user_ids.length}
                                  >
                                    {slot.user_ids
                                      .slice(0, 5)
                                      .map((user_id) => {
                                        const member = members.filter(
                                          (member) =>
                                            member.user_id === user_id,
                                        )[0];
                                        return (
                                          <MuiAvatar
                                            key={user_id}
                                            src={member?.profile_image}
                                            level={member?.first_name}
                                            variant='circular'
                                            height='24px'
                                            width='24px'
                                            fontSize='8px'
                                          />
                                        );
                                      })}
                                  </AvatarGroup>
                                }
                              />
                            );
                          })}
                          textDay={dayjs(f.date).format('MMM D dddd YY')}
                        />
                      );
                    })
                  : 'No Slots Available'
              }
            />
          ) : (
            <InvitedCandidate
              textHeader={name}
              textMeetingPlatform={
                scheduleType == 'google_meet'
                  ? 'Google Meet'
                  : scheduleType == 'in_person_meeting'
                    ? 'In Person Meeting'
                    : scheduleType == 'phone_call'
                      ? 'Phone Call'
                      : 'Zoom'
              }
              textName={selectedApplication?.candidates.first_name}
              textSlotsBookedText={`${totalSlots} slots`}
              textInterviewPanelName={`${slelectedPanel?.name} (${selectedUsers.length} Members)`}
              slotMeetingIcon={<IconScheduleType type={scheduleType} />}
              slotProfileAvatar={
                <MuiAvatar
                  key={selectedApplication?.applications.id}
                  src={selectedApplication?.candidates?.avatar}
                  level={selectedApplication?.candidates?.first_name}
                  variant='circular'
                  height='20px'
                  width='20px'
                  fontSize='8px'
                />
              }
              onClickScheduler={{
                onClick: () => {
                  clickScheduler();
                },
              }}
              slotAvatarImage={
                <AvatarGroup
                  sx={{
                    '& .MuiAvatar-root': {
                      width: '20px',
                      height: '20px',
                      fontSize: '8px',
                    },
                  }}
                  total={selectedUsers.length}
                >
                  {selectedUsers.slice(0, 5).map((user) => {
                    const member = members.filter(
                      (member) => member.user_id === user.user_id,
                    )[0];
                    return (
                      <MuiAvatar
                        key={user.user_id}
                        src={member?.profile_image}
                        level={member?.first_name}
                        variant='circular'
                        height='20px'
                        width='20px'
                        fontSize='8px'
                      />
                    );
                  })}
                </AvatarGroup>
              }
            />
          )
        }
        isContinueDisable={
          !(
            Boolean(slelectedPanel) &&
            Boolean(name) &&
            selectedUsers.filter((u) => u.must !== 'not selected').length > 0
          )
        }
        isInviteCandidateButtonVisible={step === 3}
        isInviteCandidateDisable={
          filteredSlots.filter(
            (f) => f.slots.filter((s) => s.isSelected).length > 0,
          ).length === 0
        }
        onClickBack={{
          onClick: () => {
            setStep(1);
            setFilteredSlots([]);
          },
        }}
        onClickInviteCandidate={{
          onClick: () => {
            inviteCandidate();
          },
        }}
        onClickContinue={{
          onClick: () => {
            clickContinue();
          },
        }}
      />
    </Drawer>
  );
}

export default CreateDialog;
