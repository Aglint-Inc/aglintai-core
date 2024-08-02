import {createTeamSupervisor} from '../../utils/helper';
import {llm} from '../../utils/llm';

export const createSchedulingSupervisorAgent = async () => {
  const supervisorAgent = await createTeamSupervisor(
    llm,
    'You are a supervisor tasked with managing a conversation between the user' +
      'and following workers:  {team_members}. Given the following user request,' +
      ' choose an worker. Each worker will perform a' +
      ' task and respond with their results. Send the response back to user',
    ['scheduleInterview']
  );

  return supervisorAgent;
};
