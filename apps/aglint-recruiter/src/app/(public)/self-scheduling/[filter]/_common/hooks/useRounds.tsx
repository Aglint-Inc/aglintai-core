import { SINGLE_DAY_TIME } from '@aglint/shared-utils';
import { useEffect } from 'react';

import { type CandidateInviteType, setRounds } from '../store';
import { useInviteMeta } from './useInviteMeta';

export const useRounds = () => {
  const { data: meta, isFetched } = useInviteMeta();
  const {
    rounds,
  }: {
    rounds: CandidateInviteType['rounds'];
  } = (meta?.meetings || []).reduce(
    (
      acc: {
        rounds: CandidateInviteType['rounds'];
      },
      curr,
    ) => {
      const count = acc.rounds.length;
      if (
        count === 0 ||
        acc.rounds[count - 1].sessions[
          acc.rounds[count - 1].sessions.length - 1
        ].interview_session.break_duration >= SINGLE_DAY_TIME
      )
        acc.rounds.push({
          title: `Day ${acc.rounds.length + 1}`,
          sessions: [curr],
          selectedSlots: null,
        });
      else acc.rounds[count - 1].sessions.push(curr);
      return acc;
    },
    { rounds: [] },
  );

  useEffect(() => {
    if (isFetched) {
      setRounds(rounds);
    }
  }, [isFetched]);
};
