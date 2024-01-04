import { createContext, ReactNode, useContext } from 'react';

import useProviderJobApplicationActions from './hooks';
import { JobApplicationContext } from './types';

const initialJobApplicationsContext = {
  applications: undefined,
  applicationDisable: undefined,
  defaultFilters: undefined,
  setApplicationDisable: undefined,
  paginationLimit: undefined,
  atsSync: undefined,
  job: undefined,
  longPolling: 0,
  pageNumber: undefined,
  handleJobApplicationCreate: undefined,
  handleJobApplicationBulkCreate: undefined,
  handleJobApplicationRead: undefined,
  handleJobApplicationRefresh: undefined,
  handleJobApplicationPaginate: undefined,
  handleJobApplicationUpdate: undefined,
  handleJobApplicationBulkUpdate: undefined,
  handleJobApplicationDelete: undefined,
  handleJobApplicationError: undefined,
  handleJobApplicationFilter: undefined,
  searchParameters: undefined,
  initialLoad: false,
  openImportCandidates: false,
  setOpenImportCandidates: undefined,
  openManualImportCandidates: undefined,
  setOpenManualImportCandidates: undefined,
  handleUpdateJobStatus: undefined,
  updateTick: undefined,
  section: undefined,
  setSection: undefined,
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
