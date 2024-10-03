import {
  Section,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { useApplicantRequests } from '@requests/hooks/useApplicantRequests';
import { LayoutList } from 'lucide-react';
import { useParams } from 'next/navigation';
import RequestCard from 'src/app/_common/components/Requests/RequestCard';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { Loader } from '@/components/Common/Loader';

function RecentRequests({ applicationId }: { applicationId: string }) {
  const params = useParams();
  const requestId = params?.request as string;
  const { data: requestList, status } = useApplicantRequests({
    application_id: applicationId,
  });
  const recentRequests =
    status === 'success'
      ? requestList.filter((item) => item.id !== requestId)
      : [];
  if (status === 'pending') {
    return (
      <Section>
        <SectionHeaderText>
          <SectionTitle>Recent Requests</SectionTitle>
        </SectionHeaderText>
        <Loader />
      </Section>
    );
  } else
    return (
      <Section>
        <SectionHeaderText>
          <SectionTitle>Recent Requests</SectionTitle>
        </SectionHeaderText>
        <div className='flex flex-col space-y-4'>
          {recentRequests.length === 0 ? (
            // <div className='flex flex-col items-center justify-center space-y-2'>
            //   <LayoutList className='h-8 w-8 text-gray-400' />
            //   <span className='text-sm text-muted-foreground'>
            //     Recent requests not found
            //   </span>
            // </div>
            <GlobalEmpty header='Recent requests not found' icon={<LayoutList className='h-8 w-8 text-gray-400' />}/>
          ) : (
            recentRequests.map((request, index) => {
              return <RequestCard key={index} request={request} />;
            })
          )}
        </div>
      </Section>
    );
}

export default RecentRequests;
