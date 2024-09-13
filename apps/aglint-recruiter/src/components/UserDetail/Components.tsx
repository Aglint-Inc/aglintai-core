import { dayjsLocal, getFullName } from '@aglint/shared-utils';
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
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import { Progress } from '@components/ui/progress';
import { Separator } from '@components/ui/separator';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Home,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { useRouter } from 'next/router';

import { UIButton } from '../Common/UIButton';
import { type useInterviewer } from './hook';

type Interviewer = Awaited<ReturnType<typeof useInterviewer>>['data'];

export const Top = ({ interviewer, isTopBarVisible }) => {
  return (
    <div
      className={`sticky top-0 z-10 bg-white shadow transition-all duration-300 ${isTopBarVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <Avatar className='h-10 w-10'>
              <AvatarImage src={interviewer.avatar} alt={interviewer.name} />
              <AvatarFallback>
                {interviewer.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>

            <div>
              <h1 className='text-xl font-bold text-gray-900'>
                {interviewer.name}
              </h1>
              <p className='text-sm text-gray-600'>
                {interviewer.role} {interviewer.department}
              </p>
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-2'>
              <Badge
              //   variant={
              //     interviewer.calendarConnected ? 'success' : 'secondary'
              //   }
              >
                {interviewer.calendarConnected ? (
                  <CheckCircle className='h-4 w-4 mr-1' />
                ) : (
                  <AlertCircle className='h-4 w-4 mr-1' />
                )}
                Calendar
              </Badge>
              <Badge
              //   variant={interviewer.gmailConnected ? 'success' : 'secondary'}
              >
                {interviewer.gmailConnected ? (
                  <CheckCircle className='h-4 w-4 mr-1' />
                ) : (
                  <AlertCircle className='h-4 w-4 mr-1' />
                )}
                Gmail
              </Badge>
            </div>
            <Button variant='outline'>Edit Profile</Button>
            <Button>Schedule Interview</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BreadCrumb = ({ name }) => {
  return (
    <div className='mb-6'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>
              <Home className='h-4 w-4' />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/interviewers'>Interviewers</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export const Header = ({
  avatar,
  name,
  role,
  department,
  location,
  timeZone,
  email,
  phone,
  setIsOpen,
  userCardRef,
}) => {
  return (
    <>
      <Card className='mb-8' ref={userCardRef}>
        <CardContent className='p-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-4'>
              <Avatar className='h-24 w-24'>
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback>{name}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className='text-2xl font-bold text-gray-900'>{name}</h2>
                <p className=' text-gray-600'>
                  {role} - {department}
                </p>
                <div className='flex items-center mt-2 space-x-4'>
                  <span className='flex items-center text-sm text-gray-500'>
                    <MapPin className='h-4 w-4 mr-1' />
                    {location}
                  </span>
                  <span className='flex items-center text-sm text-gray-500'>
                    <Clock className='h-4 w-4 mr-1' />
                    {timeZone}
                  </span>
                </div>
                <div className='flex items-center mt-2 space-x-4'>
                  <span className='flex items-center text-sm text-gray-500'>
                    <Mail className='h-4 w-4 mr-1' />
                    {email}
                  </span>
                  <span className='flex items-center text-sm text-gray-500'>
                    <Phone className='h-4 w-4 mr-1' />
                    {phone}
                  </span>
                </div>
              </div>
            </div>
            <div className='flex flex-col items-end space-y-2'>
              <UIButton>Schedule Interview</UIButton>
              <UIButton
                variant='outline'
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Edit Profile
              </UIButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export const KeyMatrics = ({
  totalHour,
  completedCount,
  declineCount,
  upcomingCount,
}) => {
  const completedHour = dayjsLocal.duration(totalHour, 'minutes').asHours();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          <div className='text-center'>
            <div className='text-xl font-bold text-green-600'>
              {completedHour}
            </div>
            <div className='text-sm text-gray-500'>Interview Hours</div>
          </div>
          <div className='text-center'>
            <div className='text-xl font-bold text-green-600'>
              {completedCount}
            </div>
            <div className='text-sm text-gray-500'>Interviews Completed</div>
          </div>
          <div className='text-center'>
            <div className='text-xl font-bold text-yellow-600'>
              {upcomingCount}
            </div>
            <div className='text-sm text-gray-500'>Average Rating</div>
          </div>
          <div className='text-center'>
            <div className='text-xl font-bold text-red-600'>{declineCount}</div>
            <div className='text-sm text-gray-500'>Declines</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const Qualifications = ({
  interview_types,
}: {
  interview_types: Interviewer['interview_type'];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Qualifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4 max-h-[360px] overflow-y-auto'>
          {interview_types.map((interview_type, index) => (
            <div key={index} className='bg-gray-50 p-4 rounded-lg'>
              <h3 className='text-base font-medium mb-2'>
                {interview_type.module_name}
              </h3>
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                <div>
                  <p className='text-sm text-gray-500'>Monthly Scheduled</p>
                  <p className='text-base font-bold'>-</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Avg. Duration</p>
                  <p className='text-base font-bold'>
                    {interview_type.completed_meeting_duration || 0} min
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Pass Rate</p>
                  <p className='text-base font-bold'>-</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Upcoming Slots</p>
                  <p className='text-base font-bold'>
                    {interview_type.confirmed_meeting_count || 0}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const Performance = ({ interviewer }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div>
            <div className='flex justify-between mb-1'>
              <span className='text-sm font-medium text-gray-700'>
                Candidate Satisfaction
              </span>
              <span className='text-sm font-medium text-gray-700'>
                {interviewer.performanceMetrics.candidateSatisfaction}%
              </span>
            </div>
            <Progress
              value={interviewer.performanceMetrics.candidateSatisfaction}
              className='h-2'
            />
          </div>
          <div>
            <div className='flex justify-between mb-1'>
              <span className='text-sm font-medium text-gray-700'>
                Hiring Manager Satisfaction
              </span>
              <span className='text-sm font-medium text-gray-700'>
                {interviewer.performanceMetrics.hiringManagerSatisfaction}%
              </span>
            </div>
            <Progress
              value={interviewer.performanceMetrics.hiringManagerSatisfaction}
              className='h-2'
            />
          </div>
          <div>
            <div className='flex justify-between mb-1'>
              <span className='text-sm font-medium text-gray-700'>
                Decision Accuracy
              </span>
              <span className='text-sm font-medium text-gray-700'>
                {interviewer.performanceMetrics.decisionAccuracy}%
              </span>
            </div>
            <Progress
              value={interviewer.performanceMetrics.decisionAccuracy}
              className='h-2'
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const Availability = ({ interviewer }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability & AI Instructions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div>
            <h3 className='text-sm font-medium text-gray-700 mb-2'>
              Weekly Hours
            </h3>
            <p className='text-xl font-bold'>
              {interviewer.availability.weeklyHours} hours
            </p>
          </div>
          <div>
            <h3 className='text-sm font-medium text-gray-700 mb-2'>
              Preferred Times
            </h3>
            <div className='space-y-1'>
              {interviewer.availability.preferredTimes.map((time, index) => (
                <Badge key={index} variant='secondary'>
                  {time}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className='text-sm font-medium text-gray-700 mb-2'>
              Unavailable Dates
            </h3>
            <div className='space-y-1'>
              {interviewer.availability.unavailableDates.map((date, index) => (
                <Badge key={index} variant='outline'>
                  {date}
                </Badge>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <h3 className='text-sm font-medium text-gray-700 mb-2'>
              AI Instructions
            </h3>
            <div className='bg-purple-100 p-4 rounded-lg'>
              <div className='flex items-center space-x-2 text-purple-800 mb-2'>
                <Lightbulb className='h-5 w-5' />
                <h4 className='font-semibold'>Personalized AI Tips</h4>
              </div>
              <p className='text-sm text-purple-700 mb-4'>
                Get AI-powered suggestions to improve your interviewing skills
                and optimize your availability.
              </p>
              <Button className='w-full bg-purple-600 hover:bg-purple-700 text-white'>
                Get AI Instructions
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const PendingActions = ({ interviewer }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {interviewer.pendingActions.map((action, index) => (
            <div
              key={index}
              className='flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200'
            >
              <div className='flex items-start space-x-3'>
                <AlertTriangle className='h-5 w-5 text-yellow-500 mt-1' />
                <div>
                  <h3 className='font-medium text-yellow-800'>{action.type}</h3>
                  <p className='text-sm text-yellow-700'>{action.details}</p>
                  <p className='text-xs text-yellow-600 mt-1'>
                    Deadline: {action.deadline}
                  </p>
                </div>
              </div>
              <Button
                size='sm'
                variant='outline'
                className='border-yellow-300 text-yellow-700 hover:bg-yellow-100'
              >
                Take Action
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const RecentActivity = ({ interviewer }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-4'>
          {interviewer.recentActivity.map((activity, index) => (
            <li key={index} className='flex items-start space-x-3'>
              <div className='flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center'>
                <FileText className='h-5 w-5 text-gray-500' />
              </div>
              <div>
                <p className='text-sm font-medium text-gray-900'>
                  {activity.action}
                </p>
                <p className='text-sm text-gray-500'>{activity.details}</p>
                <p className='text-xs text-gray-400 mt-1'>
                  {activity.timestamp}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export const UpcomingInterview = ({
  interviews,
}: {
  interviews: Interviewer['all_meetings'];
}) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Interviews</CardTitle>
      </CardHeader>
      <CardContent>
        {interviews?.length > 0 ? (
          <div className='space-y-4'>
            {interviews.map((interview, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'
              >
                <div>
                  <h3 className='font-medium'>
                    {getFullName(
                      interview.candidate.first_name,
                      interview.candidate.last_name,
                    )}
                  </h3>
                  <p className='text-sm text-gray-500'>{interview.job}</p>
                  <p className='text-sm text-gray-500'>
                    {`${dayjsLocal(interview.start_time).format('YYYY-MM-DD')} at ${dayjsLocal(interview.start_time).format('hh:mm A')}`}
                  </p>
                </div>
                <UIButton
                  onClick={() => {
                    router.push(
                      `/scheduling/view?meeting_id=${interview.id}&tab=candidate_details`,
                    );
                  }}
                  variant='outline'
                  size='sm'
                >
                  View Details
                </UIButton>
              </div>
            ))}
          </div>
        ) : (
          <>No Upcoming</>
        )}
      </CardContent>
    </Card>
  );
};

export const RecentInterviews = ({
  interviews,
}: {
  interviews: Interviewer['all_meetings'];
}) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Interviews</CardTitle>
      </CardHeader>
      <CardContent>
        {interviews?.length > 0 ? (
          <div className='space-y-4'>
            {interviews.map((interview, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'
              >
                <div>
                  <h3 className='font-medium'>
                    {getFullName(
                      interview.candidate.first_name,
                      interview.candidate.last_name,
                    )}
                  </h3>
                  <p className='text-sm text-gray-500'>{interview.job}</p>
                  <p className='text-sm text-gray-500'>
                    {`${dayjsLocal(interview.start_time).format('YYYY-MM-DD')} at ${dayjsLocal(interview.start_time).format('hh:mm A')}`}
                  </p>
                </div>
                <UIButton
                  onClick={() => {
                    router.push(
                      `/scheduling/view?meeting_id=${interview.id}&tab=candidate_details`,
                    );
                  }}
                  variant='outline'
                  size='sm'
                >
                  View Details
                </UIButton>
              </div>
            ))}
          </div>
        ) : (
          <>No recent</>
        )}
      </CardContent>
    </Card>
  );
};

export const Feedback = ({
  feedbacks,
}: {
  feedbacks: Interviewer['feedbacks'];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Feedback Provided</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {feedbacks?.length ? (
            feedbacks.map((feedback, index) => (
              <div key={index} className='bg-gray-50 p-4 rounded-lg'>
                <div className='flex justify-between items-start'>
                  <div>
                    <h3 className='text-base font-medium'>from</h3>
                    <p className='text-sm text-gray-500 mt-1'>date</p>
                  </div>
                  <Badge variant='secondary'>from</Badge>
                </div>
                <p className='mt-2 text-sm'>{feedback?.feedback?.objective}</p>
              </div>
            ))
          ) : (
            <>No feedback available</>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
