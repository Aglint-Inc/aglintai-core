import { Drag, DragAndDrop, Drop } from '@components/Common/dragDrop';
import { Stack } from '@mui/material';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { LoaderSvg } from '@/devlink';
import { Breadcrum, InterviewCordinator, PageLayout } from '@/devlink2';
import { InterviewPlan } from '@/devlink3';
import { palette } from '@/src/context/Theme/Theme';

import AvatarSelectDropDown from '../Common/AvatarSelect/AvatarSelectDropDown';
import SyncStatus from '../JobsDashboard/JobPostCreateUpdate/JobPostFormSlides/SyncStatus';
import { reorder } from '../JobsDashboard/JobPostCreateUpdate/JobPostFormSlides/utils/reorder';
import EditModule from './EditModule';
import InterviewModuleC from './InterviewModuleC';
import { handleUpdateDb, useInterviewPlan } from './store';
import { InterviewSession } from './types';
import { filterAddedModules } from './utils';

const JobInterviewPlan = () => {
  const {
    allModules,
    isloading,
    modules,
    jobStatus,
    jobTitle,
    jobId,
    syncStatus,
  } = useInterviewPlan((state) => state);
  const [editModuleId, setEditModuleId] = useState(-1);
  const [newModule, setNewModule] = useState<InterviewSession | null>(null);
  const router = useRouter();
  const handleDragEnd = (result) => {
    if (editModuleId !== -1) return;
    const { source, type, destination } = result;
    if (!destination) return;
    let sourceIdx = Number(source.index);
    let destIdx = Number(destination.index);
    if (modules[Number(sourceIdx)].isBreak) {
      if (destIdx === 0) return;
      if (destIdx === modules.length - 1) return;
    }
    if (type === 'droppable-category') {
      const updatedOrder = reorder(
        modules,
        sourceIdx,
        destIdx,
      ) as InterviewSession[];
      if (
        updatedOrder[0].isBreak ||
        updatedOrder[updatedOrder.length - 1].isBreak
      ) {
        return;
      }
      for (let i = 1; i < updatedOrder.length; ++i) {
        if (updatedOrder[i - 1].isBreak && updatedOrder[Number(i)].isBreak) {
          return;
        }
      }
      handleUpdateDb({ path: 'modules', value: updatedOrder });
    }
  };

  const handleAddBreak = () => {
    let intBreak: InterviewSession = {
      isBreak: true,
      allIntervs: [],
      duration: 30,
      meetingIntervCnt: 0,
      module_id: uuidv4(),
      module_name: '',
      session_name: '',
      selectedIntervs: [],
      revShadowIntervs: [],
      shadowIntervs: [],
      training_ints: [],
      meeting_type: null,
    };
    for (let i = 1; i < modules.length; ++i) {
      if (!modules[Number(i)].isBreak && !modules[Number(i - 1)].isBreak) {
        const newModules = [
          ...modules.slice(0, i),
          intBreak,
          ...modules.slice(i),
        ];
        handleUpdateDb({ path: 'modules', value: newModules });

        break;
      }
    }
  };

  return (
    <>
      <PageLayout
        slotTopbarLeft={
          <>
            <Breadcrum
              isLink
              onClickLink={{
                onClick: () => {
                  router.push(`/jobs?status=${jobStatus}`);
                },
              }}
              textName={`${capitalize(jobStatus)} Jobs`}
            />
            {!isloading && (
              <>
                <Breadcrum
                  isLink
                  onClickLink={{
                    onClick: () => {
                      router.push(`/jobs/${jobId}`);
                    },
                  }}
                  showArrow
                  textName={`${jobTitle}`}
                />
                <Breadcrum
                  onClickLink={{ onClick: () => {} }}
                  showArrow
                  textName={`Interview Plan`}
                />
              </>
            )}
          </>
        }
        slotSaving={
          <>
            <SyncStatus status={syncStatus} />
          </>
        }
        slotBody={
          <>
            {isloading ? (
              <Stack
                height={'100vh'}
                width={'100vw'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <LoaderSvg />
              </Stack>
            ) : (
              <InterviewPlan
                slotInterviewPlan={
                  <>
                    <CoordinatorDropDown />
                    <DragAndDrop onDragEnd={handleDragEnd}>
                      <Drop id={'droppable'} type={'droppable-category'}>
                        {modules.map((module, idx) => {
                          return (
                            <Drag
                              className='draggable-category'
                              key={module.module_id}
                              id={module.module_id}
                              index={idx}
                            >
                              <InterviewModuleC
                                module={module}
                                key={module.module_id}
                                editModuleId={editModuleId}
                                setEditModuleId={setEditModuleId}
                                currModuleIdx={idx}
                              />
                            </Drag>
                          );
                        })}
                      </Drop>
                    </DragAndDrop>

                    {newModule && (
                      <EditModule
                        onClose={() => setNewModule(null)}
                        initModule={newModule}
                        isBreak={false}
                        isEdit={false}
                        editModuleId={editModuleId}
                      />
                    )}
                  </>
                }
                onClickAddModule={{
                  onClick: () => {
                    const filteredModules = filterAddedModules(
                      allModules,
                      modules,
                    );
                    if (filteredModules.length > 0) {
                      let nModule: InterviewSession = {
                        ...filteredModules[0],
                        selectedIntervs: [...filteredModules[0].allIntervs],
                        meetingIntervCnt: 1,
                        duration: 30,
                        isBreak: false,
                        session_name: `Session ${modules.length + 1}`,
                      };
                      setNewModule(nModule);
                    }
                  },
                }}
                onClickAddBreak={{
                  onClick: handleAddBreak,
                }}
                onClickScheduler={{
                  onClick: () => {
                    router.push('/scheduling?tab=interviewModules');
                  },
                }}
              />
            )}
          </>
        }
      />
    </>
  );
};

export default JobInterviewPlan;

const CoordinatorDropDown = () => {
  const allTeamMembers = useInterviewPlan((state) => state.allTeamMembers);
  const interviewCordinator = useInterviewPlan(
    (state) => state.interviewCordinator,
  );

  // console.log(allTeamMembers, '🔥');

  return (
    <>
      <InterviewCordinator
        slotInput={
          <>
            <AvatarSelectDropDown
              onChange={(e) => {
                const cord = allTeamMembers.find(
                  (t) => t.interv_id === e.target.value,
                );
                handleUpdateDb({
                  path: 'interviewCordinator',
                  value: cord,
                });
              }}
              menuOptions={allTeamMembers.map((m) => ({
                name: m.name,
                value: m.interv_id,
                start_icon_url: m.profile_image,
              }))}
              showMenuIcons
              value={interviewCordinator?.interv_id ?? ''}
              defaultValue={allTeamMembers[0]?.interv_id}
            >
              <Stack direction={'row'} gap={2} ml={'auto'}>
                <Meta title='Bangalore' icon={<LocationIcon />} />
                <Meta title='Education' icon={<DepartmentIcon />} />
                <Meta title='Recruiter' icon={<RoleIcon />} />
              </Stack>
            </AvatarSelectDropDown>
          </>
        }
      />
    </>
  );
};

const Meta = ({
  title,
  icon = <></>,
}: {
  title: string;
  icon?: React.JSX.Element;
}) => {
  return (
    <Stack
      direction={'row'}
      gap={'4px'}
      style={{ fontSize: '12px', color: palette.grey['500'] }}
    >
      {icon}
      {title}
    </Stack>
  );
};

const RoleIcon = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6 3C5.70833 3 5.46875 3.09375 5.28125 3.28125C5.09375 3.46875 5 3.70833 5 4V16C5 16.2917 5.09375 16.5312 5.28125 16.7188C5.46875 16.9062 5.70833 17 6 17H14C14.2917 17 14.5312 16.9062 14.7188 16.7188C14.9062 16.5312 15 16.2917 15 16V4C15 3.70833 14.9062 3.46875 14.7188 3.28125C14.5312 3.09375 14.2917 3 14 3H6ZM4 4C4.02083 3.4375 4.21875 2.96875 4.59375 2.59375C4.96875 2.21875 5.4375 2.02083 6 2H14C14.5625 2.02083 15.0312 2.21875 15.4062 2.59375C15.7812 2.96875 15.9792 3.4375 16 4V16C15.9792 16.5625 15.7812 17.0312 15.4062 17.4062C15.0312 17.7812 14.5625 17.9792 14 18H6C5.4375 17.9792 4.96875 17.7812 4.59375 17.4062C4.21875 17.0312 4.02083 16.5625 4 16V4ZM11 9C11 8.70833 10.9062 8.46875 10.7188 8.28125C10.5312 8.09375 10.2917 8 10 8C9.70833 8 9.46875 8.09375 9.28125 8.28125C9.09375 8.46875 9 8.70833 9 9C9 9.29167 9.09375 9.53125 9.28125 9.71875C9.46875 9.90625 9.70833 10 10 10C10.2917 10 10.5312 9.90625 10.7188 9.71875C10.9062 9.53125 11 9.29167 11 9ZM8 9C8.02083 8.25 8.35417 7.67708 9 7.28125C9.66667 6.90625 10.3333 6.90625 11 7.28125C11.6458 7.67708 11.9792 8.25 12 9C11.9792 9.75 11.6458 10.3229 11 10.7188C10.3333 11.0938 9.66667 11.0938 9 10.7188C8.35417 10.3229 8.02083 9.75 8 9ZM8 4.5C8.02083 4.1875 8.1875 4.02083 8.5 4H11.5C11.8125 4.02083 11.9792 4.1875 12 4.5C11.9792 4.8125 11.8125 4.97917 11.5 5H8.5C8.1875 4.97917 8.02083 4.8125 8 4.5ZM7.5 14.5C7.47917 14.8125 7.3125 14.9792 7 15C6.6875 14.9792 6.52083 14.8125 6.5 14.5C6.52083 13.7917 6.76042 13.1979 7.21875 12.7188C7.69792 12.2604 8.29167 12.0208 9 12H11C11.7083 12.0208 12.3021 12.2604 12.7812 12.7188C13.2396 13.1979 13.4792 13.7917 13.5 14.5C13.4792 14.8125 13.3125 14.9792 13 15C12.6875 14.9792 12.5208 14.8125 12.5 14.5C12.4792 14.0833 12.3333 13.7292 12.0625 13.4375C11.7708 13.1667 11.4167 13.0208 11 13H9C8.58333 13.0208 8.22917 13.1667 7.9375 13.4375C7.66667 13.7292 7.52083 14.0833 7.5 14.5Z'
        fill='currentColor'
      ></path>
    </svg>
  );
};

const LocationIcon = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15 8C14.9583 6.58333 14.4688 5.40625 13.5312 4.46875C12.5938 3.53125 11.4167 3.04167 10 3C8.58333 3.04167 7.40625 3.53125 6.46875 4.46875C5.53125 5.40625 5.04167 6.58333 5 8C5 8.5 5.17708 9.15625 5.53125 9.96875C5.88542 10.8021 6.33333 11.6667 6.875 12.5625C7.41667 13.4375 7.96875 14.25 8.53125 15C9.09375 15.7708 9.58333 16.4167 10 16.9375C10.4167 16.4167 10.9062 15.7708 11.4688 15C12.0312 14.25 12.5833 13.4375 13.125 12.5625C13.6875 11.6667 14.1458 10.8021 14.5 9.96875C14.8333 9.15625 15 8.5 15 8ZM16 8C15.9583 8.9375 15.625 10.0208 15 11.25C14.3542 12.4792 13.625 13.6667 12.8125 14.8125C12 15.9792 11.3125 16.9062 10.75 17.5938C10.5417 17.8438 10.2917 17.9688 10 17.9688C9.70833 17.9688 9.45833 17.8438 9.25 17.5938C8.6875 16.9062 8 15.9792 7.1875 14.8125C6.375 13.6667 5.64583 12.4792 5 11.25C4.375 10.0208 4.04167 8.9375 4 8C4.04167 6.29167 4.625 4.875 5.75 3.75C6.875 2.625 8.29167 2.04167 10 2C11.7083 2.04167 13.125 2.625 14.25 3.75C15.375 4.875 15.9583 6.29167 16 8ZM8.5 8C8.52083 8.5625 8.77083 9 9.25 9.3125C9.75 9.5625 10.25 9.5625 10.75 9.3125C11.2292 9 11.4792 8.5625 11.5 8C11.4792 7.4375 11.2292 7 10.75 6.6875C10.25 6.4375 9.75 6.4375 9.25 6.6875C8.77083 7 8.52083 7.4375 8.5 8ZM10 10.5C9.0625 10.4792 8.34375 10.0625 7.84375 9.25C7.38542 8.41667 7.38542 7.58333 7.84375 6.75C8.34375 5.9375 9.0625 5.52083 10 5.5C10.9375 5.52083 11.6562 5.9375 12.1562 6.75C12.6146 7.58333 12.6146 8.41667 12.1562 9.25C11.6562 10.0625 10.9375 10.4792 10 10.5Z'
        fill='currentColor'
      ></path>
    </svg>
  );
};

const DepartmentIcon = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2 3C1.70833 3 1.46875 3.09375 1.28125 3.28125C1.09375 3.46875 1 3.70833 1 4V16C1 16.2917 1.09375 16.5312 1.28125 16.7188C1.46875 16.9062 1.70833 17 2 17H4V15C4.02083 14.4375 4.21875 13.9688 4.59375 13.5938C4.96875 13.2188 5.4375 13.0208 6 13C6.5625 13.0208 7.03125 13.2188 7.40625 13.5938C7.78125 13.9688 7.97917 14.4375 8 15V17H10C10.0208 17.3542 10.125 17.6771 10.3125 17.9688C10.2083 17.9896 10.1042 18 10 18H8H7H5H4H2C1.4375 17.9792 0.96875 17.7812 0.59375 17.4062C0.21875 17.0312 0.0208333 16.5625 0 16V4C0.0208333 3.4375 0.21875 2.96875 0.59375 2.59375C0.96875 2.21875 1.4375 2.02083 2 2H10C10.5625 2.02083 11.0312 2.21875 11.4062 2.59375C11.7812 2.96875 11.9792 3.4375 12 4V10.5V13.5C11.625 13.7083 11.2917 13.9688 11 14.2812V4C11 3.70833 10.9062 3.46875 10.7188 3.28125C10.5312 3.09375 10.2917 3 10 3H2ZM7 15C7 14.7083 6.90625 14.4688 6.71875 14.2812C6.53125 14.0938 6.29167 14 6 14C5.70833 14 5.46875 14.0938 5.28125 14.2812C5.09375 14.4688 5 14.7083 5 15V17H7V15ZM2 5.75C2.04167 5.29167 2.29167 5.04167 2.75 5H4.25C4.70833 5.04167 4.95833 5.29167 5 5.75V7.25C4.95833 7.70833 4.70833 7.95833 4.25 8H2.75C2.29167 7.95833 2.04167 7.70833 2 7.25V5.75ZM3 6V7H4V6H3ZM7.75 5H9.25C9.70833 5.04167 9.95833 5.29167 10 5.75V7.25C9.95833 7.70833 9.70833 7.95833 9.25 8H7.75C7.29167 7.95833 7.04167 7.70833 7 7.25V5.75C7.04167 5.29167 7.29167 5.04167 7.75 5ZM8 7H9V6H8V7ZM2 9.75C2.04167 9.29167 2.29167 9.04167 2.75 9H4.25C4.70833 9.04167 4.95833 9.29167 5 9.75V11.25C4.95833 11.7083 4.70833 11.9583 4.25 12H2.75C2.29167 11.9583 2.04167 11.7083 2 11.25V9.75ZM3 10V11H4V10H3ZM7.75 9H9.25C9.70833 9.04167 9.95833 9.29167 10 9.75V11.25C9.95833 11.7083 9.70833 11.9583 9.25 12H7.75C7.29167 11.9583 7.04167 11.7083 7 11.25V9.75C7.04167 9.29167 7.29167 9.04167 7.75 9ZM8 11H9V10H8V11ZM14 10.5C14.0208 11.0625 14.2708 11.5 14.75 11.8125C15.25 12.0625 15.75 12.0625 16.25 11.8125C16.7292 11.5 16.9792 11.0625 17 10.5C16.9792 9.9375 16.7292 9.5 16.25 9.1875C15.75 8.9375 15.25 8.9375 14.75 9.1875C14.2708 9.5 14.0208 9.9375 14 10.5ZM18 10.5C17.9792 11.4375 17.5625 12.1562 16.75 12.6562C15.9167 13.1146 15.0833 13.1146 14.25 12.6562C13.4375 12.1562 13.0208 11.4375 13 10.5C13.0208 9.5625 13.4375 8.84375 14.25 8.34375C15.0833 7.88542 15.9167 7.88542 16.75 8.34375C17.5625 8.84375 17.9792 9.5625 18 10.5ZM12 16.9062C12 16.9688 12.0312 17 12.0938 17H18.9062C18.9688 17 19 16.9688 19 16.9062C18.9792 16.3646 18.7917 15.9167 18.4375 15.5625C18.0833 15.2083 17.6354 15.0208 17.0938 15H13.9062C13.3646 15.0208 12.9167 15.2083 12.5625 15.5625C12.2083 15.9167 12.0208 16.3646 12 16.9062ZM13.9062 14H15.5H17.0938C17.9062 14.0208 18.5938 14.3021 19.1562 14.8438C19.6979 15.4062 19.9792 16.0938 20 16.9062C20 17.2188 19.8958 17.4792 19.6875 17.6875C19.4792 17.8958 19.2188 18 18.9062 18H12.0938C11.7812 18 11.5208 17.8958 11.3125 17.6875C11.1042 17.4792 11 17.2188 11 16.9062C11.0208 16.0938 11.3021 15.4062 11.8438 14.8438C12.4062 14.3021 13.0938 14.0208 13.9062 14Z'
        fill='currentColor'
      ></path>
    </svg>
  );
};
