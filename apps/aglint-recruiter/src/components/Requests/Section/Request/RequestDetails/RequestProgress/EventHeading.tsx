/* eslint-disable security/detect-object-injection */
import { Box } from '@mui/material';
import axios from 'axios';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { TextWithIcon } from '@/devlink2/TextWithIcon';
import { workflowCopy } from '@/src/services/workflow/copy';
import { EventNode } from '@/src/services/workflow/node';
import toast from '@/src/utils/toast';
type TenseType = 'past' | 'present' | 'future' | 'error';
export const EventHeading = ({ event }: { event: EventNode }) => {
  let tense: TenseType;
  if (event.status === 'not_started') {
    tense = 'future';
  } else if (event.status === 'in_progress') {
    tense = 'present';
  } else if (event.status === 'completed') {
    tense = 'past';
  } else if (event.status === 'failed') {
    tense = 'error';
  }

  const handleRetry = async (id: number) => {
    try {
      await axios.post('/api/workflow-cron/execute', { action_id: id });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <TextWithIcon
        textContent={<>{workflowCopy[event.event_type][tense]}</>}
        iconSize={3}
        fontSize={1}
        color={getProgressColor(tense)}
        iconName={
          tense === 'past' ? (
            <CheckCircleFilled />
          ) : tense === 'future' ? (
            'circle'
          ) : (
            <AtrIconFilled />
          )
        }
      />
      <Box pl={2.5}>
        {event.progress.map((prog) => {
          return (
            <p key={prog.id} style={{ display: 'flex', alignItems: 'center' }}>
              <p
                style={{
                  color: 'grey',
                  fontSize: '13px',
                }}
              >
                {prog.log}
              </p>
              {event.status === 'failed' && (
                <ButtonSoft
                  size={1}
                  color={'primary'}
                  textButton='Click to retry'
                  onClickButton={{
                    onClick: () => handleRetry(prog.meta.event_run_id),
                  }}
                />
              )}
            </p>
          );
        })}
      </Box>
    </>
  );
};

function AtrIconFilled() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='16px'
      viewBox='0 -960 960 960'
      width='16px'
      fill='#00749E'
    >
      <path d='M230-160q-45 0-77.5-32.5T120-270q0-45 32.5-77.5T230-380q45 0 77.5 32.5T340-270q0 45-32.5 77.5T230-160Zm500 0q-45 0-77.5-32.5T620-270q0-45 32.5-77.5T730-380q46 0 78 32.5t32 77.5q0 45-32 77.5T730-160ZM480-580q-45 0-77.5-32.5T370-690q0-45 32.5-77.5T480-800q45 0 77.5 32.5T590-690q0 45-32.5 77.5T480-580Z' />
    </svg>
  );
}

function CheckCircleFilled() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='16px'
      viewBox='0 -960 960 960'
      width='16px'
      fill='#29A383'
    >
      <path d='m421-298 283-283-46-45-237 237-120-120-45 45 165 166Zm59 218q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Z' />
    </svg>
  );
}

function getProgressColor(tense: TenseType) {
  if (tense === 'error') {
    return 'error';
  } else if (tense === 'future') {
    return 'neutral';
  } else if (tense === 'past') {
    return 'success';
  } else {
    return 'info';
  }
}
