/* eslint-disable security/detect-object-injection */
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

import {
  applicationsQueries,
  useMoveApplications,
  useUpdateApplication,
} from '@/src/queries/job-applications';
import { Application } from '@/src/types/applications.types';
import { capitalize } from '@/src/utils/text/textUtils';

import { useApplicationStore } from '../ApplicationContext/store';
import { useJob } from '../JobContext';
import { ApplicationsStore, useApplicationsStore } from './store';

const filterParams = [
  'bookmarked',
  'search',
  'badges',
  'resume_score',
] as const;

type FilterKeys = (typeof filterParams)[number];

type FilterValues = {
  bookmarked: boolean;
  search: Application['name'];
  badges: (keyof Application['badges'])[];
  resume_score: (
    | 'Top match'
    | 'Good match'
    | 'Average match'
    | 'Poor match'
    | 'Not a match'
  )[];
};

// eslint-disable-next-line no-unused-vars
type Filters = { [id in FilterKeys]: FilterValues[id] };

const sortParams = ['type', 'order'] as const;

type SortKeys = (typeof sortParams)[number];

type SortValue = {
  type:
    | keyof Pick<
        Application,
        'resume_score' | 'applied_at' | 'name' | 'latest_activity'
      >
    | 'location';
  order: 'asc' | 'desc';
};

const sectionDefaults: Application['status'] = 'new';
const filterDefaults: Filters = {
  badges: [],
  bookmarked: false,
  resume_score: [],
  search: '',
};
const sortDefaults: SortValue = {
  type: 'latest_activity',
  order: 'desc',
};

// eslint-disable-next-line no-unused-vars
type Sort = { [id in SortKeys]: SortValue[id] };

export const useApplicationsParams = () => {
  const { locations, setLocations } = useApplicationsStore(
    ({ locations, setLocations }) => ({
      locations,
      setLocations,
    }),
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  const section = useMemo(
    () =>
      (searchParams.get('section') ?? sectionDefaults) as Application['status'],
    [searchParams, sectionDefaults],
  );

  const filters = useMemo(
    () =>
      filterParams.reduce((acc, curr) => {
        acc[curr] =
          JSON.parse(decodeURIComponent(searchParams.get(curr))) ??
          (filterDefaults[curr] as Filters[typeof curr]);
        return acc;
      }, {}) as Filters,
    [filterParams, searchParams],
  );

  const sort = useMemo(
    () =>
      sortParams.reduce((acc, curr) => {
        acc[curr] =
          JSON.parse(
            decodeURIComponent(searchParams.get(`sort${capitalize(curr)}`)),
          ) ?? (sortDefaults[curr] as Sort[typeof curr]);
        return acc;
      }, {}) as Sort,
    [sortParams, searchParams],
  );

  const safeFilters = useMemo(
    () => ({ ...filters, locations }),
    [filters, locations],
  );

  const getParams = useCallback(
    (
      newParams: Partial<
        typeof filters & typeof sort & { section: typeof section }
      >,
    ) => {
      if (locations) setLocations(locations);
      return Object.entries(newParams ?? {}).map(
        ([key, value]) => `${key}=${encodeURIComponent(JSON.stringify(value))}`,
      );
    },
    [router],
  );

  const setFilters = useCallback(
    (filters: Partial<typeof safeFilters>) => {
      const { locations, ...rest } = filters;
      if (locations) setLocations(locations);
      Object.entries(rest ?? {}).forEach(([key, value]) => {
        router.query[key] = encodeURIComponent(JSON.stringify(value));
      });
      router.replace(router);
    },
    [router],
  );

  const setSort = useCallback(
    (newSort: Partial<typeof sort>) => {
      Object.entries(newSort ?? {}).forEach(([key, value]) => {
        router.query[`sort${capitalize(key)}`] = encodeURIComponent(
          JSON.stringify(value),
        );
      });
      router.replace(router);
    },
    [router],
  );

  const setSection = useCallback(
    (newSection: Partial<typeof section>) => {
      router.query['section'] = encodeURIComponent(JSON.stringify(newSection));
      router.replace(router);
    },
    [router],
  );

  return {
    section,
    setSection,
    filters: safeFilters,
    setFilters,
    sort,
    setSort,
    getParams,
  };
};

export type ApplicationsParams = ReturnType<typeof useApplicationsParams>;

export const useApplicationsActions = () => {
  const { jobLoad, job, job_id, applicationScoringPollEnabled } = useJob();

  const { checklist, resetChecklist } = useApplicationsStore(
    ({ checklist, resetChecklist }) => ({
      checklist,
      resetChecklist,
    }),
  );

  const { filters, section, sort, setFilters, setSort } =
    useApplicationsParams();

  const [params, setParams] = useState({ filters, sort });
  const ref = useRef(true);

  useDeepCompareEffect(() => {
    if (ref.current) {
      ref.current = false;
      return;
    }
    const timeout = setTimeout(() => setParams({ filters, sort }), 800);
    return () => clearTimeout(timeout);
  }, [filters, sort]);

  const {
    mutate: handleUpdateApplication,
    mutateAsync: handleAsyncUpdateApplication,
  } = useUpdateApplication({
    job_id,
    polling: applicationScoringPollEnabled,
    status: section,
    ...params,
  });

  const locationFilterOptions = useQuery(
    applicationsQueries.locationFilters({
      job_id,
      polling: applicationScoringPollEnabled,
    }),
  );

  const newApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      polling: applicationScoringPollEnabled,
      status: 'new',
      count: job?.section_count?.new ?? 0,
      ...params,
    }),
  );
  const screeningApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      polling: applicationScoringPollEnabled,
      status: 'screening',
      count: job?.section_count?.screening ?? 0,
      ...params,
    }),
  );
  const assessmentApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      polling: applicationScoringPollEnabled,
      status: 'assessment',
      count: job?.section_count?.assessment ?? 0,
      ...params,
    }),
  );
  const interviewApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      polling: applicationScoringPollEnabled,
      status: 'interview',
      count: job?.section_count?.interview ?? 0,
      ...params,
    }),
  );
  const qualifiedApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      polling: applicationScoringPollEnabled,
      status: 'qualified',
      count: job?.section_count?.qualified ?? 0,
      ...params,
    }),
  );
  const disqualifiedApplications = useInfiniteQuery(
    applicationsQueries.applications({
      job_id,
      polling: applicationScoringPollEnabled,
      status: 'disqualified',
      count: job?.section_count?.disqualified ?? 0,
      ...params,
    }),
  );

  const emailVisibilities = useMemo(
    () =>
      Object.entries(EMAIL_VISIBILITIES ?? {}).reduce(
        (acc, [key, value]) => {
          acc[key] = job?.flags[key] && value.includes(section);
          return acc;
        },
        // eslint-disable-next-line no-unused-vars
        {} as { [id in keyof typeof EMAIL_VISIBILITIES]: boolean },
      ),
    [EMAIL_VISIBILITIES, job?.flags, section],
  );

  const cascadeVisibilites = useMemo(
    () =>
      Object.entries(CASCADE_VISIBILITIES ?? {}).reduce(
        (acc, [key, value]) => {
          acc[key] = job?.flags[key] && value.includes(section);
          return acc;
        },
        // eslint-disable-next-line no-unused-vars
        {} as { [id in keyof typeof CASCADE_VISIBILITIES]: boolean },
      ),
    [CASCADE_VISIBILITIES, job?.flags, section],
  );

  const { mutateAsync: moveApplications } = useMoveApplications(
    {
      job_id,
    },
    section,
    checklist,
  );

  const handleMoveApplications = async (
    payload: Parameters<typeof moveApplications>[0],
  ) => {
    try {
      await moveApplications(payload);
      resetChecklist();
    } catch {
      //
    }
  };

  const sectionApplication = useMemo(() => {
    switch (section) {
      case 'assessment':
        return assessmentApplications;
      case 'new':
        return newApplications;
      case 'qualified':
        return qualifiedApplications;
      case 'disqualified':
        return disqualifiedApplications;
      case 'screening':
        return screeningApplications;
      case 'interview':
        return interviewApplications;
    }
  }, [
    newApplications,
    screeningApplications,
    assessmentApplications,
    interviewApplications,
    qualifiedApplications,
    disqualifiedApplications,
    section,
  ]);

  const {
    drawer: { application_id },
    handleOpen,
  } = useApplicationStore(({ drawer, handleOpen }) => ({
    drawer,
    handleOpen,
  }));

  const sectionApplications = useMemo(
    () => (sectionApplication?.data?.pages ?? []).flatMap((page) => page),
    [sectionApplication?.data?.pages],
  );

  const currentIndex = useMemo(
    () => sectionApplications.findIndex(({ id }) => id === application_id),
    [application_id, sectionApplications],
  );

  const applicationsCount = useMemo(
    () => sectionApplications.length,
    [sectionApplications],
  );

  const handleSelectNextApplication = useCallback(() => {
    handleOpen({
      application_id:
        sectionApplications[(currentIndex + 1) % applicationsCount].id,
    });
  }, [sectionApplication, currentIndex, applicationsCount, handleOpen]);

  const handleSelectPrevApplication = useCallback(() => {
    handleOpen({
      application_id:
        sectionApplications[
          currentIndex - 1 < 0 ? applicationsCount - 1 : currentIndex - 1
        ].id,
    });
  }, [sectionApplication, currentIndex, applicationsCount, handleOpen]);

  return {
    job,
    jobLoad,
    section,
    emailVisibilities,
    cascadeVisibilites,
    sectionApplication,
    locationFilterOptions,
    filters,
    sort,
    setFilters,
    setSort,
    handleUpdateApplication,
    handleAsyncUpdateApplication,
    handleMoveApplications,
    handleSelectNextApplication,
    handleSelectPrevApplication,
  };
};

const EMAIL_VISIBILITIES: {
  // eslint-disable-next-line no-unused-vars
  [id in ApplicationsStore['section']]: ApplicationsStore['section'][];
} = {
  new: ['disqualified'],
  screening: ['new'],
  assessment: ['new', 'screening'],
  interview: ['new', 'screening', 'assessment'],
  qualified: ['new', 'screening', 'assessment', 'interview'],
  disqualified: ['new', 'screening', 'assessment', 'interview', 'qualified'],
};

const CASCADE_VISIBILITIES: {
  // eslint-disable-next-line no-unused-vars
  [id in ApplicationsStore['section']]: ApplicationsStore['section'][];
} = {
  new: [
    'new',
    'screening',
    'assessment',
    'interview',
    'qualified',
    'disqualified',
  ],
  screening: [
    'screening',
    'assessment',
    'interview',
    'qualified',
    'disqualified',
  ],
  assessment: ['assessment', 'interview', 'qualified', 'disqualified'],
  interview: ['interview', 'qualified', 'disqualified'],
  qualified: ['qualified', 'disqualified'],
  disqualified: ['disqualified'],
};

export const useKeyPress = (key: KeyboardEvent['key']) => {
  const [pressed, setPressed] = useState(false);
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (key === event.key) setPressed(true);
  }, []);
  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (key === event.key) setPressed(false);
  }, []);
  const handleKeyLeft = useCallback((event: KeyboardEvent) => {
    if (key === event.key) setPressed(true);
  }, []);
  const handleKeyRight = useCallback((event: KeyboardEvent) => {
    if (key === event.key) setPressed(false);
  }, []);
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [handleKeyDown]);
  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp, false);
    return () => {
      document.removeEventListener('keyup', handleKeyUp, false);
    };
  }, [handleKeyUp]);
  useEffect(() => {
    document.addEventListener('keyleft', handleKeyLeft, false);
    return () => {
      document.removeEventListener('keyleft', handleKeyLeft, false);
    };
  }, [handleKeyLeft]);
  useEffect(() => {
    document.addEventListener('keyright', handleKeyRight, false);
    return () => {
      document.removeEventListener('keyright', handleKeyRight, false);
    };
  }, [handleKeyRight]);

  return { pressed };
};

export const useMouseScroll = () => {
  const [scrollDir, setScrollDir] = useState('scrolling down');

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? 'scrolling down' : 'scrolling up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDir]);

  return scrollDir;
};

export const useOnline = () => {
  const [isOnline, setIsOnline] = useState(!document.hidden);
  const handChangeStatus = () => {
    setIsOnline(!document.hidden);
  };
  useEffect(() => {
    document.addEventListener('onlineStatus', handChangeStatus);
    return () => {
      document.removeEventListener('onlineStatus', handChangeStatus);
    };
  }, []);
  return isOnline;
};

export const usePolling = (pollingCallback, interval, dependencies = []) => {
  const timerRef = useRef(null);
  const [isPolling, setIsPolling] = useState(true);
  const startPolling = () => {
    timerRef.current = setInterval(pollingCallback, interval);
    setIsPolling(true);
  };
  const stopPolling = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsPolling(false);
  };
  useEffect(() => {
    if (isPolling) startPolling();
    else stopPolling();
    return () => stopPolling();
  }, [isPolling, ...dependencies]);
  return { isPolling, stopPolling };
};

export const useMouseClick = () => {
  const [data, setData] = useState({ click: false, x: null, y: null });
  const handleMouseUp = () => {
    setData({
      click: false,
      x: null,
      y: null,
    });
  };
  const handleMouseDown = (e: any) => {
    setData({
      click: true,
      x: e.clientX,
      y: e.clientY,
    });
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [handleMouseDown]);
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);
  return data;
};

export const getBoundingSingleStatus = (id: string, x: number, y: number) => {
  const div = document.getElementById(id);
  const coords = div.getBoundingClientRect();
  const boundedX = coords.left <= x && x <= coords.right;
  const boundedY = coords.top <= y && y <= coords.bottom;
  return boundedX && boundedY;
};

export const getBoundingStatus = (id: string, x: number, y: number) => {
  const extraDivs = document.getElementsByClassName(`${id}-Include`);
  const extrDivArr = [];
  for (let i = 0; i < extraDivs.length; i++) {
    extrDivArr.push(...extraDivs[i].getElementsByTagName('*'));
  }
  const divs = [
    ...document.getElementById(id).getElementsByTagName('*'),
    ...extrDivArr,
  ];
  let right = Math.log(0);
  let bottom = Math.log(0);
  let top = Infinity;
  let left = Infinity;
  for (let i = 0; i < divs.length; i++) {
    const div = divs[i];
    const coords = div.getBoundingClientRect();
    if (coords.right > right) right = coords.right;
    if (coords.left < left) left = coords.left;
    if (coords.bottom > bottom) bottom = coords.bottom;
    if (coords.top < top) top = coords.top;
  }
  const boundedX = left <= x && x <= right;
  const boundedY = top <= y && y <= bottom;

  return boundedX && boundedY;
};
