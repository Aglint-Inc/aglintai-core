/* eslint-disable security/detect-object-injection */
import OptimisticWrapper from '@components/loadingWapper';
import ReorderableInterviewPlan from '@components/reorderable-interview-plan';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { ButtonSoft } from '@devlink/ButtonSoft';
import { ButtonSolid } from '@devlink/ButtonSolid';
import { IconButtonSoft } from '@devlink/IconButtonSoft';
import { GlobalBannerInline } from '@devlink2/GlobalBannerInline';
import { PageLayout } from '@devlink2/PageLayout';
import { AddScheduleCard as AddScheduleCardDev } from '@devlink3/AddScheduleCard';
import { AddScheduleOption } from '@devlink3/AddScheduleOption';
import { AvatarWithName } from '@devlink3/AvatarWithName';
import { InterviewBreakCard } from '@devlink3/InterviewBreakCard';
import { InterviewPlanDetail } from '@devlink3/InterviewPlanDetail';
import { InterviewPlanWrap } from '@devlink3/InterviewPlanWrap';
import {
  Collapse,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { CirclePause, Kanban } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import IconScheduleType from '@/components/Common/Icons/IconScheduleType';
import Loader from '@/components/Common/Loader';
import MuiAvatar from '@/components/Common/MuiAvatar';
import UITextField from '@/components/Common/UITextField';
import { JobNotFound } from '@/job/components/JobNotFound';
import { Settings } from '@/job/components/SharedTopNav/actions';
import { useJob } from '@/job/hooks';
import { useJobInterviewPlan } from '@/job/interview-plan/hooks';
import { type CompanyMember as CompanyMemberGlobal } from '@/queries/company-members';
import { type DeleteInterviewSession } from '@/queries/interview-plans';
import {
  type InterviewPlansType,
  type InterviewSessionType,
} from '@/queries/interview-plans/types';
import { jobQueries } from '@/queries/job';
import { getBreakLabel } from '@/utils/getBreakLabel';
import { getFullName } from '@/utils/jsonResume';
import ROUTES from '@/utils/routing/routes';
import { breakDurations } from '@/utils/scheduling/const';
import {
  capitalizeAll,
  capitalizeFirstLetter,
  capitalizeSentence,
} from '@/utils/text/textUtils';
import toast from '@/utils/toast';

import InterviewDeletePopup, {
  type InterviewDeletePopupType,
} from './deletePopup';
import InterviewDrawers from './sideDrawer';

export type CompanyMember = CompanyMemberGlobal & { paused: boolean };

export const JobNewInterviewPlanDashboard = () => {
  const { initialLoad, job } = useJobInterviewPlan();
  return initialLoad ? (
    job ? (
      <InterviewPlanPage />
    ) : (
      <JobNotFound />
    )
  ) : (
    <Stack width={'100%'} height={'100vh'} justifyContent={'center'}>
      <Loader />
    </Stack>
  );
};

const InterviewPlanPage = () => {
  const {
    interviewPlans: { data },
  } = useJobInterviewPlan();
  const [drawers, setDrawers] = useState<DrawerType>(initialDrawer());
  const [drawerModal, setDrawerModal] = useState(false);

  const handleCreate = useCallback(
    (key: keyof DrawerType['create'], plan_id: string, order: number) => {
      setDrawerModal(true);
      setDrawers((prev) => ({
        ...prev,
        create: {
          ...prev.create,
          [key]: { open: true, id: '', plan_id: plan_id, order },
        },
      }));
    },
    [],
  );
  const handleDrawerClose = useCallback(() => {
    setDrawerModal(false);
    setTimeout(() => setDrawers(initialDrawer()), 400);
  }, []);
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

  return (
    <>
      <PageLayout
        slotTopbarLeft={<BreadCrumbs />}
        slotTopbarRight={<Settings />}
        slotBody={
          //cand and inter
          <Stack className='p-4'>
            <Tabs defaultValue='candidate'>
              <TabsList>
                <TabsTrigger value='internal'>Internal</TabsTrigger>
                <TabsTrigger value='candidate'>Candidate</TabsTrigger>
              </TabsList>
              <TabsContent value='internal'>
                <Stack gap={1} className='max-w-2xl my-8 mb-10 '>
                  {data?.length ? (
                    data.map((plan) => (
                      <InterviewPlan
                        key={plan.id}
                        plan_id={plan.id}
                        handleCreate={handleCreate}
                        handleEdit={handleEdit}
                      />
                    ))
                  ) : (
                    <Typography>
                      {`Create your interview stages for the job to ensure a structured
                evaluation process. Add different interview types such as
                "Initial Screening" or "Technical Interview." Use this template
                each time you schedule interviews for candidates to maintain
                consistency and efficiency.`}
                    </Typography>
                  )}

                  <AddStageComponent />
                </Stack>
              </TabsContent>
              <TabsContent value='candidate'>
                {/* job level interview plan */}
                <ReorderableInterviewPlan
                  jobId={data[0]?.job_id}
                  applicationId={null}
                />
              </TabsContent>
            </Tabs>
          </Stack>
        }
      />
      <InterviewDrawers
        open={drawerModal}
        drawers={drawers}
        handleClose={handleDrawerClose}
      />
    </>
  );
};

const AddStageComponent = () => {
  const { interviewPlans, handleCreatePlan } = useJobInterviewPlan();
  const [form, setForm] = useState(false);
  const nameField = useRef<null | HTMLInputElement>(null);
  function handleAddStage() {
    if (nameField.current.value.length) {
      handleCreatePlan(nameField.current.value, interviewPlans.data.length + 1);
      setForm(false);
    }
  }
  useEffect(() => {
    nameField.current?.focus();
  }, []);
  return (
    <>
      {form && (
        <Stack
          direction={'row'}
          bgcolor={'var(--neutral-2)'}
          p={2}
          width={'100%'}
          gap={1}
          alignItems={'center'}
        >
          {
            // eslint-disable-next-line jsx-a11y/no-autofocus
            <UITextField placeholder='Stage Name' ref={nameField} autoFocus />
          }
          <ButtonSolid
            textButton={'Add'}
            size={2}
            onClickButton={{ onClick: handleAddStage }}
          />
          <ButtonSoft
            textButton={'Cancel'}
            size={2}
            onClickButton={{ onClick: () => setForm(!form) }}
          />
        </Stack>
      )}
      <Stack direction={'row'}>
        <ButtonSolid
          textButton={'Add Stage'}
          isDisabled={form}
          size={2}
          onClickButton={{ onClick: () => setForm(!form) }}
        />
      </Stack>
    </>
  );
};

const BreadCrumbs = () => {
  const { push } = useRouter();
  const { job } = useJob();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='#' onClick={() => push(ROUTES['/jobs']())}>
            Jobs
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href='#' onClick={() => push(`/jobs/${job?.id}`)}>
            {capitalizeSentence(job?.job_title ?? 'Job')}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Interview Plan</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const initialDrawer = () => ({
  create: {
    session: { open: false, id: '', plan_id: '', order: -1 },
    debrief: { open: false, id: '', plan_id: '', order: -1 },
    break: { open: false, id: '', plan_id: '', order: -1 },
  },
  edit: {
    session: { open: false, id: '', order: -1 },
    debrief: { open: false, id: '', order: -1 },
    break: { open: false, id: '', order: -1 },
  },
});
export type DrawerType = ReturnType<typeof initialDrawer>;

const InterviewPlan = ({
  handleEdit,
  plan_id,
  handleCreate,
}: {
  handleEdit: (
    // eslint-disable-next-line no-unused-vars
    key: keyof DrawerType['edit'],
    // eslint-disable-next-line no-unused-vars
    id: string,
    // eslint-disable-next-line no-unused-vars
    order: number,
  ) => void;
  plan_id: string;
  handleCreate: (
    // eslint-disable-next-line no-unused-vars
    key: keyof DrawerType['create'],
    // eslint-disable-next-line no-unused-vars
    plan_id: string,
    // eslint-disable-next-line no-unused-vars
    order: number,
  ) => void;
}) => {
  const {
    interviewPlans,
    handleDeleteSession,
    getLoadingState,
    updatePlan,
    deletePlan,
    handleSwapPlan,
    isPlanMutating,
    // handleUpdateSession,
  } = useJobInterviewPlan();
  const index = interviewPlans.data.findIndex((plan) => plan.id === plan_id);
  const prevData = interviewPlans?.data?.[index - 1] ?? null;
  const data = interviewPlans?.data?.[index] ?? null;
  const nextData = interviewPlans?.data?.[index + 1] ?? null;
  const [expanded, setExpanded] = React.useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [editPlan, setEditPlan] = useState(false);
  const handleEditPlan = () => {
    setEditPlan((pre) => !pre);
  };
  const planRef = useRef<HTMLInputElement>();
  const [popup, setPopup] = useState<InterviewDeletePopupType['popup']>(null);
  const [popupModal, setPopupModal] = useState(false);
  const handlePopupClose = useCallback(() => {
    setPopupModal(false);
    setTimeout(() => setPopup(null), 400);
  }, []);

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
      plan_id={plan_id}
      handleCreate={(key) => handleCreate(key, plan_id, order + 1)}
      handleEdit={(key, id) => handleEdit(key, id, order + 1)}
      handleDeletionSelect={handleDeletionSelect}
      index={order}
      lastSession={order === sessionsCount - 1}
    />
  ));

  const handleUpdatePlan = async (name: string) => {
    if (name.trim().length) {
      await updatePlan({ id: plan_id, data: { name } });
      handleEditPlan();
    }
  };

  const loading = isPlanMutating(data.id);

  return (
    <>
      <OptimisticWrapper loading={loading}>
        <InterviewPlanWrap
          isTopArrowVisible={!!prevData}
          onClickUp={{
            onClick: () =>
              handleSwapPlan({
                plan_id_1: prevData.id,
                plan_id_2: data.id,
              }),
          }}
          isBottomArrowVisible={!!nextData}
          onClickDown={{
            onClick: () =>
              handleSwapPlan({
                plan_id_1: nextData.id,
                plan_id_2: data.id,
              }),
          }}
          textStageName={`${capitalizeFirstLetter(data.name)}`}
          textInterviewCount={`${sessions.length} ${sessions.length > 1 ? 'Interviews' : 'Interview'}`}
          isInputVisible={editPlan}
          onClickEdit={{ onClick: handleEditPlan }}
          isSlotInterviewPlanVisible={expanded}
          slotInputButton={
            <Stack direction={'row'} gap={1} alignItems={'center'}>
              <UITextField ref={planRef} defaultValue={data.name} fullWidth />
              <ButtonSolid
                size={2}
                textButton={'Update'}
                onClickButton={{
                  onClick: () => handleUpdatePlan(planRef.current.value),
                }}
              />
              <ButtonSoft
                color={'neutral'}
                size={2}
                textButton={'Cancel'}
                onClickButton={{
                  onClick: handleEditPlan,
                }}
              />
            </Stack>
          }
          slotRightIconButton={
            <Stack direction={'row'} gap={1}>
              <IconButtonSoft
                iconName='delete'
                color={'error'}
                onClickButton={{
                  onClick: () => deletePlan({ id: plan_id }),
                }}
              />
              <IconButtonSoft
                iconName='keyboard_double_arrow_down'
                color={'neutral'}
                onClickButton={{
                  onClick: handleExpandClick,
                }}
              />
            </Stack>
          }
          slotInterviewPlanDetail={
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <Stack pt={2}>
                {sessionsCount ? (
                  <>
                    <DndProvider backend={HTML5Backend}>{sessions}</DndProvider>
                  </>
                ) : (
                  <div className='flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg'>
                    <Kanban className='w-4 h-4 text-gray-400 mb-4' />
                    <p className='text-gray-500 mb-4'>
                      No interview plan found
                    </p>
                  </div>
                )}
              </Stack>
            </Collapse>
          }
        />
      </OptimisticWrapper>

      <InterviewDeletePopup
        open={popupModal}
        popup={popup}
        handleClose={handlePopupClose}
        handleDelete={() =>
          handleDelete({
            session_id: popup.id,
            interview_plan_id: data.id,
          })
        }
      />
    </>
  );
};

type InterviewSessionProps = {
  session: InterviewSessionType;
  plan_id: string;
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
  [_key in InterviewSessionMemeberTypes]: CompanyMember[];
};
const InterviewSession = ({
  session,
  plan_id,
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
    handleUpdateSession,
    manageJob,
  } = useJobInterviewPlan();
  const [hover, setHover] = useState(false);
  const members = session.interview_session_relation.reduce(
    (acc, curr) => {
      if (session.session_type === 'debrief') {
        if (curr.recruiter_user) {
          acc.members.push({
            ...curr.recruiter_user,
            paused: !!curr?.interview_module_relation?.pause_json,
          });
        }
      } else {
        if (curr.interview_module_relation.recruiter_user) {
          acc[curr.interviewer_type].push({
            ...curr.interview_module_relation.recruiter_user,
            paused: !!curr?.interview_module_relation?.pause_json,
          });
        }
      }

      return acc;
    },
    {
      qualified: [],
      training: [],
      members: [],
    } as InterviewSessonMembers & {
      members: CompanyMember[];
    },
  );
  // const roles = Object.entries(session?.members_meta ?? {}).reduce(
  //   (acc, [key, value]) => {
  //     if (value) acc.push(key as (typeof acc)[number]);
  //     return acc;
  //   },
  //   [] as (keyof typeof session.members_meta)[],
  // );
  const isLoading = getLoadingState(session.id);

  const { queryKey } = jobQueries.interview_plans({ id: job?.id });
  const currPlan = data.find((plan) => plan.id === plan_id);

  const handleMoveCard = (dragIndex, hoverIndex) => {
    const sessions = structuredClone(currPlan?.interview_session);
    const temp = structuredClone(sessions[dragIndex]);
    sessions[dragIndex] = structuredClone(sessions[hoverIndex]);
    sessions[dragIndex]['session_order'] = dragIndex + 1;
    sessions[hoverIndex] = temp;
    sessions[hoverIndex]['session_order'] = hoverIndex + 1;
    currPlan.interview_session = sessions;
    queryClient.setQueryData<InterviewPlansType>(
      queryKey,
      data.map((item) => (item.id === plan_id ? currPlan : item)),
    );
  };

  const [{ handlerId }, drop] = useDrop({
    accept: 'session-card',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    drop: () => {
      handleReorderSessions({
        interviewPlanId: currPlan.id,
        updatedInterviewSessions: currPlan.interview_session,
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

  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <Stack
      ref={manageJob ? ref : null}
      style={{ opacity: isDragging ? 0 : 1 }}
      data-handler-id={handlerId}
    >
      <OptimisticWrapper loading={isLoading}>
        <Stack
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          mb={hover ? 1 : 4}
        >
          <InterviewPlanDetail
            textModuleName={
              <Stack style={{ flexDirection: 'row', gap: '12px' }}>
                <>{session.name}</>
                <Stack
                  style={{
                    color: 'var(--neutral-9)',
                    fontSize: 'var(--font-size-1)',
                    fontWeight: 400,
                    // fontStyle: 'italic',
                  }}
                >
                  {getSessionType(session.session_type)}
                </Stack>
              </Stack>
            }
            // isRolesvisible={
            //   session.session_type === 'debrief' && !!roles.length
            // }
            // slotRoles={<Roles roles={roles} />}
            // isSubHeaderVisible={false}
            // isHeaderTitleVisible={true}
            isDebriefIconVisible={session.session_type === 'debrief'}
            isOnetoOneIconVisible={session.session_type === 'individual'}
            isPanelIconVisible={session.session_type === 'panel'}
            // isTimingVisible={false}
            textDuration={`${session.session_duration} minutes`}
            slotPlatformIcon={<IconScheduleType type={session.schedule_type} />}
            // isLinkVisilble={session.session_type !== 'debrief'}
            textPlatformName={capitalizeAll(session.schedule_type)}
            textLink={session?.interview_module?.name ?? '---'}
            // isTextSelectedVisible={
            //   session.session_type !== 'debrief' && members.qualified.length > 1
            // }
            textSelected={`Interviewers (${session.interviewer_cnt} out of ${members.qualified.length} members will be selected)`}
            // isTraineesVisible={members.training.length !== 0}
            // slotTrainees={members.training.map((member) => (
            //   <InterviewSessionMember key={member.user_id} member={member} />
            // ))}
            // isInterviewersVisible={session.session_type !== 'debrief'}
            slotInterviewers={
              <InterviewSessionMembers members={members.qualified} />
            }
            // isMembersVisible={
            //   session.session_type === 'debrief' && members.members.length !== 0
            // }
            // slotMembers={members.members.map((member) => (
            //   <InterviewSessionMember key={member.user_id} member={member} />
            // ))}
            onClickLink={{
              onClick: () =>
                window.open(
                  `/scheduling/interview-types/${session.interview_module.id}?tab=qualified`,
                  '_blank',
                ),
            }}
            isBreakCardVisible={!lastSession && session.break_duration !== 0}
            slotBreakCard={
              <InterviewBreak
                value={session.break_duration}
                handleEdit={(e) =>
                  handleUpdateSession({
                    session_id: session.id,
                    session: { break_duration: +e.target.value },
                  })
                }
                handleDelete={() =>
                  handleDeletionSelect({
                    id: session.id,
                    name: session.name,
                    break: true,
                  })
                }
                manageJob={manageJob}
              />
            }
            isAddCardVisible={hover}
            slotAddScheduleCard={
              <Stack style={{ opacity: manageJob ? 100 : 0 }}>
                <Tooltip
                  open={tooltipOpen}
                  onOpen={() => setTooltipOpen(true)}
                  onClose={() => setTooltipOpen(false)}
                  componentsProps={{
                    tooltip: {
                      sx: {
                        marginTop: '0px !important',
                        padding: 0,
                        backgroundColor: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                      },
                    },
                  }}
                  title={
                    <AddScheduleOption
                      isBreakVisibe={
                        !lastSession && session.break_duration === 0
                      }
                      onClickAddSession={{
                        onClick: () => {
                          handleCreate('session');
                          setTooltipOpen(false);
                        },
                      }}
                      onClickAddDebriefSession={{
                        onClick: () => {
                          handleCreate('debrief');
                          setTooltipOpen(false);
                        },
                      }}
                      onClickAddBreak={{
                        onClick: () => {
                          handleUpdateSession({
                            session: { break_duration: 30 },
                            session_id: session.id,
                          });
                          setTooltipOpen(false);
                        },
                      }}
                    />
                  }
                >
                  <Stack>
                    <AddScheduleCardDev />
                  </Stack>
                </Tooltip>
              </Stack>
            }
            slotButtons={
              manageJob && (
                <>
                  <IconButtonSoft
                    iconName={'delete'}
                    size={1}
                    color={'error'}
                    onClickButton={{
                      onClick: () =>
                        handleDeletionSelect({
                          id: session.id,
                          name: session.name,
                          break: false,
                        }),
                    }}
                  />
                  <IconButtonSoft
                    iconName={'edit'}
                    size={1}
                    color={'neutral'}
                    onClickButton={{
                      onClick: () =>
                        handleEdit(
                          sessionToEdit(session.session_type),
                          session.id,
                        ),
                    }}
                  />
                </>
              )
            }
          />
        </Stack>
      </OptimisticWrapper>
    </Stack>
  );
};

// const Roles = ({ roles }: { roles: string[] }) => {
//   return (
//     <>
//       {roles.map((role) => (
//         <RolesPill
//           key={role}
//           onClickRemoveRoles={{ style: { display: 'none' } }}
//           textRoles={capitalizeFirstLetter(role)}
//         />
//       ))}
//     </>
//   );
// };

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

type InterviewSessionMembersProps = { members: CompanyMember[] };
const InterviewSessionMembers = ({ members }: InterviewSessionMembersProps) => {
  if (members.length === 0)
    return (
      <GlobalBannerInline
        color={'error'}
        iconName={'warning'}
        textContent={
          'No interviewers assigned. Click on edit to assign interviewers.'
        }
        slotButton={<></>}
      />
    );
  return members.map((member) => (
    <InterviewSessionMember key={member.user_id} member={member} />
  ));
};

type InterviewSessionMemberProps = { member: CompanyMember };
const InterviewSessionMember = ({ member }: InterviewSessionMemberProps) => {
  const name = getFullName(member.first_name, member.last_name);
  return (
    <Stack direction={'row'} gap={3}>
      <AvatarWithName
        textName={name}
        textRole={member.position}
        isRoleVisible={!!member?.position}
        slotAvatar={
          <MuiAvatar
            src={member.profile_image}
            level={name}
            variant='rounded-small'
          />
        }
      />
      {member.paused && <CirclePause size={16} />}
    </Stack>
  );
};

const InterviewBreak = ({
  value,
  handleEdit,
  handleDelete,
  manageJob,
}: {
  value: number;
  handleEdit: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleDelete: () => void;
  manageJob: boolean;
}) => {
  return (
    <InterviewBreakCard
      slotEditButton={
        manageJob && (
          <>
            <IconButtonSoft
              iconName={'delete'}
              size={1}
              color={'error'}
              onClickButton={{
                onClick: () => handleDelete(),
              }}
            />
          </>
        )
      }
      textDuration={
        <TextField
          select
          fullWidth
          value={value}
          onChange={handleEdit}
          sx={{
            ml: 'var(--space-2)',
            width: '120px',
            '& .MuiOutlinedInput-root': {
              padding: '0px',
              paddingLeft: 'var(--space-2)',
            },
          }}
        >
          {breakDurations.map((item) => (
            <MenuItem key={item} value={item}>
              {getBreakLabel(item)}
            </MenuItem>
          ))}
        </TextField>
      }
    />
  );
};
