import { type useCandidateInvite } from '@/src/context/CandidateInviteContext';

export type ScheduleCardProps = {
  round: ScheduleCardsProps['rounds'][number];
  index: number;
  showTitle: boolean;
};

export type ScheduleCardsProps = {
  rounds: {
    title: string;
    sessions: ReturnType<typeof useCandidateInvite>['meta']['data']['meetings'];
  }[];
};
