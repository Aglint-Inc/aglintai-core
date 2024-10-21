import { type useInviteMeta } from '../hooks/useInviteMeta';

export type ScheduleCardProps = {
  round: ScheduleCardsProps['rounds'][number];
  index: number;
  showTitle: boolean;
};

export type ScheduleCardsProps = {
  rounds: {
    title: string;
    sessions: ReturnType<typeof useInviteMeta>['data']['meetings'];
  }[];
};
