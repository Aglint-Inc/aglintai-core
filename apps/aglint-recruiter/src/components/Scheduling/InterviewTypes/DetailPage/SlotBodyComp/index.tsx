import { Popover, Stack, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { GlobalBadge } from '@/devlink/GlobalBadge';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { IconButtonGhost } from '@/devlink/IconButtonGhost';
import { ButtonGhost } from '@/devlink2/ButtonGhost';
import { InterviewMemberList } from '@/devlink2/InterviewMemberList';
import { ModuleMembers } from '@/devlink2/ModuleMembers';
import { AiBookingInstruction } from '@/devlink3/AiBookingInstruction';
import { InterviewTypeToken } from '@/devlink3/InterviewTypeToken';
import { MoreMenu } from '@/devlink3/MoreMenu';
import { NewTabPill } from '@/devlink3/NewTabPill';
import { TokenItem } from '@/devlink3/TokenItem';
import { WorkflowConnectedCard } from '@/devlink3/WorkflowConnectedCard';
import Loader from '@/src/components/Common/Loader';
import UITextField from '@/src/components/Common/UITextField';
import { useSchedulingContext } from '@/src/context/SchedulingMain/SchedulingMainProvider';
import { useKeyPress } from '@/src/hooks/useKeyPress';
import { useAllDepartments } from '@/src/queries/departments';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import { capitalizeAll } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import Instructions from '../../../ScheduleDetails/Instructions';
import { QueryKeysInteviewModules } from '../../queries/type';
import {
  setIsAddMemberDialogOpen,
  setIsArchiveDialogOpen,
  setIsDeleteModuleDialogOpen,
  setIsSettingsDialogOpen,
  setTrainingStatus,
} from '../../store';
import { ModuleType } from '../../types';
import { unArchiveModuleById } from '../../utils';
import AddMemberDialog from '../AddMemberDialog';
import DeleteMemberDialog from '../DeleteMemberDialog';
import PauseDialog from '../PauseDialog';
import ResumeMemberDialog from '../ResumeMemberDialog';
import SchedulesModules from '../Schedules';
import ModuleSettingComp from '../Training';
import { TabsModuleMembers } from '../type';
import SettingsDialog from './EditModule';
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
        toast.success('Instructions updated successfully.');
        refetch();
      }
    }
  }

  let sections = tabsModuleMembers.map((item) => item.queryParams);
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
        <Stack height={'100%'} width={'100%'}>
          <Loader />
        </Stack>
      ) : (
        <>
          {editModule && (
            <InterviewMemberList
              slotJobsCard={
                editModule?.id && <ConnectedJobs module_id={editModule?.id} />
              }
              slotEditButton={
                <Stack direction={'row'} spacing={1}>
                  <ButtonSoft
                    color={'neutral'}
                    size={2}
                    textButton='Edit'
                    iconName='edit'
                    isLeftIcon
                    iconSize={2}
                    onClickButton={{
                      onClick: () => {
                        setIsSettingsDialogOpen(true);
                      },
                    }}
                  />
                  <Stack onClick={handleClick}>
                    <IconButtonGhost
                      iconName='more_vert'
                      size={2}
                      iconSize={6}
                      color={'neutral'}
                    />
                  </Stack>
                </Stack>
              }
              slotNewTabPill={
                <Stack direction={'row'}>
                  {tabsModuleMembers.map((tab) => {
                    return (
                      <NewTabPill
                        key={tab.queryParams}
                        textLabel={tab.name}
                        isPillActive={
                          currentTab === tab.queryParams ||
                          (!currentTab && tab.queryParams == 'qualified')
                        }
                        onClickPill={{
                          onClick: () => {
                            router.push(
                              ROUTES['/scheduling/interview-types/[type_id]']({
                                type_id: editModule.id,
                              }) + `?tab=${tab.queryParams}`,
                              undefined,
                              {
                                shallow: true,
                              },
                            );
                          },
                        }}
                      />
                    );
                  })}
                </Stack>
              }
              textDepartment={department}
              textObjective={editModule.description || 'No description'}
              slotModuleContent={
                <>
                  {(currentTab === 'qualified' || !currentTab) && (
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
                      onClickAddMember={{
                        onClick: () => {
                          setIsAddMemberDialogOpen(true);
                          setTrainingStatus('qualified');
                        },
                      }}
                      onClickAddTrainee={{
                        onClick: () => {
                          setIsAddMemberDialogOpen(true);
                          setTrainingStatus('training');
                        },
                      }}
                    />
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

                  {currentTab === 'aglinttoken' && (
                    <InterviewTypeToken
                      slotTokenItem={
                        <>
                          <TokenItem
                            textTokenDetail='Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
                            slotBadge={
                              <GlobalBadge
                                textBadge='Token1'
                                color={'purple'}
                              />
                            }
                          />
                          <TokenItem
                            textTokenDetail='Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
                            slotBadge={
                              <GlobalBadge
                                textBadge='Token1'
                                color={'purple'}
                              />
                            }
                          />
                          <TokenItem
                            textTokenDetail='Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
                            slotBadge={
                              <GlobalBadge
                                textBadge='Token1'
                                color={'purple'}
                              />
                            }
                          />
                        </>
                      }
                      slotAddToken={
                        <ButtonGhost
                          textButton='Add Token'
                          iconName='add'
                          size={2}
                          isLeftIcon={true}
                        />
                      }
                    />
                  )}

                  {currentTab === 'aglintinstruction' && (
                    <AiBookingInstruction
                      slotTextArea={
                        <UITextField
                          multiline
                          minRows={6}
                          maxRows={10}
                          height={150}
                          value={value}
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
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            boxShadow: 'none',
            borderRadius: 0,
            backgroundColor: 'transparent',
          },
        }}
      >
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
                toast.success('Interview type unarchived successfully.');
              }
              handleClose();
            },
          }}
        />
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

  let filteredConnectedJobs = connectedJobs?.length
    ? connectedJobs.filter((job) => job?.id)
    : [];
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Typography fontWeight={500}>Connected Jobs</Typography>
      <Stack mt={2} spacing={1}>
        {filteredConnectedJobs.length > 0 ? (
          filteredConnectedJobs.map((job, i) => (
            <WorkflowConnectedCard
              key={i}
              isLinkOffVisible={false}
              role={capitalizeAll(job.job_title)}
              textLocation={'---'}
              textRoleCategory={job.departments.name || '---'}
              slotBadges={
                job.status && (
                  <GlobalBadge
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
              onClickJob={{
                onClick: () =>
                  router.push(
                    ROUTES['/jobs/[id]']({ id: job.id }) + '/interview-plan',
                  ),
              }}
            />
          ))
        ) : (
          <GlobalEmptyState
            iconName={'work'}
            size={4}
            slotButton={<></>}
            textDesc={'No jobs connected'}
          />
        )}
      </Stack>
    </>
  );
};
