/* eslint-disable no-unused-vars */
import { Drawer } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';

import { MemberListCard } from '@/devlink2';
import { InterviewerDetail, ModulesMoreMenu } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useInterviewerContext } from '@/src/context/InterviewerContext/InterviewerContext';
import {
  interviewerDetailsType,
  useImrQuery
} from '@/src/pages/scheduling/interviewer/[member_id]';
import toast from '@/src/utils/toast';

import InterviewerLevelSettings from './InterviewerLevelSettings';
import Interviews from '../Interviews';
import PauseResumeDialog from '../PauseResumeDialog';

function Interviewer({
  openDrawer,
  setOpenDrawer,
  interviewerDetails
}: {
  openDrawer: boolean;
  setOpenDrawer: (x: boolean) => void;
  interviewerDetails: interviewerDetailsType;
}) {
  const { handelUpdateSchedule, handelRemoveMemberFormPanel } =
    useInterviewerContext();
  const { handelMemberUpdate } = useAuthDetails();

  const [pauseResumeDialog, setPauseResumeDialog] = useState<{
    isOpen: boolean;
    isAll: boolean;
    panel_id?: string | null;
    type: 'pause' | 'resume' | 'remove';
  }>({ isOpen: false, isAll: false, type: 'pause', panel_id: null });
  const { refetch } = useImrQuery();
  return (
    <>
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
            initialData={
              interviewerDetails.interviewer.scheduling_settings as any
            }
            updateSettings={(x) => {
              return handelMemberUpdate({
                user_id: interviewerDetails.interviewer.user_id,
                data: { scheduling_settings: x }
              });
            }}
            isOverflow={true}
          />
        </Drawer>
        <InterviewerDetail
          textEmail={interviewerDetails.interviewer.email}
          textDepartment={interviewerDetails.interviewer.position}
          textInterviewerName={
            interviewerDetails.interviewer.first_name +
            ' ' +
            (interviewerDetails.interviewer.last_name
              ? interviewerDetails.interviewer.last_name
              : '')
          }
          slotInterviewerAvatar={
            <MuiAvatar
              variant='square'
              height='80px'
              width='80px'
              fontSize='24px'
              level={interviewerDetails.interviewer.first_name}
              src={interviewerDetails.interviewer.profile_image}
            />
          }
          textTimeZone={
            interviewerDetails.interviewer.scheduling_settings?.timeZone.label
          }
          textInterviewPerDay={
            '0/' +
              interviewerDetails.interviewer.scheduling_settings?.interviewLoad
                ?.dailyLimit.value || 0
          }
          textInterviewPerWeek={
            '0/' +
              interviewerDetails.interviewer.scheduling_settings?.interviewLoad
                ?.weeklyLimit.value || 0
          }
          slotQualifiedModules={
            interviewerDetails.modules.filter(
              (item) => item.training_status === 'qualified'
            ).length
              ? interviewerDetails.modules
                  .filter((item) => item.training_status === 'qualified')
                  .map((module) => {
                    const { interview_module, module_id, pause_json } = module;
                    return (
                      <MemberListCard
                        isMoveToQualifierVisible={false}
                        isTrainingProgessVisible={false}
                        key={module_id}
                        textName={interview_module.name}
                        isPauseResumeVisible={Boolean(pause_json)}
                        isPauseVisible={!pause_json}
                        isResumeVisible={Boolean(pause_json)}
                        isScheduleCountVisible={false}
                        isProfileVisible={false}
                        isRoleVisible={false}
                        textPauseResumeDate={
                          pause_json
                            ? pause_json.isManual
                              ? 'Paused indefinably'
                              : pause_json.end_date
                                ? `Till ${dayjs(pause_json.end_date).format('DD MMMM YYYY')}`
                                : '--'
                            : ''
                        }
                        onClickPauseInterview={{
                          onClick: () => {
                            setPauseResumeDialog((pre) => ({
                              ...pre,
                              isOpen: true,
                              type: 'pause',
                              panel_id: module_id
                            }));
                          }
                        }}
                        onClickResumeInterview={{
                          onClick: () => {
                            setPauseResumeDialog((pre) => ({
                              ...pre,
                              isOpen: true,
                              type: 'resume',
                              panel_id: module_id
                            }));
                          }
                        }}
                        onClickRemoveModule={{
                          onClick: () => {
                            setPauseResumeDialog((pre) => ({
                              ...pre,
                              isOpen: true,
                              type: 'remove',
                              panel_id: module_id
                            }));
                          }
                        }}
                      />
                    );
                  })
              : null
          }
          slotTrainingModules={
            interviewerDetails.modules.filter(
              (item) => item.training_status === 'training'
            ).length
              ? interviewerDetails.modules
                  .filter((item) => item.training_status === 'training')
                  .map((module) => {
                    const { interview_module, module_id, pause_json } = module;
                    return (
                      <MemberListCard
                        isMoveToQualifierVisible={false}
                        isTrainingProgessVisible={false}
                        key={module_id}
                        textName={interview_module.name}
                        isPauseResumeVisible={Boolean(pause_json)}
                        isPauseVisible={!pause_json}
                        isResumeVisible={Boolean(pause_json)}
                        isScheduleCountVisible={false}
                        isProfileVisible={false}
                        isRoleVisible={false}
                        textPauseResumeDate={
                          pause_json
                            ? pause_json.isManual
                              ? 'Paused indefinably'
                              : pause_json.end_date
                                ? `Till ${dayjs(pause_json.end_date).format('DD MMMM YYYY')}`
                                : '--'
                            : ''
                        }
                        onClickPauseInterview={{
                          onClick: () => {
                            setPauseResumeDialog((pre) => ({
                              ...pre,
                              isOpen: true,
                              type: 'pause',
                              panel_id: module_id
                            }));
                          }
                        }}
                        onClickResumeInterview={{
                          onClick: () => {
                            setPauseResumeDialog((pre) => ({
                              ...pre,
                              isOpen: true,
                              type: 'resume',
                              panel_id: module_id
                            }));
                          }
                        }}
                        onClickRemoveModule={{
                          onClick: () => {
                            setPauseResumeDialog((pre) => ({
                              ...pre,
                              isOpen: true,
                              type: 'remove',
                              panel_id: module_id
                            }));
                          }
                        }}
                      />
                    );
                  })
              : null
          }
          slotQualifiedModulesMoreMenu={
            <ShowCode>
              <ShowCode.When
                isTrue={Boolean(
                  interviewerDetails.modules.filter(
                    (item) => item.training_status === 'qualified'
                  ).length
                )}
              >
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
              </ShowCode.When>
            </ShowCode>
          }
          slotTrainingModulesMoreMenu={
            <ShowCode>
              <ShowCode.When
                isTrue={Boolean(
                  interviewerDetails.modules.filter(
                    (item) => item.training_status === 'training'
                  ).length
                )}
              >
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
              </ShowCode.When>
            </ShowCode>
          }
          slotScheduleTabs={
            <>
              <Interviews />
            </>
          }
        />
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
        pause={async (pause_json) => {
          if (interviewerDetails.interviewer) {
            setPauseResumeDialog((pre) => ({
              ...pre,
              isAll: false,
              isOpen: false
            }));
            await handelUpdateSchedule({
              panel_id: pauseResumeDialog.isAll
                ? undefined
                : pauseResumeDialog.panel_id,
              pause_json
            });
            refetch();
          }
        }}
        resume={async () => {
          setPauseResumeDialog((pre) => ({
            ...pre,
            isAll: false,
            isOpen: false
          }));
          await handelUpdateSchedule({
            panel_id: pauseResumeDialog.isAll
              ? undefined
              : pauseResumeDialog.panel_id,
            pause_json: null
          });
          refetch();
        }}
        remove={async () => {
          if (interviewerDetails.interviewer) {
            setPauseResumeDialog((pre) => ({
              ...pre,
              isAll: false,
              isOpen: false
            }));
            await handelRemoveMemberFormPanel({
              panel_id: pauseResumeDialog.isAll
                ? undefined
                : pauseResumeDialog.panel_id
            }).catch((e) => {
              toast.error(e.message);
            });
            refetch();
          }
        }}
      />
    </>
  );
}

export default Interviewer;
