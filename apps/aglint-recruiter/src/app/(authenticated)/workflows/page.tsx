'use client';

import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';
import {
  PageDescription,
  PageHeader,
  PageTitle,
} from '@components/layouts/page-header';

import { Actions } from '@/workflows/components/actions';

import Content from './_common/components/body/content';
import Filters from './_common/components/body/filters';
import { EmptyWorkflow } from './_common/components/EmptyWorkflow';
import { useWorkflows } from './_common/hooks';

const Page = () => {
  const {
    workflows: { data },
  } = useWorkflows();
  return (
    <>
      <OneColumnPageLayout
        header={
          <PageHeader>
            <PageTitle>Automations</PageTitle>
            <PageDescription>
              You can create automations to streamline your workflow.
            </PageDescription>
            <Actions />
          </PageHeader>
        }
      >
        {data?.length > 0 ? (
          <div className='space-y-4 px-4'>
            <Filters />
            <Content />
          </div>
        ) : (
          <>
            <EmptyWorkflow />
          </>
        )}
      </OneColumnPageLayout>
    </>
  );
};

export default Page;
