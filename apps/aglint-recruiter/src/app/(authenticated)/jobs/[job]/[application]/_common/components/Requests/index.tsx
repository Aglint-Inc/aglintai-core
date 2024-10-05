'use client';

import { EmptyState } from '@components/empty-state';
import {
  Section,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { Calendar } from 'lucide-react';
import RequestCard from 'src/app/_common/components/Requests/RequestCard';

import { useApplicationRequests } from '../../hooks/useApplicationRequests';

function Requests() {
  const { data: requests, isLoading } = useApplicationRequests();
  return (
    <Section>
      <SectionHeader>
        <SectionHeaderText>
          <SectionTitle>Requests</SectionTitle>
          <SectionDescription>
            Interview scheduling requests made by the hiring team.
          </SectionDescription>
        </SectionHeaderText>
      </SectionHeader>
      <div className='flex flex-col gap-4'>
        {!isLoading &&
          requests?.map((req) => <RequestCard key={req.id} request={req} />)}
        {!requests?.length && (
          <EmptyState
            icon={Calendar}
            description='No requests found for this application.'
          />
        )}
      </div>
    </Section>
  );
}

export default Requests;
