import { type DatabaseTable } from '@aglint/shared-types';
import Typography from '@components/typography';
import { Button } from '@components/ui/button';
import { useState } from 'react';

import TipTapAIEditor from '@/components/Common/TipTapAIEditor';
import toast from '@/utils/toast';

import type { FeedbackWindowInterviewersType } from './type';
import { re_mapper } from './util.function';

export const FeedbackForm = ({
  interviewerData,
  onSubmit,
  onCancel,
}: {
  interviewerData: FeedbackWindowInterviewersType[string][number];
  onSubmit: ({
    // eslint-disable-next-line no-unused-vars
    session_id,
    // eslint-disable-next-line no-unused-vars
    relation_id,
    // eslint-disable-next-line no-unused-vars
    feedback,
  }: {
    session_id: string;
    relation_id: string;
    feedback: DatabaseTable['interview_session_relation']['feedback'];
  }) => void;
  onClose: () => void;
  onCancel: () => void;
}) => {
  const [interviewer, setInterviewer] = useState(interviewerData);
  return (
    // Feedback Popup Card

    <div className='flex w-full flex-col gap-5'>
      <div className='flex flex-col gap-1'>
        <Typography type='small' variant='p'>
          Recommendation Level
        </Typography>
        <div>
          <div className='flex gap-2'>
            {Array(10)
              .fill(1)
              .map((_, i) => {
                const is = (interviewer.feedback?.recommendation || 0) > i;
                return (
                  <Button
                    key={i}
                    variant='ghost'
                    size='sm'
                    className={`h-8 w-8 rounded-full ${
                      is
                        ? 'bg-primary text-primary-foreground hover:bg-slate-950 hover:text-white'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                    onClick={() => {
                      const temp = { ...interviewer };
                      temp.feedback = {
                        ...temp.feedback,
                        recommendation: i + 1,
                      };
                      setInterviewer(temp);
                    }}
                  >
                    {i + 1}
                  </Button>
                );
              })}
          </div>
          <Typography type='small' variant='p' className=''>
            {re_mapper[interviewer.feedback?.recommendation || 0]}
          </Typography>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <Typography type='small' variant='p'>
          Feedback
        </Typography>
        <div>
          <TipTapAIEditor
            placeholder='Your feedback.'
            initialValue={interviewer.feedback?.objective || ''}
            border
            height='300px'
            isSize={false}
            isAlign={false}
            handleChange={(html) => {
              const temp = { ...interviewer };
              temp.feedback = {
                ...temp.feedback,
                objective: html,
              };
              setInterviewer(temp);
            }}
          />
        </div>
      </div>
      <div className='flex justify-end gap-2 p-4'>
        <Button variant='outline' size='sm' onClick={onCancel}>
          Cancel
        </Button>
        <Button
          size='sm'
          onClick={() => {
            if (!interviewer.feedback) {
              return toast.warning('Please provide feedback.');
            }
            onSubmit({
              relation_id: interviewer.relation_id,
              session_id: interviewer.session.id,
              feedback: interviewer.feedback,
            });
          }}
        >
          Submit Feedback
        </Button>
      </div>
    </div>
  );
};
