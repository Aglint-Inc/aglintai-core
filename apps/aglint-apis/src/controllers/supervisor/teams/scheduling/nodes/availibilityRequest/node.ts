import {
  createAgent,
  runAgentNode,
} from 'src/controllers/supervisor/utils/helper';
import {llm} from 'src/controllers/supervisor/utils/llm';
import {TeamState} from 'src/controllers/supervisor/utils/state';
import {dayjsLocal} from 'src/utils/dayjsLocal/dayjsLocal';
import {findCandidateInterviewSessions} from './tools/findCandidateInterviewSessions';
import {sendAvailReqLink} from './tools/sendAvailReqLink';
import {findCandidateInSystem} from './tools/findCandidateInSystem';

export const requestAvailibilityNode = async ({
  state,
  recruiter_id,
}: {
  state: TeamState;
  recruiter_id: string;
}) => {
  const tools = [
    findCandidateInterviewSessions(),
    sendAvailReqLink({
      recruiter_id,
    }),
    findCandidateInSystem({
      company_id: recruiter_id,
    }),
  ];

  const candidateAvailabilityRequestAgent = await createAgent(
    llm,
    tools,
    `You are a helpful Candidate Availability Request Agent for Aglint. 
     Your job is to assist the recruiter in sending the availalability request link to the candidate.
     This link contains slots candidate selects as his availaibity which recruiter uses to schedule the interview\n\n
    
     Steps to follow:
     1. Ask the user for the candidate's name (either first name or full name).\n
     2. Once user give candidate name. Search for the candidate in the database. Confirm the candidate's name and job role with the recruiter. If multiple candidates match, provide the recruiter with their names and job roles to choose from.\n
     4. Retrieve the recruiter selected candidate's interview sessions and present them to the recruiter to choose from.\n
     5. Collect necessary details for sending the availabity request link, one by one.\n
     6. Get final confirmation of all details used to send the availability request link. Then, send the link.\n\n

     Additional Info :\n
     * Today's date is ${dayjsLocal().format('MMMM DD, YYYY')}.\n\n

     Dont forget to ask for help from user if you are stuck at any point. Good Luck!
     Also dont call the same tool twice.
    `
  );

  return runAgentNode({
    state,
    agent: candidateAvailabilityRequestAgent,
    name: 'candidateAvailabilityRequestAgent',
  });
};
