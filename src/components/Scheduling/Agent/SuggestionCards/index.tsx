import React from 'react';

import { SuggetionCard } from '@/devlink3';
import { useSchedulingAgent } from '@/src/context/SchedulingAgent/SchedulingAgentProvider';

function SuggetionCards() {
  const { submitHandler } = useSchedulingAgent();
  return (
    <>
      <SuggetionCard
        textSuggestion={'Schedule an interview for a candidate'}
        onClickCard={{
          onClick: () => {
            submitHandler({
              input: 'Schedule an interview for a candidate',
            });
          },
        }}
      />
      <SuggetionCard
        textSuggestion={'Request availibitiy for an interview panel'}
        onClickCard={{
          onClick: () => {
            submitHandler({
              input: 'Request availibitiy for an interview panel',
            });
          },
        }}
      />
      <SuggetionCard
        textSuggestion={'Create Interview Panel'}
        onClickCard={{
          onClick: () => {
            submitHandler({ input: 'Create Interview Panel' });
          },
        }}
      />
      <SuggetionCard
        textSuggestion={'List all interview panels'}
        onClickCard={{
          onClick: () => {
            submitHandler({ input: 'List all interview panels' });
          },
        }}
      />

      <SuggetionCard
        textSuggestion={'What can you do?'}
        onClickCard={{
          onClick: () => {
            submitHandler({ input: 'What can you do?' });
          },
        }}
      />
    </>
  );
}

export default SuggetionCards;
