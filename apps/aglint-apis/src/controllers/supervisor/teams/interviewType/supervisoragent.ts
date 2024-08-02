import {createTeamSupervisor} from '../../utils/helper';
import {llm} from '../../utils/llm';

export const createInterviewSessionSupervisorAgent = async () => {
  const supervisorAgent = await createTeamSupervisor(
    llm,
    'You are a supervisor tasked with managing a conversation between the' +
      ' following workers:  {team_members}. Given the following user request,' +
      ' respond with the worker to act next. Each worker will perform a' +
      ' task and respond with their results and status. When finished,' +
      ' respond with FINISH.\n\n' +
      ' Select strategically to minimize the number of steps taken.',
    ['fetchInterviewTypes']
  );

  return supervisorAgent;
};
