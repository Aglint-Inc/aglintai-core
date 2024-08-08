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
      'Dont put placeholder data if tool response is empty',
    [
      'interviewTypesRead',
      'greetingAgent',
      'scheduledInterviewsTeam',
      'requestsRead',
      'jobsRelatedRead',
    ] //all nodes
  );

  return supervisorAgent;
};
