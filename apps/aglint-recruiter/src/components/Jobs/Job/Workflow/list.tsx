/* eslint-disable security/detect-object-injection */
import OptimisticWrapper from '@components/loadingWapper';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { ScrollArea } from '@components/ui/scroll-area';
import { GlobalEmptyState } from '@devlink/GlobalEmptyState';
import { AssessmentListCardLoader } from '@devlink2/AssessmentListCardLoader';
import { WorkflowCard } from '@devlink3/WorkflowCard';
import { WorkflowEmpty } from '@devlink3/WorkflowEmpty';
import FilterHeader from 'aglint-recruiter/src/components/Common/FilterHeader';
import { Briefcase, X } from 'lucide-react';
import { createContext, useCallback, useContext, useMemo } from 'react';

import Loader from '@/components/Common/Loader';
import { getTriggerOption } from '@/components/Workflow/constants';
import { WorkflowTags } from '@/components/Workflow/index/body/content';
import {
  getFilteredWorkflows,
  useWorkflowFilterOptions,
} from '@/components/Workflow/index/body/filters';
import { useJob } from '@/context/JobContext';
import {
  type JobDashboardStore,
  useJobDashboardStore,
} from '@/context/JobDashboard/store';
import { useWorkflows } from '@/context/Workflows';
import {
  useJobWorkflowConnect,
  useJobWorkflowDisconnect,
  useJobWorkflowMutations,
} from '@/queries/job-workflow';
import { useWorkflowQuery } from '@/queries/workflow';
import { type Workflow } from '@/types/workflow.types';
import toast from '@/utils/toast';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { capitalizeSentence } from '@/utils/text/textUtils';

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
      <div className='flex flex-col gap-1 bg-neutral-6'>
        <JobWorkflows />
        <WorkflowBrowser />
      </div>
    </JobWorkflowContext.Provider>
  );
};

export default JobWorkflowComp;

const JobWorkflows = () => {
  const { workflows, status, getLoadingState, handleDisconnect } =
    useJobWorkflows();
  if (status === 'pending')
    return (
      <>
        {[...Array(3)].map((e, i) => (
          <div key={i} className='bg-white'>
            <AssessmentListCardLoader border={'none'} />
          </div>
        ))}
      </>
    );
  else if (status === 'error') return <>Error</>;
  if (workflows.length === 0)
    return (
      <div className='bg-white p-3'>
        <GlobalEmptyState
          iconName={'lan'}
          styleEmpty={{ style: { backgroundColor: 'var(--neutral-3)' } }}
          textDesc={'No workflows connected'}
        />
      </div>
    );
  const cards = workflows
    .toSorted((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0))
    .map((workflow) => {
      const loading = getLoadingState(workflow.id);
      return (
        <OptimisticWrapper key={workflow.id} loading={loading}>
          <div className='p-2 bg-gray-50'>
            <Card key={workflow.id} className='group relative'>
              <CardHeader className='p-3 pb-0 flex justify-between items-start'>
                <CardTitle className='text-base w-full'>
                  <div className='flex items-center max-w-[420px]'>
                    {capitalizeSentence(workflow.title ?? '---')}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className='p-3 pt-1'>
                <div className='flex flex-col gap-2'>
                  <WorkflowTags tags={workflow.tags} />
                  <p className='text-sm text-gray-600'>
                    {getTriggerOption(workflow.trigger, workflow.phase)}
                  </p>
                </div>
              </CardContent>
              <div className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => handleDisconnect(workflow.id)}
                  className='h-8 w-8 p-0'
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
            </Card>
          </div>
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
          slotCheckbox={
            <Checkbox
              checked={checked}
              onCheckedChange={() =>
                handleClick(checked ? 'delete' : 'insert', id)
              }
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
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Add Workflow</DialogTitle>
        </DialogHeader>
        <div className='mt-4'>
          <Filters />
        </div>
        <ScrollArea className='h-[calc(100vh-300px)] mt-4 bg-gray-50'>
          {cards.length ? cards : <WorkflowEmpty />}
        </ScrollArea>
        <div className='mt-4 flex justify-end'>
          <Button onClick={handleSubmit}>
            Add
            {count > 0 && (
              <span className='ml-2 px-2 py-1 bg-white text-accent-11 rounded-md'>
                {count}
              </span>
            )}
          </Button>
        </div>
      </DialogContent>
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

// const FilterDropdown = ({ filter }) => {
//   // Implement the dropdown for each filter
//   // You can use the shadcn Dropdown component here
// };

type FilterIconProps = {
  filter: keyof Omit<JobDashboardStore['filters'], 'search'>;
};
const FilterIcon = ({ filter }: FilterIconProps) => {
  switch (filter) {
    case 'job':
      return <Briefcase className='h-4 w-4' />;
    // Add more cases for other filter types
    default:
      return null;
  }
};
