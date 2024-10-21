import { getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import { Card, CardContent, CardHeader } from '@components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { Mail, MessageSquare, Pen, Plus, Star } from 'lucide-react';

import type { FeedbackWindowInterviewersType } from './type';

export function FeedbackCardDetails({
  index,
  int,
  user_id,
  isFeedBackEnabled,
  isAdmin = false,
  setSelectedInterviewer,
  handelFeedbackRequest,
}: {
  index: number;
  int: FeedbackWindowInterviewersType[string][number];
  user_id?: string;
  isFeedBackEnabled: boolean;
  isAdmin?: boolean;
  setSelectedInterviewer: any;
  // eslint-disable-next-line no-unused-vars
  handelFeedbackRequest?: any;
}) {
  return (
    <Card className='mb-4 w-full border-none bg-muted shadow-none'>
      <CardHeader className='flex flex-row items-center gap-3 p-4'>
        <Avatar className='h-12 w-12 rounded-md'>
          <AvatarImage
            src={int.profile_image}
            alt={getFullName(int.first_name, int.last_name)}
          />
          <AvatarFallback className='h-12 w-12 rounded-md bg-muted-foreground/50'>
            {getFullName(int.first_name, int.last_name).charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <h3 className='text-md font-medium'>
            {getFullName(int.first_name, int.last_name)}
          </h3>
          <p className='text-sm text-muted-foreground'>{int.position}</p>
        </div>
        {isFeedBackEnabled && (
          <div className='flex-shrink-0'>
            {isAdmin ? (
              int.user_id === user_id ? (
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    if (isFeedBackEnabled) {
                      setSelectedInterviewer({
                        index,
                        interviewer: int,
                      });
                    }
                  }}
                >
                  {int.feedback && int.feedback?.recommendation ? (
                    <>
                      <Pen className='mr-2 h-4 w-4' />
                      Edit Feedback
                    </>
                  ) : (
                    <>
                      <Plus className='mr-2 h-4 w-4' />
                      Add Feedback
                    </>
                  )}
                </Button>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant='outline' size='sm'>
                      Re-request Feedback
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side='bottom' align='end'>
                    <div className='flex flex-col space-y-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={(e) => {
                          handelFeedbackRequest({
                            e,
                            session_id: int.session.id,
                            relation_id: int.relation_id,
                            recruiter_user_id: int.user_id,
                            tool: 'slack',
                          });
                        }}
                      >
                        <MessageSquare className='mr-2 h-4 w-4' />
                        Slack
                      </Button>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={(e) => {
                          handelFeedbackRequest({
                            e,
                            session_id: int.session.id,
                            relation_id: int.relation_id,
                            recruiter_user_id: int.user_id,
                            tool: 'email',
                          });
                        }}
                      >
                        <Mail className='mr-2 h-4 w-4' />
                        Email
                      </Button>
                    </div>
                  </TooltipContent>
                </Tooltip>
              )
            ) : (
              <Button
                variant='outline'
                size='sm'
                onClick={() => {
                  if (isFeedBackEnabled) {
                    setSelectedInterviewer({
                      index,
                      interviewer: int,
                    });
                  }
                }}
              >
                {int.feedback && int.feedback?.objective ? (
                  <>
                    <Pen className='mr-2 h-4 w-4' />
                    Edit Feedback
                  </>
                ) : (
                  <>
                    <Plus className='mr-2 h-4 w-4' />
                    Add Feedback
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className='p-4 pt-0'>
        <div className='space-y-2.5'>
          {int.feedback?.recommendation ? (
            <>
              <div className='mb-2 flex items-center space-x-2.5'>
                <Star className='h-6 w-6 text-yellow-400' />
                <span className='text-sm font-medium'>
                  Recommendation Level: {int.feedback.recommendation}
                </span>
              </div>
              <div
                className='prose prose-sm max-w-none'
                dangerouslySetInnerHTML={{
                  __html: int.feedback.objective,
                }}
              />
            </>
          ) : (
            <span className='text-sm text-muted-foreground'>
              Not Submitted Feedback
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
