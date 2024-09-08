import { PauseJson } from '@aglint/shared-types';
import { PauseType } from './DetailPage/type';
import { dayjsLocal } from '@aglint/shared-utils';

export const optionsPause: {
  label: string;
  description?: string;
  type: PauseType;
  pauseJson: PauseJson;
}[] = [
  {
    label: 'Indefinitely',
    description: 'Until you manually resume',
    type: 'isManual',
    pauseJson: {
      isManual: true,
      start_date: '',
      end_date: '',
    },
  },
  {
    label: '2 Weeks',
    description: `Resumes on ${dayjsLocal().add(2, 'week').format('MMMM DD, YYYY')}`,
    type: 'twoWeek',
    pauseJson: {
      isManual: false,
      start_date: new Date().toISOString(),
      end_date: dayjsLocal().add(2, 'week').toDate().toISOString(),
    },
  },
  {
    label: '1 Month',
    description: `Resumes on ${dayjsLocal().add(1, 'month').format('MMMM DD, YYYY')}`,
    type: 'oneMonth',
    pauseJson: {
      isManual: false,
      start_date: new Date().toISOString(),
      end_date: dayjsLocal().add(1, 'month').toDate().toISOString(),
    },
  },
  {
    label: '3 Months',
    description: `Resumes on ${dayjsLocal().add(3, 'month').format('MMMM DD, YYYY')}`,
    type: 'threeMonth',
    pauseJson: {
      isManual: false,
      start_date: new Date().toISOString(),
      end_date: dayjsLocal().add(3, 'month').toDate().toISOString(),
    },
  },
  {
    label: 'Custom date',
    type: 'custom',
    pauseJson: {
      isManual: false,
      start_date: new Date().toISOString(),
      end_date: dayjsLocal().add(1, 'week').toDate().toISOString(),
    },
  },
];