export const schedulingFlowChart = {
  requiredData: {
    candidate_name: () => 'please, provide the candidate name.',
    job_title: () =>
      'Specify the job title for which you would like to schedule an interview.',
    date_range: () =>
      'now, can you provide when you want to schedule the interview.',
    interview_name: (name: string) =>
      `would you like to assign an name to interview? or you want to use default name ${name}`,
  },
  completion: 'confirm all details with user and then call',
  scenarios: {
    candidate_name: {
      no_results: (name: string) =>
        `sorry, i have not found any results. with name ${name}`,
      multiple_results: (name: string) =>
        `I have found multiple results. with name ${name}`,
    },
    job_title: {
      no_results: (name: string) =>
        `sorry, i have not found any results. with name ${name}`,
      multiple_results: (name: string) =>
        `I have found multiple results. with name ${name}`,
    },
  },
};
