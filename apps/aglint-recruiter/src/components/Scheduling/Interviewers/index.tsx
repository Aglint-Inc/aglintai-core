import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Badge } from '@components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import { AllInterviewers } from '@devlink2/AllInterviewers';
import { Stack } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Search } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import { UIPageLayout } from '@/components/Common/UIPageLayout';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { getFullName } from '@/utils/jsonResume';
import ROUTES from '@/utils/routing/routes';
import { supabase } from '@/utils/supabase/client';

import Loader from '../../Common/Loader';
import { ShowCode } from '../../Common/ShowCode';
import { useTeamMembers } from '../../CompanyDetailComp/TeamManagement';
import AddMember from '../../CompanyDetailComp/TeamManagement/AddMemberDialog';
import Filters from './Filters';

const InterviewTab = () => {
  const { recruiter } = useAuthDetails();
  const router = useRouter();
  const { data: interviewers, isLoading, isFetched } = useInterviewerList();
  const [filteredInterviewer, setFilteredInterviewer] = useState(interviewers);
  const { activeMembers } = useTeamMembers();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  return (
    <UIPageLayout
      slotTopbarRight={
        recruiter?.recruiter_preferences?.greenhouse ? (
          <></>
        ) : (
          <UIButton
            size='sm'
            variant='default'
            leftIcon={<Plus />}
            onClick={() => {
              setOpenDrawer(true);
            }}
          >
            Add Interviewer
          </UIButton>
        )
      }
      slotTopbarLeft={
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='#' onClick={() => router.push(ROUTES['/'])}>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Interviewers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      }
      slotBody={
        <ShowCode>
          <ShowCode.When isTrue={isLoading}>
            <Loader />
          </ShowCode.When>
          <ShowCode.When isTrue={isFetched}>
            <Stack position={'relative'}>
              <Filters
                setFilteredInterviewer={setFilteredInterviewer}
                interviewers={interviewers}
                isLoading={isLoading}
              />
              {filteredInterviewer?.length > 0 ? (
                <>
                  <AllInterviewers
                    slotAllInterviewesCard={
                      filteredInterviewer
                        ? filteredInterviewer
                            .sort(
                              (a, b) =>
                                b.qualified_module_names.filter((ele) => ele)
                                  .length -
                                  a.qualified_module_names.filter((ele) => ele)
                                    .length &&
                                b.training_module_names.filter((ele) => ele)
                                  .length -
                                  a.training_module_names.filter((ele) => ele)
                                    .length,
                            )
                            .map((member) => {
                              return (
                                <Card
                                  key={member.user_id}
                                  className='cursor-pointer hover:shadow-md transition-shadow'
                                  onClick={() => {
                                    router.push(
                                      ROUTES['/user/profile/[user_id]']({
                                        user_id: member.user_id,
                                      }),
                                    );
                                  }}
                                >
                                  <CardHeader>
                                    <div className='flex items-center space-x-4'>
                                      <Avatar>
                                        <AvatarImage
                                          src={member.profile_image}
                                          alt={getFullName(
                                            member.first_name,
                                            member.last_name,
                                          )}
                                        />
                                        <AvatarFallback>
                                          {(() => {
                                            const getInitials = (
                                              firstName: string,
                                              lastName: string,
                                            ) => {
                                              return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
                                            };
                                            return getInitials(
                                              member.first_name,
                                              member.last_name,
                                            );
                                          })()}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <h3 className='font-semibold'>{`${member.first_name} ${
                                          member.last_name || ''
                                        }`}</h3>
                                        <p className='text-sm text-gray-500'>
                                          {member?.position}
                                        </p>
                                      </div>
                                    </div>
                                  </CardHeader>
                                  <CardContent>
                                    <div className='space-y-4'>
                                      <div className='flex justify-between'>
                                        <span>Completed Interviews</span>
                                        <span>
                                          {member.completed_meeting_count}
                                        </span>
                                      </div>
                                      <div className='flex justify-between'>
                                        <span>Upcoming Interviews</span>
                                        <span>
                                          {member.upcoming_meeting_count}
                                        </span>
                                      </div>
                                      {!member.is_calendar_connected && (
                                        <Badge
                                          variant='outline'
                                          className='bg-yellow-100 text-yellow-800'
                                        >
                                          Calendar Not Connected
                                        </Badge>
                                      )}
                                      <div>
                                        <h4 className='font-semibold mb-2'>
                                          Interview Modules
                                        </h4>
                                        <div className='flex flex-wrap gap-2'>
                                          {member.qualified_module_names
                                            .filter(Boolean)
                                            .slice(0, 2)
                                            .map((item) => (
                                              <Badge
                                                key={item}
                                                variant='secondary'
                                              >
                                                {item}
                                              </Badge>
                                            ))}
                                          {member.qualified_module_names.filter(
                                            Boolean,
                                          ).length > 2 && (
                                            <Badge variant='secondary'>{`+${
                                              member.qualified_module_names.filter(
                                                Boolean,
                                              ).length - 2
                                            }`}</Badge>
                                          )}
                                        </div>
                                      </div>
                                      <div>
                                        <h4 className='font-semibold mb-2'>
                                          Modules in Training
                                        </h4>
                                        <div className='flex flex-wrap gap-2'>
                                          {member.training_module_names
                                            .filter(Boolean)
                                            .slice(0, 2)
                                            .map((item) => (
                                              <Badge
                                                key={item}
                                                variant='secondary'
                                              >
                                                {item}
                                              </Badge>
                                            ))}
                                          {member.training_module_names.filter(
                                            Boolean,
                                          ).length > 2 && (
                                            <Badge variant='secondary'>{`+${
                                              member.training_module_names.filter(
                                                Boolean,
                                              ).length - 2
                                            }`}</Badge>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            })
                        : ''
                    }
                  />
                  <AddMember
                    open={openDrawer}
                    menu={'addMember'}
                    memberList={activeMembers.map((mem) => ({
                      id: mem.user_id,
                      name: getFullName(mem.first_name, mem.last_name),
                    }))}
                    defaultRole={{
                      role: 'interviewer',
                      role_id: '6e41fa87-c455-43b5-94f4-d37ff6388376',
                    }}
                    onClose={() => {
                      setOpenDrawer(false);
                    }}
                  />
                </>
              ) : (
                <div className='flex flex-col items-center justify-center h-64 text-center'>
                  <Search className='w-12 h-12 text-muted-foreground mb-2' />
                  <p className='text-sm text-muted-foreground'>
                    No interviewers found
                  </p>
                </div>
              )}
            </Stack>
          </ShowCode.When>
        </ShowCode>
      }
    />
  );
};
// InterviewTab.privateProvider = function privateProvider(page) {
//   return <InterviewerContextProvider>{page}</InterviewerContextProvider>;
// };
export default InterviewTab;

export const useInterviewerList = () => {
  const { recruiter } = useAuthDetails();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['interviewer_list'],
    queryFn: () => getInterviewerList(recruiter.id),
  });
  const refetch = () =>
    queryClient.invalidateQueries({ queryKey: ['interviewer_list'] });
  return { ...query, refetch };
};

async function getInterviewerList(recruiter_id: string) {
  const { data } = await supabase
    .from('all_interviewers')
    .select()
    .eq('recruiter_id', recruiter_id)
    .eq('status', 'active')
    .throwOnError();

  return data;
}
