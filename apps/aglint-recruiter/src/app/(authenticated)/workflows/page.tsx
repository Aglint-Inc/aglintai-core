'use client';

import { FullWidthLayout } from '@components/layouts/full-width-layout';
import { PageHeader } from '@components/layouts/page-header';

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
      <FullWidthLayout
        header={
          <PageHeader
            title='Automations'
            description='You can create automations to streamline your workflow.'
          >
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
      </FullWidthLayout>
    </>
  );
};

export default Page;
