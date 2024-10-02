import type ROUTES from '@/utils/routing/routes';

type Path<T extends keyof typeof ROUTES> = keyof Pick<typeof ROUTES, T>;

export type LinkProps =
  | {
      module: 'Aglint AI';
      path: Path<'/requests'>;
    }
  | {
      module: 'Agent';
      path: Path<'/agent'>;
    }
  | {
      module: 'Jobs';
      path: Path<'/jobs'>;
    }
  | {
      module: 'Interviews';
      path: Path<'/interviews'>;
    }
  | {
      module: 'Sourcing Hub';
      path: Path<'/candidates/history'>;
    }
  | {
      module: 'Phone Screening';
      path: Path<'/screening'>;
    }
  | {
      module: 'Assessment';
      path: Path<'/assessment-new'>;
    }
  | {
      module: 'Integrations';
      path: Path<'/integrations'>;
    }
  | {
      module: 'Workflows';
      path: Path<'/workflows'>;
    }
  | {
      module: 'Company Settings';
      path: Path<'/company'>;
    }
  | {
      module: 'Support';
      path: Path<'/support'>;
    }
  | {
      module: 'Tasks';
      path: Path<'/tasks'>;
    }
  | {
      module: 'Interview Pools';
      path: Path<'/interview-pool'>;
    }
  | {
      module: 'Interviewers';
      path: Path<'/interviewers'>;
    }
  | {
      module: 'Requests';
      path: Path<'/requests'>;
    }
  | {
      module: 'Reports';
      path: Path<'/reports'>;
    };
