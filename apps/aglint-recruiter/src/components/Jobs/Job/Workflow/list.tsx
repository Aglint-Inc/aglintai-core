/* eslint-disable security/detect-object-injection */
import { Dialog, Stack } from '@mui/material';
import FilterHeader from 'aglint-recruiter/src/components/Common/FilterHeader';
import { useRouter } from 'next/router';
import { createContext, useCallback, useContext, useMemo } from 'react';

import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { AssessmentListCardLoader } from '@/devlink2/AssessmentListCardLoader';
import { RcCheckbox } from '@/devlink2/RcCheckbox';
import { GeneralPopupLarge } from '@/devlink3/GeneralPopupLarge';
import { WorkflowCard } from '@/devlink3/WorkflowCard';
import { WorkflowEmpty } from '@/devlink3/WorkflowEmpty';
import Loader from '@/src/components/Common/Loader';
import OptimisticWrapper from '@/src/components/NewAssessment/Common/wrapper/loadingWapper';
import { getTriggerOption } from '@/src/components/Workflow/constants';
import { WorkflowTags } from '@/src/components/Workflow/index/body/content';
import {
  getFilteredWorkflows,
  useWorkflowFilterOptions,
} from '@/src/components/Workflow/index/body/filters';
import { JobIcon } from '@/src/components/Workflow/index/body/icons';
import { useJob } from '@/src/context/JobContext';
import {
  JobDashboardStore,
  useJobDashboardStore,
} from '@/src/context/JobDashboard/store';
import { useWorkflows } from '@/src/context/Workflows';
import {
  useJobWorkflowConnect,
  useJobWorkflowDisconnect,
  useJobWorkflowMutations,
} from '@/src/queries/job-workflow';
import { useWorkflowQuery } from '@/src/queries/workflow';
import { Workflow } from '@/src/types/workflow.types';
import ROUTES from '@/src/utils/routing/routes';
import toast from '@/src/utils/toast';

const useJobWorkflowActions = () => {
  const { job_id, devlinkProps } = useJob();
  const {
    workflows: { data, status },
  } = useWorkflows();

  const { update, remove } = useJobWorkflowMutations({ id: job_id });

  const mutations = [
    ...update.flatMap(({ workflow_ids }) => workflow_ids),
    ...remove.map(({ workflow_id }) => workflow_id),
  ];

  const getLoadingState = (id: string) => {
    return !!mutations.find((workflow_id) => workflow_id === id);
  };

  const workflows = (data ?? []).filter(
    ({ jobs, id }) =>
      getLoadingState(id) || !!jobs.find(({ id }) => id === job_id),
  );

  const { mutate: connect } = useJobWorkflowConnect({ id: job_id });
  const { mutate: disconnect } = useJobWorkflowDisconnect({ id: job_id });

  const handleConnect = (
    workflow_ids: Parameters<typeof connect>[0]['workflow_ids'],
  ) => connect({ job_id, workflow_ids });

  const handleDisconnect = (
    workflow_id: Parameters<typeof disconnect>[0]['workflow_id'],
  ) => disconnect({ job_id, workflow_id });

  return {
    job_id,
    devlinkProps,
    workflows,
    status,
    getLoadingState,
    handleConnect,
    handleDisconnect,
  };
};

const JobWorkflowContext =
  createContext<ReturnType<typeof useJobWorkflowActions>>(undefined);

const useJobWorkflows = () => useContext(JobWorkflowContext);

const JobWorkflowComp = () => {
  const value = useJobWorkflowActions();
  return (
    <JobWorkflowContext.Provider value={value}>
      <Stack>
        <Stack gap={'1px'} bgcolor={'var(--neutral-6)'}>
          <JobWorkflows />
        </Stack>
        <WorkflowBrowser />
      </Stack>
    </JobWorkflowContext.Provider>
  );
};

export default JobWorkflowComp;

const JobWorkflows = () => {
  const { devlinkProps, workflows, status, getLoadingState, handleDisconnect } =
    useJobWorkflows();
  const { push } = useRouter();
  if (status === 'pending')
    return (
      <>
        {[...Array(3)].map((e, i) => (
          <Stack bgcolor={'white'} key={i}>
            <AssessmentListCardLoader border={'none'} />
          </Stack>
        ))}
      </>
    );
  else if (status === 'error') return <>Error</>;
  if (workflows.length === 0)
    return (
  <Stack bgcolor={'white'} padding={'12px'}>
        <GlobalEmptyState
        iconName={'lan'}
        styleEmpty={{ style: { backgroundColor: 'var(--neutral-3)' } }}
        textDesc={'No workflows connected'}
      />

  </Stack>
    );
  const cards = workflows
    .toSorted((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0))
    .map((workflow) => {
      const loading = getLoadingState(workflow.id);
      return (
        <OptimisticWrapper key={workflow.id} loading={loading}>
          <WorkflowCard
            key={workflow.id}
            showButtons={true}
            isCheckboxVisible={false}
            onClickDelete={{
              onClick: () => handleDisconnect(workflow.id),
              ...devlinkProps,
            }}
            isEditButton={false}
            onClickEdit={{
              onClick: () =>
                push(ROUTES['/workflows/[id]']({ id: workflow.id })),
            }}
            textJobs={<></>}
            textWorkflowName={
              <Stack maxWidth={'420px'}>{workflow.title}</Stack>
            }
            textWorkflowTrigger={getTriggerOption(
              workflow.trigger,
              workflow.phase,
            )}
            slotBadge={<WorkflowTags tags={workflow.tags} />}
            smallCard={'true'}
          />
        </OptimisticWrapper>
      );
    });
  return <>{cards}</>;
};

const WorkflowBrowser = () => {
  const { workflows, handleConnect } = useJobWorkflows();
  const { data, status } = useWorkflowQuery();
  const {
    popup: { open },
    filters,
    resetWorkflow,
    selections,
    setSelections,
  } = useJobDashboardStore(
    ({ popup, filters, resetWorkflow, selections, setSelections }) => ({
      popup,
      filters,
      resetWorkflow,
      selections,
      setSelections,
    }),
  );
  const workflowIds = (workflows ?? []).map(({ id }) => id);

  const handleClose = useCallback(() => {
    resetWorkflow();
  }, []);

  if (status === 'error') return <>Error</>;
  if (status === 'pending') return <Loader />;

  const count = selections.length;

  const handleClick = (action: 'insert' | 'delete', id: Workflow['id']) => {
    switch (action) {
      case 'insert':
        {
          setSelections([...selections, id]);
        }
        break;
      case 'delete':
        setSelections(selections.filter((selection) => selection !== id));
        break;
    }
  };

  const filteredWorkflows = (data ?? []).filter(
    ({ id }) => !workflowIds.includes(id),
  );
  const cards = getFilteredWorkflows(filters, filteredWorkflows).map(
    ({ id, title, trigger, phase, jobs }) => {
      const checked = selections.includes(id);
      const jobCount = (jobs ?? []).length;
      return (
        <WorkflowCard
        widthText={'small'}
        border={'visible'}
          key={id}
          isCheckboxVisible={true}
          // isChecked={checked}
          slotCheckbox={
            <RcCheckbox
              isChecked={checked}
              onclickCheck={{
                onClick: () => handleClick(checked ? 'delete' : 'insert', id),
              }}
              text={<></>}
            />
          }
          textWorkflowName={title}
          textWorkflowTrigger={getTriggerOption(trigger, phase)}
          textJobs={`Used in ${jobCount} job${jobCount === 1 ? '' : 's'}`}
          onClickDelete={{ style: { display: 'none' } }}
          isEditButton={false}
          onClickEdit={{
            onClick: () => handleClick(checked ? 'delete' : 'insert', id),
          }}
        />
      );
    },
  );

  const handleSubmit = () => {
    if (selections.length === 0) {
      toast.error('Please add one or more templates');
      return;
    }
    handleConnect(selections);
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      sx={{
        '& .MuiPaper-root': {
          width: '600px !important',
          maxWidth: '600px !important',
        },
      }}
    >
      <GeneralPopupLarge
        isIcon={false}
        onClickAction={{ onClick: () => handleSubmit() }}
        textPopupTitle={'Add Workflow'}
        textPopupButton={
          <Stack direction={'row'} gap={1}>
            Add
            <Stack
              px={'8px'}
              style={{
                display: count ? 'flex' : 'none',
                alignItems: 'center',

                backgroundColor: 'var(--white)',
                color: 'var(--accent-11)',
                borderRadius: 'var(--radius-1)',
              }}
            >
              {count}
            </Stack>
          </Stack>
        }
        isDescriptionVisibe={true}
        slotPopup={
          <Stack
            style={{
              height: 'calc(100vh - 300px)',
              gap: '8px',
              overflow: 'scroll',
            }}
          >
            {cards.length ? cards : <WorkflowEmpty />}
          </Stack>
        }
        onClickClose={{ onClick: () => handleClose() }}
        textDescription={<Filters />}
      />
    </Dialog>
  );
};

const Filters = () => {
  const {
    filters: { search, ...filters },
    setFilters,
  } = useJobDashboardStore(({ filters, setFilters }) => ({
    filters,
    setFilters,
  }));
  const { jobOptions, tagOptions } = useWorkflowFilterOptions();

  const options = useMemo(
    () => ({ job: jobOptions, tags: tagOptions }),
    [jobOptions, tagOptions],
  );

  const safeFilters: Parameters<typeof FilterHeader>[0]['filters'] = useMemo(
    () =>
      Object.entries(filters).map(([key, value]) => ({
        active: value.length,
        name: key,
        value: value,
        type: 'filter',
        iconname: '',
        icon: <FilterIcon filter={key as FilterIconProps['filter']} />,
        setValue: (newValue) =>
          setFilters({ [key]: structuredClone(newValue) }),
        options: options[key] ?? [],
      })),
    [filters],
  );

  const component = useMemo(
    () => (
      <FilterHeader
        filters={safeFilters}
        search={{
          value: search,
          setValue: (newValue) => setFilters({ search: newValue }),
          placeholder: 'Search workflow',
        }}
      />
    ),
    [safeFilters, search],
  );
  return component;
};

type FilterIconProps = {
  filter: keyof Omit<JobDashboardStore['filters'], 'search'>;
};
const FilterIcon = ({ filter }: FilterIconProps) => {
  switch (filter) {
    case 'job':
      return <JobIcon />;
  }
};
