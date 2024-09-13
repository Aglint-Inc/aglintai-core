import { useToast } from '@components/hooks/use-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { ModuleMembers } from '@devlink2/ModuleMembers';
import { AiBookingInstruction } from '@devlink3/AiBookingInstruction';
import { MoreMenu } from '@devlink3/MoreMenu';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Calendar, Edit, EllipsisVertical, Loader2, Plus } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import Loader from '@/components/Common/Loader';
import { UIBadge } from '@/components/Common/UIBadge';
import { UIButton } from '@/components/Common/UIButton';
import UITab, { UITabWrapper } from '@/components/Common/UITab';
import { UITextArea } from '@/components/Common/UITextArea';
import UITypography from '@/components/Common/UITypography';
import { useSchedulingContext } from '@/context/SchedulingMain/SchedulingMainProvider';
import { useKeyPress } from '@/hooks/useKeyPress';
import { useAllDepartments } from '@/queries/departments';
import ROUTES from '@/utils/routing/routes';
import { supabase } from '@/utils/supabase/client';
import { capitalizeAll } from '@/utils/text/textUtils';
import { WorkflowConnectedCard } from '@/workflow/components/WorkflowConnectedCard';

import Instructions from '../../../ScheduleDetails/Instructions';
import { QueryKeysInteviewModules } from '../../queries/type';
import {
  setIsArchiveDialogOpen,
  setIsDeleteModuleDialogOpen,
  setIsSettingsDialogOpen,
} from '../../store';
import { type ModuleType } from '../../types';
import { unArchiveModuleById } from '../../utils';
import AddMemberDialog from '../AddMemberDialog';
import DeleteMemberDialog from '../DeleteMemberDialog';
import PauseDialog from '../PauseDialog';
import ResumeMemberDialog from '../ResumeMemberDialog';
import SchedulesModules from '../Schedules';
import ModuleSettingComp from '../Training';
import { type TabsModuleMembers } from '../type';
import SettingsDialog from './EditModule';
import { InterviewMemberList } from './InterviewMemberList';
import SlotQualifiedMembers from './SlotQualifiedMembers';
import SlotTrainingMembers from './SlotTrainingMembers';
import { tabsModuleMembers } from './utils';

interface SlotBodyCompProps {
  editModule: ModuleType;
  fetchingModule: boolean;
  isFetching: boolean;
  refetch: () => void;
}

function SlotBodyComp({
  editModule,
  fetchingModule,
  isFetching,
  refetch,
}: SlotBodyCompProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { loading } = useSchedulingContext();

  const currentTab = (router.query.tab ||
    'qualified') as TabsModuleMembers['queryParams'];

  const [textValue, setTextValue] = useState(null);

  async function updateInstruction() {
    if (textValue) {
      const { data } = await supabase
        .from('interview_module')
        .update({ instructions: textValue })
        .eq('id', editModule?.id)
        .select();
      if (data) {
        toast({
          title: 'Instructions updated successfully.',
        });
        refetch();
      }
    }
  }

  const sections = tabsModuleMembers.map((item) => item.queryParams);
  const tabCount: number = sections.length - 1;
  const currentIndex: number = sections.indexOf(currentTab);

  const handlePrevious = () => {
    const pre =
      // eslint-disable-next-line security/detect-object-injection
      currentIndex === 0 ? sections[tabCount] : sections[currentIndex - 1];
    router.push(
      ROUTES['/scheduling/interview-types/[type_id]']({
        type_id: editModule.id,
      }) + `?tab=${pre}`,
      undefined,
      {
        shallow: true,
      },
    );
  };
  const handleNext = () => {
    const next =
      currentIndex === tabCount ? sections[0] : sections[currentIndex + 1];

    router.push(
      ROUTES['/scheduling/interview-types/[type_id]']({
        type_id: editModule.id,
      }) + `?tab=${next}`,
      undefined,
      {
        shallow: true,
      },
    );
  };

  const { pressed: right } = useKeyPress('ArrowRight');
  const { pressed: left } = useKeyPress('ArrowLeft');

  useEffect(() => {
    if (left) handlePrevious();
    else if (right) handleNext();
  }, [left, right]);

  const { data } = useAllDepartments();

  const department =
    data?.find((item) => item.id === editModule?.department_id)?.name || '--';

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  // eslint-disable-next-line no-unused-vars
  const id = open ? 'simple-popover' : undefined;

  const queryClient = useQueryClient();

  const [value, setValue] =
    useState(`Rotate interviewers to ensure diverse perspectives across interview stages.
Allocate more technical interviews to senior team members with specialized skills.
Ensure interviewers have at least a 30-minute buffer between sessions for debriefing.
Assign panel interviews to teams with complementary expertise to cover all evaluation angles.
Balance interview load across the team, avoiding back-to-back slots when possible.`);

  return (
    <>
      <SettingsDialog editModule={editModule} />
      <AddMemberDialog editModule={editModule} refetch={refetch} />
      <DeleteMemberDialog refetch={refetch} />
      <PauseDialog />
      <ResumeMemberDialog editModule={editModule} />

      {fetchingModule || loading || (!editModule && isFetching) ? (
        <div className='h-full w-full flex items-center justify-center'>
          <Loader2 className='w-8 h-8 animate-spin' />
        </div>
      ) : (
        <>
          {editModule && (
            <InterviewMemberList
              slotBanner={<></>}
              slotJobsCard={
                editModule?.id && <ConnectedJobs module_id={editModule?.id} />
              }
              slotEditButton={
                <div className='flex flex-row space-x-1'>
                  <UIButton
                    variant='secondary'
                    leftIcon={<Edit />}
                    size='sm'
                    onClick={() => {
                      setIsSettingsDialogOpen(true);
                    }}
                  >
                    Edit
                  </UIButton>
                  <UIButton
                    variant='secondary'
                    size='sm'
                    onClick={handleClick}
                    leftIcon={<EllipsisVertical />}
                  />
                </div>
              }
              slotNewTabPill={
                <UITabWrapper>
                  {tabsModuleMembers.map((tab, index) => (
                    <UITab
                      textLabel={tab.name}
                      onClickPill={() => {
                        router.push(
                          ROUTES['/scheduling/interview-types/[type_id]']({
                            type_id: editModule.id,
                          }) + `?tab=${tab.queryParams}`,
                          undefined,
                          {
                            shallow: true,
                          },
                        );
                      }}
                      isPillActive={
                        currentTab === tab.queryParams ||
                        (!currentTab && tab.queryParams == 'qualified')
                      }
                      key={index}
                    />
                  ))}
                </UITabWrapper>
              }
              textDepartment={department}
              textObjective={editModule.description || 'No description'}
              slotModuleContent={
                <>
                  {(currentTab === 'qualified' || !currentTab) && (
                    <>
                      <ModuleMembers
                        isMembersTrainingVisible={false}
                        slotQualifiedMemberList={
                          <SlotQualifiedMembers editModule={editModule} />
                        }
                        slotMembersInTraining={
                          <SlotTrainingMembers
                            editModule={editModule}
                            refetch={refetch}
                          />
                        }
                      />
                    </>
                  )}
                  {currentTab === 'schedules' && <SchedulesModules />}

                  {currentTab === 'instructions' && (
                    <>
                      <Instructions
                        isWidth={true}
                        isMinWidth={false}
                        instruction={editModule?.instructions}
                        setTextValue={setTextValue}
                        showEditButton={true}
                        updateInstruction={updateInstruction}
                        isBorder={true}
                        isPadding={true}
                      />
                    </>
                  )}

                  {currentTab === 'training' && (
                    <ModuleSettingComp
                      editModule={editModule}
                      refetch={refetch}
                    />
                  )}

                  {currentTab === 'aglintaitoken' && (
                    <div className='flex max-w-[880px] p-4 flex-col gap-3'>
                      <UITypography variant='p' type='small'>
                        These tokens will be used in emails send to candidate or
                        any communication messages to the candidate.
                      </UITypography>
                      <div className='overflow-hidden border border-neutral-200 rounded-md'>
                        <div className='grid grid-cols-[260px_570px] bg-neutral-100'>
                          <div className='p-1 px-3'>
                            <UITypography variant='p' type='small'>
                              Token
                            </UITypography>
                          </div>
                          <div className='p-1 px-3'>
                            <UITypography variant='p' type='small'>
                              Token Detail
                            </UITypography>
                          </div>
                        </div>
                        <div>
                          <>
                            <div className='grid grid-cols-[260px_570px] items-center p-4 border-b'>
                              <div className='flex items-center'>
                                <UIBadge textBadge='Token1' color={'purple'} />
                              </div>
                              <p className='text-sm text-gray-600'>
                                Korem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nunc vulputate libero et velit
                                interdum, ac aliquet odio mattis.
                              </p>
                            </div>
                            <div className='grid grid-cols-[260px_570px] items-center p-4 border-b'>
                              <div className='flex items-center'>
                                <UIBadge textBadge='Token2' color={'purple'} />
                              </div>
                              <p className='text-sm text-gray-600'>
                                Korem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nunc vulputate libero et velit
                                interdum, ac aliquet odio mattis.
                              </p>
                            </div>
                            <div className='grid grid-cols-[260px_570px] items-center p-4 border-b'>
                              <div className='flex items-center'>
                                <UIBadge textBadge='Token3' color={'purple'} />
                              </div>
                              <p className='text-sm text-gray-600'>
                                Korem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nunc vulputate libero et velit
                                interdum, ac aliquet odio mattis.
                              </p>
                            </div>
                          </>
                        </div>
                        <div className='flex h-[62px] p-1 px-3 items-center'>
                          <UIButton
                            size='sm'
                            variant='ghost'
                            leftIcon={<Plus />}
                          >
                            Add Token
                          </UIButton>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentTab === 'aglintaiinstruction' && (
                    <AiBookingInstruction
                      textHowTo='Use these instructions to balance interview load, ensure diverse evaluations, and avoid conflicts.'
                      textExample='Rotate interviewers to ensure diverse perspectives and assign technical interviews to senior team members.'
                      slotTextArea={
                        <UITextArea
                          value={value}
                          rows={8}
                          onChange={(e) => setValue(e.target.value)}
                        />
                      }
                    />
                  )}
                </>
              }
            />
          )}
        </>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <UIButton
            variant='secondary'
            size='sm'
            onClick={handleClick}
            leftIcon={<EllipsisVertical />}
          />
        </PopoverTrigger>
        <PopoverContent className='w-56 p-0'>
          <MoreMenu
            isArchiveVisible={!editModule?.is_archived}
            isUnarchiveVisible={editModule?.is_archived}
            onClickDelete={{
              onClick: () => {
                setIsDeleteModuleDialogOpen(true);
                handleClose();
              },
            }}
            onClickArchive={{
              onClick: () => {
                setIsArchiveDialogOpen(true);
                handleClose();
              },
            }}
            onClickUnarchive={{
              onClick: async () => {
                const isUnArchived = await unArchiveModuleById(editModule.id);
                if (isUnArchived) {
                  const updatedEditModule = {
                    ...editModule,
                    is_archived: false,
                  } as ModuleType;
                  queryClient.setQueryData<ModuleType>(
                    QueryKeysInteviewModules.USERS_BY_MODULE_ID({
                      moduleId: editModule.id,
                    }),
                    {
                      ...updatedEditModule,
                    },
                  );
                  toast({
                    title: 'Interview type unarchived successfully.',
                  });
                }
                handleClose();
              },
            }}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}

export default SlotBodyComp;

const ConnectedJobs = ({ module_id }: { module_id: string }) => {
  useEffect(() => {
    if (module_id) getConnectedJobs();
  }, [module_id]);

  const router = useRouter();
  const getConnectedJobs = async () => {
    const { data, error } = await supabase
      .from('interview_session')
      .select(
        'interview_plan(public_jobs(job_title, departments(name),status,id))',
      )
      .eq('module_id', module_id)
      .throwOnError();

    if (!error) {
      const jobs = data
        .filter((data) => data.interview_plan)
        .map((data) => data?.interview_plan?.public_jobs);
      return jobs;
    }
  };
  const { isLoading, data: connectedJobs } = useQuery({
    queryKey: ['interview_type_connected_jobs', module_id],
    queryFn: getConnectedJobs,
  });

  const filteredConnectedJobs = connectedJobs?.length
    ? connectedJobs.filter((job) => job?.id)
    : [];
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <UITypography type='medium' variant='p'>
        Connected Jobs
      </UITypography>

      <div className='mt-2 space-y-1'>
        {filteredConnectedJobs.length > 0 ? (
          filteredConnectedJobs.map((job, i) => (
            <WorkflowConnectedCard
              key={i}
              isLinkOffVisible={false}
              role={capitalizeAll(job.job_title)}
              textLocation={'---'}
              textRoleCategory={job.departments?.name || '---'}
              slotBadges={
                job.status && (
                  <UIBadge
                    color={
                      job.status === 'published'
                        ? 'success'
                        : job.status === 'closed'
                          ? 'error'
                          : 'warning'
                    }
                    textBadge={capitalizeAll(job.status)}
                  />
                )
              }
              onClickJob={() =>
                router.push(
                  ROUTES['/jobs/[job]']({ job: job.id }) + '/interview-plan',
                )
              }
            />
          ))
        ) : (
          <>
            <GlobalEmpty
              text={'No jobs connected'}
              iconSlot={<Calendar className='h-6 w-6 text-gray-500' />}
            />
          </>
        )}
      </div>
    </>
  );
};
