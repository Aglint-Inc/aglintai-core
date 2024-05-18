/* eslint-disable security/detect-object-injection */
import { Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import React, { useCallback, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Breadcrum, PageLayout } from '@/devlink2';
import {
  AddScheduleCard as AddScheduleCardDev,
  AvatarWithName,
  EnableInterviewPlan as EnableInterviewPlanDev,
  GeneralScheduleCard,
  InterviewBreakCard,
  InterviewPlan as InterviewPlanDev,
} from '@/devlink3';
import { useJobInterviewPlan } from '@/src/context/JobInterviewPlanContext';
import { palette } from '@/src/context/Theme/Theme';
import NotFoundPage from '@/src/pages/404';
import { CompanyMember } from '@/src/queries/company-members';
import { DeleteInterviewSession } from '@/src/queries/interview-plans';
import { interviewPlanKeys } from '@/src/queries/interview-plans/keys';
import {
  InterviewPlansType,
  InterviewSessionType,
} from '@/src/queries/interview-plans/types';
import { useCurrentJob } from '@/src/queries/job-assessment/keys';
import { getFullName } from '@/src/utils/jsonResume';
import { capitalizeAll } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import AUIButton from '../Common/AUIButton';
import Loader from '../Common/Loader';
import MuiAvatar from '../Common/MuiAvatar';
import OptimisticWrapper from '../NewAssessment/Common/wrapper/loadingWapper';
import IconScheduleType from '../Scheduling/Candidates/ListCard/Icon';
import InterviewDeletePopup, { InterviewDeletePopupType } from './deletePopup';
import InterviewDrawers from './sideDrawer';
import { getBreakLabel } from './utils';

const JobNewInterviewPlanDashboard = () => {
  const { initialLoad, job } = useJobInterviewPlan();
  return initialLoad ? (
    job !== undefined ? (
      <InterviewPlanPage />
    ) : (
      <NotFoundPage />
    )
  ) : (
    <Stack width={'100%'} height={'100vh'} justifyContent={'center'}>
      <Loader />
    </Stack>
  );
};

export default JobNewInterviewPlanDashboard;

const InterviewPlanPage = () => {
  const {
    interviewPlans: { data },
  } = useJobInterviewPlan();
  return (
    <>
      <PageLayout
        slotTopbarLeft={<BreadCrumbs />}
        slotBody={data ? <InterviewPlan /> : <EnableInterviewPlan />}
      />
    </>
  );
};

const EnableInterviewPlan = () => {
  const { handleCreatePlan } = useJobInterviewPlan();
  const [planCreation, setPlanCreation] = useState(false);
  const handleCreate = async () => {
    if (!planCreation) {
      setPlanCreation(true);
      await handleCreatePlan();
      setPlanCreation(false);
    } else {
      toast.warning('Interview plan under creation. Please wait.');
    }
  };
  return (
    <Stack p={2}>
      <OptimisticWrapper loading={planCreation}>
        <EnableInterviewPlanDev
          onClickEnableInterviewPlan={{ onClick: () => handleCreate() }}
        />
      </OptimisticWrapper>
    </Stack>
  );
};

const BreadCrumbs = () => {
  const { push } = useRouter();
  const { job } = useCurrentJob();
  return (
    <>
      <Breadcrum
        isLink
        textName={`${capitalize(job?.status ?? 'all')} jobs`}
        onClickLink={{
          onClick: () => {
            push(`/jobs?status=${job?.status ?? 'all'}`);
          },
          style: { cursor: 'pointer' },
        }}
      />
      <Breadcrum
        isLink
        textName={capitalize(job?.job_title ?? 'Job')}
        onClickLink={{
          onClick: () => {
            push(`/jobs/${job?.id}`);
          },
          style: { cursor: 'pointer' },
        }}
        showArrow
      />
      <Breadcrum textName={`Interview Plan`} showArrow />
    </>
  );
};

const initalDrawer = {
  create: {
    session: { open: false, id: '', order: -1 },
    debrief: { open: false, id: '', order: -1 },
    break: { open: false, id: '', order: -1 },
  },
  edit: {
    session: { open: false, id: '', order: -1 },
    debrief: { open: false, id: '', order: -1 },
    break: { open: false, id: '', order: -1 },
  },
};
export type DrawerType = typeof initalDrawer;

const InterviewPlan = () => {
  const {
    interviewPlans: { data },
    handleDeleteSession,
    getLoadingState,
  } = useJobInterviewPlan();
  const [drawers, setDrawers] = useState<DrawerType>(initalDrawer);
  const [drawerModal, setDrawerModal] = useState(false);
  const handleDrawerClose = useCallback(() => {
    setDrawerModal(false);
    setTimeout(
      () =>
        setDrawers(
          Object.entries(drawers).reduce((acc, [key, value]) => {
            const safeKey = key as keyof DrawerType;
            const safeValue = value as DrawerType[typeof safeKey];
            acc[safeKey] = Object.keys(safeKey).reduce(
              (acc, curr) => {
                const safeCurr = curr as keyof typeof acc;
                acc[safeCurr] = { open: false, id: '', order: -1 };
                return acc;
              },
              {} as typeof safeValue,
            );
            return acc;
          }, {} as DrawerType),
        ),
      400,
    );
  }, []);
  const [popup, setPopup] = useState<InterviewDeletePopupType['popup']>(null);
  const [popupModal, setPopupModal] = useState(false);
  const handlePopupClose = useCallback(() => {
    setPopupModal(false);
    setTimeout(() => setPopup(null), 400);
  }, []);
  const handleCreate = useCallback(
    (key: keyof DrawerType['create'], order: number) => {
      setDrawerModal(true);
      setDrawers((prev) => ({
        ...prev,
        create: { ...prev.create, [key]: { open: true, id: '', order } },
      }));
    },
    [],
  );
  const handleEdit = useCallback(
    (key: keyof DrawerType['edit'], id: string, order: number) => {
      setDrawerModal(true);
      setDrawers((prev) => ({
        ...prev,
        edit: { ...prev.edit, [key]: { open: true, id, order } },
      }));
    },
    [],
  );
  const handleDeletionSelect = useCallback(
    (args: InterviewDeletePopupType['popup']) => {
      setPopupModal(true);
      setPopup(args);
    },
    [],
  );
  const handleDelete = useCallback(async (args: DeleteInterviewSession) => {
    const isLoading = getLoadingState(args.session_id);
    if (!isLoading) {
      handleDeleteSession(args);
    } else {
      toast.warning('Session under deletion. Please wait.');
    }
  }, []);
  const sessionsCount = data.interview_session.length;
  const sessions = data.interview_session.map((session, order) => (
    <InterviewSession
      key={session.id}
      session={session}
      handleCreate={(key) => handleCreate(key, order + 1)}
      handleEdit={(key, id) => handleEdit(key, id, order + 1)}
      handleDeletionSelect={handleDeletionSelect}
      index={order}
      lastSession={order === sessionsCount - 1}
    />
  ));
  return (
    <>
      <InterviewPlanDev
        slotInterviewCoordinator={<></>}
        isEmptyVisible={sessions.length === 0}
        slotPrimaryButton={
          <AUIButton onClick={() => handleCreate('session', 0)}>
            Create Session
          </AUIButton>
        }
        slotInterviewPlan={
          <DndProvider backend={HTML5Backend}>{sessions}</DndProvider>
        }
      />
      <InterviewDrawers
        open={drawerModal}
        drawers={drawers}
        handleClose={handleDrawerClose}
      />
      <InterviewDeletePopup
        open={popupModal}
        popup={popup}
        handleClose={handlePopupClose}
        handleDelete={() =>
          handleDelete({ session_id: popup.id, interview_plan_id: data.id })
        }
      />
    </>
  );
};

type InterviewSessionProps = {
  session: InterviewSessionType;
  handleCreate: (
    // eslint-disable-next-line no-unused-vars
    key: keyof DrawerType['create'],
  ) => void;
  handleEdit: (
    // eslint-disable-next-line no-unused-vars
    key: keyof DrawerType['edit'],
    // eslint-disable-next-line no-unused-vars
    id: string,
  ) => void;
  // eslint-disable-next-line no-unused-vars
  handleDeletionSelect: (args: InterviewDeletePopupType['popup']) => void;
  lastSession: boolean;
  index: number;
};
type InterviewSessionMemeberTypes =
  InterviewSessionType['interview_session_relation'][number]['interviewer_type'];
type InterviewSessonMembers = {
  // eslint-disable-next-line no-unused-vars
  [key in InterviewSessionMemeberTypes]: CompanyMember[];
};
const InterviewSession = ({
  session,
  handleCreate,
  handleEdit,
  handleDeletionSelect,
  lastSession,
  index,
}: InterviewSessionProps) => {
  const ref = useRef(null);

  const queryClient = useQueryClient();

  const {
    getLoadingState,
    interviewPlans: { data },
    job,
    handleReorderSessions,
  } = useJobInterviewPlan();
  const [hover, setHover] = useState(false);
  const members = session.interview_session_relation.reduce(
    (acc, curr) => {
      if (session.session_type === 'debrief') {
        if (curr.recruiter_user) acc.members.push(curr.recruiter_user);
      } else {
        if (curr.interview_module_relation.recruiter_user) {
          acc[curr.interviewer_type].push(
            curr.interview_module_relation.recruiter_user,
          );
        }
      }

      return acc;
    },
    { qualified: [], training: [], members: [] } as InterviewSessonMembers & {
      members: CompanyMember[];
    },
  );
  const isLoading = getLoadingState(session.id);

  const { queryKey } = interviewPlanKeys.interview_plan({ job_id: job.id });

  const handleMoveCard = (dragIndex, hoverIndex) => {
    const sessions = structuredClone(data.interview_session);
    const temp = structuredClone(sessions[dragIndex]);
    sessions[dragIndex] = structuredClone(sessions[hoverIndex]);
    sessions[dragIndex]['session_order'] = dragIndex + 1;
    sessions[hoverIndex] = temp;
    sessions[hoverIndex]['session_order'] = hoverIndex + 1;
    queryClient.setQueryData<InterviewPlansType>(queryKey, {
      ...data,
      interview_session: sessions,
    });
  };

  const [{ handlerId }, drop] = useDrop({
    accept: 'session-card',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    drop: () => {
      handleReorderSessions({
        interviewPlanId: data.id,
        updatedInterviewSessions: data.interview_session,
      });
    },
    hover: (item: any, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      if (dragIndex !== undefined && hoverIndex !== undefined)
        handleMoveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: 'session-card',
    item: { session },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));
  return (
    <Stack
      ref={ref}
      style={{ backgroundColor: 'white', opacity: isDragging ? 0 : 1 }}
      data-handler-id={handlerId}
    >
      <OptimisticWrapper loading={isLoading}>
        <Stack
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          mb={hover ? 1 : 4}
        >
          <GeneralScheduleCard
            textModuleName={
              <Stack style={{ flexDirection: 'row', gap: '12px' }}>
                <>{session.name}</>
                <Stack
                  style={{
                    color: palette.grey[400],
                    fontSize: '12px',
                    fontWeight: 400,
                    fontStyle: 'italic',
                  }}
                >
                  {getSessionType(session.session_type)}
                </Stack>
              </Stack>
            }
            isSubHeaderVisible={false}
            isHeaderTitleVisible={true}
            isDebriefIconVisible={session.session_type === 'debrief'}
            isOnetoOneIconVisible={session.session_type === 'individual'}
            isPanelIconVisible={session.session_type === 'panel'}
            isTimingVisible={false}
            textDuration={`${session.session_duration} minutes`}
            slotPlatformIcon={<IconScheduleType type={session.schedule_type} />}
            isLinkVisilble={session.session_type !== 'debrief'}
            textPlatformName={capitalizeAll(session.schedule_type)}
            textLink={session?.interview_module?.name ?? '---'}
            isTextSelectedVisible={
              session.session_type !== 'debrief' && members.qualified.length > 1
            }
            textSelected={`(${session.interviewer_cnt} out of ${members.qualified.length} members will be selected)`}
            isTraineesVisible={members.training.length !== 0}
            slotTrainees={members.training.map((member) => (
              <InterviewSessionMember key={member.user_id} member={member} />
            ))}
            isInterviewersVisible={members.qualified.length !== 0}
            slotInterviewers={members.qualified.map((member) => (
              <InterviewSessionMember key={member.user_id} member={member} />
            ))}
            isMembersVisible={session.session_type === 'debrief'}
            slotMembers={members.members.map((member) => (
              <InterviewSessionMember key={member.user_id} member={member} />
            ))}
            onClickLink={{
              onClick: () =>
                window.open(
                  `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/module/members/${session.interview_module.id}`,
                  '_blank',
                ),
            }}
            isBreakCardVisible={!lastSession && session.break_duration !== 0}
            slotBreakCard={
              <InterviewBreak
                duration={session.break_duration}
                handleEdit={() => handleEdit('break', session.id)}
                handleDelete={() =>
                  handleDeletionSelect({
                    id: session.id,
                    name: session.name,
                    break: true,
                  })
                }
              />
            }
            isAddCardVisible={hover}
            slotAddScheduleCard={
              <AddScheduleCard
                handleCreate={handleCreate}
                showBreak={!lastSession && session.break_duration === 0}
                handleEdit={(key) => handleEdit(key, session.id)}
              />
            }
            onClickEdit={{
              onClick: () =>
                handleEdit(sessionToEdit(session.session_type), session.id),
            }}
            onClickDelete={{
              onClick: () =>
                handleDeletionSelect({
                  id: session.id,
                  name: session.name,
                  break: false,
                }),
            }}
          />
        </Stack>
      </OptimisticWrapper>
    </Stack>
  );
};

const getSessionType = (session_type: InterviewSessionType['session_type']) => {
  switch (session_type) {
    case 'panel':
      return 'Group stage';
    case 'individual':
      return 'Individual stage';
    case 'debrief':
      return 'Debrief stage';
  }
};

const sessionToEdit = (
  session_type: InterviewSessionType['session_type'],
): keyof DrawerType['create'] => {
  switch (session_type) {
    case 'panel':
      return 'session';
    case 'individual':
      return 'session';
    case 'debrief':
      return 'debrief';
  }
};

type InterviewSessionMemberProps = { member: CompanyMember };
const InterviewSessionMember = ({ member }: InterviewSessionMemberProps) => {
  const name = getFullName(member.first_name, member.last_name);
  return (
    <AvatarWithName
      textName={name}
      textRole={member.position}
      isRoleVisible={!!member?.position}
      slotAvatar={
        <MuiAvatar
          src={member.profile_image}
          level={name}
          variant='circular'
          fontSize='10px'
          height='100%'
          width='100%'
        />
      }
    />
  );
};

const InterviewBreak = ({
  duration,
  handleEdit,
  handleDelete,
}: {
  duration: number;
  handleEdit: () => void;
  handleDelete: () => void;
}) => {
  return (
    <InterviewBreakCard
      textDuration={getBreakLabel(duration)}
      onClickEdit={{ onClick: () => handleEdit() }}
      onClickDelete={{ onClick: () => handleDelete() }}
    />
  );
};

const AddScheduleCard = ({
  handleCreate,
  showBreak,
  handleEdit = () => {},
}: {
  handleCreate: InterviewSessionProps['handleCreate'];
  showBreak: boolean;
  // eslint-disable-next-line no-unused-vars
  handleEdit?: (key: keyof DrawerType['edit']) => void;
}) => {
  const [hover, setHover] = useState(false);
  return (
    <Stack
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <AddScheduleCardDev
        isAddSessionOptionVisible={hover}
        isBreakVisibe={showBreak}
        onClickAddSession={{
          onClick: () => handleCreate('session'),
        }}
        onClickAddDebriefSession={{
          onClick: () => handleCreate('debrief'),
        }}
        onClickAddBreak={{
          onClick: () => handleEdit('break'),
        }}
      />
    </Stack>
  );
};

export const RoleIcon = () => {
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

export const DepartmentIcon = () => {
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
