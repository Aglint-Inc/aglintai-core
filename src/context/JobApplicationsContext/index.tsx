import { createContext, ReactNode, useContext } from 'react';

import useProviderJobApplicationActions from './hooks';
import { JobApplicationContext } from './types';

const initialJobApplicationsContext = {
  applications: undefined,
  applicationDisable: undefined,
  setApplicationDisable: undefined,
  paginationLimit: undefined,
  defaultFilters: undefined,
  job: undefined,
  atsSync: undefined,
  updateTick: undefined,
  pageNumber: undefined,
  handleJobApplicationBulkCreate: undefined,
  handleJobApplicationUpdate: undefined,
  handleJobApplicationRead: undefined,
  handleJobApplicationPaginate: undefined,
  handleJobApplicationRefresh: undefined,
  handleJobApplicationBulkUpdate: undefined,
  handleJobApplicationError: undefined,
  handleUpdateJobStatus: undefined,
  handleJobApplicationFilter: undefined,
  searchParameters: undefined,
  initialLoad: false,
  openImportCandidates: false,
  setOpenImportCandidates: undefined,
  openManualImportCandidates: undefined,
  setOpenManualImportCandidates: undefined,
  section: undefined,
  setSection: undefined,
  longPolling: 0,
  showInterview: false,
};

const JobApplicationsContext = createContext(initialJobApplicationsContext);

const JobApplicationProvider = ({ children }: { children: ReactNode }) => {
  const value = useProviderJobApplicationActions();
  return (
    <JobApplicationsContext.Provider value={value}>
      {children}
    </JobApplicationsContext.Provider>
  );
};

export default JobApplicationProvider;

export const useJobApplications = (): JobApplicationContext => {
  const value = useContext(JobApplicationsContext);
  return { ...value };
};

export const useJobApplicationsForJob = (jobId: string) => {
  const value = useProviderJobApplicationActions(jobId);
  return { ...value };
};
