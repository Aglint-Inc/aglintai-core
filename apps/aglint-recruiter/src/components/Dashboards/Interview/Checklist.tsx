import { Check, X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock data
const checklistData = [
  {
    id: 1,
    coordinator: 'John Doe',
    candidateName: 'Alice Smith',
    recruiter: 'Jane Brown',
    interviewType: 'Technical',
    schedulingRequestReceived: true,
    availRequestSent: true,
    followUps: [true, true, false],
    noResponseSentBackToRecruiter: false,
    availReceived: true,
    dateInterviewScheduled: '2023-06-15',
    confirmationSent: true,
    candidateReminderEmailScheduled: true,
    debriefScheduled: false,
    rescheduled: false,
    candidateStatus: 'Scheduled',
    recLeadTimeToSchedule: 2,
    daysToSchedule: 3,
    daysToInterview: 7,
    weeklyCalculation: 'Week 24',
    daysToDebrief: null,
    notes: 'Candidate prefers morning interviews',
  },
  {
    id: 2,
    coordinator: 'Jane Smith',
    candidateName: 'Bob Johnson',
    recruiter: 'Mike Davis',
    interviewType: 'Behavioral',
    schedulingRequestReceived: true,
    availRequestSent: true,
    followUps: [true, false, false],
    noResponseSentBackToRecruiter: true,
    availReceived: false,
    dateInterviewScheduled: null,
    confirmationSent: false,
    candidateReminderEmailScheduled: false,
    debriefScheduled: false,
    rescheduled: false,
    candidateStatus: 'Pending',
    recLeadTimeToSchedule: 1,
    daysToSchedule: null,
    daysToInterview: null,
    weeklyCalculation: 'Week 25',
    daysToDebrief: null,
    notes: 'Candidate has limited availability',
  },
  {
    id: 3,
    coordinator: 'Emily Chen',
    candidateName: 'Charlie Brown',
    recruiter: 'Sarah Lee',
    interviewType: 'System Design',
    schedulingRequestReceived: true,
    availRequestSent: true,
    followUps: [true, true, true],
    noResponseSentBackToRecruiter: false,
    availReceived: true,
    dateInterviewScheduled: '2023-06-20',
    confirmationSent: true,
    candidateReminderEmailScheduled: true,
    debriefScheduled: true,
    rescheduled: false,
    candidateStatus: 'Scheduled',
    recLeadTimeToSchedule: 3,
    daysToSchedule: 2,
    daysToInterview: 5,
    weeklyCalculation: 'Week 25',
    daysToDebrief: 1,
    notes: 'Candidate is in a different time zone',
  },
  {
    id: 4,
    coordinator: 'Michael Johnson',
    candidateName: 'Diana Prince',
    recruiter: 'Tom Wilson',
    interviewType: 'Cultural Fit',
    schedulingRequestReceived: true,
    availRequestSent: true,
    followUps: [true, false, false],
    noResponseSentBackToRecruiter: false,
    availReceived: true,
    dateInterviewScheduled: '2023-06-18',
    confirmationSent: true,
    candidateReminderEmailScheduled: false,
    debriefScheduled: false,
    rescheduled: true,
    candidateStatus: 'Rescheduled',
    recLeadTimeToSchedule: 1,
    daysToSchedule: 4,
    daysToInterview: 6,
    weeklyCalculation: 'Week 24',
    daysToDebrief: null,
    notes: 'Candidate requested to reschedule due to personal reasons',
  },
  {
    id: 5,
    coordinator: 'Olivia Taylor',
    candidateName: 'Ethan Hunt',
    recruiter: 'Rachel Green',
    interviewType: 'Technical',
    schedulingRequestReceived: true,
    availRequestSent: true,
    followUps: [true, true, false],
    noResponseSentBackToRecruiter: true,
    availReceived: false,
    dateInterviewScheduled: null,
    confirmationSent: false,
    candidateReminderEmailScheduled: false,
    debriefScheduled: false,
    rescheduled: false,
    candidateStatus: 'Pending',
    recLeadTimeToSchedule: 2,
    daysToSchedule: null,
    daysToInterview: null,
    weeklyCalculation: 'Week 26',
    daysToDebrief: null,
    notes: "Waiting for candidate's availability",
  },
  {
    id: 6,
    coordinator: 'Daniel Lee',
    candidateName: 'Fiona Gallagher',
    recruiter: 'Monica Geller',
    interviewType: 'Behavioral',
    schedulingRequestReceived: true,
    availRequestSent: true,
    followUps: [true, true, true],
    noResponseSentBackToRecruiter: false,
    availReceived: true,
    dateInterviewScheduled: '2023-06-22',
    confirmationSent: true,
    candidateReminderEmailScheduled: true,
    debriefScheduled: true,
    rescheduled: false,
    candidateStatus: 'Scheduled',
    recLeadTimeToSchedule: 4,
    daysToSchedule: 3,
    daysToInterview: 8,
    weeklyCalculation: 'Week 25',
    daysToDebrief: 2,
    notes: 'Candidate is currently employed and prefers after-hours interviews',
  },
  {
    id: 7,
    coordinator: 'Sophia Rodriguez',
    candidateName: 'George Weasley',
    recruiter: 'Chandler Bing',
    interviewType: 'System Design',
    schedulingRequestReceived: true,
    availRequestSent: true,
    followUps: [true, false, false],
    noResponseSentBackToRecruiter: false,
    availReceived: true,
    dateInterviewScheduled: '2023-06-25',
    confirmationSent: true,
    candidateReminderEmailScheduled: true,
    debriefScheduled: false,
    rescheduled: false,
    candidateStatus: 'Scheduled',
    recLeadTimeToSchedule: 3,
    daysToSchedule: 2,
    daysToInterview: 6,
    weeklyCalculation: 'Week 26',
    daysToDebrief: null,
    notes: 'Candidate has expressed interest in remote work opportunities',
  },
  {
    id: 8,
    coordinator: 'William Turner',
    candidateName: 'Hermione Granger',
    recruiter: 'Joey Tribbiani',
    interviewType: 'Technical',
    schedulingRequestReceived: true,
    availRequestSent: true,
    followUps: [true, true, false],
    noResponseSentBackToRecruiter: true,
    availReceived: false,
    dateInterviewScheduled: null,
    confirmationSent: false,
    candidateReminderEmailScheduled: false,
    debriefScheduled: false,
    rescheduled: false,
    candidateStatus: 'Pending',
    recLeadTimeToSchedule: 2,
    daysToSchedule: null,
    daysToInterview: null,
    weeklyCalculation: 'Week 26',
    daysToDebrief: null,
    notes: 'Candidate is currently on vacation, will follow up next week',
  },
];

const CheckIcon = () => <Check className='h-4 w-4 text-green-500' />;
const XIcon = () => <X className='h-4 w-4 text-red-500' />;

export default function ReadOnlyCoordinatorChecklist() {
  const [visibleColumns, setVisibleColumns] = useState(
    Object.keys(checklistData[0]),
  );

  const toggleColumn = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key],
    );
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-md font-semibold mb-4'>Coordinator Checklist</h1>
      <div className='mb-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>Toggle Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {Object.keys(checklistData[0]).map((key) => (
              <DropdownMenuCheckboxItem
                key={key}
                checked={visibleColumns.includes(key)}
                onCheckedChange={() => toggleColumn(key)}
              >
                {key}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='overflow-x-auto'>
        <div className='w-max min-w-full'>
          <Table>
            <ScrollArea className='h-[calc(100vh-10rem)]'>
              <TableHeader>
                <TableRow>
                  {visibleColumns.includes('coordinator') && (
                    <TableHead className='w-[150px]'>Coordinator</TableHead>
                  )}
                  {visibleColumns.includes('candidateName') && (
                    <TableHead className='w-[150px]'>Candidate Name</TableHead>
                  )}
                  {visibleColumns.includes('recruiter') && (
                    <TableHead className='w-[150px]'>Recruiter</TableHead>
                  )}
                  {visibleColumns.includes('interviewType') && (
                    <TableHead className='w-[150px]'>Interview Type</TableHead>
                  )}
                  {visibleColumns.includes('schedulingRequestReceived') && (
                    <TableHead className='w-[100px]'>
                      Scheduling Request
                    </TableHead>
                  )}
                  {visibleColumns.includes('availRequestSent') && (
                    <TableHead className='w-[100px]'>Avail Request</TableHead>
                  )}
                  {visibleColumns.includes('followUps') && (
                    <TableHead className='w-[200px]'>Follow Ups</TableHead>
                  )}
                  {visibleColumns.includes('noResponseSentBackToRecruiter') && (
                    <TableHead className='w-[100px]'>No Response</TableHead>
                  )}
                  {visibleColumns.includes('availReceived') && (
                    <TableHead className='w-[100px]'>Avail Received</TableHead>
                  )}
                  {visibleColumns.includes('dateInterviewScheduled') && (
                    <TableHead className='w-[150px]'>Interview Date</TableHead>
                  )}
                  {visibleColumns.includes('confirmationSent') && (
                    <TableHead className='w-[100px]'>Confirmation</TableHead>
                  )}
                  {visibleColumns.includes(
                    'candidateReminderEmailScheduled',
                  ) && <TableHead className='w-[100px]'>Reminder</TableHead>}
                  {visibleColumns.includes('debriefScheduled') && (
                    <TableHead className='w-[100px]'>Debrief</TableHead>
                  )}
                  {visibleColumns.includes('rescheduled') && (
                    <TableHead className='w-[100px]'>Rescheduled</TableHead>
                  )}
                  {visibleColumns.includes('candidateStatus') && (
                    <TableHead className='w-[150px]'>
                      Candidate Status
                    </TableHead>
                  )}
                  {visibleColumns.includes('recLeadTimeToSchedule') && (
                    <TableHead className='w-[100px]'>Lead Time</TableHead>
                  )}
                  {visibleColumns.includes('daysToSchedule') && (
                    <TableHead className='w-[100px]'>
                      Days to Schedule
                    </TableHead>
                  )}
                  {visibleColumns.includes('daysToInterview') && (
                    <TableHead className='w-[100px]'>
                      Days to Interview
                    </TableHead>
                  )}
                  {visibleColumns.includes('weeklyCalculation') && (
                    <TableHead className='w-[150px]'>
                      Weekly Calculation
                    </TableHead>
                  )}
                  {visibleColumns.includes('daysToDebrief') && (
                    <TableHead className='w-[100px]'>Days to Debrief</TableHead>
                  )}
                  {visibleColumns.includes('notes') && (
                    <TableHead className='w-[200px]'>Notes</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {checklistData.map((item) => (
                  <TableRow key={item.id}>
                    {visibleColumns.includes('coordinator') && (
                      <TableCell>{item.coordinator}</TableCell>
                    )}
                    {visibleColumns.includes('candidateName') && (
                      <TableCell>{item.candidateName}</TableCell>
                    )}
                    {visibleColumns.includes('recruiter') && (
                      <TableCell>{item.recruiter}</TableCell>
                    )}
                    {visibleColumns.includes('interviewType') && (
                      <TableCell>{item.interviewType}</TableCell>
                    )}
                    {visibleColumns.includes('schedulingRequestReceived') && (
                      <TableCell>
                        {item.schedulingRequestReceived ? (
                          <CheckIcon />
                        ) : (
                          <XIcon />
                        )}
                      </TableCell>
                    )}
                    {visibleColumns.includes('availRequestSent') && (
                      <TableCell>
                        {item.availRequestSent ? <CheckIcon /> : <XIcon />}
                      </TableCell>
                    )}
                    {visibleColumns.includes('followUps') && (
                      <TableCell>
                        <div className='flex space-x-2'>
                          {item.followUps.map((followUp, index) => (
                            <span key={index}>
                              {followUp ? <CheckIcon /> : <XIcon />}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                    )}
                    {visibleColumns.includes(
                      'noResponseSentBackToRecruiter',
                    ) && (
                      <TableCell>
                        {item.noResponseSentBackToRecruiter ? (
                          <CheckIcon />
                        ) : (
                          <XIcon />
                        )}
                      </TableCell>
                    )}
                    {visibleColumns.includes('availReceived') && (
                      <TableCell>
                        {item.availReceived ? <CheckIcon /> : <XIcon />}
                      </TableCell>
                    )}
                    {visibleColumns.includes('dateInterviewScheduled') && (
                      <TableCell>
                        {item.dateInterviewScheduled || 'Not scheduled'}
                      </TableCell>
                    )}
                    {visibleColumns.includes('confirmationSent') && (
                      <TableCell>
                        {item.confirmationSent ? <CheckIcon /> : <XIcon />}
                      </TableCell>
                    )}
                    {visibleColumns.includes(
                      'candidateReminderEmailScheduled',
                    ) && (
                      <TableCell>
                        {item.candidateReminderEmailScheduled ? (
                          <CheckIcon />
                        ) : (
                          <XIcon />
                        )}
                      </TableCell>
                    )}
                    {visibleColumns.includes('debriefScheduled') && (
                      <TableCell>
                        {item.debriefScheduled ? <CheckIcon /> : <XIcon />}
                      </TableCell>
                    )}
                    {visibleColumns.includes('rescheduled') && (
                      <TableCell>
                        {item.rescheduled ? <CheckIcon /> : <XIcon />}
                      </TableCell>
                    )}
                    {visibleColumns.includes('candidateStatus') && (
                      <TableCell>{item.candidateStatus}</TableCell>
                    )}
                    {visibleColumns.includes('recLeadTimeToSchedule') && (
                      <TableCell>{item.recLeadTimeToSchedule}</TableCell>
                    )}
                    {visibleColumns.includes('daysToSchedule') && (
                      <TableCell>{item.daysToSchedule || 'N/A'}</TableCell>
                    )}
                    {visibleColumns.includes('daysToInterview') && (
                      <TableCell>{item.daysToInterview || 'N/A'}</TableCell>
                    )}
                    {visibleColumns.includes('weeklyCalculation') && (
                      <TableCell>{item.weeklyCalculation}</TableCell>
                    )}
                    {visibleColumns.includes('daysToDebrief') && (
                      <TableCell>{item.daysToDebrief || 'N/A'}</TableCell>
                    )}
                    {visibleColumns.includes('notes') && (
                      <TableCell>{item.notes}</TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </ScrollArea>
          </Table>
        </div>
      </div>
    </div>
  );
}
