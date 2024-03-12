import { Drawer } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';

import { MemberListCard } from '@/devlink2';
import { InterviewerDetail, ModulesMoreMenu } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useInterviewerContext } from '@/src/context/InterviewerContext/InterviewerContext';
import toast from '@/src/utils/toast';

import InterviewerLevelSettings from './InterviewerLevelSettings';
import DynamicLoader from '../DynamicLoader';
import Interviews from '../Interviews';
import PauseResumeDialog from '../PauseResumeDialog';

function Interviewer({ openDrawer, setOpenDrawer }) {
  const {
    loading,
    modulesAndMapping,
    selectedInterviewer,
    handelRemoveMemberFormPanel,
    handelUpdateSchedule
  } = useInterviewerContext();
  const { handelMemberUpdate } = useAuthDetails();

  const [pauseResumeDialog, setPauseResumeDialog] = useState<{
    isOpen: boolean;
    isAll: boolean;
    panel_id?: string | null;
    type: 'pause' | 'resume' | 'remove';
  }>({ isOpen: false, isAll: false, type: 'pause', panel_id: null });
  return (
    <>
      {loading && <DynamicLoader />}
      <>
        {selectedInterviewer && (
          <>
            <Drawer
              anchor='right'
              open={openDrawer}
              onClose={() => {
                setOpenDrawer(false);
              }}
            >
              <InterviewerLevelSettings
                setOpenDrawer={setOpenDrawer}
                initialData={selectedInterviewer.scheduling_settings as any}
                updateSettings={(x) => {
                  return handelMemberUpdate({
                    user_id: selectedInterviewer.user_id,
                    data: { scheduling_settings: x }
                  });
                }}
                isOverflow={true}
              />
            </Drawer>
            <InterviewerDetail
              textEmail={selectedInterviewer.email}
              textDepartment={selectedInterviewer.position}
              textInterviewerName={
                selectedInterviewer.first_name +
                ' ' +
                (selectedInterviewer.last_name
                  ? selectedInterviewer.last_name
                  : '')
              }
              slotInterviewerAvatar={
                <MuiAvatar
                  variant='square'
                  height='80px'
                  width='80px'
                  fontSize='24px'
                  level={selectedInterviewer.first_name}
                  src={selectedInterviewer.profile_image}
                />
              }
              textTimeZone={
                selectedInterviewer.scheduling_settings?.timeZone.label
              }
              textInterviewPerDay={
                '0/' +
                  selectedInterviewer.scheduling_settings?.interviewLoad
                    ?.dailyLimit.value || 0
              }
              textInterviewPerWeek={
                '0/' +
                  selectedInterviewer.scheduling_settings?.interviewLoad
                    ?.weeklyLimit.value || 0
              }
              slotQualifiedModules={
                modulesAndMapping.moduleMapping[
                  selectedInterviewer.user_id
                ]?.filter((ele) => {
                  if (
                    modulesAndMapping.modules[String(ele)].training_status ===
                    'qualified'
                  ) {
                    return ele;
                  }
                })?.length
                  ? modulesAndMapping.moduleMapping[
                      selectedInterviewer.user_id
                    ]?.map((item) => {
                      const pauseResumeDetails = modulesAndMapping.modules[
                        String(item)
                      ].pause_json
                        ? modulesAndMapping.modules[String(item)].pause_json[
                            selectedInterviewer.user_id
                          ]
                        : null;

                      return (
                        <MemberListCard
                          isMoveToQualifierVisible={false}
                          isTrainingProgessVisible={false}
                          key={modulesAndMapping.modules[String(item)].id}
                          textName={
                            modulesAndMapping.modules[String(item)].name
                          }
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
                    })
                  : null
              }
              slotQualifiedModulesMoreMenu={
                modulesAndMapping.moduleMapping[
                  selectedInterviewer.user_id
                ]?.filter((ele) => {
                  if (
                    modulesAndMapping.modules[String(ele)].training_status ===
                    'qualified'
                  ) {
                    return ele;
                  }
                })?.length ? (
                  <ModulesMoreMenu
                    isQualifiedModules={true}
                    onClickRemove={{
                      onClick: () => {
                        setPauseResumeDialog({
                          isOpen: true,
                          isAll: true,
                          type: 'remove'
                        });
                      }
                    }}
                    onClickPause={{
                      onClick: () => {
                        setPauseResumeDialog({
                          isOpen: true,
                          isAll: true,
                          type: 'pause'
                        });
                      }
                    }}
                  />
                ) : null
              }
              slotTrainingModulesMoreMenu={<></>}
              slotTrainingModules={
                modulesAndMapping.moduleMapping[selectedInterviewer.user_id]
                  ?.length
                  ? modulesAndMapping.moduleMapping[
                      selectedInterviewer.user_id
                    ]?.map((item) => {
                      const pauseResumeDetails = modulesAndMapping.modules[
                        String(item)
                      ].pause_json
                        ? modulesAndMapping.modules[String(item)].pause_json[
                            selectedInterviewer.user_id
                          ]
                        : null;

                      if (
                        modulesAndMapping.modules[String(item)]
                          .training_status === 'training'
                      )
                        return (
                          <MemberListCard
                            isMoveToQualifierVisible={false}
                            isTrainingProgessVisible={true}
                            key={modulesAndMapping.modules[String(item)].id}
                            textName={
                              modulesAndMapping.modules[String(item)].name
                            }
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
                    })
                  : null
              }
              slotScheduleTabs={
                <>
                  <Interviews />
                </>
              }
            />
          </>
        )}
      </>
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
