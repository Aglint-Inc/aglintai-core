/* eslint-disable security/detect-object-injection */
import { getFullName } from '@aglint/shared-utils';
import OptimisticWrapper from '@components/loadingWapper';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { Collapsible, CollapsibleContent } from '@components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { useQueryClient } from '@tanstack/react-query';
import {
  Edit,
  Kanban,
  PauseCircle,
  Pencil,
  Plus,
  Trash,
  Trash2,
} from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { breakDurations } from 'src/app/_common/utils/const';

import IconScheduleType from '@/components/Common/Icons/IconScheduleType';
import { Loader } from '@/components/Common/Loader';
import { UIAlert } from '@/components/Common/UIAlert';
import { UIButton } from '@/components/Common/UIButton';
import UIDialog from '@/components/Common/UIDialog';
import UISelectDropDown from '@/components/Common/UISelectDropDown';
import UITextField from '@/components/Common/UITextField';
import { useRouterPro } from '@/hooks/useRouterPro';
import { JobNotFound } from '@/job/components/JobNotFound';
import JobsSideNavV2 from '@/job/components/JobsSideNavV2';
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
import ROUTES from '@/utils/routing/routes';
import {
  capitalizeAll,
  capitalizeFirstLetter,
  capitalizeSentence,
} from '@/utils/text/textUtils';
import toast from '@/utils/toast';

import { AddScheduleOption } from './_common/AddScheduleOption';
import { InterviewBreakCard } from './_common/InterviewBreakCard';
import { InterviewPlanDetail } from './_common/InterviewPlanDetail';
import { InterviewPlanWrap } from './_common/InterviewPlanWrap';
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
    <Loader variant='full' />
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
      <div className='container-lg mx-auto w-full px-12'>
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='mb-2 text-2xl font-bold'>Job Settings</h1>
            <BreadCrumbs />
          </div>
          {/* <Settings /> */}
        </div>

        <div className='mb-6 flex gap-6'>
          <div className='w-2/12'>
            <JobsSideNavV2 />
          </div>
          <div className='w-9/12 pl-12'>
            <div className='flex flex-row justify-between'>
              <div className='flex flex-col gap-2'>
                <h2 className='mb-2 text-xl font-bold'>Interview Plan</h2>
                <p className='mb-4 text-sm text-gray-600'>
                  Set up your interview plan here. Changes will be saved
                  automatically.
                </p>
              </div>
            </div>

            <div className='my-4 mb-10 max-w-2xl space-y-4'>
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
                <p className='text-gray-600'>
                  Create your interview stages for the job to ensure a
                  structured evaluation process. Add different interview types
                  such as &quot;Initial Screening&quot; or &quot;Technical
                  Interview.&quot; Use this template each time you schedule
                  interviews for candidates to maintain consistency and
                  efficiency.
                </p>
              )}

              <AddStageComponent handleCreate={handleCreate} />
            </div>
          </div>
        </div>
      </div>
      <InterviewDrawers
        open={drawerModal}
        drawers={drawers}
        handleClose={handleDrawerClose}
      />
    </>
  );
};

const AddStageComponent = ({
  handleCreate,
}: {
  handleCreate: (
    // eslint-disable-next-line no-unused-vars
    key: keyof DrawerType['create'],
    // eslint-disable-next-line no-unused-vars
    plan_id: string,
    // eslint-disable-next-line no-unused-vars
    order: number,
  ) => void;
}) => {
  const { interviewPlans, handleCreatePlan } = useJobInterviewPlan();
  const [form, setForm] = useState(false);
  const nameField = useRef<null | HTMLInputElement>(null);

  const handleAddStage = async () => {
    if (nameField.current.value.length) {
      const interviewPlan = await handleCreatePlan(
        nameField.current.value,
        interviewPlans.data.length + 1,
      );
      handleCreate('session', interviewPlan.id, 1);
      setForm(false);
    }
  };
  useEffect(() => {
    nameField.current?.focus();
  }, []);
  return (
    <>
      {form && (
        <div className='flex w-full flex-row items-center justify-between gap-2 rounded-md border bg-white p-4'>
          <div className='flex flex-1'>
            <UITextField
              placeholder='Stage Name'
              ref={nameField}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              fieldSize='medium'
              fullWidth
            />
          </div>

          <div className='flex gap-2'>
            <UIButton
              size='sm'
              variant='default'
              onClick={() => handleAddStage()}
            >
              Add
            </UIButton>
            <UIButton
              size='sm'
              variant='secondary'
              onClick={() => setForm(!form)}
            >
              Cancel
            </UIButton>
          </div>
        </div>
      )}
      {!form && (
        <div className='flex w-full flex-row'>
          <UIButton
            variant='outline'
            onClick={() => setForm(!form)}
            className='w-full'
          >
            Add Stage
          </UIButton>
        </div>
      )}
    </>
  );
};

const BreadCrumbs = () => {
  const { push } = useRouterPro();
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
    isPlanUpdating,
    isStageDeleting,
    // handleUpdateSession,
  } = useJobInterviewPlan();
  const index = interviewPlans.data.findIndex((plan) => plan.id === plan_id);
  const prevData = interviewPlans?.data?.[index - 1] ?? null;
  const data = interviewPlans?.data?.[index] ?? null;
  const nextData = interviewPlans?.data?.[index + 1] ?? null;
  const [expanded] = React.useState(true);

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
  const handleDelete = useCallback(
    async (args: DeleteInterviewSession, sessionName: '') => {
      const isLoading = getLoadingState(args.session_id);
      if (!isLoading) {
        setPopupModal(true);
        setPopup({
          name: sessionName,
          break: false,
          id: args.session_id,
        });
      } else {
        toast.warning('Session under deletion. Please wait.');
      }
    },
    [],
  );
  const sessionsCount = data.interview_session.length;
  const sessions = data.interview_session.map((session, order) => (
    <InterviewSession
      handleDeletionSession={handleDelete}
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

  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <OptimisticWrapper loading={isPlanUpdating}>
        <InterviewPlanWrap
          isTopArrowVisible={!!prevData}
          onClickUp={() =>
            handleSwapPlan({
              plan_id_1: prevData.id,
              plan_id_2: data.id,
            })
          }
          isBottomArrowVisible={!!nextData}
          onClickDown={() =>
            handleSwapPlan({
              plan_id_1: nextData.id,
              plan_id_2: data.id,
            })
          }
          textStageName={`${capitalizeFirstLetter(data.name)}`}
          textInterviewCount={`${sessions.length} ${sessions.length > 1 ? 'Interviews' : 'Interview'}`}
          isInputVisible={editPlan}
          isSlotInterviewPlanVisible={expanded}
          slotInputButton={
            // Start of Selection
            <div className='flex items-center gap-2'>
              <UITextField ref={planRef} defaultValue={data.name} fullWidth />
              <UIButton
                size='sm'
                variant='default'
                onClick={() => handleUpdatePlan(planRef.current.value)}
              >
                Update
              </UIButton>
              <UIButton
                size='sm'
                variant='secondary'
                onClick={() => handleEditPlan()}
              >
                Cancel
              </UIButton>
            </div>
          }
          slotRightIconButton={
            <div className='ml-4 flex flex-row items-center gap-1'>
              <UIButton
                variant='ghost'
                size='sm'
                icon={<Edit className='h-4 w-4' />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditPlan();
                }}
              />
              <UIButton
                variant='ghost'
                size='sm'
                className='text-red-700'
                onClick={() => setDeleteOpen(true)}
                icon={<Trash size={10} color='brown' />}
              />
              <UIDialog
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                title='Delete Confirmation  '
                slotButtons={
                  <>
                    <UIButton
                      variant='secondary'
                      size='sm'
                      onClick={() => setDeleteOpen(false)}
                    >
                      Cancel
                    </UIButton>
                    <UIButton
                      size='sm'
                      isLoading={isStageDeleting}
                      onClick={async () => {
                        await deletePlan({ id: plan_id });
                        setDeleteOpen(false);
                      }}
                    >
                      Delete
                    </UIButton>
                  </>
                }
              >
                Are you sure to delete this interview plan ?
              </UIDialog>
            </div>
          }
          slotInterviewPlanDetail={
            <Collapsible open={expanded}>
              <CollapsibleContent>
                <div className='pt-2'>
                  {sessionsCount ? (
                    <DndProvider backend={HTML5Backend}>{sessions}</DndProvider>
                  ) : (
                    <div className='flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300'>
                      <Kanban className='mb-4 h-4 w-4 text-gray-400' />
                      <p className='mb-4 text-gray-500'>
                        No interview plan found
                      </p>
                      <UIButton
                        size='sm'
                        variant='outline'
                        onClick={() => handleCreate('session', plan_id, 1)}
                        leftIcon={<Plus />}
                      >
                        Add Interview
                      </UIButton>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          }
        />
      </OptimisticWrapper>

      <InterviewDeletePopup
        open={popupModal}
        popup={popup}
        handleClose={handlePopupClose}
        handleDelete={() =>
          handleDeleteSession({
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
  handleDeletionSession: (
    // eslint-disable-next-line no-unused-vars
    args: DeleteInterviewSession,
    // eslint-disable-next-line no-unused-vars
    sessionName: string,
  ) => void;
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
  handleDeletionSession,
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

  const [hover, setHover] = useState(false);
  const sessionEditType =
    session.session_type === 'debrief' ? 'debrief' : 'session';
  return (
    <div
      ref={manageJob ? ref : null}
      className={`flex flex-col ${isDragging ? 'opacity-0' : 'opacity-100'}`}
      data-handler-id={handlerId}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <OptimisticWrapper loading={isLoading}>
        <div className={`flex flex-col`}>
          <InterviewPlanDetail
            textModuleName={
              <div className='flex flex-row items-center gap-3'>
                <>{session.name}</>
                <div className='text-sm font-normal text-neutral-500'>
                  {getSessionType(session.session_type)}
                </div>
              </div>
            }
            onClickEditSession={() => {
              handleEdit(sessionEditType, session.id);
            }}
            isDebriefIconVisible={session.session_type === 'debrief'}
            isOnetoOneIconVisible={session.session_type === 'individual'}
            isPanelIconVisible={session.session_type === 'panel'}
            textDuration={`${session.session_duration} minutes`}
            slotPlatformIcon={<IconScheduleType type={session.schedule_type} />}
            textPlatformName={capitalizeAll(session.schedule_type)}
            textLink={session?.interview_module?.name ?? '---'}
            textSelected={`Interviewers (${session.interviewer_cnt} out of ${members.qualified.length} members will be selected)`}
            slotInterviewers={
              <InterviewSessionMembers members={members.qualified} />
            }
            onClickDeleteSession={() => {
              handleDeletionSession(
                {
                  interview_plan_id: plan_id,
                  session_id: session.id,
                },
                session.name,
              );
            }}
            onClickLink={() =>
              window.open(
                `interview-pools/${session.interview_module.id}?tab=qualified`,
                '_blank',
              )
            }
            isBreakCardVisible={!lastSession && session.break_duration !== 0}
            slotBreakCard={
              <InterviewBreak
                value={session.break_duration}
                handleEdit={(value: string) =>
                  handleUpdateSession({
                    session_id: session.id,
                    session: { break_duration: parseInt(value) },
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
            slotAddScheduleCard={
              <div className={manageJob ? 'opacity-100' : 'opacity-0'}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div
                      className={
                        'relative mb-4 mt-2 flex h-[20px] items-center justify-center'
                      }
                    >
                      {hover ? (
                        <div className='absolute inset-0 flex w-full flex-col items-center justify-center'>
                          <div className='duration-250 ease relative top-[50%] flex h-[2px] w-full cursor-pointer flex-col items-center justify-center bg-[#cc4e00] transition-all'></div>
                          <div className='z-10 flex h-[20px] w-[20px] items-center justify-center rounded-[20px] bg-[#cc4e00]'>
                            <Plus size={10} color='white' />
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    side='top'
                    align='center'
                    className='border-none bg-transparent p-0 shadow-none'
                  >
                    <AddScheduleOption
                      isBreakVisibe={
                        !lastSession && session.break_duration === 0
                      }
                      onClickAddSession={() => {
                        handleCreate('session');
                      }}
                      onClickAddDebriefSession={() => handleCreate('debrief')}
                      onClickAddBreak={() => {
                        handleUpdateSession({
                          session: { break_duration: 30 },
                          session_id: session.id,
                        });
                      }}
                    />
                  </TooltipContent>
                </Tooltip>
              </div>
            }
            slotButtons={
              manageJob && (
                <>
                  <UIButton
                    size='sm'
                    variant='destructive'
                    onClick={() =>
                      handleDeletionSelect({
                        id: session.id,
                        name: session.name,
                        break: false,
                      })
                    }
                    icon={<Trash2 />}
                  />

                  <UIButton
                    size='sm'
                    variant='secondary'
                    onClick={() =>
                      handleEdit(
                        sessionToEdit(session.session_type),
                        session.id,
                      )
                    }
                    icon={<Pencil />}
                  />
                </>
              )
            }
          />
        </div>
      </OptimisticWrapper>
    </div>
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
      <UIAlert
        color={'error'}
        iconName={'CircleAlert'}
        title={
          'No interviewers assigned. Click on edit to assign interviewers.'
        }
        type='inline'
      />
    );
  return members.map((member) => (
    <div className='mt-2' key={member.user_id}>
      <InterviewSessionMember member={member} />
    </div>
  ));
};

type InterviewSessionMemberProps = { member: CompanyMember };
const InterviewSessionMember = ({ member }: InterviewSessionMemberProps) => {
  const name = getFullName(member.first_name, member.last_name);
  return (
    <div className='mb-1 flex flex-row gap-3'>
      <div className='flex items-center space-x-3'>
        <Avatar className='h-8 w-8 rounded-sm'>
          <AvatarImage src={member.profile_image} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className='text-sm font-medium leading-none'>{name}</p>
          {member.position && (
            <p className='text-sm text-muted-foreground'>{member.position}</p>
          )}
        </div>
      </div>
      {member.paused && <PauseCircle className='h-4 w-4' />}
    </div>
  );
};

const InterviewBreak = ({
  value,
  handleEdit,
  handleDelete,
  manageJob,
}: {
  value: number;
  handleEdit: (_value: string) => void;
  handleDelete: () => void;
  manageJob: boolean;
}) => {
  return (
    <InterviewBreakCard
      slotEditButton={
        manageJob && (
          <>
            <UIButton
              size='sm'
              variant='secondary'
              onClick={handleDelete}
              icon={<Trash2 />}
            />
          </>
        )
      }
      textDuration={
        <UISelectDropDown
          fieldSize='small'
          value={value.toString()}
          onValueChange={handleEdit}
          menuOptions={breakDurations.map((item) => ({
            name: getBreakLabel(item),
            value: item.toString(),
          }))}
        />
      }
    />
  );
};
