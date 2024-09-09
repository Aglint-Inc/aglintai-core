/* eslint-disable jsx-a11y/anchor-is-valid */
import OptimisticWrapper from '@components/loadingWapper';
import { GlobalBadge } from '@devlink3/GlobalBadge';
import { WorkflowEmpty } from '@devlink3/WorkflowEmpty';
import { useRouter } from 'next/router';
import { memo } from 'react';

import { useWorkflows } from '@/context/Workflows';
import { type Workflow } from '@/types/workflow.types';
import ROUTES from '@/utils/routing/routes';
import { capitalizeSentence } from '@/utils/text/textUtils';

import { useWorkflowStore } from '../../../../context/Workflows/store';
import { getTriggerOption, TAG_OPTIONS } from '../../constants';
import { getFilteredWorkflows } from './filters';
import { Skeleton } from '@components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

const Content = memo(() => {
  const {
    workflows: { data, status },
  } = useWorkflows();
  if (status === 'error') return <>Error</>;
  return status === 'pending' ? (
    <div className='flex flex-row gap-4'>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className='animate-pulse space-y-2'>
          <Skeleton className='h-4 w-3/4' />
          <Skeleton className='h-4 w-1/2' />
          <Skeleton className='h-4 w-2/3' />
        </div>
      ))}
    </div>
  ) : (
    <div className='flex flex-col gap-4'>
      <Cards data={data} />
    </div>
  );
});
Content.displayName = 'Content';

export default Content;

const Cards = (props: {
  data: ReturnType<typeof useWorkflows>['workflows']['data'];
}) => {
  const { devlinkProps } = useWorkflows();
  const { push } = useRouter();
  const { filters, setDeletion } = useWorkflowStore(
    ({ filters, setDeletion }) => ({ filters, setDeletion }),
  );
  const { workflowMutations: mutations } = useWorkflows();
  const cards = getFilteredWorkflows(filters, props.data).map(
    ({ id, title, trigger, phase, jobs, tags }) => {
      const loading = !!mutations.find((mutationId) => mutationId === id);
      const jobCount = (jobs ?? []).length;
      return (
        <OptimisticWrapper key={id} loading={loading}>
          <Card key={id} className='cursor-pointer'>
            <Link
              href={ROUTES['/workflows/[id]']({ id })}
              legacyBehavior
              passHref
            >
              <a className='block'>
                <CardHeader className='p-3 pb-0 flex justify-between items-start'>
                  <CardTitle className='text-base w-full font-semibold'>
                    <div className='flex justify-between items-center'>
                      {capitalizeSentence(title ?? '---')}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            className='h-8 w-8 p-0'
                            onClick={(e) => e.preventDefault()}
                          >
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.preventDefault();
                              push(ROUTES['/workflows/[id]']({ id }));
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.preventDefault();
                              setDeletion({
                                open: true,
                                workflow: { id, jobs },
                              });
                            }}
                            {...devlinkProps}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className='p-3 pt-1'>
                  <div className='flex flex-row gap-2'>
                    <WorkflowTags tags={tags} />
                    <p className='text-sm text-gray-600'>
                      {getTriggerOption(trigger, phase)}
                    </p>
                    <p className='text-sm text-gray-600'>{`Used in ${jobCount} job${jobCount === 1 ? '' : 's'}`}</p>
                  </div>
                </CardContent>
              </a>
            </Link>
          </Card>
        </OptimisticWrapper>
      );
    },
  );
  if (cards.length === 0) return <WorkflowEmpty />;
  return <>{cards}</>;
};

export const WorkflowTags = ({ tags }: Pick<Workflow, 'tags'>) => {
  return (
    <div className='flex flex-row gap-2'>
      {(tags ?? []).map((tag) => {
        // eslint-disable-next-line security/detect-object-injection
        const option = TAG_OPTIONS[tag];
        return (
          <GlobalBadge
            key={tag}
            textBadge={option.name}
            size={1}
            showIcon={!!option.iconName || !!option.icon}
            color={option.color}
            iconName={option.iconName}
            slotIcon={option.icon}
          />
        );
      })}
    </div>
  );
};
