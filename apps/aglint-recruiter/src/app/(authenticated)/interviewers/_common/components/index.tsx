import { EmptyState } from '@components/empty-state';
import { OneColumnPageLayout } from '@components/layouts/one-column-page-layout';
import {
  PageActions,
  PageDescription,
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import { useInterviewerHeaderContext } from '@interviewers/hooks/useInterviewerHeaderContext';
import { Users } from 'lucide-react';

import { Loader } from '@/components/Common/Loader';

import { useAllInterviewers } from '../hooks/useAllInterviewers';
import { Header } from './Header';
import { InterviewerList } from './InterviewerList';

function Interviewers() {
  const { data: interviewers, isLoading } = useAllInterviewers();
  const {
    isFilterApplied,
    searchText,
    selectedDepartments,
    selectedLocations,
    selectedInterviewTypes,
  } = useInterviewerHeaderContext();

  if (isLoading)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Loader />
      </div>
    );

  const filteredInterviewers = isFilterApplied
    ? interviewers.filter((interviewer) => {
        const userInterviewTypeIds = [
          ...interviewer.qualified_types,
          ...interviewer.training_types,
        ]
          ?.map((interviewType) => interviewType?.id)
          .filter((item) => item !== undefined);

        const isSearch =
          searchText.length !== 0
            ? interviewer.name
                .toLocaleLowerCase()
                .includes(searchText.toLocaleLowerCase())
            : true;

        const isInterviewType = selectedInterviewTypes?.length
          ? userInterviewTypeIds.some((item) =>
              selectedInterviewTypes.includes(item),
            )
          : true;

        const isDepartment = selectedDepartments?.length
          ? interviewer?.department?.id &&
            selectedDepartments.includes(interviewer.department.id.toString())
          : true;

        const isLocation = selectedLocations.length
          ? interviewer?.location?.id &&
            selectedLocations.includes(interviewer.location.id.toString())
          : true;

        return isSearch && isDepartment && isLocation && isInterviewType;
      })
    : interviewers;

  return (
    <OneColumnPageLayout
      header={
        <PageHeader>
          <PageHeaderText>
            <PageTitle>Interviewers</PageTitle>
            <PageDescription>
              Interviewers are the users who conduct interviews for the
              interview-pool.
            </PageDescription>
          </PageHeaderText>
          <PageActions>
            <Header />
          </PageActions>
        </PageHeader>
      }
    >
      <Table>
        <TableHeader className='bg-muted'>
          <TableRow>
            <TableHead>Interviewer</TableHead>
            <TableHead>Department & Location</TableHead>
            <TableHead>Module</TableHead>
            <TableHead>Interview Hours</TableHead>
            <TableHead>Interviews</TableHead>
            <TableHead>Training</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInterviewers?.length ? (
            filteredInterviewers.map((interviewer, i) => (
              <InterviewerList key={i} interviewer={interviewer} />
            ))
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
      {filteredInterviewers?.length === 0 ? (
        <div className='flex w-full items-center justify-center'>
          <EmptyState
            icon={Users}
            header={'No Interviewers found'}
            description='Create a new interview pool to get started.'
          />
        </div>
      ) : (
        <></>
      )}
    </OneColumnPageLayout>
  );
}

export default Interviewers;
