import { type useInviteMeta } from '../hooks/useInviteMeta';
import { type useInviteSlots } from '../hooks/useInviteSlots';

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

export type SessionData = {
  date: string;
  slots: NonNullable<
    NonNullable<ReturnType<typeof useInviteSlots>>['data']
  >[number][number];
};
