import {createTeamSupervisor} from './utils/helper';
import {llm} from './utils/llm';

export const createSchedulingSupervisorAgent = async () => {
  const supervisorAgent = await createTeamSupervisor(
    llm,
    'You are a supervisor tasked with managing a conversation between the' +
      'following workers:  {team_members}. Given the following user request,' +
      'respond with the worker to act next. Each worker will perform a' +
      'task and respond with their results.\n\n' +
      'If you get stuck, ask user for help.\n\n' +
      'You can call only one worker for a user request.\n\n' +
      'Dont go into loop calling same workers again and again\n\n' +
      'If you dont understand which worker to call for a user request, ask user for help.\n\n' +
      'Dont put placeholder data if tool response is empty.\n\n' +
      'Call getScheduledInterviews to get either scheduled interviews (schedules) or candidate declined interviews or scheduled interviews which has issues. \n\n' +
      'Call getJobsgetHiringTeam to get the jobs or a hiring team for a job\n\n' +
      'Call requestsRead to get requests or schedule requests or reschedule requests or cancel requests assigned to user\n\n' +
      'Call getInterviewTypesOrUsers to get interview types or users inside an interview type.\n\n' +
      'Call greetingAgent to greet the user if user say hi or hello\n\n',
    [
      'getInterviewTypesOrUsers',
      'greetingAgent',
      'getScheduledInterviews',
      'requestsRead',
      'getJobsgetHiringTeam',
    ] //all nodes
  );

  return supervisorAgent;
};
