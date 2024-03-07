import dayjs from 'dayjs';
import React, { useState } from 'react';

import {
  AllInterviewersDetail,
  MemberListCard,
  ScheduleInfo
} from '@/devlink2';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { Members } from '@/src/components/Interviewer/MySchedule';
import SchedulingSettings from '@/src/components/Scheduling/Settings';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useInterviewerContext } from '@/src/context/InterviewerContext/InterviewerContext';
import toast from '@/src/utils/toast';

import DynamicLoader from '../DynamicLoader';
import Interviews from '../Interviews';
import PauseResumeDialog from '../PauseResumeDialog';

function Interviewer({
  selectedInterviewEvent,
  setSelectedInterviewEvent
}: {
  selectedInterviewEvent: any;
  // eslint-disable-next-line no-unused-vars
  setSelectedInterviewEvent: (x: any) => void;
}) {
  const {
    loading,
    modulesAndMapping,
    selectedInterviewer,
    interviewsData,
    handelRemoveMemberFormPanel,
    handelUpdateSchedule
  } = useInterviewerContext();

  const { handelMemberUpdate } = useAuthDetails();
  // const [selectedInterviewEvent, setSelectedInterviewEvent] = useState<
  //   (typeof interviewsData)[0] | null
  // >(null);
  const [pauseResumeDialog, setPauseResumeDialog] = useState<{
    isOpen: boolean;
    isAll: boolean;
    panel_id?: string;
    type: 'pause' | 'resume' | 'remove';
  }>({ isOpen: false, isAll: false, type: 'pause' });
  return (
    <>
      {loading && <DynamicLoader />}
      {!selectedInterviewEvent ? (
        <>
          {selectedInterviewer && (
            <AllInterviewersDetail
              textModuleDescription={selectedInterviewer.first_name}
              slotSchedule={
                <Interviews
                  allInterviews={interviewsData}
                  onClick={(object: any) => setSelectedInterviewEvent(object)}
                />
              }
              slotModule={
                <>
                  {modulesAndMapping.moduleMapping[
                    selectedInterviewer.user_id
                  ]?.map((item) => {
                    const pauseResumeDetails = modulesAndMapping.modules[
                      String(item)
                    ].pause_json
                      ? modulesAndMapping.modules[String(item)].pause_json[
                          selectedInterviewer.user_id
                        ]
                      : null;
                    // console.log({ pauseResumeDetails });
                    return (
                      <MemberListCard
                        key={modulesAndMapping.modules[String(item)].id}
                        textName={modulesAndMapping.modules[String(item)].name}
                        isPauseResumeVisible={Boolean(pauseResumeDetails)}
                        isPauseVisible={!pauseResumeDetails}
                        isResumeVisible={Boolean(pauseResumeDetails)}
                        isScheduleCountVisible={false}
                        isProfileVisible={false}
                        isRoleVisible={false}
                        textPauseResumeDate={
                          pauseResumeDetails
                            ? pauseResumeDetails.isManual
                              ? 'Paused indefinably'
                              : pauseResumeDetails.end_date
                                ? `Till ${dayjs(pauseResumeDetails.end_date).format('DD MMMM YYYY')}`
                                : '--'
                            : ''
                        }
                        onClickPauseInterview={{
                          onClick: () => {
                            setPauseResumeDialog((pre) => ({
                              ...pre,
                              isOpen: true,
                              type: 'pause',
                              panel_id: item
                            }));
                          }
                        }}
                        onClickResumeInterview={{
                          onClick: () => {
                            setPauseResumeDialog((pre) => ({
                              ...pre,
                              isOpen: true,
                              type: 'resume',
                              panel_id: item
                            }));
                          }
                        }}
                        onClickRemoveModule={{
                          onClick: () => {
                            setPauseResumeDialog((pre) => ({
                              ...pre,
                              isOpen: true,
                              type: 'remove',
                              panel_id: item
                            }));
                          }
                        }}
                      />
                    );
                  })}
                </>
              }
              onClickRemoveModules={{
                onClick: () => {
                  setPauseResumeDialog({
                    isOpen: true,
                    isAll: true,
                    type: 'remove'
                  });
                }
              }}
              onClickPauseModules={{
                onClick: () => {
                  setPauseResumeDialog({
                    isOpen: true,
                    isAll: true,
                    type: 'pause'
                  });
                }
              }}
              slotTimeZone={
                <>
                  <SchedulingSettings
                    initialData={selectedInterviewer.scheduling_settings as any}
                    updateSettings={(x) => {
                      return handelMemberUpdate({
                        user_id: selectedInterviewer.user_id,
                        data: { scheduling_settings: x }
                      });
                    }}
                    isOverflow={false}
                  />
                </>
              }
            />
          )}
        </>
      ) : (
        <ScheduleInfo
          slotProfileImage={
            <MuiAvatar
              level={'Tom Odel'}
              width='20'
              variant='circular'
              fontSize='12px'
              height='20'
              src='/static/images/avatar/5.jpg'
            />
          }
          slotMeetingIcon={
            <MuiAvatar
              level={'Tom Odel'}
              width='14'
              variant='circular'
              fontSize='12px'
              height='14'
              src='https://logo.clearbit.com/meet.com'
            />
          }
          // @ts-ignore
          textDate={selectedInterviewEvent?.date.day}
          slotMemberImage={
            // @ts-ignore
            <Members members={selectedInterviewEvent?.members} />
          }
        />
      )}
      <PauseResumeDialog
        pauseResumeDialog={pauseResumeDialog}
        close={() => {
          setPauseResumeDialog((pre) => ({
            ...pre,
            isAll: false,
            isOpen: false
          }));
        }}
        pause={(pause_json) => {
          if (selectedInterviewer) {
            setPauseResumeDialog((pre) => ({
              ...pre,
              isAll: false,
              isOpen: false
            }));
            handelUpdateSchedule({
              panel_id: pauseResumeDialog.isAll
                ? undefined
                : pauseResumeDialog.panel_id,
              pause_json,
              isAll: pauseResumeDialog.isAll
            });
          }
        }}
        resume={() => {
          setPauseResumeDialog((pre) => ({
            ...pre,
            isAll: false,
            isOpen: false
          }));
          handelUpdateSchedule({
            panel_id: pauseResumeDialog.isAll
              ? undefined
              : pauseResumeDialog.panel_id,
            pause_json: null,
            isAll: pauseResumeDialog.isAll
          });
        }}
        remove={() => {
          if (selectedInterviewer) {
            setPauseResumeDialog((pre) => ({
              ...pre,
              isAll: false,
              isOpen: false
            }));
            handelRemoveMemberFormPanel({
              panel_id: pauseResumeDialog.isAll
                ? undefined
                : pauseResumeDialog.panel_id,
              isAll: pauseResumeDialog.isAll
            }).catch((e) => {
              toast.error(e.message);
            });
          }
        }}
      />
    </>
  );
}

export default Interviewer;
