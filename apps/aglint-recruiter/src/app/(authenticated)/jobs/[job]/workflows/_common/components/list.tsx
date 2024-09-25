/* eslint-disable security/detect-object-injection */
import OptimisticWrapper from '@components/loadingWapper';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Checkbox } from '@components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { ScrollArea } from '@components/ui/scroll-area';
import { Skeleton } from '@components/ui/skeleton';
import FilterHeader from 'aglint-recruiter/src/components/Common/FilterHeader';
import { Briefcase, Globe, X } from 'lucide-react';
import { createContext, useContext, useMemo } from 'react';

import { Loader } from '@/components/Common/Loader';
import { useJob } from '@/job/hooks';
import { useWorkflowsActions, useWorkflowsStore } from '@/job/workflows/hooks';
import {
  useJobWorkflowConnect,
  useJobWorkflowDisconnect,
  useJobWorkflowMutations,
} from '@/queries/job-workflow';
import { useWorkflowQuery } from '@/queries/workflow';
import { type Workflow } from '@/types/workflow.types';
import { capitalizeSentence } from '@/utils/text/textUtils';
import toast from '@/utils/toast';
import { WorkflowTags } from '@/workflows/components/body/content';
import {
  getFilteredWorkflows,
  useWorkflowFilterOptions,
} from '@/workflows/components/body/filters';
import { useWorkflows } from '@/workflows/hooks';
import { getTriggerOption } from '@/workflows/utils';

import { WorkflowCard } from './WorkflowCard';

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
      <div className='bg-neutral-6 flex flex-col gap-1'>
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
        {[...Array(3)].map((_e, i) => (
          <div key={i} className='bg-white'>
            <Skeleton className='h-[100px] w-full' />
          </div>
        ))}
      </>
    );
  else if (status === 'error') return <>Error</>;
  if (workflows.length === 0)
    return (
      <div className='flex flex-col items-center justify-center p-4'>
        <div className='mb-2'>
          <Globe className='h-9 w-9 text-gray-500' />
        </div>
        <p className='text-sm text-gray-500'>No workflows connected</p>
      </div>
    );
  const cards = workflows
    .toSorted((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0))
    .map((workflow) => {
      const loading = getLoadingState(workflow.id);
      return (
        <OptimisticWrapper key={workflow.id} loading={loading}>
          <div className='p-2'>
            <Card key={workflow.id} className='group relative'>
              <CardHeader className='flex items-start justify-between p-3 pb-0'>
                <CardTitle className='w-full text-base'>
                  <div className='flex max-w-[420px] items-center'>
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
              <div className='absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100'>
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
  const open = useWorkflowsStore((state) => state.open);
  const selections = useWorkflowsStore((state) => state.selections);
  const search = useWorkflowsStore((state) => state.search);
  const job = useWorkflowsStore((state) => state.job);
  const tags = useWorkflowsStore((state) => state.tags);
  const { setSelections, resetAll } = useWorkflowsActions();

  const workflowIds = (workflows ?? []).map(({ id }) => id);

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
  const cards = getFilteredWorkflows(
    { search, job, tags },
    filteredWorkflows,
  ).map(({ id, title, trigger, phase, jobs }) => {
    const checked = selections.includes(id);
    const jobCount = (jobs ?? []).length;
    return (
      <>
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
          isEditButton={false}
          onClickEdit={() => handleClick(checked ? 'delete' : 'insert', id)}
        />
      </>
    );
  });

  const handleSubmit = () => {
    if (selections.length === 0) {
      toast.error('Please add one or more templates');
      return;
    }
    handleConnect(selections);
    resetAll();
  };
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && resetAll()}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Add Workflow</DialogTitle>
        </DialogHeader>
        <div className='mt-4'>
          <Filters />
        </div>
        <ScrollArea className='mt-4 h-[calc(100vh-300px)]'>
          {cards.length ? (
            <div className='grid gap-4'>{cards}</div>
          ) : (
            <div className='flex h-full items-center justify-center'>
              <div className='text-center'>
                <Briefcase className='mx-auto h-12 w-12 text-gray-400' />
                <h3 className='mt-2 text-sm font-medium text-gray-900'>
                  No workflows
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  Get started by creating a new workflow.
                </p>
              </div>
            </div>
          )}
        </ScrollArea>
        <div className='mt-4 flex justify-end'>
          <Button onClick={handleSubmit}>
            Add
            {count > 0 && (
              <span className='text-accent-11 ml-2 rounded-md bg-white px-2 py-1'>
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
  const search = useWorkflowsStore((state) => state.search);
  const job = useWorkflowsStore((state) => state.job);
  const tags = useWorkflowsStore((state) => state.tags);
  const { setJob, setTags, setSearch } = useWorkflowsActions();
  const { jobOptions, tagOptions } = useWorkflowFilterOptions();

  const options = useMemo(
    () => ({ job: jobOptions, tags: tagOptions }),
    [jobOptions, tagOptions],
  );

  const jobFilter: Parameters<typeof FilterHeader>[0]['filters'][number] =
    useMemo(
      () => ({
        active: job.length,
        name: 'Job',
        value: job,
        type: 'filter',
        iconname: '',
        setValue: (job) => setJob(job),
        options: options['job'] ?? [],
      }),
      [job],
    );

  const tagFilter: Parameters<typeof FilterHeader>[0]['filters'][number] =
    useMemo(
      () => ({
        active: tags.length,
        name: 'Job',
        value: tags as string[],
        type: 'filter',
        iconname: '',
        setValue: (newTags) => setTags(newTags as typeof tags),
        options: (options['tags'] as unknown as string[]) ?? [],
      }),
      [tags],
    );

  const component = useMemo(
    () => (
      <FilterHeader
        filters={[jobFilter, tagFilter]}
        search={{
          value: search,
          setValue: (newValue) => setSearch(newValue),
          placeholder: 'Search workflow',
        }}
      />
    ),
    [jobFilter, tagFilter, search],
  );
  return component;
};
