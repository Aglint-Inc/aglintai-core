'use client';

import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';
import {
  PageDescription,
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';
import { ScrollArea } from '@components/ui/scroll-area';

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
          data?.length !== 0 && (
            <PageHeader>
              <PageHeaderText>
                <PageTitle>Automations</PageTitle>
                <PageDescription>
                  Manage company wide automations to streamline your recruitment
                  process.
                </PageDescription>
              </PageHeaderText>
              <Actions />
            </PageHeader>
          )
        }
      >
        {(data ?? []).length > 0 ? (
          <div className='space-y-4 px-4'>
            <Filters />
            <ScrollArea className='h-[calc(100vh-220px)]'>
              <Content />
            </ScrollArea>
          </div>
        ) : (
          <EmptyWorkflow />
        )}
      </OneColumnPageLayout>
    </>
  );
};

export default Page;
